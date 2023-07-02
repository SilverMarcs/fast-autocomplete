import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

function ResetAlertDialogButton(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isResetting, setIsResetting] = useState(false);

  const cancelRef = useRef();
  const toast = useToast();

  const delay = (time) => {
    return new Promise((res) => setTimeout(res, time));
  };

  useEffect(() => {
    if (props.reset) {
      props.onResetComplete();
    }
  }, [props.reset]); // eslint-disable-line react-hooks/exhaustive-deps

  const showResetToast = () => {
    toast({
      title: "Successfully reset autocomplete model.",
      status: "success",
      duration: 1700,
      isClosable: true,
    });
  };

  const handleReset = async () => {
    setIsResetting(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/reset`);
      props.setReset(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <>
      <Button colorScheme="red" onClick={onOpen} color="gray.200">
        Reset Model
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="gray.800" color="gray.200">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Reset Model
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                bg="gray.700"
                color="gray.200"
                ref={cancelRef}
                onClick={onClose}
                _hover={{ bg: "gray.600" }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={async () => {
                  handleReset();
                  await delay(100);
                  onClose();
                  showResetToast();
                }}
                isLoading={isResetting}
                loadingText="Resetting..."
                ml={3}
              >
                Reset
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default ResetAlertDialogButton;
