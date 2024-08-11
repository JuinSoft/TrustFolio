import React, { useState, useEffect } from "react";
import { Box, Text, VStack, HStack, Button, Image } from "@chakra-ui/react";
import { useContract } from "../utils/useContract";

export default function MyBids() {
  const [acceptedBids, setAcceptedBids] = useState([]);
  const { contract } = useContract();

  useEffect(() => {
    const fetchAcceptedBids = async () => {
      try {
        const bids = await contract.getUserBids();
        setAcceptedBids(bids);
      } catch (error) {
        console.error("Error fetching accepted bids:", error);
      }
    };
  
    fetchAcceptedBids();
  }, [contract]);

  return (
    <Box p={6} bg="gray.800">
      <Text fontSize="3xl" fontWeight="bold" mb={6} color="white">
        My Bids
      </Text>
      {acceptedBids.length === 0 ? (
        <Text fontSize="xl" color="gray.400">
          No bids found.
        </Text>
      ) : (
        <VStack spacing={6} align="stretch">
          {acceptedBids.map((bid) => (
            <Box key={bid.id} p={6} borderWidth={1} borderRadius="lg" shadow="md" bg="gray.700">
              <HStack justifyContent="space-between" mb={4}>
                <HStack spacing={4}>
                  <Image boxSize="60px" objectFit="cover" src={'./icon.png'} alt={bid.title} borderRadius="md" />
                  <VStack align="start" spacing={1}>
                    <Text fontSize="xl" fontWeight="bold" color="white">
                      {bid.title}
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                      {bid.dataType}
                    </Text>
                  </VStack>
                </HStack>
              </HStack>
              <Text mb={4} color="white">{bid.description}</Text>
              {bid.isFullfilled ? (
                <Text color="blue.300" fontSize="lg" width="full">
                  Requirement Fulfilled
                </Text>
              ) : (
                <Text color="blue.300" fontSize="lg" width="full">
                  <Text color={bid.isTransferred ? "green.300" : "orange.300"} fontSize="lg" width="full">
                    Status: {bid.isTransferred ? "Data Accepted" : "Data Not Accepted"}
                  </Text>
                </Text>
              )}
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}