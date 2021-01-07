import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { SectionTitle } from "./SectionTitle";

const props = {
  id: "section-1",
  title: "Title",
  canEdit: true,
  onChange: jest.fn(),
  onDelete: jest.fn(),
};

describe("<SectionTitle />", () => {
  test("renders component", () => {
    const { container } = render(<SectionTitle {...props} />);

    expect(container.querySelector(".sectionTitle")).toBeInTheDocument();
  });

  test("renders edit and delete icons when canEdit flag is set", () => {
    const { container } = render(<SectionTitle {...props} />);
    const icons = container.querySelectorAll(".actions > svg");

    expect(icons.length).toBe(2);
  });

  test("renders confirmation modal when the delete icon is clicked", () => {
    const { baseElement, container } = render(<SectionTitle {...props} />);
    const icon = container.querySelector(".deleteIcon");

    expect(baseElement.querySelector(".modal")).not.toBeInTheDocument();

    fireEvent.click(icon);

    expect(baseElement.querySelector(".modal")).toBeInTheDocument();
  });

  test("renders input and hide icons when the edit icon is clicked", () => {
    const { container } = render(<SectionTitle {...props} />);
    const icon = container.querySelector(".editIcon");

    fireEvent.click(icon);

    const input = container.querySelector("input");
    const icons = container.querySelectorAll(".icons > svg");

    expect(input).toBeInTheDocument();
    expect(icons.length).toBe(0);
  });
});
