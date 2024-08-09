import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Flex,
  SimpleGrid,
  Tag,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { SearchIcon, AddIcon } from "@chakra-ui/icons";

const dataItems = [
  {
    title: "Medical Research Data",
    description: "Patient experiences and outcomes.",
    tags: ["Healthcare", "Research"],
    replies: 23,
    time: "2 days",
    status: "Urgent",
  },
  {
    title: "Market Research Data",
    description: "Consumer behavior data.",
    tags: ["Market", "Research"],
    replies: 16,
    time: "16 hours",
    status: "Open",
  },
  // Add more data items as needed
];

export default function Dataplace() {
  return (
    <Box minHeight="100vh" bg="gray.900" color="white">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Flex justify="space-between" align="center">
            <Heading as="h1" size="xl">
              Data Marketplace
            </Heading>
            <Button leftIcon={<AddIcon />} colorScheme="teal">
              Put Your Data for Sale
            </Button>
          </Flex>
          <InputGroup>
            <Input placeholder="Search data..." />
            <InputRightElement>
              <IconButton
                aria-label="Search database"
                icon={<SearchIcon />}
                colorScheme="teal"
              />
            </InputRightElement>
          </InputGroup>
          <HStack spacing={4} wrap="wrap">
            <Button colorScheme="teal" variant="outline">
              Financial Aid
            </Button>
            <Button colorScheme="teal" variant="outline">
              Moving
            </Button>
            <Button colorScheme="teal" variant="outline">
              Resumes
            </Button>
            <Button colorScheme="teal" variant="outline">
              Healthcare
            </Button>
            <Button colorScheme="teal" variant="outline">
              Legal Counsel
            </Button>
            <Button colorScheme="teal" variant="outline">
              More
            </Button>
          </HStack>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {dataItems.map((item, index) => (
              <Box
                key={index}
                bg="gray.800"
                p={6}
                borderRadius="lg"
                boxShadow="lg"
              >
                <Flex justify="space-between" align="center" mb={4}>
                  <Heading as="h3" size="md">
                    {item.title}
                  </Heading>
                  <Tag colorScheme={item.status === "Urgent" ? "red" : "green"}>
                    {item.status}
                  </Tag>
                </Flex>
                <Text mb={4}>{item.description}</Text>
                <HStack spacing={2} mb={4}>
                  {item.tags.map((tag, idx) => (
                    <Tag key={idx} colorScheme="teal">
                      {tag}
                    </Tag>
                  ))}
                </HStack>
                <Flex justify="space-between" align="center">
                  <Text>{item.replies} Replies</Text>
                  <Text>{item.time}</Text>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}