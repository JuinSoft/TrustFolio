import React from "react";
import {
  Box,
  Container,
  Heading,
  VStack,
  SimpleGrid,
  Tag,
  Text,
  Flex,
  HStack,
  Badge,
} from "@chakra-ui/react";

const bids = [
  {
    title: "Medical Research Data",
    status: "Accepted",
    bidAmount: "2 ETH",
    time: "2 days ago",
  },
  {
    title: "Market Research Data",
    status: "Pending",
    bidAmount: "1.5 ETH",
    time: "1 day ago",
  },
  {
    title: "Environmental Data",
    status: "Rejected",
    bidAmount: "3 ETH",
    time: "3 days ago",
  },
];

export default function MyDatafolio() {
  return (
    <Box minHeight="100vh" bg="gray.900" color="white">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="xl" textAlign="center" mb={8}>
            My Datafolio
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {bids.map((bid, index) => (
              <Box
                key={index}
                bg="gray.800"
                p={6}
                borderRadius="lg"
                boxShadow="lg"
              >
                <Flex justify="space-between" align="center" mb={4}>
                  <Heading as="h3" size="md">
                    {bid.title}
                  </Heading>
                  <Badge
                    colorScheme={
                      bid.status === "Accepted"
                        ? "green"
                        : bid.status === "Pending"
                        ? "yellow"
                        : "red"
                    }
                  >
                    {bid.status}
                  </Badge>
                </Flex>
                <Text mb={4}>Bid Amount: {bid.bidAmount}</Text>
                <HStack spacing={2} mb={4}>
                  <Tag colorScheme="teal">{bid.time}</Tag>
                </HStack>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}