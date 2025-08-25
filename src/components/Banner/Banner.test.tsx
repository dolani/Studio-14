import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Banner from "./Banner";

jest.mock("../../ui/SearchBar/SearchBar", () => () => (
  <div data-testid="search-bar-mock" />
));

jest.mock("@chakra-ui/react", () => ({
  Box: ({
    children,
    ...props
  }: {
    children?: React.ReactNode;
    [key: string]: any;
  }) => <div {...props}>{children}</div>,
  Container: ({
    children,
    ...props
  }: {
    children?: React.ReactNode;
    [key: string]: any;
  }) => <div {...props}>{children}</div>,
  Heading: ({
    children,
    "data-testid": testId,
    ...props
  }: {
    children?: React.ReactNode;
    "data-testid"?: string;
    [key: string]: any;
  }) => (
    <h1 data-testid={testId} {...props}>
      {children}
    </h1>
  ),
  Text: ({
    children,
    "data-testid": testId,
    ...props
  }: {
    children?: React.ReactNode;
    "data-testid"?: string;
    [key: string]: any;
  }) => (
    <p data-testid={testId} {...props}>
      {children}
    </p>
  ),
}));

describe("Banner", () => {
  it("renders the page title with correct text", () => {
    render(<Banner />);

    const pageTitle = screen.getByTestId("page-title");
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent("Resources");
  });

  it("renders the page description", () => {
    render(<Banner />);

    const pageDescription = screen.getByTestId("page-description");
    expect(pageDescription).toBeInTheDocument();
    expect(pageDescription).toHaveTextContent("Consectetur adipiscing elit");
  });

  it("renders the SearchBar component", () => {
    render(<Banner />);

    expect(screen.getByTestId("search-bar-mock")).toBeInTheDocument();
  });

  it("applies correct styling to the banner", () => {
    render(<Banner />);

    const bannerElement =
      screen.getByTestId("page-title").parentElement?.parentElement;
    expect(bannerElement).toBeTruthy();
    expect(bannerElement).toHaveAttribute("bg", "brand.100");
  });
});
