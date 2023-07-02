import { InfoIcon } from "@chakra-ui/icons";
import {
  Box,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";

function InfoButton({ infoText }) {
  return (
    <Popover>
      <PopoverTrigger cursor="pointer">
        <Icon color="gray.200" cursor="pointer" as={InfoIcon} />
      </PopoverTrigger>
      <PopoverContent bg="gray.800" color="gray.200" borderColor="gray.600">
        <PopoverBody>
          <Box mb={2}>
            <Text>{infoText}</Text>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default InfoButton;
