import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import InfoButton from "./InfoButton";
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
      // check if training text is empty
      if (trainingText === "") {
        toast({
          title: "Training text cannot be empty.",
          status: "error",
          duration: 1700,
          isClosable: true,
        });
        return;
      }

      // check if training text is alphabetical only
      if (!/^[a-zA-Z\s]*$/.test(trainingText)) {
        toast({
          title: "Training text can only contain letters and spaces.",
          status: "error",
          duration: 1700,
          isClosable: true,
        });
        return;
      }

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
      toast({
        title: "An error occurred while training model.",
        status: "error",
        duration: 1700,
        isClosable: true,
      });
    } finally {
      setIsTraining(false);
    }
  };

  const handleTrainingTextChange = (event) => {
    setTrainingText(event.target.value);
  };

  return (
    <Card>
      <Text fontSize="lg" fontWeight="semibold" mb={4} color="green.200">
        Training Model
      </Text>
      <FormControl>
        <Flex>
          <FormLabel color="gray.200">
            Enter word or sentence to add to training data.
          </FormLabel>
          <InfoButton
            infoText="Model is trained every time Train Model button is pressed with
            word(s) from the textbox."
          />
        </Flex>
        <Input
          placeholder="Enter text"
          value={trainingText}
          onChange={handleTrainingTextChange}
          bgColor="gray.600"
          color="gray.100"
          borderColor="gray.500"
        />
        <FormHelperText color={"gray.400"}>
          Very large inputs may affect UI responsiveness.
        </FormHelperText>
        <Flex mt={5} justifyContent="space-between" alignItems="center">
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
      </FormControl>
    </Card>
  );
};

export default TrainingForm;
