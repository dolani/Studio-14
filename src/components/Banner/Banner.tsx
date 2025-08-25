import React from "react";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import SearchBar from "../../ui/SearchBar/SearchBar";

const Banner = () => {
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
        <SearchBar />
      </Container>
    </Box>
  );
};

export default Banner;
