import { Grid, Heading, Stack } from "@chakra-ui/react";
import PopularCard from "./ui/PopularCard"
import { usePopularMovies } from "../hooks/usePopularMovies";


const PopularSection = () => {
    const { data } = usePopularMovies();
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
        {data?.results.map((movies) => (
          <PopularCard movie={movies}/>
        ))}
      </Grid>
    </Stack>
  );
}

export default PopularSection