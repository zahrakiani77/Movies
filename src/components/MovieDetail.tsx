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
import { AnimatePresence, motion } from "framer-motion";

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
  const [isTrailerOpen, setIsTrailerOpen] = React.useState<boolean>(false);

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
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
    <Box bg={bg} p={8} borderRadius="2xl" maxW="1200px" mx="auto" position="relative" overflow="hidden">
      <Box
        position="absolute"
        inset={0}
        pointerEvents="none"
        sx={{
          maskImage: "radial-gradient(ellipse at 20% 10%, black 20%, transparent 60%)",
        }}
        filter="blur(28px)"
        opacity={0.25}
      >
        <Box position="absolute" top="-20%" left="-10%" w="60%" h="60%" bgGradient="radial(#8A2BE2, transparent 60%)" />
        <Box position="absolute" bottom="-25%" right="-10%" w="60%" h="60%" bgGradient="radial(#00D4FF, transparent 60%)" />
      </Box>
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
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          whileHover={{ rotate: -0.5, scale: 1.02 }}
          style={{ willChange: "transform" }}
        >
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
        </motion.div>

        {/* Right Section */}
        <Box flex="1">
          {/* Banner with trailer button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
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
              <motion.button
                position="absolute"
                bottom="4"
                left="4"
                borderRadius="full"
                px={4}
                py={2}
                fontWeight="bold"
                fontSize="sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  background: "#26243A",
                  color: "#A1A1A1",
                  boxShadow:
                    "0 0 0 2px rgba(138,43,226,0.45), 0 0 22px 6px rgba(138,43,226,0.35), 0 0 44px 16px rgba(0,212,255,0.2)",
                }}
              >
                <button
                  onClick={() => setIsTrailerOpen(true)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "inherit",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <BiPlay style={{ marginRight: 6, verticalAlign: "middle" }} />
                  Trailer · 00:31
                </button>
              </motion.button>
            ) : null}
          </Box>
          </motion.div>

          {/* Genres */}
          <HStack gap={3} mb={4} flexWrap="wrap">
            {movieGenres.map((g, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut", delay: 0.12 + i * 0.04 }}
              >
                <Box
                  bg={tagBg}
                  px={4}
                  py={1}
                  fontWeight="bold"
                  borderRadius="md"
                  boxShadow="0 0 0 1px rgba(138,43,226,0.35)"
                >
                  {g}
                </Box>
              </motion.div>
            ))}
          </HStack>

          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.18 }}
          >
            <Text mb={6} fontSize="md" lineHeight="tall">
              {movie.overview}
            </Text>
          </motion.div>

          {/* Details */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 1 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.06, delayChildren: 0.2 },
              },
            }}
          >
            <Flex wrap="wrap" gap={6} mb={6}>
              {[{
                label: "Release date",
                value: movie.release_date,
              }, {
                label: "Language",
                value: movie.original_language?.toUpperCase(),
              }, {
                label: "Vote count",
                value: movie.vote_count?.toString(),
              }, {
                label: "Popularity",
                value: movie.popularity?.toFixed(0),
              }].map((d, idx) => (
                <motion.div key={idx} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
                  <DetailItem label={d.label} value={d.value || "-"} />
                </motion.div>
              ))}
            </Flex>
          </motion.div>
        </Box>
      </Flex>
      {/* Trailer Modal */}
      <AnimatePresence>
        {isTrailerOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setIsTrailerOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                width: "min(920px, 92vw)",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow:
                  "0 0 0 2px rgba(138,43,226,0.45), 0 0 22px 6px rgba(138,43,226,0.35), 0 0 44px 16px rgba(0,212,255,0.25)",
                background: "#0F0D23",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Box position="relative" w="100%" pt="56.25%">
                <Box position="absolute" inset={0}>
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1`}
                    title="Trailer"
                    style={{ border: 0, width: "100%", height: "100%" }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Box>
              </Box>
              <Flex justify="flex-end" p={3}>
                <Button onClick={() => setIsTrailerOpen(false)}>Close</Button>
              </Flex>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Box>
    </motion.div>
  );
};

export default MovieDetail;
