import { Box, Button, ChakraProvider, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

function App() {
  const [promptValue, setPromptValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [trainingText, setTrainingText] = useState("");
  const [trainingSucessText, setTrainingSucessText] = useState("");

  const handleTrainingTextChange = (event) => {
    setTrainingText(event.target.value);
  };

  const handlePromptChange = (event) => {
    setPromptValue(event.target.value);
  };

  const handleTraining = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/insert`, {
        words: trainingText,
      });
      setTrainingSucessText(response.data.status);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAutocomplete = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/autocomplete`, {
        prompt: promptValue,
      });
      setOutputValue(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/reset`);
      console.log(response.data.status);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ChakraProvider>
      <Button mt={3} onClick={handleReset}>
        Reset Trie
      </Button>

      <Box p={8}>
        <Input
          placeholder="Enter sentence or word to add to training data"
          value={trainingText}
          onChange={handleTrainingTextChange}
        />
        <Button mt={3} onClick={handleTraining}>
          Train Model
        </Button>
        <Text mt={6}>{trainingSucessText}</Text>
      </Box>

      <Box p={8}>
        <Input
          placeholder="Enter prompt to autocomplete"
          value={promptValue}
          onChange={handlePromptChange}
        />
        <Button mt={3} onClick={handleAutocomplete}>
          Autocomplete
        </Button>
      </Box>

      <Box p={8}>
        <Text mt={-4} fontWeight={"bold"}>
          Your autocompleted word should appear below after clicking the button
        </Text>
        <Text mt={6}>{outputValue}</Text>
      </Box>
    </ChakraProvider>
  );
}

export default App;
