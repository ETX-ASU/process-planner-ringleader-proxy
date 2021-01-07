import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Tab } from "./Tab";

const readOnlyPermissions = {
  canEditTab: false,
  canDelete: false,
};

const fullPermissions = {
  canEditTab: true,
  canDelete: true,
};

const props = {
  id: "tab-1",
  permissions: fullPermissions,
  className: "custom",
  title: "My Tab",
  onClick: jest.fn(),
  onDeleteClick: jest.fn(),
  onEditTabName: jest.fn(),
  onReorder: jest.fn(),
};

describe("<Tab />", () => {
  test("renders component", () => {
    const { container } = render(<Tab {...props} />);
    const tab = container.querySelector(".tabItem");

    expect(tab).toBeInTheDocument();
    expect(tab).toHaveClass(props.className);
  });

  test("renders title", () => {
    const { container } = render(<Tab {...props} />);
    const title = container.querySelector(".tabItem > span");

    expect(title.textContent).toBe(props.title);
  });

  test("does not render input", () => {
    const { container } = render(<Tab {...props} />);
    const input = container.querySelector(".tabItem > input");

    expect(input).not.toBeInTheDocument();
  });

  test("renders edit and delete icons", () => {
    const { container } = render(<Tab {...props} />);
    const icons = container.querySelectorAll(".tabItem > svg");

    expect(icons.length).toBe(2);
  });

  test("does not render icons when the permissions are not set", () => {
    const { container } = render(
      <Tab {...props} permissions={readOnlyPermissions} />
    );
    const icons = container.querySelectorAll(".tabItem > svg");

    expect(icons.length).toBe(0);
  });

  test("renders confirmation modal when the delete icon is clicked", () => {
    const { baseElement, container } = render(<Tab {...props} />);
    const icon = container.querySelector(".deleteIcon");

    expect(baseElement.querySelector(".modal")).not.toBeInTheDocument();

    fireEvent.click(icon);

    expect(baseElement.querySelector(".modal")).toBeInTheDocument();
  });

  test("renders input and hide icons when the edit icon is clicked", () => {
    const { container } = render(<Tab {...props} />);
    const icon = container.querySelector(".editIcon");

    fireEvent.click(icon);

    const input = container.querySelector(".tabItem > input");
    const icons = container.querySelectorAll(".tabItem > svg");

    expect(input).toBeInTheDocument();
    expect(icons.length).toBe(0);
  });
});
