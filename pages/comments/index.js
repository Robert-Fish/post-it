import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Page from "../../components/Page";
import {
  Box,
  Heading,
  Stack,
  WrapItem,
  Wrap,
  Image,
  Avatar,
  Text,
  Link,
  Badge,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { format, parseISO } from "date-fns";

export default function Comments() {
  const router = useRouter();
  const { id } = router.query;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`https://dummyapi.io/data/api/post/${id}/comment?limit=10`)
      .then((res) => {
        setComments(res.data.data);
      });
  }, [id]);

  return (
    <Page>
      <Link
        data-testid="back"
        mt={2}
        href="/"
        mb={2}
        color="blue.500"
        variant="outline"
      >
        Back
      </Link>
      <Wrap spacing={2}>
        {comments?.map((comment) => (
          <WrapItem key={comment.id}>
            <Box bg="white" p="4" w="250px">
              <Flex flexDirection="column">
                <Flex alignItems="center" justifyContent="space-between">
                  <Avatar
                    data-testid="profile-image"
                    mr={2}
                    size="md"
                    src={comment?.owner.picture}
                  ></Avatar>
                  <Stack w="80%" spacing={1}>
                    <Heading size="sm">
                      {comment?.owner?.firstName} {comment?.owner?.lastName}
                    </Heading>
                    <Text>
                      {format(
                        parseISO(comment?.publishDate),
                        "dd/MM/yyyy hh:mm aa"
                      )}
                    </Text>
                  </Stack>
                </Flex>
                <Divider mt={2} mb={2}></Divider>
                <Text>{comment?.message}</Text>
              </Flex>
            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </Page>
  );
}
