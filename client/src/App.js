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

  const handleReset = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/reset`
      );
      // console.log(response.data.status);
      toast({
        title: "Successfully Reset autocomplete model.",
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
        <Input
          placeholder="Enter sentence to add to training data"
          value={trainingText}
          onChange={handleTrainingTextChange}
        />

        <Flex justifyContent="space-between">
          <Button mt={3} onClick={handleTraining}>
            Train Model
          </Button>

          <Button
            mt={3}
            onClick={isConfirming ? handleReset : () => setIsConfirming(true)}
            colorScheme={isConfirming ? "orange" : "red"}
          >
            {isConfirming ? "Confirm?" : "Reset Model"}
          </Button>
        </Flex>
      </Box>

      <SuggestionInput />
    </ChakraProvider>
  );
}

export default App;
