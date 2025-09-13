import type { popularCardProps } from "@/types/popular.model";
import { Card, Heading, Image, Stack } from "@chakra-ui/react";
import { BiStar } from "react-icons/bi";


const PopularCard = ({ movie }: popularCardProps) => {
  return (
    <Card.Root
      variant={"elevated"}
      backgroundColor={"#0F0D23"}
      rounded={"xl"}
      shadow={"2xl"}
      border={"none"}
      width={{ base: "200", lg: "300" }}
      height={{ base: "150", lg: "200" }}
      m={"3"}
    >
      <Card.Body gap="2">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.profile_path}`}
          rounded={"xl"}
          width={{ base: "200", lg: "300" }}
          height={{ base: "150", lg: "200" }}
        ></Image>
      </Card.Body>
      <Card.Footer>
        <Stack direction="column" justify={"center"}>
          <Card.Title mt="2" key={movie.id}>
            {movie.name}
          </Card.Title>
          <Stack direction="row">
            <BiStar size={16} color="#ffff00" strokeWidth={2} />
            <p>{movie.popularity}</p>
            <p>{}</p>
          </Stack>
        </Stack>
      </Card.Footer>
    </Card.Root>
  );
};

export default PopularCard