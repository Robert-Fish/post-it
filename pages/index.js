import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setTerm] = useState("");
  const [userResultLimit, seResultLimit] = useState(10);

  const incrementResultLimit = () => seResultLimit(userResultLimit + 10);

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
      <Button
        variant="outline"
        colorScheme="blue"
        onClick={incrementResultLimit}
      >
        Load More
      </Button>
    </>
  );
}
