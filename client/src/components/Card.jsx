import { Box } from "@chakra-ui/react";

const Card = ({ children, minHeight = "none" }) => {
  return (
    <Box
      p={5}
      borderRadius="md"
      bg="gray.700"
      boxShadow="lg"
      width={"90%"}
      maxWidth={"800px"}
      minHeight={minHeight}
    >
      {children}
    </Box>
  );
};

export default Card;
