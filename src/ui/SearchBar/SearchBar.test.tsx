import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "./SearchBar";
import { useAppContext } from "../../context/AppContext";

jest.mock("@chakra-ui/react", () => {
  const originalModule = jest.requireActual("@chakra-ui/react");
  return {
    __esModule: true,
    ...originalModule,
    ChakraProvider: ({ children }: { children?: React.ReactNode }) => (
      <>{children}</>
    ),
    Box: ({
      children,
      ...props
    }: {
      children?: React.ReactNode;
      [key: string]: any;
    }) => <div {...props}>{children}</div>,
    Input: ({
      onChange,
      value,
      ...props
    }: {
      onChange?: React.ChangeEventHandler<HTMLInputElement>;
      value?: string;
      [key: string]: any;
    }) => <input onChange={onChange} value={value || ""} {...props} />,
  };
});

jest.mock("../../context/AppContext", () => ({
  useAppContext: jest.fn(),
}));

describe("SearchBar", () => {
  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      searchState: { query: "" },
      handleSearchChange: jest.fn(),
    });
  });

  it("should render search input with correct placeholder", () => {
    render(<SearchBar />);

    const searchInput = screen.getByTestId("input-search");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute(
      "placeholder",
      "Search by title or keyword"
    );
  });

  it("should display current search query from context", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      searchState: { query: "test search" },
      handleSearchChange: jest.fn(),
    });

    render(<SearchBar />);

    const searchInput = screen.getByTestId("input-search");
    expect(searchInput).toHaveValue("test search");
  });

  it("should call handleSearchChange when input changes", () => {
    const mockHandleSearchChange = jest.fn();

    (useAppContext as jest.Mock).mockReturnValue({
      searchState: { query: "" },
      handleSearchChange: mockHandleSearchChange,
    });

    render(<SearchBar />);

    const searchInput = screen.getByTestId("input-search");
    fireEvent.change(searchInput, { target: { value: "new search term" } });

    expect(mockHandleSearchChange).toHaveBeenCalledWith("new search term");
  });

  it("should have correct input attributes", () => {
    render(<SearchBar />);

    const searchInput = screen.getByTestId("input-search");
    expect(searchInput).toHaveAttribute(
      "placeholder",
      "Search by title or keyword"
    );
    expect(searchInput).toHaveAttribute("data-testid", "input-search");
  });
});
