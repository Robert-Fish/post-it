import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import Navbar from "./Navbar";

export default function Page({ children }) {
  return (
    <Box backgroundColor="gray.100" h="100vh" overflow="auto">
      <Navbar />
      <Flex
        margin="0 auto"
        direction="column"
        maxW="1250px"
        px={[0, 8, 8]}
        pb={3}
      >
        {children}
      </Flex>
    </Box>
  );
}
