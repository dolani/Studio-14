import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";

jest.mock("../../assets/logo.png", () => "mocked-logo.png");

jest.mock("lucide-react", () => ({
  Menu: () => <div data-testid="menu-icon" />,
  ChevronDown: () => <div data-testid="chevron-down-icon" />,
}));

jest.mock("@chakra-ui/react", () => {
  const originalModule = jest.requireActual("@chakra-ui/react");
  return {
    ...originalModule,
    useBreakpointValue: jest.fn(),
    useDisclosure: jest.fn(),
    Box: ({
      children,
      onClick,
      "data-testid": testId,
      ...rest
    }: {
      children?: React.ReactNode;
      onClick?: React.MouseEventHandler<HTMLDivElement>;
      "data-testid"?: string;
      [key: string]: any;
    }) => (
      <div data-testid={testId} onClick={onClick} {...rest}>
        {children}
      </div>
    ),
    Flex: ({
      children,
      ...rest
    }: {
      children?: React.ReactNode;
      [key: string]: any;
    }) => <div {...rest}>{children}</div>,
    Text: ({
      children,
      "data-testid": testId,
      ...rest
    }: {
      children?: React.ReactNode;
      "data-testid"?: string;
      [key: string]: any;
    }) => (
      <span data-testid={testId} {...rest}>
        {children}
      </span>
    ),
    Image: ({
      src,
      alt,
      ...rest
    }: {
      src?: string;
      alt?: string;
      [key: string]: any;
    }) => <img src={src} alt={alt} {...rest} />,
    HStack: ({
      children,
      ...rest
    }: {
      children?: React.ReactNode;
      [key: string]: any;
    }) => <div {...rest}>{children}</div>,
    VStack: ({
      children,
      ...rest
    }: {
      children?: React.ReactNode;
      [key: string]: any;
    }) => <div {...rest}>{children}</div>,
    IconButton: ({
      onClick,
      children,
      "data-testid": testId,
      ...rest
    }: {
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
      children?: React.ReactNode;
      "data-testid"?: string;
      [key: string]: any;
    }) => (
      <button onClick={onClick} data-testid={testId} {...rest}>
        {children}
      </button>
    ),
  };
});

describe("Header", () => {
  // Setup for desktop view
  const setupDesktop = () => {
    require("@chakra-ui/react").useBreakpointValue.mockReturnValue(false);
    require("@chakra-ui/react").useDisclosure.mockReturnValue({
      open: false,
      onOpen: jest.fn(),
      onClose: jest.fn(),
    });
  };

  // Setup for mobile view
  const setupMobile = () => {
    require("@chakra-ui/react").useBreakpointValue.mockReturnValue(true);
    require("@chakra-ui/react").useDisclosure.mockReturnValue({
      open: false,
      onOpen: jest.fn(),
      onClose: jest.fn(),
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders logo and navigation items in desktop view", () => {
    setupDesktop();
    render(<Header />);

    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getByText("LOGO")).toBeInTheDocument();
    expect(screen.getByTestId("nav-dashboard")).toBeInTheDocument();
    expect(screen.getByTestId("nav-resources")).toBeInTheDocument();
    expect(screen.getByTestId("nav-toolkit")).toBeInTheDocument();
    expect(screen.getByText("Jonathan")).toBeInTheDocument();
  });

  it("renders logo and mobile menu button in mobile view", () => {
    setupMobile();
    render(<Header />);

    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getByText("LOGO")).toBeInTheDocument();
    expect(screen.queryByTestId("nav-dashboard")).not.toBeInTheDocument();
    expect(screen.getByTestId("button-mobile-menu")).toBeInTheDocument();
  });

  it("opens mobile menu when button is clicked", () => {
    setupMobile();
    const mockOnOpen = jest.fn();
    require("@chakra-ui/react").useDisclosure.mockReturnValue({
      open: false,
      onOpen: mockOnOpen,
      onClose: jest.fn(),
    });

    render(<Header />);

    const menuButton = screen.getByTestId("button-mobile-menu");
    fireEvent.click(menuButton);

    expect(mockOnOpen).toHaveBeenCalled();
  });

  it("displays mobile menu when open is true", () => {
    setupMobile();
    require("@chakra-ui/react").useDisclosure.mockReturnValue({
      open: true,
      onOpen: jest.fn(),
      onClose: jest.fn(),
    });

    render(<Header />);

    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-nav-dashboard")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-nav-resources")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-nav-toolkit")).toBeInTheDocument();
  });

  it("closes mobile menu when overlay is clicked", () => {
    setupMobile();
    const mockOnClose = jest.fn();
    require("@chakra-ui/react").useDisclosure.mockReturnValue({
      open: true,
      onOpen: jest.fn(),
      onClose: mockOnClose,
    });

    render(<Header />);

    const overlay = screen.getByTestId("mobile-menu");
    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("closes mobile menu when close button is clicked", () => {
    setupMobile();
    const mockOnClose = jest.fn();
    require("@chakra-ui/react").useDisclosure.mockReturnValue({
      open: true,
      onOpen: jest.fn(),
      onClose: mockOnClose,
    });

    render(<Header />);

    const closeButton = screen.getByLabelText("Close menu");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
