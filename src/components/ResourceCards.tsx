import React from "react";
import { Box, Grid, Text, Button, useBreakpointValue } from "@chakra-ui/react";
import { Resource } from "../types/resources";
import { useAppContext } from "../context/AppContext";
import { ResourceCard } from "./ResourceCard";
import filterIcon from "../assets/filterIcon.png";

interface ResourceCardsProps {
  resources: Resource[];
}

const ResourceCards = ({ resources }: ResourceCardsProps) => {
  const { filters, searchState, showMobileFilters } = useAppContext();
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Filter resources based on search and category filters
  const filteredResources = resources.filter((resource) => {
    // Search filter
    if (searchState.query) {
      const query = searchState.query.toLowerCase();
      const matchesSearch =
        resource.title.toLowerCase().includes(query) ||
        resource.topic.toLowerCase().includes(query) ||
        resource.category?.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Document Type filter
    const docTypeFilters = filters.documentType;
    const anyDocTypeSelected = Object.values(docTypeFilters).some(Boolean);
    if (anyDocTypeSelected && !docTypeFilters[resource.type]) {
      return false;
    }

    // Category filter
    const categoryMap: Record<
      string,
      keyof typeof filters.keyFoundationalPrinciples
    > = {
      "Secure Base": "secureBase",
      Wellbeing: "wellbeing",
    };

    const filterKey = categoryMap[resource?.category || ""];
    if (filterKey && !filters.keyFoundationalPrinciples[filterKey]) {
      return false;
    }

    return true;
  });

  return (
    <Box flex={1}>
      {/* Mobile Show Filters Button */}
      {isMobile && (
        <Box mb={6}>
          <Button
            w="full"
            py={3}
            px={4}
            variant="outline"
            colorScheme="gray"
            fontWeight="medium"
            bg="gray.50"
            onClick={showMobileFilters}
            data-testid="button-show-filters"
          >
            <img src={filterIcon} alt="Link" width="20" height="20" />
            Show Filters
          </Button>
        </Box>
      )}

      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          xl: "repeat(3, 1fr)",
        }}
        gap={6}
        data-testid="resources-grid"
      >
        {filteredResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onClick={() => {}}
          />
        ))}
      </Grid>

      {filteredResources.length === 0 && (
        <Box textAlign="center" py={12} data-testid="empty-state">
          <Text color="text.medium" fontSize="lg">
            No resources found matching your criteria.
          </Text>
          <Text color="text.light" fontSize="sm" mt={2}>
            Try adjusting your filters or search terms.
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ResourceCards;
