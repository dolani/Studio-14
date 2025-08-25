import React from "react";
import { Box, VStack, Text, IconButton, Flex } from "@chakra-ui/react";
import { X } from "lucide-react";
import { FilterState, Resource } from "../../types/resources";
import { useAppContext } from "../../context/AppContext";
import { CheckboxItem } from "../../ui/CheckboxItem/CheckboxItem";

interface MobileFiltersProps {
  resources?: Resource[];
}
const MobileFilters: React.FC<MobileFiltersProps> = () => {
  const {
    filters,
    isMobileFiltersOpen,
    closeMobileFilters,
    handleFilterChange,
  } = useAppContext();

  const updateFilter = (
    category: keyof FilterState,
    key: string,
    value: boolean
  ) => {
    handleFilterChange({
      ...filters,
      [category]: {
        ...filters[category],
        [key]: value,
      },
    });
  };

  if (!isMobileFiltersOpen) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="blackAlpha.600"
      zIndex={50}
      display={{ base: "block", lg: "none" }}
      data-testid="mobile-filters-overlay"
    >
      <Box bg="white" h="full" w="80" maxW="full" overflowY="auto">
        <Box p={6}>
          <Flex align="center" justify="space-between" mb={6}>
            <Text
              fontSize="lg"
              fontWeight="semibold"
              color="text.dark"
              data-testid="mobile-filters-title"
            >
              Filters
            </Text>
            <IconButton
              backgroundColor="transparent"
              color="#3C3C3C"
              onClick={closeMobileFilters}
              aria-label="Close filters"
              data-testid="button-close-mobile-filters"
            >
              <X size={20} />
            </IconButton>
          </Flex>

          <VStack gap={8} align="stretch">
            <Box>
              <Text fontWeight="semibold" color="text.dark" mb={4}>
                Key Foundational Principles
              </Text>
              <VStack gap={3} align="stretch">
                <CheckboxItem
                  checked={filters.keyFoundationalPrinciples.secureBase}
                  onChange={(checked) =>
                    updateFilter(
                      "keyFoundationalPrinciples",
                      "secureBase",
                      checked
                    )
                  }
                  label="Secure Base"
                  testId="mobile-checkbox-secure-base"
                />
                <CheckboxItem
                  checked={
                    filters.keyFoundationalPrinciples.senseOfAppreciation
                  }
                  onChange={(checked) =>
                    updateFilter(
                      "keyFoundationalPrinciples",
                      "senseOfAppreciation",
                      checked
                    )
                  }
                  label="Sense of Appreciation"
                  testId="mobile-checkbox-sense-appreciation"
                />
                <CheckboxItem
                  checked={
                    filters.keyFoundationalPrinciples.learningOrganisation
                  }
                  onChange={(checked) =>
                    updateFilter(
                      "keyFoundationalPrinciples",
                      "learningOrganisation",
                      checked
                    )
                  }
                  label="Learning Organisation"
                  testId="mobile-checkbox-learning-organisation"
                />
                <CheckboxItem
                  checked={filters.keyFoundationalPrinciples.missionAndVision}
                  onChange={(checked) =>
                    updateFilter(
                      "keyFoundationalPrinciples",
                      "missionAndVision",
                      checked
                    )
                  }
                  label="Mission and Vision"
                  testId="mobile-checkbox-mission-vision"
                />
                <CheckboxItem
                  checked={filters.keyFoundationalPrinciples.wellbeing}
                  onChange={(checked) =>
                    updateFilter(
                      "keyFoundationalPrinciples",
                      "wellbeing",
                      checked
                    )
                  }
                  label="Wellbeing"
                  testId="mobile-checkbox-wellbeing"
                />
              </VStack>
            </Box>

            {/* Document type */}
            <Box>
              <Text fontWeight="semibold" color="text.dark" mb={4}>
                Document type
              </Text>
              <VStack gap={3} align="stretch">
                <CheckboxItem
                  checked={filters.documentType.doc}
                  onChange={(checked) =>
                    updateFilter("documentType", "doc", checked)
                  }
                  label="DOC"
                  testId="mobile-checkbox-doc"
                />
                <CheckboxItem
                  checked={filters.documentType.link}
                  onChange={(checked) =>
                    updateFilter("documentType", "link", checked)
                  }
                  label="Link"
                  testId="mobile-checkbox-link"
                />
                <CheckboxItem
                  checked={filters.documentType.pdf}
                  onChange={(checked) =>
                    updateFilter("documentType", "pdf", checked)
                  }
                  label="PDF"
                  testId="mobile-checkbox-pdf"
                />
                <CheckboxItem
                  checked={filters.documentType.video}
                  onChange={(checked) =>
                    updateFilter("documentType", "video", checked)
                  }
                  label="Video"
                  testId="mobile-checkbox-video"
                />
              </VStack>
            </Box>

            {/* Categories */}
            <Box>
              <Text fontWeight="semibold" color="text.dark" mb={4}>
                Categories
              </Text>
              <VStack gap={3} align="stretch">
                <CheckboxItem
                  checked={filters.categories.sample1}
                  onChange={(checked) =>
                    updateFilter("categories", "sample1", checked)
                  }
                  label="Sample"
                  testId="mobile-checkbox-category-1"
                />
                <CheckboxItem
                  checked={filters.categories.sample2}
                  onChange={(checked) =>
                    updateFilter("categories", "sample2", checked)
                  }
                  label="Sample"
                  testId="mobile-checkbox-category-2"
                />
                <CheckboxItem
                  checked={filters.categories.sample3}
                  onChange={(checked) =>
                    updateFilter("categories", "sample3", checked)
                  }
                  label="Sample"
                  testId="mobile-checkbox-category-3"
                />
                <CheckboxItem
                  checked={filters.categories.sample4}
                  onChange={(checked) =>
                    updateFilter("categories", "sample4", checked)
                  }
                  label="Sample"
                  testId="mobile-checkbox-category-4"
                />
                <CheckboxItem
                  checked={filters.categories.sample5}
                  onChange={(checked) =>
                    updateFilter("categories", "sample5", checked)
                  }
                  label="Sample"
                  testId="mobile-checkbox-category-5"
                />
              </VStack>
            </Box>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default MobileFilters;
