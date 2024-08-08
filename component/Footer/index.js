import { Box, Container, Text, useColorModeValue } from "@chakra-ui/react";

export default function Footers() {
  const bg = useColorModeValue("white", "inherit");
  const color = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("gray.400", "blue.500");

  return (
    <Box bgGradient="linear(to-r, teal.500, green.500)" color={color} position="relative">
      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={borderColor}
        color={useColorModeValue("white", "white")}
      >
        <Container maxW={"6xl"} py={4}>
          <Text align="center">
            © 2024 Trustfolio. Built with ❤️ for <a href="https://ethglobal.com/events/superhack2024">Superhack 2024</a>.
          </Text>
        </Container>
      </Box>
    </Box>
  );
}