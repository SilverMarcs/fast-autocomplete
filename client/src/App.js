import { Box, ChakraProvider, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

import SuggestionInput from "./components/SuggestionInput";
import TrainingForm from "./components/TrainingForm";

function App() {
  const [reset, setReset] = useState(false);

  const toast = useToast();

  // Resetting the model everytime page is refreshed/loaded because not using a database atm
  useEffect(() => {
    const fetchData = async () => {
      await axios.post(`${process.env.REACT_APP_API_URL}/reset`);
    };
    fetchData();
  }, []);

  const handleReset = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/reset`);
      toast({
        title: "Successfully reset autocomplete model.",
        status: "success",
        duration: 1700,
        isClosable: true,
      });
      // setTrainingText("");
      setReset(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ChakraProvider>
      <Box p={8} color="white" bg="gray.800">
        <Text fontSize="2xl" fontWeight="bold" color="blue.300">
          Welcome to the Autocomplete Model Trainer!
        </Text>
        <TrainingForm onReset={handleReset} />
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
