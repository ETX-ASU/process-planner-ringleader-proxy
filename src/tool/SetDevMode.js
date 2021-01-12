import React, { useEffect } from "react";
import { Container } from "react-bootstrap";

export const SetDevMode = () => {
  useEffect(() => {
    sessionStorage.setItem("isDevMode", true)
  }, [])

  return (
    <Container className="app mt-4 mb-5 p-0">
      <div style={{ backgroundColor: "white" }}>
        <p>
          Enabled dev mode.
        </p>
        <ul>
          <li><a href="/?userId=01&courseId=course-001&role=instructor">Go to instructor dashboard</a></li>
        </ul>
      </div>
    </Container>
  )
}