import { Group, Heading, Icon, IconButton, Image, Input, VStack } from '@chakra-ui/react'
import logo from "../assets/Images/logo.png";
import { LuSearch } from 'react-icons/lu';
import { useRef } from 'react';

const Header = () => {
  const searchRef=useRef<HTMLInputElement>(null);
  const handleSearch=()=>{
    if(searchRef.current && searchRef.current.value){
      console.log(searchRef.current.value);
      searchRef.current.value='';
    }
  }
  return (
    <VStack mt={"36"} gap={"4"} lg={{ gap: "8" }}>
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
      <Group attached flex="1" w={'full'}>
        <Input ref={searchRef} placeholder="Search contacts" />
        <IconButton onClick={handleSearch}>
          <Icon>
            <LuSearch color="primary" />
          </Icon>
        </IconButton>
      </Group>
    </VStack>
  );
}

export default Header