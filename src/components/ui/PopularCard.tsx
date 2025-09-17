import { useGenres } from "../../hooks/useGenres";
import type { popularCardProps } from "@/types/popular.model";
import { Card, Image, Stack } from "@chakra-ui/react";
import { BiStar } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const PopularCard = ({ movie }: popularCardProps) => {
  const { data: genres } = useGenres();
  const navigate = useNavigate();

  const movieGenres = movie.genre_ids
    .map((id) => genres?.find((g) => g.id === id)?.name)
    .filter((name): name is string => !!name);

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Card.Root
      variant={"elevated"}
      backgroundColor={"#0F0D23"}
      rounded={"xl"}
      shadow={"2xl"}
      border={"none"}
      width={{ base: "200", lg: "100" }}
      height={{ base: "150", lg: "180" }}
      m={"3"}
      style={{ cursor: "pointer" }}
      onClick={handleClick}
    >
      <Card.Body gap="2">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          rounded={"xl"}
          width={{ base: "200", lg: "80" }}
          height={{ base: "150", lg: "150" }}
        ></Image>
      </Card.Body>
      <Card.Footer>
        <Stack direction="column" justify={"center"}>
          <Card.Title key={movie.id}>
            {movie.title}
          </Card.Title>
          <Stack direction="row">
            <BiStar size={16} color="#ffff00" strokeWidth={2} />
            <p>{movie.vote_average}</p>
            {movieGenres.slice(0,2).map((genre) => (
              <p key={genre}>{genre}</p>
            ))}
          </Stack>
        </Stack>
      </Card.Footer>
    </Card.Root>
  );
};

export default PopularCard