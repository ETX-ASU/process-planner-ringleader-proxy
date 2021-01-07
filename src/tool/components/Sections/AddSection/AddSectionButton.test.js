import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { AddSectionButton } from "./AddSectionButton";

const props = {
  onClick: jest.fn(),
};

describe("<AddSectionButton />", () => {
  test("renders component", () => {
    const { container } = render(<AddSectionButton {...props} />);
    const button = container.querySelector(".button");

    expect(button).toBeInTheDocument();
  });

  test("calls onClick when the button is clicked", () => {
    const { container } = render(<AddSectionButton {...props} />);
    const button = container.querySelector(".button");

    expect(props.onClick).not.toHaveBeenCalled();

    fireEvent.click(button);

    expect(props.onClick).toHaveBeenCalledTimes(1);
  });
});
