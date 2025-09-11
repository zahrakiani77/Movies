import { Heading, Image, Input, InputGroup, VStack } from '@chakra-ui/react'
import logo from "../assets/Images/logo.png";
import { LuSearch } from 'react-icons/lu';

const Header = () => {
  return (
      <VStack
      mt={'36'}
        gap={"4"}
        lg={{ gap: "8" }}
      >
        <Image src={logo} width={"2/12"}></Image>

        <Heading
          color={"white"}
          size={"2xl"}
          fontWeight={"medium"}
          lg={{ fontSize: "5xl" }}
        >
          Find Movies You’ll Love{" "}
        </Heading>
        <Heading
          color={"white"}
          size={"2xl"}
          fontWeight={"medium"}
          lg={{ fontSize: "5xl" }}
        >
          Without the Hassle
        </Heading>
        <InputGroup flex="1" startElement={<LuSearch color="primary" />}>
          <Input placeholder="Search contacts" />
        </InputGroup>
      </VStack>
  );
}

export default Header