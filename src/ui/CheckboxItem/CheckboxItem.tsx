import React from "react";
import { Check } from "lucide-react";
import { Box, Text } from "@chakra-ui/react";

interface CheckboxItemProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  testId: string;
}

export const CheckboxItem = ({
  checked,
  onChange,
  label,
  testId,
}: CheckboxItemProps) => (
  <Box
    display="flex"
    alignItems="center"
    cursor="pointer"
    onClick={() => onChange(!checked)}
  >
    <Box
      w={4}
      h={4}
      border="0.2rem"
      borderColor={checked ? "text.dark" : "#E0E0E0"}
      bg={checked ? "text.dark" : "#E0E0E0"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      mr={3}
      transition="all 0.2s"
      data-testid={testId}
    >
      {checked && <Check size={12} color="white" />}
    </Box>
    <Text color={"#3F3F3F"}>{label}</Text>
  </Box>
);
