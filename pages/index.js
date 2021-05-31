import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [searchTerm, setTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [userResultLimit, seResultLimit] = useState(10);
  const toast = useToast();

  const incrementResultLimit = () => seResultLimit(userResultLimit + 10);

  const fetchUser = () => {
    axios
      .get(`user?limit=${userResultLimit}`)
      .then((res) => setUsers(res.data.data))
      .catch((err) => {
        console.error(err.response.data);
        toast({
          title: "Error",
          description: "Error fetching users",
          status: "error",
          duration: 4000,
        });
      });
  };

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
      <Grid
        mt={4}
        templateColumns={{
          xl: "repeat(6, 1fr)",
          lg: "repeat(4, 1fr)",
          md: "repeat(3, 1fr)",
          sm: "repeat(1, 1fr)",
        }}
        gap={6}
      >
        {users?.map((user, index) => (
          <Box
            data-testid={`profile-${index}`}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            key={user?.id}
            maxW="sm"
            bg="white"
          ></Box>
        ))}
      </Grid>
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
