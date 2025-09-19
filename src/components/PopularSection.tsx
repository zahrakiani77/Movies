import { Grid, Heading, Skeleton, SkeletonText, Stack, VStack } from "@chakra-ui/react";
import PopularCard from "./ui/PopularCard"
import { usePopularMovies } from "../hooks/usePopularMovies";


const PopularSection = () => {
    const { data, isLoading } = usePopularMovies();
  return (
    <Stack gap={"10"}>
      <Heading fontWeight={"semibold"} fontSize={"xl"} textAlign={"center"}>
        Popular
      </Heading>


      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }}
        templateRows={{ base: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap="6"
      >
        {isLoading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <VStack
                key={`popular-skel-${idx}`}
                bg="#0F0D23"
                rounded={"xl"}
                shadow={"2xl"}
                overflow={"hidden"}
                p="3"
              >
                <Skeleton height="150px" width="100%" rounded="xl" />
                <SkeletonText mt="4" noOfLines={2}  width="80%" />
              </VStack>
            ))
          : data?.results.map((movies) => (
              <PopularCard key={movies.id} movie={movies} />
            ))}
      </Grid>
    </Stack>
  );
}

export default PopularSection