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
  Alert,
  AlertIcon,
  Text
} from "@chakra-ui/react";
import { WalletModel } from "..";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { contractAddress } from "../../utils/contract";

export default function Navbar({ setActiveTab }) {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const bgColor = useColorModeValue("blue.200", "blue.500");

  return (
    <Box shadow="2xl" borderRadius="3xl">
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
                <IconButton
                  bg={bgColor}
                  borderRadius="2xl"
                  size="md"
                  w={90}
                  fontSize="lg"
                  aria-label={`Switch to ${text} mode`}
                  variant="solid"
                  color="current"
                  ml={{ base: "0", md: "3" }}
                  onClick={toggleMode}
                  icon={<SwitchIcon />}
                />
              </VStack>
            </Box>
            <chakra.a
              href="/"
              title="wed3.0"
              display="flex"
              alignItems="center"
            >
              <VisuallyHidden>TrustFolio</VisuallyHidden>
            </chakra.a>
            <chakra.h1 fontWeight="semibold" fontSize="2xl">
              TrustFolio
            </chakra.h1>
          </HStack>
          <HStack spacing={3} display="flex" alignItems="center">
            <HStack spacing={3} display={{ base: "none", md: "inline-flex" }}>
              <WalletModel />
              <IconButton
                bg={bgColor}
                borderRadius="2xl"
                size="md"
                fontSize="lg"
                aria-label={`Switch to ${text} mode`}
                variant="solid"
                color="current"
                ml={{ base: "0", md: "3" }}
                onClick={toggleMode}
                icon={<SwitchIcon />}
              />
            </HStack>
            <chakra.a
              p={3}
              color={useColorModeValue("gray.800", "inherit")}
              rounded="sm"
              _hover={{ color: useColorModeValue("gray.800", "gray.600") }}
            ></chakra.a>
          </HStack>
        </Flex>
      </chakra.header>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mx={2}
        borderWidth={0}
        overflowX="auto"
      >
        <Tabs defaultIndex={0} borderBottomColor="transparent" onChange={(index) => setActiveTab(index)}>
          <TabList>
            <Tab fontWeight="semibold" py={4} m={0} _focus={{ boxShadow: "none" }}>
              Dashboard
            </Tab>
          </TabList>
        </Tabs>
      </Flex>
    </Box>
  );
}