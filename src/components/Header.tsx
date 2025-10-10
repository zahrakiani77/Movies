import { Group, Heading, Icon, IconButton, Image, Input, VStack } from '@chakra-ui/react'
import logo from "../assets/Images/logo.png";
import { LuSearch } from 'react-icons/lu';
import { useEffect, useRef, type KeyboardEvent } from 'react';
import { useMoviesStore } from '../stores/moviesStore';

const Header = () => {
  const searchRef=useRef<HTMLInputElement>(null);
  const searchTerm = useMoviesStore((state) => state.searchTerm);
  const setSearchTerm = useMoviesStore((state) => state.setSearchTerm);
  const clearSearch = useMoviesStore((state) => state.clearSearch);

  useEffect(() => {
    if (!searchRef.current) return;
    if (!searchTerm) {
      searchRef.current.value = "";
    }
  }, [searchTerm]);

  const submitSearch = () => {
    if(!searchRef.current) return;
    const value = searchRef.current.value.trim();

    if(value.length === 0){
      clearSearch();
      // Smoothly scroll to top when clearing search to avoid layout jump
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch {}
      return;
    }

    setSearchTerm(value);
    // Blur the input so the browser doesn't try to keep it in view during layout changes
    // which can cause a visible "jump"
    setTimeout(() => searchRef.current?.blur(), 0);
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch {}
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter'){
      submitSearch();
    }

    if(event.key === 'Escape'){
      clearSearch();
      if(searchRef.current){
        searchRef.current.value='';
      }
    }
  };

  const handleSearch=()=>{
    submitSearch();
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
        <Input
          ref={searchRef}
          placeholder="Search movies"
          onKeyDown={handleKeyDown}
        />
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