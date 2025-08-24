import React from "react";
import { Box, Container, Flex } from "@chakra-ui/react";
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header";
import Banner from "./components/Banner";
import FilterSidebar from "./components/FilterSidebar";
import ResourceCards from "./components/ResourceCards";
import MobileFilters from "./components/MobileFilters";
import { mockResources } from "./data/resources";

function App() {
  return (
    <AppProvider>
      <Box bg="brand.200" minH="100vh" data-testid="resources-page">
        <Header />
        <Banner />
        <Box bg="brand.200">
          <Container maxW="7xl" py={8}>
            <Flex gap={8}>
              <FilterSidebar />
              <ResourceCards resources={mockResources} />
            </Flex>
          </Container>
        </Box>

        <MobileFilters />
      </Box>
    </AppProvider>
  );
}

export default App;
