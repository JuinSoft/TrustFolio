import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  VStack,
  SimpleGrid,
  Text,
  Flex,
  Tag,
  Button,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon, AddIcon } from "@chakra-ui/icons";
import RequirementDetail from "./RequirementDetail";
import PostRequirementStepper from "./PostRequirementStepper";

const requirements = [
  {
    title: "Machine Learning Dataset Needed",
    amount: "0.2",
    description: "Seeking datasets for machine learning projects.",
    user: "Research Labs Inc.",
    icon: "",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tags: ["Machine Learning", "Data Science", "Datasets"],
    additionalInfo: "Looking for diverse datasets for research purposes.",
    datePosted: "2023-10-15",
    totalResponses: 2,
    status: "open",
  },
  {
    title: "Biomedical Research Data Request",
    amount: "0.2",
    description: "Requesting biomedical research data for analysis.",
    user: "MedTech Solutions",
    icon: "/medtech-icon.png",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tags: ["Biomedical Research", "Data Analysis", "Research Data"],
    additionalInfo: "Specific datasets needed for ongoing projects.",
    datePosted: "2023-10-10",
    totalResponses: 1,
    status: "open",
  },
  {
    title: "Environmental Data Collection Assistance",
    amount: "0.2",
    description: "Seeking assistance in collecting environmental data.",
    user: "Green Earth Organization",
    icon: "/greenearth-icon.png",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tags: ["Environmental Data", "Data Collection", "Assistance"],
    additionalInfo: "Collaboration for environmental research data collection.",
    datePosted: "2023-10-05",
    totalResponses: 0,
    status: "open",
  },
];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date");
  const [selectedRequirement, setSelectedRequirement] = useState(null);
  const [isPosting, setIsPosting] = useState(false);

  const filteredRequirements = requirements
    .filter((req) =>
      req.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "date") {
        return new Date(b.datePosted) - new Date(a.datePosted);
      } else if (sortOption === "amount") {
        return parseFloat(b.amount.replace(/[^0-9.-]+/g, "")) - parseFloat(a.amount.replace(/[^0-9.-]+/g, ""));
      }
      return 0;
    });

  return (
    <Box minHeight="100vh" bg="gray.900" color="white" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="xl" textAlign="center" mb={8}>
            Marketplace
          </Heading>

          <Button
            leftIcon={<AddIcon />}
            colorScheme="teal"
            onClick={() => setIsPosting(true)}
            position="absolute"
            top={4}
            right={4}
          >
            Add Requirement
          </Button>
          <Flex justify="space-between" align="center" mb={4} flexWrap="wrap">
            <InputGroup flex="1">
              <Input
                placeholder="Search data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                bg="gray.800"
                color="white"
              />
              <InputRightElement>
                <IconButton
                  aria-label="Search database"
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
          <SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} spacing={8}>
            {filteredRequirements.map((req, index) => (
              <Box
                key={index}
                bg="gray.800"
                p={6}
                borderRadius="lg"
                boxShadow="lg"
                position="relative"
              >
                <Flex justify="space-between" align="center" mb={4}>
                  <Heading as="h3" size="md">
                    {req.title}
                  </Heading>
                  <Tag colorScheme="teal">{req.amount} ETH</Tag>
                </Flex>
                <Text mb={4}>{req.description}</Text>
                <Flex justify="space-between" align="center">
                  <Flex align="center">
                    <Image
                      src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                      alt={req.user}
                      boxSize="24px"
                      mr={2}
                    />
                    <Text>{req.user}</Text>
                  </Flex>
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => setSelectedRequirement(req)}
                  >
                    View
                  </Button>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
      {selectedRequirement && (
        <RequirementDetail
          isOpen={!!selectedRequirement}
          onClose={() => setSelectedRequirement(null)}
          requirement={selectedRequirement}
        />
      )}
      {isPosting && (
        <PostRequirementStepper
          isOpen={isPosting}
          onClose={() => setIsPosting(false)}
        />
      )}
    </Box>
  );
}