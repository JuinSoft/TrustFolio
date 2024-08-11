import React, { useState, useEffect } from "react";
import { Box, Text, VStack, HStack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Image, AspectRatio, FormControl, FormLabel, Input, Textarea, useToast } from "@chakra-ui/react";
import sendFileToIPFS from "../utils/sendFileToIPFS";
import { useContract } from "../utils/useContract";
import { BigNumber, ethers } from "ethers";
import PostRequirement from "./PostRequirement";

export default function Marketplace() {
  const [requirements, setRequirements] = useState([]);
  const [selectedRequirement, setSelectedRequirement] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isPostOpen, onOpen: onPostOpen, onClose: onPostClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const { contract } = useContract();
  const toast = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sampleData: "",
    fullData: "",
  });

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const requirements = await contract.getAllRequirements();
        const data = requirements.filter(req => !req.isFullfilled).map(req => ({
          ...req,
          id: BigNumber.from(req[0]).toString(),
          tokenOffered: BigNumber.from(req[8]).toString(),
        }));
        setRequirements(data);
      } catch (error) {
        console.error("Error fetching accepted bids:", error);
      }
    };
    fetchRequirements();
  }, [contract]);

  const handleRequirementClick = (req) => {
    setSelectedRequirement(req);
    onOpen();
  };

  const handleSubmitDataClick = () => {
    onFormOpen();
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: files[0],
    }));
  };

  const handleSubmitData = async () => {
    setLoading(true);
    try {
      const sampleDataUrl = await sendFileToIPFS(formData.sampleData);
      const fullDataUrl = await sendFileToIPFS(formData.fullData);
  
      const tx = await contract.placeBid(
        selectedRequirement.id,
        formData.title,
        formData.description,
        sampleDataUrl,
        fullDataUrl
      );
      await tx.wait();
  
      toast({
        title: "Data Submitted",
        description: "Your data has been submitted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      toast({
        title: "Error",
        description: "Failed to submit data.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4}>
      <HStack justifyContent="space-between" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Explore Data Requirements
        </Text>
        <Button colorScheme="teal" onClick={onPostOpen}>
          Post Requirement
        </Button>
      </HStack>
      {requirements.length > 0 ? (
      <VStack spacing={4}>
        {requirements.map((req) => (
          <Box key={req.id} p={4} borderWidth={1} borderRadius="lg" w="full" onClick={() => handleRequirementClick(req)} cursor="pointer" _hover={{ shadow: "md" }}>
            <HStack spacing={4}>
              <Image src={req[5]} alt={req[2]} boxSize="100px" objectFit="cover" borderRadius="md" />
              <Box flex={1}>
                <HStack justifyContent="space-between">
                  <Text fontSize="xl" fontWeight="semibold">
                    {req[2]}
                  </Text>
                  <Text fontWeight="bold" color="green.500">{ethers.utils.formatEther(req.tokenOffered)} ETH</Text>
                </HStack>
                <Text mt={2} noOfLines={2}>{req[3]}</Text>
                <Text mt={2} fontSize="sm" color="gray.500">Data Type: {req[6]}</Text>
              </Box>
            </HStack>
          </Box>
          ))}
        </VStack>
      ) : (
        <Text>No requirements found.</Text>
      )}

      {selectedRequirement && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedRequirement[2]}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <AspectRatio ratio={16 / 9} mb={4}>
                {selectedRequirement[4].startsWith("video") ? (
                  <iframe
                    title={selectedRequirement[2]}
                    src={`https://player.thetavideoapi.com/video/${selectedRequirement[4]}`}
                    allowFullScreen
                  />
                ) : (
                  <iframe
                    title={selectedRequirement[2]}
                    src={selectedRequirement[4]}
                    allowFullScreen
                  />
                )}
              </AspectRatio>
              <Text mb={2} fontStyle="italic" color="blue.500">{selectedRequirement[3]}</Text>
              <Text fontStyle="bold" color="white.600">
                {selectedRequirement[7]}
              </Text>
              <Text fontWeight="bold" color="green.500" mt={2}>
                Tokens Offered: {ethers.utils.formatEther(selectedRequirement.tokenOffered)} ETH
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSubmitDataClick}>
                Submit Data
              </Button>
              <Button variant="ghost" onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <Modal isOpen={isFormOpen} onClose={onFormClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit Your Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="title" mb={4}>
              <FormLabel>Title</FormLabel>
              <Input placeholder="Enter the title of your data" value={formData.title} onChange={handleInputChange} />
            </FormControl>
            <FormControl id="description" mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea placeholder="Enter a description of your data" value={formData.description} onChange={handleInputChange} />
            </FormControl>
            <FormControl id="sampleData" mb={4}>
              <FormLabel>Sample Data</FormLabel>
              <Input type="file" onChange={handleFileChange} />
            </FormControl>
            <FormControl id="fullData" mb={4}>
              <FormLabel>Full Data</FormLabel>
              <Input type="file" onChange={handleFileChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmitData} isLoading={loading} isDisabled={loading}>
              {loading ? "Uploading..." : "Submit"}
            </Button>
            <Button variant="ghost" onClick={onFormClose} isDisabled={loading}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <PostRequirement isOpen={isPostOpen} onClose={onPostClose} />
    </Box>
  );
}