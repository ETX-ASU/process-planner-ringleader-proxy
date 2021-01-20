import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Container, Col, Form, Row } from "react-bootstrap";
import { useProcessPlanner } from "../../hooks/useProcessPlanner";
import { ACCESS_LEVELS } from "../../constants";

export const Config = ({ useAutoScore }) => {
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

  if (!plannerInfo) {
    return null;
  }

  return (
    <Container className="mt-2 ml-2 mr-2 mb-4">
      <Form>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Maximum score for the assignment</Form.Label>
            <Form.Control
              disabled={!useAutoScore}
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
          <Form.Group as={Col}>
            <Form.Label>Student access level</Form.Label>
            <div>
              {Object.keys(ACCESS_LEVELS).map((level) => (
                <Form.Check
                  inline
                  key={level}
                  type="radio"
                  id={`student-edit-level-${level}`}
                  name="student-edit-level"
                  label={level}
                  checked={plannerInfo.studentAccessLevel === level}
                  value={level}
                  onChange={(event) =>
                    handlePlannerUpdate(
                      "studentAccessLevel",
                      event.target.value
                    )
                  }
                />
              ))}
            </div>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Required minimum word count in text section</Form.Label>
            <Form.Control
              disabled={!useAutoScore}
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
          <Form.Group as={Col}>
            <Form.Label>Required minimum items in checklist section</Form.Label>
            <Form.Control
              disabled={!useAutoScore}
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
        </Row>
      </Form>
    </Container>
  );
};

Config.propTypes = {
  useAutoScore: PropTypes.bool,
};
