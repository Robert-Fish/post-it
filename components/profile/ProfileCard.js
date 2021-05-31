import React from "react";
import { Flex } from "@chakra-ui/react";

export default function ProfileCard({ children }) {
  return (
    <Flex
      w="100%"
      flexDir="column"
      alignItems="center"
      bg="white"
      p="5"
      borderWidth="1px"
      borderRadius="lg"
    >
      {children}
    </Flex>
  );
}
