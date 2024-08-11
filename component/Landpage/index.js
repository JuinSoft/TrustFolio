import React, { useState, useEffect } from "react";
import { Box, Container, Heading, Text, VStack, Button, Flex, SimpleGrid, Icon, Image, HStack } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home({ setActiveTab }) {

  const useCases = [
    "Medical research needing specific patient experiences.",
    "Market research requiring detailed consumer behavior data.",
    "Environmental studies requiring data from specific regions.",
    "Educational research requiring student performance data.",
    "Urban planning requiring data on traffic patterns.",
    "Agricultural research needing data on crop yields.",
    "Social science research requiring data on community behavior.",
    "Healthcare research needing data on treatment outcomes.",
  ];

  const headlines = [
    "Forge the Future with Data, Connect Insights, and Craft Experiences",
    "Harness the Heartbeat of Insights, Trade Knowledge, and Spark Innovation",
    "Where Data Gravity Pulls Ideas Together for a Smarter Tomorrow",
    "Sync, Share, and Scale Your Data-Driven Vision",
    "Flow Beyond Data—Fuel Growth with Collective Intelligence"
  ];

  const whyChooseUs = [
    {
      title: "Data Marketplace",
      description: "Buy and sell data as a commodity, ensuring fair value for all parties.",
      image: "/user_data.png",
    },
    {
      title: "Crowdsourcing Platform",
      description: "Collect experiences and survey data from a broad audience efficiently.",
      image: "/user_data.png",
    },
    {
      title: "Market Research Platform",
      description: "Gather consumer insights and product feedback to drive innovation.",
      image: "/user_data.png",
    },
    {
      title: "Targeted Data Collection",
      description: "Get precisely the data you need by specifying requirements.",
      image: "/user_data.png",
    },
    {
      title: "Community Engagement",
      description: "Foster a community-driven approach where contributions are rewarded.",
      image: "/user_data.png",
    },
    {
      title: "Enhanced Trust",
      description: "Build trust through clear requirements and direct engagement.",
      image: "/user_data.png",
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
  const [currentWhyIndex, setCurrentWhyIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % useCases.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const headlineInterval = setInterval(() => {
      setCurrentHeadlineIndex((prevIndex) => (prevIndex + 1) % headlines.length);
    }, 5000); // Change headline every 5 seconds
    return () => clearInterval(headlineInterval);
  }, []);

  useEffect(() => {
    const whyInterval = setInterval(() => {
      setCurrentWhyIndex((prevIndex) => (prevIndex + 1) % whyChooseUs.length);
    }, 3000); // Change content every 3 seconds
    return () => clearInterval(whyInterval);
  }, []);


  return (
    <Box minHeight="100vh" bgGradient="linear(to-r, teal.600, lightBlue.600)" color="white">
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12} align="stretch">
          <Box textAlign="center">
            <motion.div
              key={currentHeadlineIndex}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Heading as="h1" fontSize="5xl" mb={4} color="yellow.300">
                {headlines[currentHeadlineIndex]}
              </Heading>
            </motion.div>
            <Button size="lg" colorScheme="blue" onClick={() => setActiveTab(1)}>Get Started</Button>
          </Box>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Heading as="h2" size="2xl" mb={4} textAlign="center">
              Why Choose Us?
            </Heading>
          </motion.div>
          <Box bg="white" color="white" p={8} borderRadius="xl" boxShadow="2xl" position="relative">
            <AnimatePresence exitBeforeEnter>
              <motion.div
                key={currentWhyIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <VStack spacing={6} align="stretch">
                  <Box position="relative" h="200px" overflow="hidden" borderRadius="lg">
                    <Image
                      src={whyChooseUs[currentWhyIndex].image}
                      alt={whyChooseUs[currentWhyIndex].title}
                      objectFit="cover"
                      w="100%"
                      h="100%"
                      borderRadius="lg"
                      boxShadow="lg"
                    />
                  </Box>
                  <Heading as="h3" size="lg" fontWeight="bold" fontFamily="Arial" color="teal.300">
                    {whyChooseUs[currentWhyIndex].title}
                  </Heading>
                  <Text fontSize="md" color="black" fontFamily="Arial" textAlign="justify">
                    {whyChooseUs[currentWhyIndex].description}
                  </Text>
                </VStack>
              </motion.div>
            </AnimatePresence>
          </Box>
          <Box textAlign="center" mt={16}>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Heading as="h2" size="2xl" mb={4}>
                Powered by
              </Heading>
              <HStack spacing={5} justify="center">
                <Image src="/base.png" boxSize="50px" alt="Icon 1" />
                <Image src="/worldcoin.png" boxSize="50px" alt="Icon 2" />
                <Image src="/blockscout.png" boxSize="50px" alt="Icon 3" />
              </HStack>
              <Text fontSize="lg" mb={8} color="yellow.300">
                Leveraging the power of blockchain to ensure transparency, security, and fair compensation.
              </Text>
            </motion.div>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              <Box bg="white" color="white" p={8} borderRadius="md" boxShadow="2xl">
                <Box position="relative" h="100px" overflow="hidden" borderRadius="lg" mb={4}>
                  <Image
                    src="/user_data.png"
                    alt="Use Cases"
                    objectFit="cover"
                    w="100%"
                    h="100%"
                  />
                </Box>
                <Heading as="h3" size="md" mb={2} color="teal.300">Use Cases</Heading>
                <AnimatePresence exitBeforeEnter>
                  <motion.div
                    key={currentIndex}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={itemVariants}
                  >
                    <Text as="span" className="animated-text" fontSize="md" color="black" fontFamily="Arial" textAlign="justify">
                      {useCases[currentIndex]}
                    </Text>
                  </motion.div>
                </AnimatePresence>
              </Box>
              <Box bg="white" color="white" p={8} borderRadius="md" boxShadow="2xl">
                <Box position="relative" h="100px" overflow="hidden" borderRadius="lg" mb={4}>
                  <Image
                    src="/user_data.png"
                    alt="Smart Contracts"
                    objectFit="cover"
                    w="100%"
                    h="100%"
                  />
                </Box>
                <Heading as="h3" size="md" mb={2} color="teal.300">Smart Contracts</Heading>
                <Text fontSize="md" color="black" fontFamily="Arial" textAlign="justify">
                  Facilitate transactions and ensure fair compensation for contributors.
                </Text>
              </Box>
              <Box bg="white" color="white" p={8} borderRadius="md" boxShadow="2xl">
                <Box position="relative" h="100px" overflow="hidden" borderRadius="lg" mb={4}>
                  <Image
                    src="/user_data.png"
                    alt="Token System"
                    objectFit="cover"
                    w="100%"
                    h="100%"
                  />
                </Box>
                <Heading as="h3" size="md" mb={2} color="teal.300">Reward System</Heading>
                <Text fontSize="md" color="black" fontFamily="Arial" textAlign="justify">
                  Reward participants with tokens for their contributions.
                </Text>
              </Box>
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}