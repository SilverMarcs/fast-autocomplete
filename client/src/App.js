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
import React, { useState } from "react";
import SuggestionInput from "./SuggestionInput";

function App() {
  const [trainingText, setTrainingText] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const toast = useToast();

  const handleTrainingTextChange = (event) => {
    setTrainingText(event.target.value);
  };

  const handleTraining = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/insert`,
        {
          words: trainingText,
        }
      );
      toast({
        title: "Successfully added new word(s) to model.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: pass this func to SuggestionsInput component
  const handleReset = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/reset`
      );
      // console.log(response.data.status);
      toast({
        title: "Successfully reset autocomplete model.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setIsConfirming(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ChakraProvider>
      <Box p={8}>
        <Text fontSize="xl" fontWeight="bold">
          Welcome to the Autocomplete Model Trainer
        </Text>
        <Input
          mt={9}
          placeholder="Enter sentence to add to training data"
          value={trainingText}
          onChange={handleTrainingTextChange}
        />

        <Flex mt={4} justifyContent="space-between">
          <Button colorScheme="blue" onClick={handleTraining}>
            Train Model
          </Button>

          <Button
            onClick={isConfirming ? handleReset : () => setIsConfirming(true)}
            colorScheme={isConfirming ? "orange" : "red"}
          >
            {isConfirming ? "Confirm?" : "Reset Model"}
          </Button>
        </Flex>
      </Box>
      <Box p={8}>
        <Text fontWeight="semibold" mb={4}>
          As you type, suggestions appear below the textbox.
        </Text>

        <SuggestionInput />

        <Text mt={100} fontStyle={"italic"} color="gray.600">
          *You can press the 'Tab' key to apply the suggestion to the current
          word
        </Text>
      </Box>
    </ChakraProvider>
  );
}

export default App;
