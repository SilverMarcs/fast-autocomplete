import { Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import InfoButton from "./InfoButton";
import ResetAlertDialog from "./ResetAlertDialog";

const TrainingForm = ({ onReset }) => {
  const [trainingText, setTrainingText] = useState("");
  const [isTraining, setIsTraining] = useState(false);
  const toast = useToast();

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
        <InfoButton infoText="Model is trained every time Train Model button is pressed with word(s) from the textbox." />
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

        <ResetAlertDialog onReset={onReset} />
      </Flex>
    </>
  );
};

export default TrainingForm;
