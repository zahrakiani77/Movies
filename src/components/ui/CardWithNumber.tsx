import { useTrending } from '../../hooks/useTrending';
import {  Heading, Image, Skeleton, VStack} from '@chakra-ui/react';
import { motion } from 'framer-motion';


const CardWithNumber = () => {
      const { data, isLoading } = useTrending();
  if (isLoading) {
    return Array.from({ length: 6 }).map((_, index) => (
      <motion.div
        key={`trend-skel-${index}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
      >
        <VStack
          bg="bg"
          height={"32"}
          width={"28"}
          shadow="md"
          borderRadius="md"
          justifyContent={"center"}
          overflow="hidden"
          transition="transform 250ms ease, box-shadow 300ms ease"
          transform="translateY(0) scale(1)"
          boxShadow="0 0 0 0 rgba(138,43,226,0), 0 0 0 0 rgba(0,212,255,0)"
          _hover={{
            transform: "translateY(-4px) scale(1.02)",
            shadow: "lg",
            boxShadow:
              "0 0 0 2px rgba(138,43,226,0.55), 0 0 22px 6px rgba(138,43,226,0.45), 0 0 44px 16px rgba(0,212,255,0.25)",
          }}
        >
          <Heading
            fontFamily={"RibeEye"}
            fontSize={"8xl"}
            ml={"-36"}
            color="#CECEFB1A"
          >
            {index + 1}
          </Heading>
          <Skeleton height="24" width="20" rounded="md" />
        </VStack>
      </motion.div>
    ));
  }

  return data?.results.slice(0, 6).map((m, index) => (
    <motion.div
      key={m.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
    >
      <VStack
        bg="bg"
        height={"32"}
        width={"28"}
        shadow="md"
        borderRadius="md"
        justifyContent={"center"}
        overflow="hidden"
        transition="transform 250ms ease, box-shadow 300ms ease"
        transform="translateY(0) scale(1)"
        boxShadow="0 0 0 0 rgba(138,43,226,0), 0 0 0 0 rgba(0,212,255,0)"
        _hover={{
          transform: "translateY(-4px) scale(1.02)",
          shadow: "lg",
          boxShadow:
            "0 0 0 2px rgba(138,43,226,0.55), 0 0 22px 6px rgba(138,43,226,0.45), 0 0 44px 16px rgba(0,212,255,0.25)",
        }}
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
          src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
          transition="transform 350ms ease"
          transform="scale(1)"
          _groupHover={{ transform: "scale(1.06)" }}
        ></Image>
      </VStack>
    </motion.div>
  ));
}

export default CardWithNumber