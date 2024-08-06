import React from "react";
import { Box, Container, Heading, Text, VStack, Button, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaRocket, FaUsers, FaShieldAlt } from "react-icons/fa";

export default function Home({ setActiveTab }) {
  const bgColor = useColorModeValue("rgba(26, 32, 44, 0.8)", "rgba(26, 32, 44, 0.8)");
  const textColor = useColorModeValue("white", "white");

  return (
    <Box minHeight="100vh" bg={bgColor} color={textColor}>
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size="3xl" mb={4} bgGradient="linear(to-r, blue.400, blue.600)" bgClip="text">
              Welcome to Trustfolio
            </Heading>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}