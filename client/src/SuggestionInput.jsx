import { Box, Input } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

function SuggestionInput() {
  const [text, setText] = useState("");
  const [cursor, setCursor] = useState(0);
  const [autocompleteSuggestion, setAutocompleteSuggestion] = useState("");

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

      const words = text.slice(0, cursor).split(" ");
      const before = words.slice(0, -1).join(" ");
      const after = text.slice(cursor);

      setText(`${before} ${autocompleteSuggestion} ${after}`);
      setCursor(before.length + autocompleteSuggestion.length + 2);
    }
  };

  return (
    <Box p={8}>
      <Input
        value={text}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Box mt={4} color="gray.400">
        {autocompleteSuggestion}
      </Box>
    </Box>
  );
}

export default SuggestionInput;
