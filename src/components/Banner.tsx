import React from "react";
import { Box, Container, Heading, Text, Input } from "@chakra-ui/react";
import { Search } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const Banner = () => {
  const { searchState, handleSearchChange } = useAppContext();

  return (
    <Box bg="brand.100" py={12}>
      <Container maxW="7xl" textAlign="center">
        <Heading
          as="h1"
          fontSize="52px"
          fontWeight={700}
          color="#2C3237"
          mb={4}
          data-testid="page-title"
        >
          Resources
        </Heading>
        <Text
          color="#2C3237"
          fontWeight={400}
          maxW="2xl"
          fontSize="16px"
          mx="auto"
          mb={8}
          lineHeight="relaxed"
          data-testid="page-description"
        >
          Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet
          commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae
          congue
        </Text>

        <Box maxW="2xl" mx="auto" position="relative">
          <Box
            position="absolute"
            left={3}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            pointerEvents="none"
          >
            <Search size={20} color="#A1A1A1" />
          </Box>
          <Input
            placeholder="Search by title or keyword"
            value={searchState.query}
            onChange={(e) => handleSearchChange(e.target.value)}
            bg="white"
            borderColor="#A1A1A1"
            _focus={{
              borderColor: "brand.blue",
              boxShadow: "0 0 0 1px var(--chakra-colors-brand-blue)",
            }}
            size="lg"
            pl={10}
            data-testid="input-search"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;
