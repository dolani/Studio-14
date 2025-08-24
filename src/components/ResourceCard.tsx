import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { FileText } from "lucide-react";
import linkIcon from "../assets/link.png";
import pdfIcon from "../assets/pdf.png";
import playIcon from "../assets/video.png";
import { Resource } from "../types/resources";

type ResourceCardProps = {
  resource: Resource;
  onClick?: () => void;
};

const iconMap: Record<Resource["type"], React.ReactNode> = {
  link: <img src={linkIcon} alt="Link" width="20" height="20" />,
  video: <img src={playIcon} alt="PLay" width="20" height="20" />,
  doc: <FileText size={20} />,
  pdf: <img src={pdfIcon} alt="PDF" width="20" height="20" />,
};

const shapeMap: Record<Resource["color"], React.ReactNode> = {
  "#17E4A1": (
    <Box
      position="absolute"
      top="-20px"
      left="0"
      right="-60px"
      height="160px"
      bg="card.green"
      borderBottomRightRadius="100%"
      zIndex={0}
    />
  ),
  "#E00027": (
    <Box
      position="absolute"
      top="-64px"
      right="-30px"
      width="160px"
      height="160px"
      bg="card.red"
      borderRadius="100%"
      zIndex={0}
    />
  ),
  "#FFE500": (
    <Box
      position="absolute"
      top="-60px"
      left="0"
      right="-30px"
      height="180px"
      bg="card.yellow"
      borderBottomRightRadius="100%"
      zIndex={0}
    />
  ),
  "#56CCF2": (
    <Box
      position="absolute"
      top="-30px"
      right="-20px"
      width="200px"
      height="180px"
      bg="card.blue"
      borderBottomLeftRadius="100%"
      zIndex={0}
    />
  ),
  "#FF603E": (
    <Box
      position="absolute"
      top="-60px"
      left="-20px"
      right="0"
      height="180px"
      bg="card.orange"
      borderBottomRightRadius="100%"
      zIndex={0}
    />
  ),
};

export const ResourceCard = ({ resource, onClick }: ResourceCardProps) => {
  const iconElement = iconMap[resource.type];
  const borderColor = "transparent";

  return (
    <Box
      bg="white"
      borderRadius="xl"
      border="1px solid"
      borderColor={borderColor}
      shadow="sm"
      _hover={{ shadow: "md" }}
      transition="all 0.2s"
      cursor="pointer"
      position="relative"
      h="270px"
      overflow="hidden"
      onClick={onClick}
      data-testid={`card-resource-${resource.id}`}
    >
      {shapeMap[resource.color]}

      <Box position="absolute" top="82px" left="16px" zIndex={1}>
        {iconElement}
      </Box>

      <Box position="relative" zIndex={1} pt="120px" px={5}>
        <Text
          fontSize="lg"
          fontWeight="semibold"
          color="text.dark"
          mb={2}
          data-testid={`text-title-${resource.id}`}
        >
          {resource.title}
        </Text>

        <Text
          color="text.light"
          fontSize="sm"
          mb={4}
          data-testid={`text-topic-${resource.id}`}
        >
          {resource.topic}
        </Text>

        <Box
          as="span"
          display="inline-block"
          px={3}
          py={1}
          bg="gray.100"
          color="text.medium"
          fontSize="xs"
          borderRadius="full"
          data-testid={`text-category-${resource.id}`}
        >
          {resource.category}
        </Box>
      </Box>
    </Box>
  );
};
