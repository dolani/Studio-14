import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./components/Header/Header", () => () => (
  <div data-testid="header-mock" />
));
jest.mock("./components/Banner/Banner", () => () => (
  <div data-testid="banner-mock" />
));
jest.mock("./components/FilterSidebar/FilterSidebar", () => () => (
  <div data-testid="filter-sidebar-mock" />
));
jest.mock(
  "./components/ResourceCards/ResourceCards",
  () =>
    ({ resources }: { resources: any[] }) =>
      (
        <div data-testid="resource-cards-mock">
          Resources count: {resources.length}
        </div>
      )
);
jest.mock(
  "./components/MobileFilters/MobileFilters",
  () =>
    ({ resources }: { resources: any[] }) =>
      (
        <div data-testid="mobile-filters-mock">
          Mobile filters for {resources.length} resources
        </div>
      )
);

jest.mock("./data/resources", () => ({
  mockResources: [{ id: 1 }, { id: 2 }, { id: 3 }],
}));

jest.mock("@chakra-ui/react", () => {
  const original = jest.requireActual("@chakra-ui/react");
  return {
    ...original,
    ChakraProvider: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    useBreakpointValue: jest.fn(),
    Box: ({
      children,
      bg,
      ...props
    }: {
      children: React.ReactNode;
      bg?: string;
    }) => (
      <div style={{ backgroundColor: bg }} {...props}>
        {children}
      </div>
    ),
    Container: ({ children, ...props }: { children: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
  };
});

jest.mock("./context/AppContext", () => ({
  AppProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="app-context">{children}</div>
  ),
}));

describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render desktop view when useBreakpointValue returns false", () => {
    require("@chakra-ui/react").useBreakpointValue.mockReturnValue(false);

    render(<App />);

    expect(screen.getByTestId("app-context")).toBeInTheDocument();
    expect(screen.getByTestId("resources-page")).toBeInTheDocument();
    expect(screen.getByTestId("header-mock")).toBeInTheDocument();
    expect(screen.getByTestId("banner-mock")).toBeInTheDocument();

    expect(screen.getByTestId("filter-sidebar-mock")).toBeInTheDocument();
    expect(screen.getByTestId("resource-cards-mock")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-filters-mock")).toBeInTheDocument();
  });

  it("should render mobile view when useBreakpointValue returns true", () => {
    require("@chakra-ui/react").useBreakpointValue.mockReturnValue(true);

    render(<App />);

    expect(screen.getByTestId("resources-page")).toBeInTheDocument();
    expect(screen.getByTestId("header-mock")).toBeInTheDocument();
    expect(screen.getByTestId("banner-mock")).toBeInTheDocument();
    expect(screen.getByTestId("resource-cards-mock")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-filters-mock")).toBeInTheDocument();

    expect(screen.queryByTestId("filter-sidebar-mock")).not.toBeInTheDocument();
  });

  it("should pass correct resource data to components", () => {
    require("@chakra-ui/react").useBreakpointValue.mockReturnValue(false);

    render(<App />);

    expect(screen.getByTestId("resource-cards-mock").textContent).toContain(
      "Resources count: 3"
    );

    expect(screen.getByTestId("mobile-filters-mock").textContent).toContain(
      "Mobile filters for 3"
    );
  });
});
