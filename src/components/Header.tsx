import { Box, Heading, Image, Input, InputGroup, VStack } from '@chakra-ui/react'
import  background  from '../assets/Images/BG.png'
import logo from "../assets/Images/logo.png";
import { LuSearch } from 'react-icons/lu';

const Header = () => {
  return (
    <Box position={"relative"}>
      <Box width="100vw" overflow="hidden">
        <Image src={background} width={"100%"} objectFit={"contain"}></Image>s
      </Box>
      <VStack
        zIndex={20}
        position="absolute"
        top="100px"
        left="50%"
        transform="translateX(-50%)"
      >
        <Image src={logo}></Image>

        <Heading color={"white"} size={"5xl"}>
          Find Movies You’ll Love{" "}
        </Heading>
        <Heading color={"white"} size={"5xl"}>
          Without the Hassle
        </Heading>
        <InputGroup flex="1" startElement={<LuSearch color="primary" />}>
          <Input placeholder="Search contacts" />
        </InputGroup>
      </VStack>
    </Box>
  );
}

export default Header