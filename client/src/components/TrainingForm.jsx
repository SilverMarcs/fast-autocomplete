import { Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ResetAlertDialogButton from "./ResetAlertDialogButton";

const TrainingForm = (props) => {
  const [trainingText, setTrainingText] = useState("");
  const [isTraining, setIsTraining] = useState(false);

  const toast = useToast();

  useEffect(() => {
    if (props.reset) {
      setTrainingText("");
      props.onResetComplete();
    }
  }, [props.reset]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleTrainingTextChange = (event) => {
    setTrainingText(event.target.value);
  };

  return (
    <>
      <Flex align="left" mt={12}>
        <Text fontWeight="semibold" mb={4} mr={2} color="gray.300">
          Enter word or sentence to add to training data.
        </Text>
      </Flex>
      <Input
        placeholder="Enter text"
        value={trainingText}
        onChange={handleTrainingTextChange}
        bg="gray.700"
        color="gray.200"
        borderColor="gray.600"
      />

      <Flex mt={5} justifyContent="space-between">
        <Button
          colorScheme="blue"
          onClick={handleTraining}
          isLoading={isTraining}
          loadingText="Training..."
        >
          Train Model
        </Button>

        <ResetAlertDialogButton
          reset={props.reset}
          setReset={props.setReset}
          onResetComplete={() => props.onResetComplete}
        />
      </Flex>
    </>
  );
};

export default TrainingForm;
