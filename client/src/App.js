import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfoButton from "./components/InfoButton";
import ResetAlertDialog from "./components/ResetAlertDialog";
import SuggestionInput from "./components/SuggestionInput";
import TrainingForm from "./components/TrainingForm";

function App() {
  const [trainingText, setTrainingText] = useState("");
  const [reset, setReset] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const toast = useToast();

  const handleTrainingTextChange = (event) => {
    setTrainingText(event.target.value);
  };

  // Resetting the model everytime page is refreshed/loaded because not using a database atm
  useEffect(() => {
    const fetchData = async () => {
      await axios.post(`${process.env.REACT_APP_API_URL}/reset`);
    };
    fetchData();
  }, []);

  const handleTraining = async () => {
    setIsTraining(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/insert`, {
        words: trainingText,
      });
      toast({
        title: "Successfully added new word(s) to model.",
        status: "success",
        duration: 1700,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsTraining(false);
    }
  };

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
        <Flex align="left">
          <Text fontWeight="semibold" mb={4} mr={2} color="gray.300">
            As you type, suggestions appear below the textbox.
          </Text>
          <InfoButton infoText="You can press the 'Tab' key to apply the suggestion to the current word" />
        </Flex>

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
