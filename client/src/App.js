import {
  Box,
  CSSReset,
  ChakraProvider,
  Heading,
  Text,
  VStack,
  extendTheme,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingOverlay from "./components/LoadingOverlay";

import SuggestionInput from "./components/SuggestionInput";
import TrainingForm from "./components/TrainingForm";

function App() {
  const [reset, setReset] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // TODO: Move to theme file and use this for colors everywhere
  const theme = extendTheme({
    styles: {
      global: (props) => ({
        body: {
          bg: "#0c1218",
          color: "white",
        },
      }),
    },
  });

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
    <ChakraProvider theme={theme}>
      <CSSReset />
      {isLoading && <LoadingOverlay />}
      <Box
        m={[0, 0, 10]} // No margin on small & medium screens, 10 on larger
        color="white"
        bg="gray.800"
        p={[0, 0, (12, 8, 14, 8)]} // No padding on small & medium screens, specific padding on larger
        borderRadius={["0", "0", "lg"]} // No border radius on small & medium screens, lg on larger
        boxShadow={["none", "none", "xl"]} // No shadow on small & medium screens, xl shadow on larger
        width={["100%", "100%", "auto"]} // Full width on small & medium screens, auto on larger
        height={["100vh", "100vh", "auto"]} // Full viewport height on small & medium screens, auto on larger
      >
        <Heading textAlign="center" size="2xl" mb={10} color="blue.300" pt={5}>
          Welcome to the Autocomplete Model Trainer!
        </Heading>
        <VStack spacing={10}>
          <TrainingForm
            reset={reset}
            setReset={setReset}
            onResetComplete={() => setReset(false)}
          />
          <SuggestionInput
            reset={reset}
            onResetComplete={() => setReset(false)}
          />
          <Text mt={5} fontStyle="italic" color="gray.500">
            *Model is reset on page refresh
          </Text>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
