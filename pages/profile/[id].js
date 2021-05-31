import { Box, Flex, Heading, Image, Link } from "@chakra-ui/react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/router";
import React from "react";
import Page from "../../components/Page";
import CardItem from "../../components/profile/CardItem";
import ProfileCard from "../../components/profile/ProfileCard";

export default function ProfileDetail({ user }) {
  const router = useRouter();
  return (
    <Page>
      <ProfileCard>
        <Link
          href="/"
          mb={3}
          color="blue.500"
          variant="outline"
          onClick={() => router.back()}
        >
          Home
        </Link>
        <Flex w="100%" justifyContent="space-evenly" alignItems="center">
          <Image
            src={user?.picture}
            w={{
              xl: "20%",
              lg: "20%",
              md: "20%",
              sm: "50%",
            }}
          />
          <Box>
            <Heading textTransform="capitalize">
              {user?.title} {user?.firstName} {user?.lastName}
            </Heading>
            <CardItem label="Gender" value={user?.gender} isCapitalized />
            <CardItem
              label="Date Of Birth"
              value={format(parseISO(user?.dateOfBirth), "dd/MM/yyyy")}
            />
            <CardItem
              label="Register Date"
              value={format(parseISO(user?.registerDate), "dd/MM/yyyy")}
            />
            <CardItem label="Email" value={user?.email} />
            <CardItem label="Phone" value={user?.phone} />
          </Box>
        </Flex>
        <Link mt={6} color="blue.500" href={`/posts?byUser=${user.id}`}>
          View Posts
        </Link>
      </ProfileCard>
    </Page>
  );
}

export async function getStaticPaths() {
  const { data } = await axios.get("https://dummyapi.io/data/api/user");

  return {
    paths: data.data.map((user) => ({
      params: { id: user.id },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await axios.get(
    `https://dummyapi.io/data/api/user/${params.id}`
  );

  return {
    props: {
      user: data,
    },
  };
}
