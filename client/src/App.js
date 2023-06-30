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
import InfoButton from "./components/InfoButton";
import ResetAlertDialog from "./components/ResetAlertDialog";
import SuggestionInput from "./components/SuggestionInput";

function App() {
  const [trainingText, setTrainingText] = useState("");
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
        duration: 1700,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: pass this func to SuggestionsInput component to reset autocomplete text
  const handleReset = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/reset`
      );
      // console.log(response.data.status);
      toast({
        title: "Successfully reset autocomplete model.",
        status: "success",
        duration: 1700,
        isClosable: true,
      });
      setTrainingText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ChakraProvider>
      <Box p={8}>
        <Text fontSize="2xl" fontWeight="bold">
          Welcome to the Autocomplete Model Trainer!
        </Text>
        <Flex align="left" mt={16}>
          <Text fontWeight="semibold" mb={4} mr={2}>
            Enter sentence to add to training data.
          </Text>
          <InfoButton infoText="Model is trained everytime Train Model button is pressed with word from the textbox." />
        </Flex>
        <Input
          placeholder="Enter text"
          value={trainingText}
          onChange={handleTrainingTextChange}
        />

        <Flex mt={5} justifyContent="space-between">
          <Button colorScheme="blue" onClick={handleTraining}>
            Train Model
          </Button>

          <ResetAlertDialog onReset={handleReset} />
        </Flex>
      </Box>

      <Box p={8}>
        <Flex align="left">
          <Text fontWeight="semibold" mb={4} mr={2}>
            As you type, suggestions appear below the textbox.
          </Text>
          <InfoButton infoText="You can press the 'Tab' key to apply the suggestion to the current word" />
        </Flex>
        <SuggestionInput />
      </Box>
    </ChakraProvider>
  );
}

export default App;
