import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Info } from "./Info";

const props = {
  title: "Experiment",
  progress: 0.4,
  dueDate: 1638944269799,
  description: "Lorem ipsum dolor",
};

let dateNow;

describe("<Info />", () => {
  beforeAll(() => {
    dateNow = Date.now;
    Date.now = jest.spyOn(Date, "now").mockImplementation(() => 1637599234062);
  });

  afterAll(() => {
    Date.now = dateNow;
  });

  describe("on first render", () => {
    test("renders single button", () => {
      const { container } = render(<Info {...props} />);
      const button = container.querySelector(".infoButton");

      expect(button).toBeInTheDocument();
    });

    test("does not render modal", () => {
      const { container } = render(<Info {...props} />);
      const modal = container.querySelector(".modal");

      expect(modal).not.toBeInTheDocument();
    });
  });

  describe("when the button is clicked", () => {
    let container;

    beforeEach(() => {
      const result = render(<Info {...props} />);
      container = result.container;

      const button = container.querySelector(".infoButton");
      fireEvent.click(button);
    });

    test("renders modal", () => {
      expect(container.querySelector(".modal")).toBeInTheDocument();
    });

    test("renders title", () => {
      expect(container.querySelector(".title").textContent).toBe(props.title);
    });

    test("renders progress bar with correct size", () => {
      expect(container.querySelector(".progressBar")).toHaveStyle("width: 40%");
    });

    test("renders correct due date", () => {
      expect(container.querySelector(".metaSection p").textContent).toBe(
        "15d 14h"
      );
    });

    test("renders description", () => {
      expect(container.querySelector(".description").textContent).toBe(
        props.description
      );
    });

    test("closes modal when the X button is clicked", () => {
      fireEvent.click(container.querySelector(".closeButton"));

      expect(container.querySelector(".modal")).not.toBeInTheDocument();
    });
  });
});
