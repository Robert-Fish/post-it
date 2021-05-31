import { Button } from "@chakra-ui/button";
import {
  Box,
  CircularProgress,
  Flex,
  Grid,
  Heading,
  Image,
  useToast,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SearchIcon } from "@chakra-ui/icons";

export default function Home() {
  const [searchTerm, setTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userResultLimit, seResultLimit] = useState(10);
  const toast = useToast();
  const router = useRouter();

  const incrementResultLimit = () => seResultLimit(userResultLimit + 10);

  const fetchUsers = () => {
    axios
      .get(`https://dummyapi.io/data/api/user?limit=${userResultLimit}`)
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

  useEffect(() => {
    setLoading(true);
    fetchUsers();
    setLoading(false);
  }, []);

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
        {users?.map((user) => (
          <Box
            data-testid="profile"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            key={user?.id}
            maxW="sm"
            bg="white"
          >
            <Image src={user?.picture} objectFit="contain" w="100%" />
            <Box p="3">
              <Heading size="md">
                {user?.firstName} {user?.lastName}
              </Heading>
              <Button
                size="sm"
                mt={2}
                colorScheme="blue"
                onClick={() => router.push(`/profile/${user?.id}`)}
              >
                View Profile
              </Button>{" "}
              <Button
                size="sm"
                mt={2}
                colorScheme="blue"
                variant="outline"
                onClick={() => router.push(`/profile/${user?.id}`)}
              >
                View Posts
              </Button>{" "}
            </Box>
          </Box>
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
