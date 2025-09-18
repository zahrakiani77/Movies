import { Grid, Heading, Stack } from '@chakra-ui/react'
import CardWithNumber from './ui/CardWithNumber'

const Trending = () => {
  return (
    <Stack gap={"20"} >
      <Heading fontWeight={"semibold"} fontSize={"xl"} textAlign={"center"}>
        Trending
      </Heading>
      
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(6, 1fr)" }}
        templateRows={{ base: "repeat(3, 1fr)", lg: "repeat(1, 1fr)" }}
        gap={{ base: "28", lg: "16" }}
      >
        <CardWithNumber />
      </Grid>
    </Stack>
  );
}

export default Trending