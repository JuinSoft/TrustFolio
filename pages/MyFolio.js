import React, { useState, useEffect } from "react";
import { Box, Text, VStack, HStack, Button, Badge, Image, Divider, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, useToast, Heading, Container, Flex, Icon } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { useContract } from "../utils/useContract";
import { BigNumber, ethers } from "ethers";
import { FaVideo, FaDownload, FaExternalLinkAlt } from "react-icons/fa";

export default function MyFolio() {
  const [myRequirements, setMyRequirements] = useState([]);
  const [selectedRequirement, setSelectedRequirement] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { contract } = useContract();
  const toast = useToast();

  useEffect(() => {
    const fetchMyRequirements = async () => {
      try {
        const myRequirements = await contract.getUserRequirements();
        const formattedRequirements = await Promise.all(myRequirements.map(async req => {
          const responses = await contract.getBidsForRequirement(req[0]);
          const formattedResponses = responses.map(res => ({
            id: BigNumber.from(res[0]).toString(),
            title: res[3], // Assuming title is a string
            description: res[4],
            sampleDataUrl: res[5],
            fullDataUrl: res[6],
          }));
          return {
            id: BigNumber.from(req[0]).toString(),
            userAddress: req[1],
            title: req[2],
            description: req[3],
            videoUrl: req[4],
            thumbnailUrl: req[5],
            dataType: req[6],
            additionalData: req[7],
            tokenOffered: ethers.utils.formatEther(BigNumber.from(req[8])).toString(),
            isFullfilled: req[9],
            isCancelled: req[10],
            responses: formattedResponses,
          };
        }));
        setMyRequirements(formattedRequirements);
      } catch (error) {
        console.error("Error fetching my requirements:", error);
      }
    };

    fetchMyRequirements();
  }, [contract]);

  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleRequirementClick = (req) => {
    setSelectedRequirement(req);
    onOpen();
  };


  const handleFullDataDownload = async (bidId, fullDataUrl) => {
    const confirm = window.confirm("Downloading full data will transfer the token to the bidder. Do you want to proceed?");
    if (confirm) {
      try {
        // Refetch requirements
        const myRequirements = await contract.getUserRequirements();
        const formattedRequirements = await Promise.all(myRequirements.map(async req => {
          const responses = await contract.getBidsForRequirement(req[0]);
          const formattedResponses = responses.map(res => ({
            id: BigNumber.from(res[0]).toString(),
            title: res[3], // Assuming title is a string
            description: res[4],
            sampleDataUrl: res[5],
            fullDataUrl: res[6],
          }));
          return {
            id: BigNumber.from(req[0]).toString(),
            userAddress: req[1],
            title: req[2],
            description: req[3],
            videoUrl: req[4],
            thumbnailUrl: req[5],
            dataType: req[6],
            additionalData: req[7],
            tokenOffered: ethers.utils.formatEther(BigNumber.from(req[8])).toString(),
            isFullfilled: req[9],
            isCancelled: req[10],
            responses: formattedResponses,
          };
        }));
        setMyRequirements(formattedRequirements);

        // Check if the requirement is fulfilled
        const requirement = formattedRequirements.find(req => req.responses.some(res => res.id === bidId));
        if (requirement && requirement.isFullfilled) {
          window.open(fullDataUrl, "_blank");
          toast({
            title: "Requirement fulfilled.",
            description: "You can now download the full data.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          // Call acceptBid if not fulfilled
          await contract.acceptBid(bidId);
          window.open(fullDataUrl, "_blank");
          toast({
            title: "Bid accepted.",
            description: "The token has been transferred to the bidder.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error processing bid:", error);
        toast({
          title: "Error.",
          description: "There was an error processing the bid.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Container maxW="container.xl" py={12}>
      <Heading as="h1" size="2xl" textAlign="center" mb={12}>
        My Requirements
      </Heading>
      <Box maxH="calc(100vh - 200px)" overflowY="auto" px={4}>
        {myRequirements.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {myRequirements.map((req) => (
              <Box
                key={req.id}
                p={6}
                borderWidth={1}
                borderColor={borderColor}
                borderRadius="xl"
                w="full"
                boxShadow="lg"
                bg={bgColor}
                _hover={{ transform: "translateY(-5px)", transition: "all 0.3s" }}
                onClick={() => handleRequirementClick(req)}
                cursor="pointer"
              >
                <VStack align="stretch" spacing={4}>
                  <Image src={req.thumbnailUrl} alt={req.title} borderRadius="md" objectFit="cover" height="200px" width="100%" />
                  <Heading as="h3" size="md" noOfLines={2}>
                    {req.title}
                  </Heading>
                  <Text fontSize="sm" color={textColor} noOfLines={3}>
                    {req.description}
                  </Text>
                  <Flex justify="space-between" align="center">
                    <Badge colorScheme="green" fontSize="sm" px={2} py={1} borderRadius="full">
                      {req.tokenOffered} ETH
                    </Badge>
                    <HStack>
                      <Badge colorScheme="blue">{req.dataType}</Badge>
                      <Button size="sm" colorScheme="teal" leftIcon={<Icon as={FaVideo} />} onClick={(e) => { e.stopPropagation(); window.open(req.videoUrl, "_blank"); }}>
                        Video
                      </Button>
                    </HStack>
                  </Flex>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Text fontSize="xl" color={textColor} textAlign="center">
            No requirements posted yet.
          </Text>
        )}
      </Box>

      {selectedRequirement && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
          <ModalOverlay />
          <ModalContent maxH="90vh">
            <ModalHeader>{selectedRequirement.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb={4}>{selectedRequirement.description}</Text>
              <Flex justify="space-between" align="center" mb={4}>
                <Badge colorScheme="blue">{selectedRequirement.dataType}</Badge>
                <Text fontWeight="bold" color="green.500">
                  Tokens Offered: {selectedRequirement.tokenOffered} ETH
                </Text>
              </Flex>
              <Button leftIcon={<Icon as={FaVideo} />} colorScheme="teal" mb={4} onClick={() => window.open(selectedRequirement.videoUrl, "_blank")}>
                Watch Video
              </Button>
              <Divider my={4} />
              <Heading as="h4" size="md" mb={4}>
                Responses
              </Heading>
              {selectedRequirement.responses && selectedRequirement.responses.length > 0 ? (
                selectedRequirement.responses.map((response) => (
                  <Box key={response.id} p={4} borderWidth={1} borderRadius="lg" mb={4} boxShadow="md">
                    <Heading as="h5" size="sm" mb={2}>{response.title}</Heading>
                    <Text mb={3}>{response.description}</Text>
                    <HStack>
                      <Button size="sm" colorScheme="blue" leftIcon={<Icon as={FaDownload} />} onClick={() => window.open(response.sampleDataUrl, "_blank")}>
                        Sample Data
                      </Button>
                      <Button size="sm" colorScheme="green" leftIcon={<Icon as={FaExternalLinkAlt} />} onClick={() => handleFullDataDownload(response.id, response.fullDataUrl)}>
                        Full Data
                      </Button>
                    </HStack>
                  </Box>
                ))
              ) : (
                <Text>No responses yet.</Text>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={() => alert("Not yet implemented.")}>Delete Requirement</Button>
              <Button variant="outline" onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Container>
  )
}