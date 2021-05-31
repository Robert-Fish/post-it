import { SearchIcon } from "@chakra-ui/icons";
import { Heading, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setTerm] = useState("");

  return (
    <>
      <Heading>Users</Heading>
      <InputGroup mt={3} mb={3} data-testid="searchbar">
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          onChange={(e) => setTerm(e.target.value)}
          value={searchTerm}
          bg="white"
          variant="outline"
          placeholder="Search user by email or name..."
        />
      </InputGroup>
    </>
  );
}
