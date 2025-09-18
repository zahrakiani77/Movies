import { useTrending } from '../../hooks/useTrending';
import {  Heading, Image, VStack} from '@chakra-ui/react';


const CardWithNumber = () => {
      const { data } = useTrending();
  return data?.results.slice(0, 6).map((m, index) => {
    const path = m.poster_path || m.profile_path || m.backdrop_path;
    const src = path ? `https://image.tmdb.org/t/p/w500${path}` : '/fallback-poster.png';
    return (
      <VStack key={m.id} bg="bg" height={"32"} width={"28"} shadow="md" borderRadius="md" justifyContent={'center'}>
        <Heading fontFamily={"RibeEye"} fontSize={"8xl"} ml={'-36'} color='#CECEFB1A'>
          {index + 1}
        </Heading>
        <Image
          src={src}
          alt={m.title || m.name || 'Trending'}
          loading="lazy"
        ></Image>
      </VStack>
    );
  });
}

export default CardWithNumber;