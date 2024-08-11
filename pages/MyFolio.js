import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  VStack,
  SimpleGrid,
  Badge,
  Text,
  Flex,
  Button,
  Image,
  Tag,
  useToast,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import { FaCheck, FaTimes, FaDownload, FaInfoCircle } from "react-icons/fa";

const bids = [
  {
    title: "Medical Research Data",
    status: "Accepted",
    bidAmount: "2 ETH",
    time: "2 days ago",
    user: "Research Labs Inc.",
    description: "Detailed medical research data for analysis.",
    sampleData: "https://example.com/sample-medical-data",
    fullData: "https://example.com/full-medical-data",
  },
  {
    title: "Market Research Data",
    status: "Pending",
    bidAmount: "1.5 ETH",
    time: "1 day ago",
    user: "Market Insights Ltd.",
    description: "Comprehensive market research data.",
    sampleData: "https://example.com/sample-market-data",
    fullData: "https://example.com/full-market-data",
  },
  {
    title: "Environmental Data",
    status: "Rejected",
    bidAmount: "3 ETH",
    time: "3 days ago",
    user: "Green Earth Organization",
    description: "Extensive environmental data for research.",
    sampleData: "https://example.com/sample-environmental-data",
    fullData: "https://example.com/full-environmental-data",
  },
];

export default function MyFolio() {
  const [portfolio, setPortfolio] = useState([]);
  const toast = useToast();

  const handleAccept = (bid) => {
    setPortfolio([...portfolio, bid]);
    toast({
      title: "Bid Accepted",
      description: `${bid.title} has been added to your portfolio.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleReject = (bid) => {
    // Handle rejection logic here
  };

  const handleDownloadFullData = (bid) => {
    if (bid.status === "Pending") {
      handleAccept(bid);
    }
    window.open(bid.fullData, "_blank");
  };

  return (
    <Box minHeight="100vh" bg="gray.900" color="white" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="xl" textAlign="center" mb={8}>
            Data Folio
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {bids.map((bid, index) => (
              <Box
                key={index}
                bg="gray.800"
                p={6}
                borderRadius="xl"
                boxShadow="dark-lg"
                transition="transform 0.2s"
                _hover={{ transform: "scale(1.05)" }}
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
                <Flex justify="space-between" align="center" mb={4}>
                  <Flex align="center">
                    <Image
                      src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                      alt={bid.user}
                      boxSize="24px"
                      mr={2}
                      borderRadius="full"
                    />
                    <Text>{bid.user}</Text>
                  </Flex>
                  <Tag colorScheme="teal">{bid.time}</Tag>
                </Flex>
                {/* <Flex mt={4} justify="space-between">
                  <Tooltip label="Accept Bid" aria-label="Accept Bid">
                    <IconButton
                      icon={<FaCheck />}
                      colorScheme="green"
                      onClick={() => handleAccept(bid)}
                      isDisabled={bid.status !== "Pending"}
                    />
                  </Tooltip>
                  <Tooltip label="Reject Bid" aria-label="Reject Bid">
                    <IconButton
                      icon={<FaTimes />}
                      colorScheme="red"
                      onClick={() => handleReject(bid)}
                      isDisabled={bid.status !== "Pending"}
                    />
                  </Tooltip>
                </Flex> */}
                <Flex mt={4} justify="space-between">
                  <Tooltip label="Download Sample" aria-label="Download Sample">
                    <Button
                      size="sm"
                      leftIcon={<FaDownload />}
                      colorScheme="blue"
                      onClick={() => window.open(bid.sampleData, "_blank")}
                    >
                      Sample Data
                    </Button>
                  </Tooltip>
                  <Tooltip label="Download Full Data" aria-label="Download Full Data">
                    <Button
                      size="sm"
                      leftIcon={<FaDownload />}
                      colorScheme="blue"
                      onClick={() => {
                        if (window.confirm("Downloading the full dataset will accept the bid and transfer the amount. Do you want to proceed?")) {
                          handleDownloadFullData(bid);
                        }
                      }}
                    >
                      Full Data
                    </Button>
                  </Tooltip>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}