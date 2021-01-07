import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { SectionType } from "./SectionType";

const props = {
  type: "text",
  id: "section-1",
  onChange: jest.fn(),
  readOnly: false,
};

describe("<SectionType />", () => {
  test("renders component", () => {
    const { container } = render(<SectionType {...props} />);
    const node = container.querySelector(".sectionType");

    expect(node).toBeInTheDocument();
    expect(node).toHaveClass("text");
    expect(node).not.toHaveClass("readOnly");
  });

  test("adds readOnly class if readOnly flag is set", () => {
    const { container } = render(<SectionType {...props} readOnly />);
    const node = container.querySelector(".sectionType");

    expect(node).toHaveClass("readOnly");
  });

  test("renders switch for changing section type", () => {
    const { container } = render(<SectionType {...props} />);
    const switchNode = container.querySelector(".switch");

    expect(switchNode).toBeInTheDocument();
  });

  test("calls onChange when the switch is clicked", () => {
    const { container } = render(<SectionType {...props} />);
    const switchInput = container.querySelector(".switch > input");

    fireEvent.click(switchInput);

    expect(props.onChange).toHaveBeenCalledWith("checklist");
  });
});
