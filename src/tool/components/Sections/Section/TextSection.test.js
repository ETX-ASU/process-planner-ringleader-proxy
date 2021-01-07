import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { TextSection } from "./TextSection";

const props = {
  canEdit: true,
  value: "Lorem ipsum",
  onChange: jest.fn(),
};

describe("<TextSection />", () => {
  test("renders textarea when component is editable", () => {
    const { container } = render(<TextSection {...props} />);

    expect(container.querySelector("textarea")).toBeInTheDocument();
    expect(container.querySelector("div")).not.toBeInTheDocument();
  });

  test("does not render textarea when component is not editable", () => {
    const { container } = render(<TextSection {...props} canEdit={false} />);

    expect(container.querySelector("textarea")).not.toBeInTheDocument();
    expect(container.querySelector("div")).toBeInTheDocument();
  });

  test("calls onChange when the text in textarea changes", () => {
    const { container } = render(<TextSection {...props} />);
    const textarea = container.querySelector("textarea");

    expect(props.onChange).not.toHaveBeenCalled();

    fireEvent.change(textarea, { target: { value: "New value" } });

    expect(props.onChange).toHaveBeenCalledTimes(1);
  });
});
