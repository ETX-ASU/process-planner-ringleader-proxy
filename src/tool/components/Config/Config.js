import React, { useCallback } from "react";
import { Container, Col, Form, Row } from "react-bootstrap";
import { useProcessPlanner } from "../../hooks/useProcessPlanner";
import { ACCESS_LEVELS } from "../../constants";
import styles from "./Config.module.scss";

export const Config = () => {
  const { plannerInfo, setPlannerInfo } = useProcessPlanner();

  const handlePlannerUpdate = useCallback(
    (key, value) => {
      setPlannerInfo((info) => {
        return {
          ...info,
          [key]: value,
        };
      });
    },
    [setPlannerInfo]
  );

  const handleCheckboxChange = useCallback(
    (event) => {
      const { name, checked } = event.target;

      if (name === ACCESS_LEVELS.full && checked) {
        handlePlannerUpdate("studentAccessLevel", ACCESS_LEVELS.full);
      }

      if (name === ACCESS_LEVELS.full && !checked) {
        handlePlannerUpdate("studentAccessLevel", ACCESS_LEVELS.partial);
      }

      if (name === ACCESS_LEVELS.partial && checked) {
        handlePlannerUpdate("studentAccessLevel", ACCESS_LEVELS.partial);
      }

      if (name === ACCESS_LEVELS.partial && !checked) {
        handlePlannerUpdate("studentAccessLevel", ACCESS_LEVELS.readonly);
      }
    },
    [handlePlannerUpdate]
  );

  if (!plannerInfo) {
    return null;
  }

  return (
    <Form>
      <Container className="mt-2 ml-2 mr-2 mb-4">
        <Row className={styles.row}>
          <Col className={styles.column}>
            <h3>Score Settings</h3>
            <div className={styles.content}>
              <Form.Group>
                <Form.Label>Maximum score for the assignment</Form.Label>
                <Form.Control
                  type="number"
                  value={plannerInfo.maxScore}
                  onChange={(event) =>
                    handlePlannerUpdate(
                      "maxScore",
                      event.target.value ? parseInt(event.target.value) : ""
                    )
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Required minimum word count in text section(s)
                </Form.Label>
                <Form.Control
                  type="number"
                  value={plannerInfo.minWordsCount}
                  onChange={(event) =>
                    handlePlannerUpdate(
                      "minWordsCount",
                      event.target.value ? parseInt(event.target.value) : ""
                    )
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Required minimum checklist items in checklist section(s)
                </Form.Label>
                <Form.Control
                  type="number"
                  value={plannerInfo.minChecklistItems}
                  onChange={(event) =>
                    handlePlannerUpdate(
                      "minChecklistItems",
                      event.target.value ? parseInt(event.target.value) : ""
                    )
                  }
                />
              </Form.Group>
            </div>
          </Col>
          <Col className={styles.column}>
            <h3>Student Access Level</h3>
            <div className={styles.content}>
              <p>Standard</p>
              <ul>
                <li>Add text to faculty-made sections</li>
                <li>Add sections to faculty-made tabs</li>
              </ul>
              <hr />
              <p>Additional</p>
              <div className={styles.additional}>
                <div className="form-check">
                  <label className="form-check-label">
                    <input
                      checked={
                        plannerInfo.studentAccessLevel ===
                          ACCESS_LEVELS.partial ||
                        plannerInfo.studentAccessLevel === ACCESS_LEVELS.full
                      }
                      className="form-check-input"
                      disabled={
                        plannerInfo.studentAccessLevel === ACCESS_LEVELS.full
                      }
                      type="checkbox"
                      name={ACCESS_LEVELS.partial}
                      onChange={handleCheckboxChange}
                    />
                    Make and edit new tabs
                  </label>
                </div>
                <div className="form-check">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      checked={
                        plannerInfo.studentAccessLevel === ACCESS_LEVELS.full
                      }
                      type="checkbox"
                      name={ACCESS_LEVELS.full}
                      onChange={handleCheckboxChange}
                    />
                    Make new tabs and edit all tabs
                  </label>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
