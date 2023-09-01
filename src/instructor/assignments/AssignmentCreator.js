import React, { Fragment, useMemo, useRef, useState } from "react";
import { API } from "aws-amplify";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

import { createAssignment as createAssignmentMutation } from "../../graphql/mutations";
import { MODAL_TYPES, UI_SCREEN_MODES } from "../../app/constants";
import { setActiveUiScreenMode } from "../../app/store/appReducer";
import "./assignments.scss";

import {
  Button,
  Col,
  Container,
  Row,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import HeaderBar from "../../app/components/HeaderBar";
import ToggleSwitch from "../../app/components/ToggleSwitch";

import ProcessPlannerCreator from "../../tool/ProcessPlannerCreator";
import { FullscreenOverlay } from "../../tool/components/FullscreenOverlay/FullscreenOverlay";
import ConfirmationModal from "../../app/components/ConfirmationModal";
import { reportError } from "../../developer/DevUtils";
import {
  /*createAssignmentInLms,*/ handleConnectToLMS,
} from "../../lmsConnection/RingLeader";
// import {calcMaxScoreForAssignment} from "../../tool/ToolUtils";
import styles from "./AssignmentCreator.module.scss";

const emptyAssignment = {
  id: "",
  ownerId: "",
  title: "",
  summary: "",
  image: "",
  isLinkedToLms: false,
  lineItemId: "",
  isLockedOnSubmission: true,
  lockOnDate: 0,
  isUseAutoScore: true,
  isUseAutoSubmit: false,
  allowResubmission: false,

  // This data is specific to the tool (Quiz tool data is just an array of questions & answers)
  isArchived: false,
  isFavorite: false,
  toolAssignmentData: {},
};

function AssignmentCreator() {
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.app.activeUser);
  const courseId = useSelector((state) => state.app.courseId);
  const [formData, setFormData] = useState(emptyAssignment);
  const [activeModal, setActiveModal] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const reminderCheckboxRef = useRef(null);

  const canCreateAssignment = useMemo(() => {
    const plannerData = formData.toolAssignmentData.plannerData;

    return (
      formData.title !== "" &&
      (plannerData.length > 1 || plannerData[0].title !== "New Tab")
    );
  }, [formData.title, formData.toolAssignmentData.plannerData]);

  async function handleSubmitBtn() {
    if (window.localStorage.getItem('newTabReminderSilenced')) {
      saveAssignment();
      return;
    }

    setActiveModal({ type:MODAL_TYPES.notificationBeforeSave });
  }

  async function saveAssignment() {
    if (!canCreateAssignment) return;

    setIsSubmitting(true);

    const assignmentId = uuid();
    const inputData = Object.assign({}, formData, {
      id: assignmentId,
      courseId: courseId,
      ownerId: activeUser.id,
      lockOnDate: formData.isLockedOnDate
        ? moment(formData.lockOnDate).valueOf()
        : 0,
    });

    try {
      const result = await API.graphql({
        query: createAssignmentMutation,
        variables: { input: inputData },
      });
      if (window.isDevMode && result) {
        setActiveModal({
          type: MODAL_TYPES.confirmAssignmentSaved,
          id: assignmentId,
        });
      } else {
        await handleConnectToLMS(inputData);
      }
    } catch (error) {
      reportError(
        error,
        `We're sorry. There was a problem saving your new assignment.`
      );
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

  function handleReturnToCreateOrDupe() {
    setIsSubmitting(true);
    setActiveModal(null);
    dispatch(setActiveUiScreenMode(UI_SCREEN_MODES.returnToLmsScreen));
  }

  function handleCancelCreatingAssignment() {
    setActiveModal(null);
    dispatch(setActiveUiScreenMode(UI_SCREEN_MODES.createOrDupeAssignment));
  }

  function handleReminderClose() {
    if (reminderCheckboxRef.current?.checked) {
      window.localStorage.setItem('newTabReminderSilenced', true);
    }

    setActiveModal(null);
    saveAssignment();
  }

  function renderModal() {
    switch (activeModal.type) {
      case MODAL_TYPES.cancelNewAssignmentEditsWarning:
        return (
          <ConfirmationModal
            isStatic
            onHide={() => setActiveModal(null)}
            title="Cancel New Assignment"
            buttons={[
              {
                name: "Cancel new assignment",
                variant: "secondary",
                onClick: handleCancelCreatingAssignment,
              },
              {
                name: "Continue Creating",
                onClick: () => setActiveModal(null),
              },
            ]}
          >
            <p>Do you want to cancel new assignment or continue editing?</p>
            <p>Canceling will not save your new assignment.</p>
          </ConfirmationModal>
        );
      case MODAL_TYPES.confirmAssignmentSaved:
        return (
          <ConfirmationModal
            isStatic
            onHide={() => setActiveModal(null)}
            title="Assignment Saved"
            buttons={[
              { name: "Continue", onClick: handleReturnToCreateOrDupe },
            ]}
          >
            <p>
              {`Assignment has been saved! In order to access it, use this assignmentId: ${activeModal.id}`}
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
      default: {
        return null;
      }
    }
  }

  return (
    <Fragment>
      {activeModal && renderModal()}
      <HeaderBar withLogo title="Create New Assignment">
        <Button
          variant="secondary"
          onClick={() =>
            setActiveModal({
              type: MODAL_TYPES.cancelNewAssignmentEditsWarning,
            })
          }
          className="mr-2"
        >
          Cancel
        </Button>
        {canCreateAssignment ? (
          <Button onClick={handleSubmitBtn}>Create</Button>
        ) : (
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="submit-button-tooltip">
                Please enter the assignment title and change the default tab
                name.
              </Tooltip>
            }
          >
            <Button className={styles.disabledButton} type="button">
              Create
            </Button>
          </OverlayTrigger>
        )}
      </HeaderBar>

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
                  id="dataUseAutoscore"
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

      {/* The assignment data collected here is specific to the tool, while the above assignment data is used in every tool */}
      <ProcessPlannerCreator
        isUseAutoScore={formData.isUseAutoScore}
        userId={activeUser.id}
        toolAssignmentData={formData.toolAssignmentData}
        updateToolAssignmentData={handleToolChanges}
      />
    </Fragment>
  );
}

export default AssignmentCreator;
