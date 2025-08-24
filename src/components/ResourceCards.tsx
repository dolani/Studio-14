import React from "react";
import { Box, Grid, Text, Button, HStack } from "@chakra-ui/react";
import { Filter } from "lucide-react";
import { Resource } from "../types/resources";
import { useAppContext } from "../context/AppContext";
import { ResourceCard } from "./ResourceCard";

interface ResourceCardsProps {
  resources: Resource[];
}

const ResourceCards = ({ resources }: ResourceCardsProps) => {
  const { filters, searchState, showMobileFilters } = useAppContext();

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

    const docTypeFilters = filters.documentType;
    const anyDocTypeSelected = Object.values(docTypeFilters).some(Boolean);
    if (anyDocTypeSelected && !docTypeFilters[resource.type]) {
      return false;
    }

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
      <Box display={{ base: "block", lg: "none" }} mb={6}>
        <Button
          w="full"
          py={3}
          px={4}
          border="2px"
          borderColor="yellow.400"
          color="text.dark"
          fontWeight="medium"
          bg="transparent"
          _hover={{ bg: "yellow.50" }}
          onClick={showMobileFilters}
          data-testid="button-show-filters"
        >
          <HStack gap={2}>
            <Filter size={16} />
            <Text>Show Filters</Text>
          </HStack>
        </Button>
      </Box>

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
