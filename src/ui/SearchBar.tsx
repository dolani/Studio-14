import React from "react";
import { Box, Input } from "@chakra-ui/react";
import { Search } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const SearchBar = () => {
  const { searchState, handleSearchChange } = useAppContext();

  return (
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
  );
};

export default SearchBar;
