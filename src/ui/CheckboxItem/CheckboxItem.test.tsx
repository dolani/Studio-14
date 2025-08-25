import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CheckboxItem } from "./CheckboxItem";

jest.mock("@chakra-ui/react", () => ({
  Box: ({
    children,
    ...props
  }: { children?: React.ReactNode } & Record<string, any>) => (
    <div data-testid={props["data-testid"]} {...props}>
      {children}
    </div>
  ),
  Text: ({ children, ...props }: { children?: React.ReactNode }) => (
    <span {...props}>{children}</span>
  ),
}));

jest.mock("lucide-react", () => ({
  Check: () => <span data-testid="check-icon">✓</span>,
}));

describe("CheckboxItem", () => {
  it("renders unchecked state correctly", () => {
    const onChange = jest.fn();
    render(
      <CheckboxItem
        checked={false}
        onChange={onChange}
        label="Test Label"
        testId="test-checkbox"
      />
    );

    const checkbox = screen.getByTestId("test-checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.queryByTestId("check-icon")).not.toBeInTheDocument();
  });

  it("renders checked state correctly", () => {
    const onChange = jest.fn();
    render(
      <CheckboxItem
        checked={true}
        onChange={onChange}
        label="Test Label"
        testId="test-checkbox"
      />
    );

    const checkbox = screen.getByTestId("test-checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(screen.getByTestId("check-icon")).toBeInTheDocument();
  });

  it("applies correct styling based on checked state", () => {
    const { rerender } = render(
      <CheckboxItem
        checked={false}
        onChange={jest.fn()}
        label="Test Label"
        testId="test-checkbox"
      />
    );

    const uncheckedBox = screen.getByTestId("test-checkbox");

    rerender(
      <CheckboxItem
        checked={true}
        onChange={jest.fn()}
        label="Test Label"
        testId="test-checkbox"
      />
    );

    const checkedBox = screen.getByTestId("test-checkbox");
    expect(uncheckedBox).toBeInTheDocument();
    expect(checkedBox).toBeInTheDocument();
  });
});
