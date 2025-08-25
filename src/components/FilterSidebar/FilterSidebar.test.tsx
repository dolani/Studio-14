import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilterSidebar from "./FilterSidebar";
import { useAppContext } from "../../context/AppContext";

jest.mock("../../context/AppContext", () => ({
  useAppContext: jest.fn(),
}));

jest.mock("../../ui/CheckboxItem/CheckboxItem", () => ({
  CheckboxItem: ({
    checked,
    onChange,
    label,
    testId,
  }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    testId: string;
  }) => (
    <div data-testid={testId} onClick={() => onChange(!checked)}>
      {label} - {checked ? "checked" : "unchecked"}
    </div>
  ),
}));

jest.mock("@chakra-ui/react", () => ({
  Box: ({
    children,
    "data-testid": testId,
    ...props
  }: {
    children?: React.ReactNode;
    "data-testid"?: string;
    [key: string]: any;
  }) => (
    <div data-testid={testId} {...props}>
      {children}
    </div>
  ),
  VStack: ({
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
    <h3 data-testid={testId} {...props}>
      {children}
    </h3>
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

describe("FilterSidebar", () => {
  const mockFilters = {
    keyFoundationalPrinciples: {
      secureBase: true,
      senseOfAppreciation: false,
      learningOrganisation: false,
      missionAndVision: false,
      wellbeing: true,
    },
    documentType: {
      doc: false,
      link: true,
      pdf: false,
      video: false,
    },
    categories: {
      sample1: false,
      sample2: false,
      sample3: false,
      sample4: false,
      sample5: false,
    },
  };

  const mockHandleFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppContext as jest.Mock).mockReturnValue({
      filters: mockFilters,
      handleFilterChange: mockHandleFilterChange,
    });
  });

  it("renders the sidebar with title", () => {
    render(<FilterSidebar />);

    expect(screen.getByTestId("filter-sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("filters-title")).toHaveTextContent("Filters");
  });

  it("renders all filter sections", () => {
    render(<FilterSidebar />);

    expect(
      screen.getByTestId("section-keyFoundationalPrinciples")
    ).toHaveTextContent("Key Foundational Principles");
    expect(screen.getByTestId("section-documentType")).toHaveTextContent(
      "Document type"
    );
    expect(screen.getByTestId("section-categories")).toHaveTextContent(
      "Categories"
    );
  });

  it("renders checkboxes with correct checked state", () => {
    render(<FilterSidebar />);

    // Check a few checkboxes that should be checked based on our mock data
    expect(screen.getByTestId("checkbox-secure-base")).toHaveTextContent(
      "checked"
    );
    expect(screen.getByTestId("checkbox-wellbeing")).toHaveTextContent(
      "checked"
    );
    expect(screen.getByTestId("checkbox-link")).toHaveTextContent("checked");

    // Check a few checkboxes that should be unchecked
    expect(screen.getByTestId("checkbox-pdf")).toHaveTextContent("unchecked");
    expect(screen.getByTestId("checkbox-sense-appreciation")).toHaveTextContent(
      "unchecked"
    );
  });

  it("calls handleFilterChange when a checkbox is clicked", () => {
    render(<FilterSidebar />);

    // Click a checkbox that's currently unchecked
    fireEvent.click(screen.getByTestId("checkbox-pdf"));

    // Verify the handleFilterChange was called with the correct parameters
    expect(mockHandleFilterChange).toHaveBeenCalledWith({
      ...mockFilters,
      documentType: {
        ...mockFilters.documentType,
        pdf: true,
      },
    });

    // Click a checkbox that's currently checked
    fireEvent.click(screen.getByTestId("checkbox-secure-base"));

    // Verify the handleFilterChange was called with the correct parameters
    expect(mockHandleFilterChange).toHaveBeenCalledWith({
      ...mockFilters,
      keyFoundationalPrinciples: {
        ...mockFilters.keyFoundationalPrinciples,
        secureBase: false,
      },
    });
  });
});
