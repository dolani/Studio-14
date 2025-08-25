import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResourceCards from "./ResourceCards";
import { useAppContext } from "../../context/AppContext";

jest.mock("../../context/AppContext", () => ({
  useAppContext: jest.fn(),
}));

jest.mock("../ResourceCard/ResourceCard", () => ({
  ResourceCard: ({ resource }: { resource: { id: string; title: string } }) => (
    <div data-testid={`card-${resource.id}`}>{resource.title}</div>
  ),
}));

jest.mock("../../assets/filterIcon.png", () => "filter-icon.png");

jest.mock("@chakra-ui/react", () => {
  const original = jest.requireActual("@chakra-ui/react");
  return {
    ...original,
    Box: ({ children, ...props }: { children?: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
    Grid: ({ children, ...props }: { children?: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
    Button: ({
      children,
      onClick,
      ...props
    }: {
      children?: React.ReactNode;
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
    }) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ),
    Text: ({ children, ...props }: { children?: React.ReactNode }) => (
      <p {...props}>{children}</p>
    ),
    useBreakpointValue: jest.fn(),
  };
});

describe("ResourceCards", () => {
  const mockResources = [
    {
      id: "1",
      title: "Resource 1",
      topic: "Topic 1",
      category: "Secure Base",
      type: "link" as "link",
      color: "#E00027" as "#E00027",
    },
    {
      id: "2",
      title: "Resource 2",
      topic: "Topic 2",
      category: "Wellbeing",
      type: "pdf" as "pdf",
      color: "#17E4A1" as "#17E4A1",
    },
    {
      id: "3",
      title: "Resource 3",
      topic: "Topic 3",
      category: "Other",
      type: "video" as "video",
      color: "#FF603E" as "#FF603E",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    (useAppContext as jest.Mock).mockReturnValue({
      filters: {
        keyFoundationalPrinciples: { secureBase: true, wellbeing: true },
        documentType: { link: true, pdf: true, video: true, doc: true },
      },
      searchState: { query: "" },
      showMobileFilters: jest.fn(),
    });

    require("@chakra-ui/react").useBreakpointValue.mockReturnValue(false);
  });

  it("renders resource cards for all resources when no filters applied", () => {
    render(<ResourceCards resources={mockResources} />);

    expect(screen.getByTestId("card-1")).toBeInTheDocument();
    expect(screen.getByTestId("card-2")).toBeInTheDocument();
    expect(screen.getByTestId("card-3")).toBeInTheDocument();
  });

  it("calls showMobileFilters when filter button is clicked", () => {
    const mockShowMobileFilters = jest.fn();
    require("@chakra-ui/react").useBreakpointValue.mockReturnValue(true);

    (useAppContext as jest.Mock).mockReturnValue({
      filters: {
        keyFoundationalPrinciples: { secureBase: true, wellbeing: true },
        documentType: { link: true, pdf: true, video: true, doc: true },
      },
      searchState: { query: "" },
      showMobileFilters: mockShowMobileFilters,
    });

    render(<ResourceCards resources={mockResources} />);

    const filterButton = screen.getByTestId("button-show-filters");
    fireEvent.click(filterButton);

    expect(mockShowMobileFilters).toHaveBeenCalledTimes(1);
  });

  it("filters resources by search query", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      filters: {
        keyFoundationalPrinciples: { secureBase: true, wellbeing: true },
        documentType: { link: true, pdf: true, video: true, doc: true },
      },
      searchState: { query: "Resource 1" },
      showMobileFilters: jest.fn(),
    });

    render(<ResourceCards resources={mockResources} />);

    expect(screen.getByTestId("card-1")).toBeInTheDocument();
    expect(screen.queryByTestId("card-2")).not.toBeInTheDocument();
    expect(screen.queryByTestId("card-3")).not.toBeInTheDocument();
  });

  it("filters resources by document type", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      filters: {
        keyFoundationalPrinciples: { secureBase: true, wellbeing: true },
        documentType: { link: true, pdf: false, video: false, doc: false },
      },
      searchState: { query: "" },
      showMobileFilters: jest.fn(),
    });

    render(<ResourceCards resources={mockResources} />);

    expect(screen.getByTestId("card-1")).toBeInTheDocument();
    expect(screen.queryByTestId("card-2")).not.toBeInTheDocument();
    expect(screen.queryByTestId("card-3")).not.toBeInTheDocument();
  });

  it("filters resources by category", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      filters: {
        keyFoundationalPrinciples: { secureBase: true, wellbeing: false },
        documentType: { link: true, pdf: true, video: true, doc: true },
      },
      searchState: { query: "" },
      showMobileFilters: jest.fn(),
    });

    render(<ResourceCards resources={mockResources} />);

    expect(screen.getByTestId("card-1")).toBeInTheDocument();
    expect(screen.queryByTestId("card-2")).not.toBeInTheDocument();
    expect(screen.getByTestId("card-3")).toBeInTheDocument();
  });

  it("shows empty state when no resources match filters", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      filters: {
        keyFoundationalPrinciples: { secureBase: false, wellbeing: false },
        documentType: { link: false, pdf: false, video: false, doc: false },
      },
      searchState: { query: "nothing" },
      showMobileFilters: jest.fn(),
    });

    render(<ResourceCards resources={mockResources} />);

    expect(
      screen.getByText("No resources found matching your criteria.")
    ).toBeInTheDocument();
  });
});
