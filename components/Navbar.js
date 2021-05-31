import { Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <Flex backgroundColor="transparent" mb={4} w="full">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={[4, 8]}
          pb={[4, 8]}
          maxWidth="1500px"
          margin="0 auto"
          w="full"
          px={8}
          h="60px"
        >
          <Flex align="center">
            <NextLink href="/" passHref>
              <Link fontSize="lg" fontWeight="bold " color="blue.500">
                Post It
              </Link>
            </NextLink>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <NextLink href="/" passHref>
              <Link mr={2} ml={6} fontWeight="medium">
                Home
              </Link>
            </NextLink>
            <NextLink href="/profile/create-profile" passHref>
              <Link mr={2} ml={2} fontWeight="medium">
                Create Profile
              </Link>
            </NextLink>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
