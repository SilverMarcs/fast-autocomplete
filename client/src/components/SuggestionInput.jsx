import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";

function SuggestionInput(props) {
  const [text, setText] = useState("");
  const [cursor, setCursor] = useState(0);
  const [autocompleteSuggestion, setAutocompleteSuggestion] = useState("");

  useEffect(() => {
    if (props.reset) {
      setAutocompleteSuggestion("");
      setText("");
      props.onResetComplete();
    }
  }, [props.reset]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const words = text.slice(0, cursor).split(" ");
    const currentWord = words[words.length - 1];

    axios
      .post(`${process.env.REACT_APP_API_URL}/autocomplete`, {
        prompt: currentWord,
      })
      .then((response) => {
        if (response.data.result !== null) {
          setAutocompleteSuggestion(response.data.result);
        } else {
          setAutocompleteSuggestion(currentWord);
        }
      })
      .catch((error) => {
        console.error("Error fetching autocomplete suggestions: ", error);
      });
  }, [text, cursor]);

  const handleInputChange = (event) => {
    setText(event.target.value);
    setCursor(event.target.selectionStart);
  };

  const handleKeyDown = (event) => {
    const words = text.slice(0, cursor).split(" ");
    const currentWord = words[words.length - 1];
    if (event.key === "Tab" && currentWord !== "") {
      event.preventDefault();

      // Get all the words in the text up to the cursor position
      const words = text.slice(0, cursor).split(" ");

      // Get all the words before the last word (excluding the last word)
      const before = words.slice(0, -1).join(" ");

      // Get all the text after the cursor position
      const after = text.slice(cursor);

      // Replace the current word with the autocomplete suggestion and add a space
      setText(`${before} ${autocompleteSuggestion} ${after}`);
      // Move the cursor to the end of the suggestion
      setCursor(before.length + autocompleteSuggestion.length + 2);
    }
  };

  return (
    <Card minHeight="237px">
      <Text fontSize="lg" fontWeight="semibold" mb={4} color="green.200">
        Get Suggestions
      </Text>
      <FormControl>
        <Flex>
          <FormLabel color="gray.200">
            As you type, suggestions appear below the textbox.
          </FormLabel>
        </Flex>
        <Input
          value={text}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter text"
          bgColor="gray.600"
          color="gray.100"
          borderColor="gray.500"
        />
        <FormHelperText color="gray.400" ml={1}>
          Tip: Press the 'Tab' key to apply the suggestion to the current word
        </FormHelperText>
      </FormControl>
      {autocompleteSuggestion && (
        <Box mt={3} ml={1} color="gray.400">
          {autocompleteSuggestion}
        </Box>
      )}
    </Card>
  );
}

export default SuggestionInput;
