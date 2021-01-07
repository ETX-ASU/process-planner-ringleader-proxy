import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Tab } from "./Tab";
import { Tabs } from "./Tabs";

const mockCreateTab = jest.fn();

jest.mock("../../hooks/useProcessPlanner", () => ({
  useProcessPlanner: () => {
    return {
      activeTab: 0,
      setActiveTab: jest.fn(),
      createTab: mockCreateTab,
      changeTabTitle: jest.fn(),
      deleteTab: jest.fn(),
      reorderTabs: jest.fn(),
    };
  },
}));

const Wrapper = ({ canAddNewTab }) => (
  <Tabs canAddNewTab={canAddNewTab}>
    <Tab id="tab-1">
      <span>Tab 1</span>
    </Tab>
    <Tab id="tab-2">
      <span>Tab 2</span>
    </Tab>
  </Tabs>
);

describe("<Tabs />", () => {
  test("renders component", () => {
    const { container } = render(<Wrapper canAddNewTab={false} />);

    const wrapper = container.querySelector(".wrapper");

    expect(wrapper).toBeInTheDocument();
  });

  test("renders all tabs", () => {
    const { container } = render(<Wrapper canAddNewTab={false} />);

    const tabs = container.querySelectorAll(".tabItem");

    expect(tabs.length).toBe(2);
  });

  test("renders content for active tab only", () => {
    const { container } = render(<Wrapper canAddNewTab={false} />);
    const content = container.querySelector(".content");

    expect(content.textContent).toBe("Tab 1");
  });

  test("renders button for adding new tab if canAddNewTab flag is set", () => {
    const { container } = render(<Wrapper canAddNewTab />);

    const button = container.querySelector(".addTabButton");

    expect(button).toBeInTheDocument();
  });

  test("does not render button for adding new tab if canAddNewTab flag is not set", () => {
    const { container } = render(<Wrapper canAddNewTab={false} />);

    const button = container.querySelector(".addTabButton");

    expect(button).not.toBeInTheDocument();
  });

  test("calls createTab method from the context when the button is pressed", () => {
    const { container } = render(<Wrapper canAddNewTab />);

    const button = container.querySelector(".addTabButton");

    expect(mockCreateTab).not.toHaveBeenCalled();

    fireEvent.click(button);

    expect(mockCreateTab).toHaveBeenCalledTimes(1);
  });
});
