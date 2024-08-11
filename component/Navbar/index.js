import React, { useState } from "react";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Tabs,
  TabList,
  Tab,
  Spacer,
  useColorMode,
  Text
} from "@chakra-ui/react";
import { WalletModel } from "..";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Navbar({ setActiveTab, activeTab }) {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const bgColor = useColorModeValue("blue.200", "blue.500");

  return (
    <>
      <Box bgGradient="linear(to-r, teal.500, lightBlue.500)" shadow="2xl" borderRadius="3xl" h="100vh" w="250px" position="fixed">
        <chakra.header
          bg={bg}
          borderColor={useColorModeValue("gray.400", "blue.500")}
          borderBottomWidth={1}
          w="full"
          px={{ base: 2, sm: 4 }}
          py={4}
        >
          <Flex alignItems="center" justifyContent="space-between" mx="auto">
            <HStack spacing={4} display="flex" alignItems="center">
              <Box display={{ base: "inline-flex", md: "none" }}>
                <IconButton
                  display={{ base: "flex", md: "none" }}
                  aria-label="Open menu"
                  fontSize="20px"
                  color={useColorModeValue("gray.800", "inherit")}
                  variant="solid"
                  icon={<AiOutlineMenu />}
                  onClick={mobileNav.onOpen}
                />
                <VStack
                  pos="absolute"
                  top={0}
                  left={0}
                  right={0}
                  display={mobileNav.isOpen ? "flex" : "none"}
                  flexDirection="column"
                  p={2}
                  pb={4}
                  m={2}
                  bg={bg}
                  spacing={3}
                  rounded="sm"
                  shadow="sm"
                >
                  <CloseButton
                    aria-label="Close menu"
                    justifySelf="self-start"
                    onClick={mobileNav.onClose}
                  />
                  <WalletModel />
                </VStack>
              </Box>
              <chakra.a
                href="/"
                title="web3.0"
                display="flex"
                alignItems="center"
              >
                <VisuallyHidden>TrustFolio</VisuallyHidden>
              </chakra.a>
              <chakra.h1 fontWeight="semibold" fontSize="2xl">
                TrustFolio
              </chakra.h1>
            </HStack>
          </Flex>
        </chakra.header>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          mx={2}
          borderWidth={0}
          overflowX="auto"
          flexDirection="column"
        >
          <Tabs defaultIndex={0} borderBottomColor="transparent" onChange={(index) => setActiveTab(index)}>
            <TabList flexDirection="column">
              <Tab fontWeight="semibold" py={4} m={0} _focus={{ boxShadow: "none" }}>
                Home
              </Tab>
              <Tab fontWeight="semibold" py={4} m={0} _focus={{ boxShadow: "none" }}>
                Data Marketplace
              </Tab>
              <Tab fontWeight="semibold" py={4} m={0} _focus={{ boxShadow: "none" }}>
                DataPalace
              </Tab>
              <Tab fontWeight="semibold" py={4} m={0} _focus={{ boxShadow: "none" }}>
                My Bids
              </Tab>
              <Tab fontWeight="semibold" py={4} m={0} _focus={{ boxShadow: "none" }}>
                Analytics Dashboard
              </Tab>
            </TabList>
          </Tabs>
        </Flex>
      </Box>
      {activeTab == 0 && (
        <Box position="fixed" top={4} right={4} zIndex={1}>
          <WalletModel />
        </Box>
      )}
    </>
  );
}