import { Box, ChakraProvider, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingOverlay from "./components/LoadingOverlay";

import SuggestionInput from "./components/SuggestionInput";
import TrainingForm from "./components/TrainingForm";

function App() {
  const [reset, setReset] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Reset model on page refresh (or first load) since not using a database yet
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
      {isLoading && <LoadingOverlay />}
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
      </Box>
    </ChakraProvider>
  );
}

export default App;
