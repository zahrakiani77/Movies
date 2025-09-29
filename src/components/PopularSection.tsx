import {
  Box,
  Button,
  Grid,
  Heading,
  Skeleton,
  SkeletonText,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { PopularMovie } from "@/types/popular.model";
import { usePopularMovies } from "../hooks/usePopularMovies";
import PopularCard from "./ui/PopularCard";

const MotionBox = motion(Box);

const PopularSection = () => {
  const [page, setPage] = useState(1);
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = usePopularMovies(page);
  const popularRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (data && page < data.total_pages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };
  useEffect(() => {
    if (popularRef.current) {
      popularRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [page]);

  const isInitialLoading = isLoading && !data;

  if (isError) {
    return (
      <Stack gap="10" ref={popularRef}>
        <Heading fontWeight="semibold" fontSize="xl" textAlign="center">
          Popular
        </Heading>
        <Box textAlign="center" color="red.300">
          {(error as Error)?.message ?? "Failed to load popular movies."}
        </Box>
      </Stack>
    );
  }

  return (
    <Stack gap="10" ref={popularRef}>
      <Heading fontWeight="semibold" fontSize="xl" textAlign="center">
        Popular
      </Heading>

      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
        gap="6"
      >
        {isInitialLoading
          ? Array.from({ length: 12 }).map((_, idx) => (
              <Stack
                key={`popular-skeleton-${idx}`}
                bg="#0F0D23"
                rounded="xl"
                shadow="2xl"
                overflow="hidden"
                p="3"
              >
                <Skeleton height="150px" width="100%" rounded="xl" />
                <SkeletonText mt="4" noOfLines={2} width="80%" />
              </Stack>
            ))
          : data?.results.map((movie: PopularMovie) => (
          <MotionBox
            key={movie.id}
            position="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PopularCard movie={movie} />
            {isFetching && !isLoading && (
              <Box
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                bg="rgba(15,13,35,0.4)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                rounded="xl"
              >
                <Spinner size="lg" color="purple.400" />
              </Box>
            )}
          </MotionBox>
            ))}
      </Grid>

      <MotionBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={4}
        initial={{ opacity: 0.8, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button onClick={handlePrev} disabled={page === 1 || isFetching}>
          <ChevronLeft />
        </Button>

        <Box minW="60px" textAlign="center">  
          {isFetching && !isLoading ? (
            <Spinner size="sm" color="purple.400" />
          ) : (
            <span>page {page}</span>
          )}
        </Box>

        <Button
          onClick={handleNext}
          disabled={(!!data && page >= data.total_pages) || isFetching}
        >
          <ChevronRight />
        </Button>
      </MotionBox>
    </Stack>
  );
};

export default PopularSection;
