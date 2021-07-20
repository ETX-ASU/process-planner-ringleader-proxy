import React, { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./homeworks.scss";
import HeaderBar from "../../app/components/HeaderBar";
import HomeworkEditor from "../../tool/HomeworkEditor";
import { noop } from "../../tool/utils/core";

function HomeworkViewer(props) {
  const { homework, assignment } = props;

  const assignmentConfig = {
    ...assignment.toolAssignmentData.plannerConfig,
    dueDate: assignment.lockOnDate ? assignment.lockOnDate * 1000 : 0,
  };

  return (
    <Fragment>
      <HeaderBar title={assignment.title} smallTitle />

      <Container className="mt-2 ml-1 mr-2">
        <Row className={"mt-4"}>
          <Col>
            <p>{assignment.summary}</p>
          </Col>
        </Row>

        <HomeworkEditor
          isReadOnly
          userId="-1"
          summary={assignment.summary}
          title={assignment.title}
          assignmentConfig={assignmentConfig}
          toolHomeworkData={homework.toolHomeworkData}
          updateToolHomeworkData={noop}
        />
      </Container>
    </Fragment>
  );
}

export default HomeworkViewer;
