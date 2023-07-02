import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";

function ResetAlertDialogButton({ onReset }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

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
                onClick={() => {
                  onReset();
                  onClose();
                }}
                ml={3}
              >
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default ResetAlertDialogButton;
