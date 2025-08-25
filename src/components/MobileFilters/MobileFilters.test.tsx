import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MobileFilters from "./MobileFilters";
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

jest.mock("lucide-react", () => ({
  X: () => <div data-testid="x-icon" />,
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
  Flex: ({
    children,
    ...props
  }: {
    children?: React.ReactNode;
    [key: string]: any;
  }) => <div {...props}>{children}</div>,
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
  IconButton: ({
    onClick,
    "data-testid": testId,
    ...props
  }: {
    onClick?: () => void;
    "data-testid"?: string;
    [key: string]: any;
  }) => <button onClick={onClick} data-testid={testId} {...props} />,
}));

describe("MobileFilters", () => {
  const mockFilters = {
    keyFoundationalPrinciples: {
      secureBase: true,
      senseOfAppreciation: false,
      learningOrganisation: false,
      missionAndVision: true,
      wellbeing: false,
    },
    documentType: {
      doc: false,
      link: true,
      pdf: false,
      video: false,
    },
    categories: {
      sample1: true,
      sample2: false,
      sample3: false,
      sample4: false,
      sample5: false,
    },
  };

  const mockCloseMobileFilters = jest.fn();
  const mockHandleFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does not render when isMobileFiltersOpen is false", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      filters: mockFilters,
      isMobileFiltersOpen: false,
      closeMobileFilters: mockCloseMobileFilters,
      handleFilterChange: mockHandleFilterChange,
    });

    render(<MobileFilters />);

    expect(
      screen.queryByTestId("mobile-filters-overlay")
    ).not.toBeInTheDocument();
  });

  it("renders when isMobileFiltersOpen is true", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      filters: mockFilters,
      isMobileFiltersOpen: true,
      closeMobileFilters: mockCloseMobileFilters,
      handleFilterChange: mockHandleFilterChange,
    });

    render(<MobileFilters />);

    expect(screen.getByTestId("mobile-filters-overlay")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-filters-title")).toHaveTextContent(
      "Filters"
    );
  });

  it("closes filters when close button is clicked", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      filters: mockFilters,
      isMobileFiltersOpen: true,
      closeMobileFilters: mockCloseMobileFilters,
      handleFilterChange: mockHandleFilterChange,
    });

    render(<MobileFilters />);

    const closeButton = screen.getByTestId("button-close-mobile-filters");
    fireEvent.click(closeButton);

    expect(mockCloseMobileFilters).toHaveBeenCalledTimes(1);
  });

  it("renders checkboxes with correct checked state", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      filters: mockFilters,
      isMobileFiltersOpen: true,
      closeMobileFilters: mockCloseMobileFilters,
      handleFilterChange: mockHandleFilterChange,
    });

    render(<MobileFilters />);

    // Check a few checkboxes that should be checked based on our mock data
    expect(screen.getByTestId("mobile-checkbox-secure-base")).toHaveTextContent(
      "checked"
    );
    expect(screen.getByTestId("mobile-checkbox-link")).toHaveTextContent(
      "checked"
    );
    expect(screen.getByTestId("mobile-checkbox-category-1")).toHaveTextContent(
      "checked"
    );

    // Check a few checkboxes that should be unchecked
    expect(screen.getByTestId("mobile-checkbox-pdf")).toHaveTextContent(
      "unchecked"
    );
    expect(screen.getByTestId("mobile-checkbox-wellbeing")).toHaveTextContent(
      "unchecked"
    );
  });

  it("calls handleFilterChange when a checkbox is clicked", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      filters: mockFilters,
      isMobileFiltersOpen: true,
      closeMobileFilters: mockCloseMobileFilters,
      handleFilterChange: mockHandleFilterChange,
    });

    render(<MobileFilters />);

    // Click a checkbox that's currently unchecked
    fireEvent.click(screen.getByTestId("mobile-checkbox-pdf"));

    // Verify the handleFilterChange was called with the correct parameters
    expect(mockHandleFilterChange).toHaveBeenCalledWith({
      ...mockFilters,
      documentType: {
        ...mockFilters.documentType,
        pdf: true,
      },
    });

    // Click a checkbox that's currently checked
    fireEvent.click(screen.getByTestId("mobile-checkbox-secure-base"));

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
