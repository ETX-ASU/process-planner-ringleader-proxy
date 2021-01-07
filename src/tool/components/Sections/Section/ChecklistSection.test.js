import React from "react";
import { render } from "@testing-library/react";
import { ChecklistSection } from "./ChecklistSection";

const props = {
  items: [
    {
      id: "item-1",
      label: "Item 1",
      done: true,
    },
    {
      id: "item-2",
      label: "Item 2",
      done: false,
    },
  ],
  canEdit: true,
  onChange: jest.fn(),
};

describe("<ChecklistSection />", () => {
  test("renders component", () => {
    const { container } = render(<ChecklistSection {...props} />);

    expect(container.querySelector(".checklist")).toBeInTheDocument();
  });

  test("renders all checklist items and new item placeholder when canEdit flag is set", () => {
    const { container } = render(<ChecklistSection {...props} />);
    const items = container.querySelectorAll("li");

    expect(items.length).toBe(3);
  });

  test("renders only checklist items when canEdit flag is not set", () => {
    const { container } = render(
      <ChecklistSection {...props} canEdit={false} />
    );
    const items = container.querySelectorAll("li");

    expect(items.length).toBe(2);
  });
});
