import { useParams } from "react-router-dom";
import { useMovieDetail } from "../hooks/useMovieDetail";
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { BiStar, BiHeart, BiPlay } from "react-icons/bi";
import React from "react";

interface MovieGenre {
  id: number;
  name: string;
}

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
  const { movie, trailer, loading, error } = useMovieDetail(id);
  const bg = useColorModeValue("#18152A", "#18152A");
  const subText = useColorModeValue("#A1A1A1", "#A1A1A1");
  const tagBg = useColorModeValue("#26243A", "#26243A");

  const [liked, setLiked] = React.useState<boolean>(() => {
    try {
      if (!id) return false;
      const saved = localStorage.getItem(`movie-liked-${id}`);
      return saved === "1";
    } catch (e) {
      console.warn(e);
      return false;
    }
  });

  const [likesCount, setLikesCount] = React.useState<number>(0);

  React.useEffect(() => {
    if (!movie) return;
    try {
      const saved = localStorage.getItem(`movie-likes-${movie.id}`);
      if (saved !== null) setLikesCount(Number(saved));
      else setLikesCount(movie.popularity ? Math.round(movie.popularity) : 0);
    } catch (e) {
      console.warn(e);
      setLikesCount(movie.popularity ? Math.round(movie.popularity) : 0);
    }
  }, [movie]);

  const toggleLike = () => {
    if (!movie) return;
    const next = !liked;
    setLiked(next);
    const nextCount = next ? likesCount + 1 : Math.max(0, likesCount - 1);
    setLikesCount(nextCount);
    try {
      localStorage.setItem(`movie-liked-${movie.id}`, next ? "1" : "0");
      localStorage.setItem(`movie-likes-${movie.id}`, String(nextCount));
    } catch (e) {
      console.warn(e);
    }
  };

  if (loading)
    return (
      <Flex justify="center" align="center" h="60vh">
        <Spinner size="xl" />
      </Flex>
    );
  if (error)
    return (
      <Box p={8} textAlign="center">
        {error}
      </Box>
    );
  if (!movie) return null;

  const movieGenres: string[] = movie.genres
    ? movie.genres.map((g: MovieGenre) => g.name)
    : [];

  return (
    <Box bg={bg} p={8} borderRadius="2xl" maxW="1200px" mx="auto">
      {/* Title + Rating */}
      <Flex justify="space-between" align="center" mb={8} wrap="wrap">
        <VStack align="start" gap={1}>
          <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold">
            {movie.title}
          </Text>
          <Text fontSize="md" color={subText}>
            {new Date(movie.release_date).getFullYear()} · PG-13 · 2h 46m
          </Text>
        </VStack>
        <HStack gap={4}>
          <HStack bg={tagBg} px={4} py={2} borderRadius="lg">
            <Icon as={BiStar} color="#FFD600" />
            <Text fontWeight="bold">{movie.vote_average?.toFixed(1)}</Text>
            <Text color={subText}>({movie.vote_count})</Text>
          </HStack>
          <Button bg={tagBg} borderRadius="lg" color={subText} onClick={toggleLike}>
            {liked ? (
              <BiHeart style={{ marginRight: 8, color: "#FF6B6B" }} />
            ) : (
              <BiHeart style={{ marginRight: 8, opacity: 0.9 }} />
            )}
            {likesCount}
          </Button>
        </HStack>
      </Flex>

      <Flex gap={8} direction={{ base: "column", md: "row" }}>
        {/* Poster */}
        <Box
          minW={{ base: "100%", md: "220px" }}
          maxW={{ base: "100%", md: "220px" }}
          mx={{ base: "auto", md: "0" }}
          borderRadius="xl"
          overflow="hidden"
          boxShadow="lg"
          flexShrink={0}
        >
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/fallback-poster.png"
            }
            alt={movie.title}
            w="100%"
            h={{ base: "400px", md: "330px" }} // ارتفاع موبایل کمی بیشتر
            objectFit="cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/fallback-poster.png";
            }}
          />
        </Box>

        {/* Right Section */}
        <Box flex="1">
          {/* Banner with trailer button */}
          <Box mb={6} borderRadius="xl" overflow="hidden" position="relative">
            <Image
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
                  : "/fallback-banner.png"
              }
              alt={movie.title}
              w="100%"
              h="200px"
              objectFit="cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/fallback-banner.png";
              }}
            />
            {trailer ? (
              <Button
                position="absolute"
                bottom="4"
                left="4"
                borderRadius="full"
                px={4}
                py={2}
                fontWeight="bold"
                fontSize="sm"
              >
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <BiPlay style={{ marginRight: 6, verticalAlign: "middle" }} />
                  Trailer · 00:31
                </a>
              </Button>
            ) : null}
          </Box>

          {/* Genres */}
          <HStack gap={3} mb={4} flexWrap="wrap">
            {movieGenres.map((g, i) => (
              <Box
                key={i}
                bg={tagBg}
                px={4}
                py={1}
                fontWeight="bold"
                borderRadius="md"
              >
                {g}
              </Box>
            ))}
          </HStack>

          {/* Overview */}
          <Text mb={6} fontSize="md" lineHeight="tall">
            {movie.overview}
          </Text>

          {/* Details */}
          <Flex wrap="wrap" gap={6} mb={6}>
            <DetailItem label="Release date" value={movie.release_date} />
            <DetailItem
              label="Language"
              value={movie.original_language?.toUpperCase()}
            />
            <DetailItem
              label="Vote count"
              value={movie.vote_count?.toString()}
            />
            <DetailItem
              label="Popularity"
              value={movie.popularity?.toFixed(0)}
            />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default MovieDetail;
