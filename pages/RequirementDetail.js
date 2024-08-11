import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Flex,
  Tag,
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Textarea,
  FormControl,
  FormLabel
} from "@chakra-ui/react";

export default function RequirementDetail({ isOpen, onClose, requirement }) {
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sampleData: null,
    fullData: null,
    isVerified: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmitData = () => {
    console.log(formData);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" colorScheme="gray">
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>{requirement.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Flex justify="space-between" align="center">
                <Tag colorScheme="teal">{requirement.amount} ETH</Tag>
                <Text>{requirement.datePosted}</Text>
              </Flex>
              <Text>{requirement.description}</Text>
              <Text>{requirement.additionalInfo}</Text>
              <HStack spacing={2}>
                {requirement.tags.map((tag, index) => (
                  <Tag key={index} colorScheme="teal">
                    {tag}
                  </Tag>
                ))}
              </HStack>
              <Box>
                <iframe
                  width="100%"
                  height="315"
                  src={requirement.video}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Box>
              <Text fontWeight="bold">Total Responses: {requirement.totalResponses}</Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={onFormOpen}>
              Submit
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
    </>
  );
}