import React, { Fragment, useRef, useState } from "react";
import { API } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { updateAssignment as updateAssignmentMutation } from "../../graphql/mutations";
import {
  setActiveUiScreenMode,
  setAssignmentData,
} from "../../app/store/appReducer";
import { UI_SCREEN_MODES, MODAL_TYPES } from "../../app/constants";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./assignments.scss";
import HeaderBar from "../../app/components/HeaderBar";
import ToggleSwitch from "../../app/components/ToggleSwitch";
import ProcessPlannerEditor from "../../tool/ProcessPlannerEditor";
import { FullscreenOverlay } from "../../tool/components/FullscreenOverlay/FullscreenOverlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "../../app/components/ConfirmationModal";
import { reportError } from "../../developer/DevUtils";
import { handleConnectToLMS } from "../../lmsConnection/RingLeader";
import { v4 as uuid } from "uuid";
import { IGNORE_LIMITED_EDITING } from "../../config";

function AssignmentEditor() {
  const dispatch = useDispatch();
  const urlAssignmentId = useSelector((state) => state.app.assignmentId);
  const activeUser = useSelector((state) => state.app.activeUser);
  const [formData, setFormData] = useState(
    useSelector((state) => state.app.assignment)
  );
  const isLimitedEditing = useSelector((state) =>
    Boolean(state.app.homeworks?.length)
  );
  const [activeModal, setActiveModal] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const reminderCheckboxRef = useRef(null);

  async function handleCancelBtn() {
    if (!urlAssignmentId) {
      setActiveModal({ type: MODAL_TYPES.cancelDupedAssignmentEditsWarning });
    } else {
      setActiveModal({ type: MODAL_TYPES.cancelNewAssignmentEditsWarning });
    }
  }

  async function handleUpdateBtn() {
    if (window.localStorage.getItem('newTabReminderSilenced')) {
      saveAssignment();
      return;
    }

    setActiveModal({ type:MODAL_TYPES.notificationBeforeSave });
  }

  function handleReminderClose() {
    if (reminderCheckboxRef.current?.checked) {
      window.localStorage.setItem('newTabReminderSilenced', true);
    }

    setActiveModal(null);
    saveAssignment();
  }

  async function saveAssignment() {
    // TODO: Bonus. Add mechanism to verify or perhaps create an undo mechanism, so maybe record previous state here before API call?
    if (!formData.title) return;

    setIsSubmitting(true);

    const inputData = Object.assign({}, formData);
    delete inputData.createdAt;
    delete inputData.updatedAt;

    try {
      await API.graphql({
        query: updateAssignmentMutation,
        variables: { input: inputData },
      });
    } catch (error) {
      reportError(
        error,
        `We're sorry. An error occurred while trying to update the edits to your assignment. Please wait a moment and try again.`
      );
    }

    if (!urlAssignmentId) {
      await handleConnectToLMS(inputData);
      if (window.isDevMode) {
        inputData.lineItemId = `FAKE-${uuid()}`;
        await API.graphql({
          query: updateAssignmentMutation,
          variables: { input: inputData },
        });
      }
      dispatch(setActiveUiScreenMode(UI_SCREEN_MODES.returnToLmsScreen));
    } else {
      dispatch(setAssignmentData(formData));
      dispatch(setActiveUiScreenMode(UI_SCREEN_MODES.viewAssignment));
    }

    setIsSubmitting(false);
  }

  function toggleUseAutoScore(e) {
    setFormData({
      ...formData,
      isUseAutoScore: !formData.isUseAutoScore,
      isUseAutoSubmit: false,
    });
  }

  function toggleAllowResubmission(e) {
    setFormData({
      ...formData,
      allowResubmission: !formData.allowResubmission,
    });
  }

  function handleToolChanges(toolAssignmentData) {
    setFormData({ ...formData, toolAssignmentData });
  }

  function returnToNewOrDupeAssignmentScreen(e) {
    setActiveModal(null);
    dispatch(setActiveUiScreenMode(UI_SCREEN_MODES.createOrDupeAssignment));
  }

  function returnToViewAssignmentScreen(e) {
    setActiveModal(null);
    dispatch(setActiveUiScreenMode(UI_SCREEN_MODES.viewAssignment));
  }

  function renderModal() {
    switch (activeModal.type) {
      case MODAL_TYPES.cancelDupedAssignmentEditsWarning:
        return (
          <ConfirmationModal
            isStatic
            onHide={() => setActiveModal(null)}
            title={"Cancel Editing Assignment"}
            buttons={[
              {
                name: "Cancel",
                variant: "secondary",
                onClick: returnToNewOrDupeAssignmentScreen,
              },
              { name: "Continue Editing", onClick: () => setActiveModal(null) },
            ]}
          >
            <p>
              Do you want to cancel editing this duplicated assignment or
              continue?
            </p>
            <p>Canceling will lose any edits you have made.</p>
          </ConfirmationModal>
        );
      case MODAL_TYPES.cancelNewAssignmentEditsWarning:
        return (
          <ConfirmationModal
            isStatic
            onHide={() => setActiveModal(null)}
            title={"Cancel Editing Assignment"}
            buttons={[
              {
                name: "Cancel",
                variant: "secondary",
                onClick: returnToViewAssignmentScreen,
              },
              {
                name: "Continue Creating",
                onClick: () => setActiveModal(null),
              },
            ]}
          >
            <p>Do you want to cancel editing this assignment or continue?</p>
            <p>
              Canceling will lose any changes you may have made to this
              assignment.
            </p>
          </ConfirmationModal>
        );
      case MODAL_TYPES.notificationBeforeSave:
        return (
          <ConfirmationModal 
            isStatic
            title="Important"
            buttons={[{ name: 'Got it', onClick: handleReminderClose }]}
          >
            <p>In your LMS, we strongly recommend for you to set this Tool to open in a new tab for a better viewing experience. For example, Canvas has a checkbox labeled “open in a new tab” that you can check.</p>
            <div className="d-flex align-items-center gap-2">
              <input type="checkbox" id="newTabReminder" ref={reminderCheckboxRef} />
              <label htmlFor="newTabReminder">
                Do not show this message again
              </label>
            </div>
          </ConfirmationModal>
        );
      default:
        return null;
    }
  }

  return (
    <Fragment>
      {activeModal && renderModal()}
      <HeaderBar title={`Edit: ${formData.title}`}>
        <Button variant="secondary" onClick={handleCancelBtn} className="mr-2">
          Cancel
        </Button>
        <Button onClick={handleUpdateBtn}>Update</Button>
      </HeaderBar>
      {isLimitedEditing && (
        <Row className="m-4 p-0 alert alert-warning" role="alert">
          <Col className={"alert-block p-3 text-center"}>
            <FontAwesomeIcon icon={faExclamationTriangle} size="2x" inverse />
          </Col>
          <Col className="col-10">
            <p className="m-3">
              Students have begun their assignment, therefore some options can
              no longer be changed and are disabled.
            </p>
          </Col>
        </Row>
      )}
      <form>
        <Container className="mt-2 ml-2 mr-2 mb-4">
          <Row className={"mt-4 mb-4"}>
            <Col>
              <h2>Basic Assignment Details</h2>
            </Col>
          </Row>

          <Row className={"ml-2"}>
            <Col className={"col-12"}>
              <div className={"form-group"}>
                <label htmlFor="dataTitle">
                  <h3>Title</h3>
                </label>
                <input
                  id="dataTitle"
                  className={"form-control"}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  defaultValue={formData.title}
                />
              </div>
              <div className={"form-group"}>
                <label htmlFor="dataSummary">
                  <h3>
                    Summary<span className="aside"> - Optional</span>
                  </h3>
                </label>
                <textarea
                  id="dataSummary"
                  className={"form-control"}
                  onChange={(e) =>
                    setFormData({ ...formData, summary: e.target.value })
                  }
                  defaultValue={formData.summary}
                />
              </div>
            </Col>
          </Row>
          <Row className={"ml-2"}>
            <Col className="col-6">
              <label>
                <h3>Autoscore</h3>
              </label>
            </Col>
            <Col className="col-6 d-flex flex-row-reverse">
              <div
                className="custom-control custom-switch"
                style={{ top: `6px` }}
              >
                <ToggleSwitch
                  disabled={isLimitedEditing && !IGNORE_LIMITED_EDITING}
                  value={formData.isUseAutoScore}
                  handleToggle={toggleUseAutoScore}
                />
              </div>
            </Col>
          </Row>
          {formData.isUseAutoScore && (
            <Row className={"ml-2"}>
              <Col>
                <p>
                  <span className="mr-2">
                    <input
                      type={"checkbox"}
                      disabled={isLimitedEditing && !IGNORE_LIMITED_EDITING}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isUseAutoSubmit: e.target.checked,
                        })
                      }
                      checked={formData.isUseAutoSubmit}
                    />
                  </span>
                  Auto-submit score to LMS when student submits their assignment
                </p>
              </Col>
            </Row>
          )}
          <Row className="ml-2 mt-2">
            <Col className="col-6">
              <label>
                <h3>Allow resubmission</h3>
              </label>
            </Col>
            <Col className="col-6 d-flex flex-row-reverse">
              <div
                className="custom-control custom-switch"
                style={{ top: `6px` }}
              >
                <ToggleSwitch
                  id="allowResubmission"
                  value={formData.allowResubmission}
                  handleToggle={toggleAllowResubmission}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </form>

      {isSubmitting && <FullscreenOverlay />}

      <ProcessPlannerEditor
        isLimitedEditing={isLimitedEditing && !IGNORE_LIMITED_EDITING}
        isUseAutoScore={formData.isUseAutoScore}
        userId={activeUser.id}
        toolAssignmentData={formData.toolAssignmentData}
        updateToolAssignmentData={handleToolChanges}
      />
    </Fragment>
  );
}

export default AssignmentEditor;
