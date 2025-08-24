import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  HStack,
  VStack,
  IconButton,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Menu, ChevronDown } from "lucide-react";
import logoImage from "../assets/logo.png";

const Header = () => {
  const [isEmployeeMode, setIsEmployeeMode] = useState(true);
  const { open, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box>
      <Flex
        px={{ base: 4, sm: 6, lg: 8 }}
        h="16"
        align="center"
        justify="space-between"
      >
        <HStack gap={8}>
          <HStack gap={2}>
            <Image src={logoImage} alt="logo" height="24px" width="auto" />
            <Text fontSize="23px" fontWeight="extrabold" color="#404040">
              LOGO
            </Text>
          </HStack>

          {/* Navigation - Desktop */}
          {!isMobile && (
            <HStack gap={8}>
              <Text
                color="#2C3237"
                fontSize="14px"
                fontWeight="600"
                _hover={{ color: "text.dark" }}
                cursor="pointer"
                transition="color 0.2s"
                data-testid="nav-dashboard"
              >
                Dashboard
              </Text>
              <Box position="relative">
                <Text
                  color="#314EF9"
                  fontSize="14px"
                  fontWeight="600"
                  data-testid="nav-resources"
                >
                  Resources
                </Text>
                <Box
                  position="absolute"
                  bottom="-19px"
                  left={0}
                  right={0}
                  h="2px"
                  bg="#314EF9"
                />
              </Box>
              <Text
                color="#2C3237"
                _hover={{ color: "text.dark" }}
                cursor="pointer"
                fontSize="14px"
                fontWeight="600"
                transition="color 0.2s"
                data-testid="nav-toolkit"
              >
                Toolkit
              </Text>
            </HStack>
          )}
        </HStack>

        <HStack gap={4}>
          {!isMobile && (
            <HStack gap={3}>
              <Box
                w={11}
                h={6}
                bg={isEmployeeMode ? "gray.300" : "#314EF9"}
                borderRadius="full"
                cursor="pointer"
                onClick={() => setIsEmployeeMode(!isEmployeeMode)}
                transition="background-color 0.2s"
                position="relative"
                data-testid="toggle-employee-mode"
              >
                <Box
                  w={5}
                  h={5}
                  bg="white"
                  borderRadius="full"
                  shadow="md"
                  transform={
                    isEmployeeMode ? "translateX(20px)" : "translateX(0)"
                  }
                  transition="transform 0.2s"
                  position="absolute"
                  top="2px"
                  left="2px"
                />
              </Box>
              <Text fontSize="14px" fontWeight="600" color="#000000">
                Switch to Employee
              </Text>
            </HStack>
          )}

          {!isMobile && <Box w="1px" h={8} bg="gray.300" />}

          {isMobile && (
            <Box
              w={11}
              h={6}
              bg={isEmployeeMode ? "gray.300" : "#314EF9"}
              borderRadius="full"
              cursor="pointer"
              onClick={() => setIsEmployeeMode(!isEmployeeMode)}
              transition="background-color 0.2s"
              position="relative"
              data-testid="toggle-employee-mode"
            >
              <Box
                w={5}
                h={5}
                bg="white"
                borderRadius="full"
                shadow="md"
                transform={
                  isEmployeeMode ? "translateX(20px)" : "translateX(0)"
                }
                transition="transform 0.2s"
                position="absolute"
                top="2px"
                left="2px"
              />
            </Box>
          )}
          <HStack gap={2} cursor="pointer" data-testid="profile-menu">
            <Box
              w={8}
              h={8}
              bg="#17E4A1"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="#000000"
              fontSize="12px"
              fontWeight="medium"
            >
              JA
            </Box>
            {isMobile && (
              <IconButton
                backgroundColor="transparent"
                color="#3C3C3C"
                onClick={onOpen}
                aria-label="Open menu"
                data-testid="button-mobile-menu"
              >
                <Menu size={10} />
              </IconButton>
            )}

            {!isMobile && (
              <>
                <Text color="#525252" fontWeight="600" fontSize="16px">
                  Jonathan
                </Text>
                <ChevronDown
                  size={12}
                  color="var(--chakra-colors-text-light)"
                />
              </>
            )}
          </HStack>
        </HStack>
      </Flex>

      {open && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.600"
          zIndex={1000}
          onClick={onClose}
          data-testid="mobile-menu"
        >
          <Box
            position="absolute"
            right={0}
            top={0}
            bottom={0}
            w="80"
            maxW="full"
            bg="white"
            p={6}
            onClick={(e) => e.stopPropagation()}
          >
            <VStack gap={4} align="stretch">
              <Flex justify="space-between" align="center" mb={4}>
                <Text fontSize="lg" fontWeight="semibold">
                  Menu
                </Text>
                <IconButton
                  onClick={onClose}
                  aria-label="Close menu"
                  size="sm"
                  backgroundColor="transparent"
                  color="#3C3C3C"
                >
                  ×
                </IconButton>
              </Flex>
              <Text data-testid="mobile-nav-dashboard">Dashboard</Text>
              <Text
                color="#314EF9"
                fontWeight="medium"
                data-testid="mobile-nav-resources"
              >
                Resources
              </Text>
              <Text data-testid="mobile-nav-toolkit">Toolkit</Text>
            </VStack>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Header;
