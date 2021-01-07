import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { NewChecklistItem } from "./NewChecklistItem";

const props = {
  onCreate: jest.fn(),
};

describe("<NewChecklistItem />", () => {
  test("renders component", () => {
    const { container } = render(<NewChecklistItem {...props} />);

    expect(container.querySelector("li")).toBeInTheDocument();
    expect(container.querySelector(`input[type="text"]`)).toBeInTheDocument();
    expect(
      container.querySelector(`input[type="checkbox"]`)
    ).toBeInTheDocument();
  });

  test("calls onCreate when input is filled and Enter key is pressed", () => {
    const { container } = render(<NewChecklistItem {...props} />);
    const input = container.querySelector(`input[type="text"]`);

    expect(props.onCreate).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.keyPress(input, {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      charCode: 13,
    });

    expect(props.onCreate).toHaveBeenCalledTimes(1);
  });
});
