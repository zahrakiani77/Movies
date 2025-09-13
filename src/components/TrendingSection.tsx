import { Heading, Stack } from '@chakra-ui/react'
import CardWithNumber from './ui/CardWithNumber'

const Trending = () => {
  return (
    <Stack gap={'10'}>
      <Heading fontWeight={"semibold"} fontSize={"xl"}>
        Trending
      </Heading>
      <Stack direction="row" gap={"20"}>
        <CardWithNumber />
      </Stack>
    </Stack>
  );
}

export default Trending