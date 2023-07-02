import {
  Box,
  Center,
  ChakraProvider,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

import SuggestionInput from "./components/SuggestionInput";
import TrainingForm from "./components/TrainingForm";

function App() {
  const [reset, setReset] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const resetModel = async () => {
      setIsLoading(true);
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/reset`);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    resetModel();
  }, []);

  return (
    <ChakraProvider>
      {isLoading && (
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
      )}
      <Box p={8} color="white" bg="gray.800">
        <Text fontSize="2xl" fontWeight="bold" color="blue.300">
          Welcome to the Autocomplete Model Trainer!
        </Text>
        <TrainingForm
          reset={reset}
          setReset={setReset}
          onResetComplete={() => setReset(false)}
        />
      </Box>

      <Box p={8} bg="gray.800">
        <SuggestionInput
          reset={reset}
          onResetComplete={() => setReset(false)}
        />

        <Text mt={100} fontStyle={"italic"} color="gray.500">
          *Model is reset on page refresh
        </Text>
      </Box>
    </ChakraProvider>
  );
}

export default App;
