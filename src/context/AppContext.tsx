import React, { createContext, useContext, useState, ReactNode } from "react";
import { FilterState, SearchState } from "../types/resources";

interface AppContextType {
  filters: FilterState;
  searchState: SearchState;
  isMobileFiltersOpen: boolean;
  setFilters: (filters: FilterState) => void;
  setSearchState: (searchState: SearchState) => void;
  setIsMobileFiltersOpen: (isOpen: boolean) => void;
  handleSearchChange: (query: string) => void;
  handleFilterChange: (filters: FilterState) => void;
  showMobileFilters: () => void;
  closeMobileFilters: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

const initialFilters: FilterState = {
  keyFoundationalPrinciples: {
    secureBase: true,
    senseOfAppreciation: false,
    learningOrganisation: false,
    missionAndVision: false,
    wellbeing: true,
  },
  documentType: {
    doc: false,
    link: false,
    pdf: false,
    video: false,
  },
  categories: {
    sample1: true,
    sample2: false,
    sample3: false,
    sample4: false,
    sample5: false,
  },
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [searchState, setSearchState] = useState<SearchState>({ query: "" });
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleSearchChange = (query: string) => {
    setSearchState({ query });
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const showMobileFilters = () => {
    setIsMobileFiltersOpen(true);
  };

  const closeMobileFilters = () => {
    setIsMobileFiltersOpen(false);
  };

  const value: AppContextType = {
    filters,
    searchState,
    isMobileFiltersOpen,
    setFilters,
    setSearchState,
    setIsMobileFiltersOpen,
    handleSearchChange,
    handleFilterChange,
    showMobileFilters,
    closeMobileFilters,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
