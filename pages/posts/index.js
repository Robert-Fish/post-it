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

export default function Posts() {
  const router = useRouter();
  const { byUser } = router.query;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://dummyapi.io/data/api/user/${byUser}/post`)
      .then((res) => {
        setPosts(res.data.data);
      });
  }, [byUser]);

  return (
    <Page>
      <Link mt={2} href="/" mb={2} color="blue.500" variant="outline">
        Back
      </Link>
      <Wrap spacing={2}>
        {posts?.map((post) => (
          <WrapItem key={post?.id}>
            <Box bg="white" p="4" w="270px">
              <Box
                mb={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Avatar
                  size="md"
                  name="Dan Abrahmov"
                  src={post?.owner?.picture}
                />
                <Stack w="70%" spacing={1}>
                  <Heading size="sm">
                    {post?.owner?.firstName} {post?.owner?.lastName}
                  </Heading>
                  <Text fontSize="xs">{post?.owner?.email}</Text>
                </Stack>
              </Box>
              <Image src={post?.image} objectFit="cover" />
              <Wrap mt={3}>
                {post?.tags?.map((tag, index) => (
                  <WrapItem key={index}>
                    <Badge colorScheme="blue">{tag}</Badge>
                  </WrapItem>
                ))}
              </Wrap>
              <Text mt={2} mb={2}>
                {post?.text}
              </Text>
              <Divider />
              <Flex mt={2} mb={2} justifyContent="space-between">
                <Text>{post?.likes} Likes</Text>
                <Text>
                  {format(parseISO(post?.publishDate), "dd/MM/yyyy hh:mm aa")}
                </Text>
              </Flex>
              <Divider />
              <Flex mt={2} justifyContent="space-between">
                <Link href="/" color="blue.500" variant="outline">
                  Get Post Comments
                </Link>{" "}
                <Link href="/" color="blue.500" variant="outline">
                  Get Owner Profile
                </Link>
              </Flex>
            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </Page>
  );
}
