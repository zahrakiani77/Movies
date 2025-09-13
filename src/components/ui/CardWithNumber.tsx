import { useTrending } from '../../hooks/useTrending';
import {  Heading, Image, VStack} from '@chakra-ui/react';


const CardWithNumber = () => {
      const { data } = useTrending();
  return data?.results.slice(0, 6).map((m, index) => (
    <VStack
      bg="bg"
      height={"32"}
      width={"28"}
      shadow="md"
      borderRadius="md"
      justifyContent={"center"}
    >
      <Heading
        fontFamily={"RibeEye"}
        fontSize={"8xl"}
        ml={"-36"}
        color="#CECEFB1A"
      >
        {index + 1}
      </Heading>
      <Image
        key={m.id}
        src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
      ></Image>
    </VStack>
  ));
}

export default CardWithNumber