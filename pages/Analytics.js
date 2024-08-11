import React from "react";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Text,
  VStack,
  HStack,
  Flex,
} from "@chakra-ui/react";

// Mock data (replace with actual data from your application)
const userData = {
  totalEarned: 15.5,
  totalSpent: 8.2,
  postedData: 12,
  acceptedBids: 7,
  pendingBids: 3,
};

const earningsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Earnings',
      data: [3, 5, 2, 8, 4, 6],
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1,
    },
  ],
};

const bidStatusData = {
  labels: ['Accepted', 'Pending', 'Rejected'],
  datasets: [
    {
      data: [7, 3, 2],
      backgroundColor: ['#48BB78', '#ECC94B', '#F56565'],
    },
  ],
};

const dataTypeDistribution = {
  labels: ['Medical', 'Market Research', 'Environmental', 'Other'],
  datasets: [
    {
      data: [4, 3, 2, 3],
      backgroundColor: ['#4299E1', '#ED64A6', '#48BB78', '#ECC94B'],
    },
  ],
};

export default function Analytics() {
  return (
    <Box minHeight="100vh" bg="gray.800" color="white" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="xl" textAlign="center" mb={8}>
            Analytics Dashboard (TODO)
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            <Stat bg="gray.700" p={4} borderRadius="lg" boxShadow="dark-lg">
              <StatLabel>Total Earned</StatLabel>
              <StatNumber>{userData.totalEarned} ETH</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
            <Stat bg="gray.700" p={4} borderRadius="lg" boxShadow="dark-lg">
              <StatLabel>Total Spent</StatLabel>
              <StatNumber>{userData.totalSpent} ETH</StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                9.05%
              </StatHelpText>
            </Stat>
            <Stat bg="gray.700" p={4} borderRadius="lg" boxShadow="dark-lg">
              <StatLabel>Posted Data</StatLabel>
              <StatNumber>{userData.postedData}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                12.5%
              </StatHelpText>
            </Stat>
          </SimpleGrid>
{/* 
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
            <Box bg="gray.700" p={6} borderRadius="lg" boxShadow="dark-lg">
              <Heading as="h3" size="md" mb={4}>
                Earnings Over Time
              </Heading>
              <Line data={earningsData} options={{ responsive: true }} />
            </Box>
            <Box bg="gray.700" p={6} borderRadius="lg" boxShadow="dark-lg">
              <Heading as="h3" size="md" mb={4}>
                Bid Status Distribution
              </Heading>
              <Doughnut data={bidStatusData} options={{ responsive: true }} />
            </Box>
          </SimpleGrid> */}

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
            {/* <Box bg="gray.700" p={6} borderRadius="lg" boxShadow="dark-lg">
              <Heading as="h3" size="md" mb={4}>
                Data Type Distribution
              </Heading>
              <Bar data={dataTypeDistribution} options={{ responsive: true }} />
            </Box> */}
            <Box bg="gray.700" p={6} borderRadius="lg" boxShadow="dark-lg">
              <Heading as="h3" size="md" mb={4}>
                Recent Activity
              </Heading>
              <VStack align="stretch" spacing={4}>
                <HStack justify="space-between">
                  <Text>Posted new data requirement</Text>
                  <Text color="gray.300">2 hours ago</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>Bid accepted on Medical Research Data</Text>
                  <Text color="gray.300">1 day ago</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>Received payment for Environmental Data</Text>
                  <Text color="gray.300">3 days ago</Text>
                </HStack>
              </VStack>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}