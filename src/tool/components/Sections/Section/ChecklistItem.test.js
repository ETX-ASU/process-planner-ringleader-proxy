import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { ChecklistItem } from "./ChecklistItem";

const props = {
  id: "section-1",
  label: "Label",
  done: true,
  canEdit: true,
  onChange: jest.fn(),
  onDelete: jest.fn(),
};

describe("<ChecklistItem />", () => {
  test("renders component", () => {
    const { container } = render(<ChecklistItem {...props} />);

    expect(container.querySelector("li")).toBeInTheDocument();
  });

  test("renders edit and delete icons when canEdit flag is set", () => {
    const { container } = render(<ChecklistItem {...props} />);
    const icons = container.querySelectorAll(".actions > svg");

    expect(icons.length).toBe(2);
  });

  test("calls onDelete when the delete icon is clicked", () => {
    const { container } = render(<ChecklistItem {...props} />);
    const icon = container.querySelector(".deleteIcon");

    fireEvent.click(icon);

    expect(props.onDelete).toHaveBeenCalledWith(props.id);
  });

  test("renders input and hide icons when the edit icon is clicked", () => {
    const { container } = render(<ChecklistItem {...props} />);
    const icon = container.querySelector(".editIcon");

    fireEvent.click(icon);

    const input = container.querySelector("input");
    const icons = container.querySelectorAll(".icons > svg");

    expect(input).toBeInTheDocument();
    expect(icons.length).toBe(0);
  });
});
