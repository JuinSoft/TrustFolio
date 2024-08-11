import React, { useState } from "react";
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
  Badge,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
  Select,
  FormControl,
  FormLabel,
  Tooltip,
} from "@chakra-ui/react";
import { SearchIcon, AddIcon, DownloadIcon, InfoIcon } from "@chakra-ui/icons";

const dataItems = [
  {
    title: "Medical Research Data",
    description: "Patient experiences and outcomes.",
    type: "Healthcare",
    tags: ["Healthcare", "Research"],
    replies: 23,
    time: "2 days",
    amount: "10",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    sampleData: "/path/to/sample-data",
    fullData: "/path/to/full-data",
    downloads: 120,
    isVerified: true,
  },
  {
    title: "Market Research Data",
    description: "Consumer behavior data.",
    type: "Market",
    tags: ["Market", "Research"],
    replies: 16,
    time: "16 hours",
    amount: "20",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    sampleData: "/path/to/sample-data",
    fullData: "/path/to/full-data",
    downloads: 45,
    isVerified: false,
  },
];

const DataItem = ({ item }) => (
  <Box
    bg="gray.800"
    p={6}
    borderRadius="lg"
    boxShadow="lg"
    transition="all 0.3s"
    _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
  >
    <Flex justify="space-between" align="center" mb={4}>
      <Heading as="h3" size="md">
        {item.title}
      </Heading>
      <Tag colorScheme="green" fontSize="lg" fontWeight="bold">
        {item.amount} ETH
      </Tag>
    </Flex>
    <Text mb={4}>{item.description}</Text>
    <Text mb={4}>
      <strong>Type:</strong> {item.type}
    </Text>
    <HStack spacing={2} mb={4} flexWrap="wrap">
      {item.tags.map((tag, idx) => (
        <Tag key={idx} colorScheme="teal">
          {tag}
        </Tag>
      ))}
    </HStack>
    <Box mb={4} borderRadius="md" overflow="hidden">
      <iframe
        width="100%"
        height="200"
        src={item.video}
        title="Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Box>
    <HStack spacing={4} mb={4}>
      <Button
        as={Link}
        href={item.sampleData}
        colorScheme="teal"
        leftIcon={<DownloadIcon />}
        size="sm"
      >
        Sample
      </Button>
      <Button
        as={Link}
        href={item.fullData}
        colorScheme="teal"
        leftIcon={<DownloadIcon />}
        size="sm"
      >
        Full Data
      </Button>
    </HStack>
    <Flex justify="space-between" align="center" mb={4}>
      <Text fontSize="sm">{item.replies} Replies</Text>
      <Text fontSize="sm">{item.time}</Text>
    </Flex>
    <Flex justify="space-between" align="center">
      <Text fontSize="sm">{item.downloads} Downloads</Text>
      <Badge colorScheme={item.isVerified ? "green" : "red"}>
        {item.isVerified ? "Verified" : "Not Verified"}
      </Badge>
    </Flex>
  </Box>
);

const SellDataForm = ({ activeStep, formData, handleChange, handleTagChange, handleTagDelete }) => {
  const steps = [
    { title: "Basic Information", fields: ["title", "description", "type", "tags", "amount"] },
    { title: "Data Files", fields: ["fullData", "sampleData"] },
    { title: "Additional Information", fields: ["video"] },
  ];

  const currentStep = steps[activeStep];

  return (
    <VStack spacing={4} align="stretch">
      {currentStep.fields.map((field) => (
        <FormControl key={field}>
          <FormLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</FormLabel>
          {field === "tags" ? (
            <>
              <Input
                placeholder="Add tags"
                onKeyPress={handleTagChange}
                variant="filled"
              />
              <HStack spacing={2} mt={2}>
                {formData.tags.map((tag, index) => (
                  <Tag
                    size="md"
                    key={index}
                    borderRadius="full"
                    variant="solid"
                    colorScheme="teal"
                  >
                    {tag}
                  </Tag>
                ))}
              </HStack>
            </>
          ) : field === "description" ? (
            <Textarea
              name={field}
              value={formData[field]}
              onChange={handleChange}
              variant="filled"
            />
          ) : (
            <Input
              name={field}
              value={formData[field]}
              onChange={handleChange}
              variant="filled"
            />
          )}
        </FormControl>
      ))}
    </VStack>
  );
};

export default function Dataplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    tags: [],
    amount: "",
    video: "",
    sampleData: "",
    fullData: "",
  });

  const steps = [
    { title: "Basic Information", description: "Enter title, description, and other details" },
    { title: "Data Files", description: "Upload full and sample data files" },
    { title: "Additional Information", description: "Add video URL and other optional details" },
  ];

  const filteredDataItems = dataItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "" || item.type === filterType)
  );

  const handleSearch = (event) => setSearchTerm(event.target.value);
  const handleFilter = (event) => setFilterType(event.target.value);
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleNext = () =>
    setActiveStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  const handleBack = () => setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  const handleTagChange = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      setFormData({
        ...formData,
        tags: [...formData.tags, e.target.value.trim()]
      });
      e.target.value = ""; // Clear input after adding tag
    }
  };

  const handleTagDelete = (index) => {
    const newTags = formData.tags.filter((_, idx) => idx !== index);
    setFormData({ ...formData, tags: newTags });
  };

  return (
    <Box minHeight="100vh" bg="gray.900" color="white">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Flex justify="space-between" align="center">
            <Heading as="h1" size="xl">
              Data Marketplace
            </Heading>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="teal"
              onClick={onOpen}
              size="lg"
            >
              Commoditize Data
            </Button>
          </Flex>
          <Flex gap={4} flexWrap="wrap">
            <InputGroup flex={1}>
              <Input
                placeholder="Search data..."
                value={searchTerm}
                onChange={handleSearch}
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
              placeholder="Filter by type"
              value={filterType}
              onChange={handleFilter}
              maxW="200px"
            >
              <option value="Healthcare">Healthcare</option>
              <option value="Market">Market</option>
            </Select>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {filteredDataItems.map((item, index) => (
              <DataItem key={index} item={item} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>Commoditize Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} align="stretch">
              <Flex justify="space-between" align="center">
                <Heading size="md">{steps[activeStep].title}</Heading>
                <Tooltip label={steps[activeStep].description}>
                  <InfoIcon />
                </Tooltip>
              </Flex>
              <SellDataForm
                activeStep={activeStep}
                formData={formData}
                handleChange={handleChange}
                handleTagChange={handleTagChange}
                handleTagDelete={handleTagDelete}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleBack}
              isDisabled={activeStep === 0}
              mr={4}
              colorScheme="gray"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              isDisabled={activeStep === steps.length - 1}
              colorScheme="teal"
            >
              Next
            </Button>
            {activeStep === steps.length - 1 && (
              <Button colorScheme="teal" onClick={onClose} ml={4}>
                Submit
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}