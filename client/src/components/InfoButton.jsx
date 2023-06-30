import { InfoIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";

function InfoButton({ infoText }) {
  return (
    <Popover>
      <PopoverTrigger cursor="pointer">
        <Icon cursor="pointer" as={InfoIcon} />
      </PopoverTrigger>
      <PopoverContent>
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
