import React, { useState, useEffect } from "react";
import { Box, Container, Heading, Text, VStack, Button, Flex, SimpleGrid, Icon, Image, Stack } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home({ setActiveTab }) {

  const useCases = [
    "Medical research needing specific patient experiences.",
    "Market research requiring detailed consumer behavior data.",
    "Environmental studies requiring data from specific regions.",
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % useCases.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Box minHeight="100vh" bgGradient="linear(to-r, teal.600, green.600)" color="white">
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12} align="stretch">
          <Box textAlign="center">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Heading as="h1" size="3xl" mb={4} color="white" textShadow="2px 2px #000">
                Decentralized Data Collection Platform
              </Heading>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Text fontSize="xl" mb={8} color="yellow.300" textShadow="1px 1px #000">
                Empowering researchers, scientists, and companies to gather precise data through community engagement and token incentives.
              </Text>
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
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Box bg="white" color="black" p={8} borderRadius="xl" boxShadow="2xl">
              <VStack spacing={6} align="stretch">
                <Box position="relative" h="200px" overflow="hidden" borderRadius="lg">
                  <Image
                    src="/user_data.png"
                    alt="Targeted Data Collection"
                    objectFit="cover"
                    w="100%"
                    h="100%"
                  />
                </Box>
                <Heading as="h3" size="lg" fontWeight="bold" fontFamily="Arial">Targeted Data Collection</Heading>
                <Text fontSize="md" color="gray.700" fontFamily="Arial">
                  Get precisely the data you need by specifying requirements.
                </Text>
              </VStack>
            </Box>
            <Box bg="white" color="black" p={8} borderRadius="xl" boxShadow="2xl">
              <VStack spacing={6} align="stretch">
                <Box position="relative" h="200px" overflow="hidden" borderRadius="lg">
                  <Image
                    src="/user_data.png"
                    alt="Community Engagement"
                    objectFit="cover"
                    w="100%"
                    h="100%"
                  />
                </Box>
                <Heading as="h3" size="lg" fontWeight="bold" fontFamily="Arial">Community Engagement</Heading>
                <Text fontSize="md" color="gray.700" fontFamily="Arial">
                  Foster a community-driven approach where contributions are rewarded.
                </Text>
              </VStack>
            </Box>
            <Box bg="white" color="black" p={8} borderRadius="xl" boxShadow="2xl">
              <VStack spacing={6} align="stretch">
                <Box position="relative" h="200px" overflow="hidden" borderRadius="lg">
                  <Image
                    src="/user_data.png"
                    alt="Enhanced Trust"
                    objectFit="cover"
                    w="100%"
                    h="100%"
                  />
                </Box>
                <Heading as="h3" size="lg" fontWeight="bold" fontFamily="Arial">Enhanced Trust</Heading>
                <Text fontSize="md" color="gray.700" fontFamily="Arial">
                  Build trust through clear requirements and direct engagement.
                </Text>
              </VStack>
            </Box>
          </SimpleGrid>

          <Box textAlign="center" mt={16}>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Heading as="h2" size="2xl" mb={4}>
                Powered by Blockchain
              </Heading>
              <Text fontSize="lg" mb={8} color="yellow.300">
                Leveraging the power of blockchain to ensure transparency, security, and fair compensation.
              </Text>
            </motion.div>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              <Box bg="gray.900" color="white" p={8} borderRadius="md" boxShadow="2xl">
                <Box position="relative" h="100px" overflow="hidden" borderRadius="lg" mb={4}>
                  <Image
                    src="/user_data.png"
                    alt="Use Cases"
                    objectFit="cover"
                    w="100%"
                    h="100%"
                  />
                </Box>
                <Heading as="h3" size="md" mb={2}>Use Cases</Heading>
                <AnimatePresence exitBeforeEnter>
                  <motion.div
                    key={currentIndex}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={itemVariants}
                  >
                    <Text as="span" className="animated-text">
                      {useCases[currentIndex]}
                    </Text>
                  </motion.div>
                </AnimatePresence>
              </Box>
              <Box bg="gray.900" color="white" p={8} borderRadius="md" boxShadow="2xl">
                <Box position="relative" h="100px" overflow="hidden" borderRadius="lg" mb={4}>
                  <Image
                    src="/user_data.png"
                    alt="Smart Contracts"
                    objectFit="cover"
                    w="100%"
                    h="100%"
                  />
                </Box>
                <Heading as="h3" size="md" mb={2}>Smart Contracts</Heading>
                <Text>Facilitate transactions and ensure fair compensation for contributors.</Text>
              </Box>
              <Box bg="gray.900" color="white" p={8} borderRadius="md" boxShadow="2xl">
                <Box position="relative" h="100px" overflow="hidden" borderRadius="lg" mb={4}>
                  <Image
                    src="/user_data.png"
                    alt="Token System"
                    objectFit="cover"
                    w="100%"
                    h="100%"
                  />
                </Box>
                <Heading as="h3" size="md" mb={2}>Reward System</Heading>
                <Text>Reward participants with tokens for their contributions.</Text>
              </Box>
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}