import React, { useState } from "react";
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
  Input,
  InputGroup,
  InputRightElement,
  Select,
  IconButton,
  Button,
  Image,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const bids = [
  {
    title: "Medical Research Data",
    status: "Accepted",
    bidAmount: "2 ETH",
    time: "2 days ago",
    user: "Research Labs Inc.",
    description: "Detailed medical research data for analysis.",
  },
  {
    title: "Market Research Data",
    status: "Pending",
    bidAmount: "1.5 ETH",
    time: "1 day ago",
    user: "Market Insights Ltd.",
    description: "Comprehensive market research data.",
  },
  {
    title: "Environmental Data",
    status: "Rejected",
    bidAmount: "3 ETH",
    time: "3 days ago",
    user: "Green Earth Organization",
    description: "Extensive environmental data for research.",
  },
];

export default function MyBids() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date");

  const filteredBids = bids
    .filter((bid) =>
      bid.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "date") {
        return new Date(b.time) - new Date(a.time);
      } else if (sortOption === "amount") {
        return parseFloat(b.bidAmount.replace(/[^0-9.-]+/g, "")) - parseFloat(a.bidAmount.replace(/[^0-9.-]+/g, ""));
      }
      return 0;
    });

  return (
    <Box minHeight="100vh" bg="gray.900" color="white" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="xl" textAlign="center" mb={8}>
            My Bids
          </Heading>
          <Flex justify="space-between" align="center" mb={4} flexWrap="wrap">
            <InputGroup flex="1">
              <Input
                placeholder="Search bids..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                bg="gray.800"
                color="white"
              />
              <InputRightElement>
                <IconButton
                  aria-label="Search bids"
                  icon={<SearchIcon />}
                  colorScheme="teal"
                />
              </InputRightElement>
            </InputGroup>
            <Select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              maxW="200px"
              bg="gray.800"
              color="white"
              flex="1"
              ml={4}
              mt={{ base: 4, md: 0 }}
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
            </Select>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {filteredBids.map((bid, index) => (
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
                <Text mb={4}>Tokens Offered: {bid.bidAmount}</Text>
                <Text mb={4}>{bid.description}</Text>
                <Flex justify="space-between" align="center">
                  <Flex align="center">
                    <Image
                      src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                      alt={bid.user}
                      boxSize="24px"
                      mr={2}
                    />
                    <Text>{bid.user}</Text>
                  </Flex>
                  <Tag colorScheme="teal">{bid.time}</Tag>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}