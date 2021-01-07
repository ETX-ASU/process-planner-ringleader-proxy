import React from "react";
import { render } from "@testing-library/react";
import { Section } from "./Section";

const textSection = {
  id: "text",
  title: "Text",
  type: "text",
  text: "Lorem ipsum",
};

const checklistSection = {
  id: "checklist",
  title: "Checklist",
  type: "checklist",
  items: [
    {
      id: "item-1",
      label: "item 1",
      done: false,
    },
  ],
};

const props = {
  canEditStructure: true,
  canEditContent: true,
  section: textSection,
  onChange: jest.fn(),
  onDelete: jest.fn(),
};

describe("<Section />", () => {
  test("renders text section", () => {
    const { container } = render(<Section {...props} />);

    expect(container.querySelector(".section")).toBeInTheDocument();
    expect(container.querySelector(".sectionTitle")).toBeInTheDocument();
    expect(container.querySelector(".sectionType")).toBeInTheDocument();
    expect(container.querySelector("textarea")).toBeInTheDocument();
    expect(container.querySelector("ul.checklist")).not.toBeInTheDocument();
  });

  test("renders checklist section", () => {
    const { container } = render(
      <Section {...props} section={checklistSection} />
    );

    expect(container.querySelector(".section")).toBeInTheDocument();
    expect(container.querySelector(".sectionTitle")).toBeInTheDocument();
    expect(container.querySelector(".sectionType")).toBeInTheDocument();
    expect(container.querySelector("ul.checklist")).toBeInTheDocument();
    expect(container.querySelector("textarea")).not.toBeInTheDocument();
  });
});
