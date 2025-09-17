import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
interface MovieGenre {
  id: number;
  name: string;
}

interface MovieDetailsApi {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  original_language: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  genres: MovieGenre[];
}
import { axiosInstance } from "../utils/lib";
import { useGenres } from "../hooks/useGenres";
import { Box, Flex, Image, Text, Button, VStack, HStack, Icon } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { BiStar, BiHeart } from "react-icons/bi";
import React from "react";

// MovieDetailProps removed, we fetch movie by id

const DetailItem = ({ label, value }: { label: string; value: string }) => {
  const subText = useColorModeValue("#A1A1A1", "#A1A1A1");
  const textColor = useColorModeValue("#fff", "#fff");
  return (
    <Box minW="200px">
      <Text fontSize="sm" color={subText}>
        {label}
      </Text>
      <Text fontWeight="bold" color={textColor}>
        {value}
      </Text>
    </Box>
  );
};


const MovieDetail: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetailsApi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: genres } = useGenres();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axiosInstance
      .get(`/movie/${id}`)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.response?.data?.status_message || err?.message || "Failed to load movie details.");
        setLoading(false);
      });
  }, [id]);

  const bg = useColorModeValue("#18152A", "#18152A");
  const textColor = useColorModeValue("#fff", "#fff");
  const subText = useColorModeValue("#A1A1A1", "#A1A1A1");
  const tagBg = useColorModeValue("#26243A", "#26243A");

  if (loading) return <Box color={textColor} p={8}>Loading...</Box>;
  if (error) return <Box color={textColor} p={8}>{error || "Failed to load movie details."}</Box>;
  if (!movie) return null;

  // Genre names
  const movieGenres = movie.genres ? movie.genres.map((g) => g.name) : [];

  return (
    <Box bg={bg} color={textColor} p={8} borderRadius="2xl" maxW="1200px" mx="auto">
      <Flex justify="space-between" align="center" mb={6} wrap="wrap">
        <VStack align="start" gap={1}>
          <Text fontSize="3xl" fontWeight="bold">
            {movie.title}
          </Text>
          <Text fontSize="md" color={subText}>
            {movie.release_date} · {movie.original_language?.toUpperCase()}
          </Text>
        </VStack>
        <HStack gap={4}>
          <HStack bg={tagBg} px={3} py={1} borderRadius="lg" align="center">
            <Icon as={BiStar} color="#FFD600" />
            <Text fontWeight="bold">{movie.vote_average?.toFixed(1)}</Text>
            <Text color={subText}>({movie.vote_count})</Text>
          </HStack>
          <Button bg={tagBg} borderRadius="lg" color={subText}>
            <BiHeart />
            {movie.popularity ? Math.round(movie.popularity) : 1}
          </Button>
        </HStack>
      </Flex>
      <Flex gap={8} direction={{ base: "column", md: "row" }}>
        <Box minW="220px" maxW="220px" borderRadius="xl" overflow="hidden" boxShadow="lg">
          <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} w="100%" h="330px" objectFit="cover" />
        </Box>
        <Box flex="1">
          <Box mb={6} borderRadius="xl" overflow="hidden">
            <Image src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} w="100%" h="200px" objectFit="cover" />
          </Box>
          <HStack gap={3} mb={4} flexWrap="wrap">
            {movieGenres.map((g, i) => (
              <Box key={i} bg={tagBg} color={textColor} px={4} py={1} fontWeight="bold" borderRadius="md">
                {g}
              </Box>
            ))}
          </HStack>
          <Text mb={6} color={textColor} fontSize="md">
            {movie.overview}
          </Text>
          <Flex wrap="wrap" gap={6} mb={6}>
            <DetailItem label="Release date" value={movie.release_date} />
            <DetailItem label="Language" value={movie.original_language?.toUpperCase()} />
            <DetailItem label="Vote count" value={movie.vote_count?.toString()} />
            <DetailItem label="Popularity" value={movie.popularity?.toString()} />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default MovieDetail;
