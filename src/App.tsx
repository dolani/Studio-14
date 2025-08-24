import React from "react";
import { Box, Container, useBreakpointValue } from "@chakra-ui/react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import FilterSidebar from "./components/FilterSidebar";
import ResourceCards from "./components/ResourceCards";
import MobileFilters from "./components/MobileFilters";
import { AppProvider } from "./context/AppContext";
import { mockResources } from "./data/resources";

function App() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <AppProvider>
      <Box
        bg={isMobile ? "black" : "brand.200"}
        minH="100vh"
        data-testid="resources-page"
      >
        <Box bg={isMobile ? "white" : "brand.200"}>
          <Header />

          {<Banner />}

          <Container maxW="7xl" py={6}>
            {!isMobile && (
              <Box display={{ base: "none", lg: "flex" }} gap={8}>
                <FilterSidebar />
                <ResourceCards resources={mockResources} />
              </Box>
            )}

            {isMobile && (
              <Box>
                <ResourceCards resources={mockResources} />
              </Box>
            )}
          </Container>
        </Box>

        <MobileFilters resources={mockResources} />
      </Box>
    </AppProvider>
  );
}

export default App;
