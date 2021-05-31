import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/router";
import React from "react";
import CardItem from "../../components/profile/CardItem";
import ProfileCard from "../../components/profile/ProfileCard";
import Page from "../../components/Page";

export default function ProfileDetail({ user }) {
  const router = useRouter();
  return (
    <Page>
      <ProfileCard>
        <Button
          leftIcon={<ArrowBackIcon />}
          mb={3}
          w="15%"
          colorScheme="blue"
          variant="outline"
          onClick={() => router.back()}
        >
          Go Back
        </Button>
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
        <Button mt={6} w="30%" colorScheme="blue">
          View Posts
        </Button>
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
