import { Box, Center, Spinner, Text, VStack } from "@chakra-ui/react";
import React from "react";

export function LoadingOverlay() {
  return (
    <Box
      position="fixed"
      top="0"
      right="0"
      bottom="0"
      left="0"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      zIndex="1000"
    >
      <Center height="100%">
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" />
          <Text fontSize="large" color="white">
            Loading Goodies
          </Text>
        </VStack>
      </Center>
    </Box>
  );
}

export default LoadingOverlay;
