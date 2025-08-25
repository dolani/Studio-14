import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ResourceCard } from "./ResourceCard";

jest.mock("lucide-react", () => ({
  FileText: () => <div data-testid="file-text-icon">FileText</div>,
}));

jest.mock("../../assets/link.png", () => "link-icon.png");
jest.mock("../../assets/pdf.png", () => "pdf-icon.png");
jest.mock("../../assets/video.png", () => "video-icon.png");

jest.mock("@chakra-ui/react", () => ({
  Box: ({
    children,
    "data-testid": testId,
    onClick,
    ...props
  }: {
    children?: React.ReactNode;
    "data-testid"?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    [key: string]: any;
  }) => (
    <div data-testid={testId} onClick={onClick} {...props}>
      {children}
    </div>
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
    <span data-testid={testId} {...props}>
      {children}
    </span>
  ),
}));

describe("ResourceCard", () => {
  it("renders card with correct content", () => {
    const resource = {
      id: "123",
      title: "React Fundamentals",
      topic: "Frontend Development",
      category: "Secure Base",
      type: "pdf" as const,
      color: "#E00027" as "#E00027",
    };

    render(<ResourceCard resource={resource} />);

    expect(screen.getByTestId("card-resource-123")).toBeInTheDocument();
    expect(screen.getByTestId("text-title-123")).toHaveTextContent(
      "React Fundamentals"
    );
    expect(screen.getByTestId("text-topic-123")).toHaveTextContent(
      "Frontend Development"
    );
    expect(screen.getByTestId("text-category-123")).toHaveTextContent(
      "Secure Base"
    );
  });

  it("calls onClick handler when clicked", () => {
    const mockOnClick = jest.fn();
    const resource = {
      id: "123",
      title: "React Fundamentals",
      topic: "Frontend Development",
      category: "Secure Base",
      type: "pdf" as "pdf",
      color: "#E00027" as "#E00027",
    };

    render(<ResourceCard resource={resource} onClick={mockOnClick} />);

    const card = screen.getByTestId("card-resource-123");
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("renders correct icon for PDF resource type", () => {
    const resource = {
      id: "123",
      title: "PDF Resource",
      topic: "Topic",
      category: "Category",
      type: "pdf" as const,
      color: "#E00027" as "#E00027",
    };

    render(<ResourceCard resource={resource} />);

    const imgElements = document.querySelectorAll("img");
    const pdfIcon = Array.from(imgElements).find(
      (img) => img.getAttribute("alt") === "PDF"
    );

    expect(pdfIcon).toBeTruthy();
    if (pdfIcon) {
      expect(pdfIcon.getAttribute("src")).toBe("pdf-icon.png");
    }
  });

  it("renders correct icon for document resource type", () => {
    const resource = {
      id: "123",
      title: "Document Resource",
      topic: "Topic",
      category: "Category",
      type: "doc" as const,
      color: "#E00027" as "#E00027",
    };

    render(<ResourceCard resource={resource} />);

    expect(screen.getByTestId("file-text-icon")).toBeInTheDocument();
  });

  it("renders correct icon for link resource type", () => {
    const resource = {
      id: "123",
      title: "Link Resource",
      topic: "Topic",
      category: "Category",
      type: "link" as const,
      color: "#E00027" as "#E00027",
    };

    render(<ResourceCard resource={resource} />);

    const imgElements = document.querySelectorAll("img");
    const linkIcon = Array.from(imgElements).find(
      (img) => img.getAttribute("alt") === "Link"
    );

    expect(linkIcon).toBeTruthy();
    if (linkIcon) {
      expect(linkIcon.getAttribute("src")).toBe("link-icon.png");
    }
  });

  it("renders correct icon for video resource type", () => {
    const resource = {
      id: "123",
      title: "Video Resource",
      topic: "Topic",
      category: "Category",
      type: "video" as const,
      color: "#E00027" as "#E00027",
    };

    render(<ResourceCard resource={resource} />);

    const imgElements = document.querySelectorAll("img");
    const videoIcon = Array.from(imgElements).find(
      (img) => img.getAttribute("alt") === "PLay"
    );

    expect(videoIcon).toBeTruthy();
    if (videoIcon) {
      expect(videoIcon.getAttribute("src")).toBe("video-icon.png");
    }
  });

  it("renders with different color variants", () => {
    const greenResource = {
      id: "green",
      title: "Green Resource",
      topic: "Topic",
      category: "Category",
      type: "pdf" as const,
      color: "#17E4A1" as "#17E4A1",
    };

    const blueResource = {
      id: "blue",
      title: "Blue Resource",
      topic: "Topic",
      category: "Category",
      type: "pdf" as const,
      color: "#56CCF2" as "#56CCF2",
    };

    const { rerender } = render(<ResourceCard resource={greenResource} />);
    expect(screen.getByTestId("card-resource-green")).toBeInTheDocument();

    rerender(<ResourceCard resource={blueResource} />);
    expect(screen.getByTestId("card-resource-blue")).toBeInTheDocument();
  });
});
