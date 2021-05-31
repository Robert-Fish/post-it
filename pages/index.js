import { Button } from "@chakra-ui/button";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Grid,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
  CircularProgress,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limitLoading, setLimitLoading] = useState(false);
  const [searchTerm, setTerm] = useState("");
  const [pageLimit, setLimit] = useState(10);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    setLimitLoading(true);
    axios
      .get(`https://dummyapi.io/data/api/user?limit=${pageLimit}`)
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.error(err.response.data);
        toast({
          title: "Error",
          description: "Error fetching users",
          status: "error",
          duration: 4000,
        });
      })
      .finally(() => {
        setLoading(false);
        setLimitLoading(false);
      });
  }, [pageLimit]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://dummyapi.io/data/api/user?limit=${pageLimit}`)
      .then((res) => {
        setUsers(
          res.data.data.filter(
            (user) =>
              user.email.includes(searchTerm) ||
              user.firstName.includes(searchTerm) ||
              user.lastName.includes(searchTerm)
          )
        );
      })
      .catch((err) => {
        console.error(err.response.data);
        toast({
          title: "Error",
          description: "Error finding user",
          status: "error",
          duration: 4000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm]);

  return (
    <>
      <Heading>Users</Heading>
      <InputGroup mt={3} mb={3}>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          data-testid="searchbar"
          onChange={(e) => setTerm(e.target.value)}
          value={searchTerm}
          bg="white"
          variant="outline"
          placeholder="Search user by email or name..."
        />
      </InputGroup>
      {loading ? (
        <CircularProgress
          data-testid="loader"
          isIndeterminate
          color="blue.500"
          size="60px"
        />
      ) : (
        <>
          <Grid
            data-testid="grid"
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
                data-testid={`profile`}
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
            data-testid="load-more"
            mt={6}
            colorScheme="blue"
            isLoading={limitLoading}
            onClick={() => {
              setLimit(pageLimit + 10);
            }}
          >
            Load More
          </Button>
        </>
      )}
    </>
  );
}
