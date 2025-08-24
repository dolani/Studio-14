import React from "react";
import { Box, VStack, Heading, Text } from "@chakra-ui/react";
import { FilterState } from "../types/resources";
import { useAppContext } from "../context/AppContext";
import { CheckboxItem } from "../ui/CheckboxItem";

type FilterSectionProps = {
  title: string;
  sectionKey: keyof FilterState;
  options: {
    key: string;
    label: string;
    testId: string;
  }[];
  values: Record<string, boolean>;
  onChange: (category: keyof FilterState, key: string, value: boolean) => void;
};

const FilterSection = ({
  title,
  sectionKey,
  options,
  values,
  onChange,
}: FilterSectionProps) => (
  <Box>
    <Text
      fontWeight="semibold"
      color="text.dark"
      mb={4}
      data-testid={`section-${sectionKey}`}
    >
      {title}
    </Text>
    <VStack gap={3} align="stretch">
      {options.map(({ key, label, testId }) => (
        <CheckboxItem
          key={key}
          checked={values[key]}
          onChange={(checked) => onChange(sectionKey, key, checked)}
          label={label}
          testId={testId}
        />
      ))}
    </VStack>
  </Box>
);

const FilterSidebar = () => {
  const { filters, handleFilterChange } = useAppContext();

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

  const filterConfig = [
    {
      title: "Key Foundational Principles",
      sectionKey: "keyFoundationalPrinciples" as const,
      options: [
        {
          key: "secureBase",
          label: "Secure Base",
          testId: "checkbox-secure-base",
        },
        {
          key: "senseOfAppreciation",
          label: "Sense of Appreciation",
          testId: "checkbox-sense-appreciation",
        },
        {
          key: "learningOrganisation",
          label: "Learning Organisation",
          testId: "checkbox-learning-organisation",
        },
        {
          key: "missionAndVision",
          label: "Mission and Vision",
          testId: "checkbox-mission-vision",
        },
        { key: "wellbeing", label: "Wellbeing", testId: "checkbox-wellbeing" },
      ],
    },
    {
      title: "Document type",
      sectionKey: "documentType" as const,
      options: [
        { key: "doc", label: "DOC", testId: "checkbox-doc" },
        { key: "link", label: "Link", testId: "checkbox-link" },
        { key: "pdf", label: "PDF", testId: "checkbox-pdf" },
        { key: "video", label: "Video", testId: "checkbox-video" },
      ],
    },
    {
      title: "Categories",
      sectionKey: "categories" as const,
      options: [
        { key: "sample1", label: "Sample", testId: "checkbox-category-1" },
        { key: "sample2", label: "Sample", testId: "checkbox-category-2" },
        { key: "sample3", label: "Sample", testId: "checkbox-category-3" },
        { key: "sample4", label: "Sample", testId: "checkbox-category-4" },
        { key: "sample5", label: "Sample", testId: "checkbox-category-5" },
      ],
    },
  ];

  return (
    <Box
      w="64"
      flexShrink={0}
      display={{ base: "none", lg: "block" }}
      data-testid="filter-sidebar"
    >
      <VStack gap={4} align="stretch">
        <Heading
          as="h3"
          size="lg"
          color="text.dark"
          data-testid="filters-title"
        >
          Filters
        </Heading>

        <Box
          borderTopWidth="1px"
          borderTopStyle="solid"
          borderTopColor="#E0E0E0"
        />

        {filterConfig.map(({ title, sectionKey, options }) => (
          <FilterSection
            key={sectionKey}
            title={title}
            sectionKey={sectionKey}
            options={options}
            values={filters[sectionKey]}
            onChange={updateFilter}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default FilterSidebar;
