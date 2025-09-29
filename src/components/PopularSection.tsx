
import {
  Grid,
  Heading,
  Stack,
  Button,
  Spinner,
  Box,
} from "@chakra-ui/react";
import PopularCard from "./ui/PopularCard";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);


import type { PopularMovie, PopulargModel } from "../types/popular.model";


const PopularSection = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = usePopularMovies(page) as {
    data: PopulargModel | undefined;
    isLoading: boolean;
    isFetching: boolean;
  };
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

  if (!data && isLoading) return null;

  return (
    <Stack gap="10" ref={popularRef}>
      <Heading fontWeight="semibold" fontSize="xl" textAlign="center">
        Popular
      </Heading>

      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
        gap="6"
      >
  {data?.results.map((movie: PopularMovie) => (
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
          disabled={!!data && page >= data.total_pages || isFetching}
        >
          <ChevronRight />
        </Button>
      </MotionBox>
    </Stack>
  );
};

export default PopularSection;
