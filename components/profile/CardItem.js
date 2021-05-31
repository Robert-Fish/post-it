import React from "react";
import { Text } from "@chakra-ui/react";

export default function CardItem({ label, value, isCapitalized }) {
  return (
    <Text
      fontWeight="500"
      fontSize="lg"
      mt={1}
      textTransform={isCapitalized && "capitalize"}
    >
      {label}:{" "}
      <Text as="span" fontWeight="normal">
        {value}
      </Text>
    </Text>
  );
}
