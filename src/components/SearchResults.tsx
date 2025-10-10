import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Badge,
  Skeleton,
  SkeletonText,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import PopularCard from "./ui/PopularCard";
import type { PopularMovie } from "@/types/popular.model";
import { useMoviesStore } from "../stores/moviesStore";
import { useSearch } from "../hooks/useSearch";

const MotionBox = motion(Box);

const SearchResults = () => {
  const searchTerm = useMoviesStore((state) => state.searchTerm);
  const clearSearch = useMoviesStore((state) => state.clearSearch);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  useEffect(() => {
    // Keep viewport consistent when changing search pages
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch { /* no-op */ }
  }, [page]);

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useSearch(searchTerm, page);

  const hasResults = (data?.results?.length ?? 0) > 0;
  const isInitialLoading = isLoading && !data;
  const totalResults = data?.total_results ?? 0;
  const totalPages = data?.total_pages ?? 1;

  const heading = useMemo(() => {
    if (!searchTerm) {
      return "Search";
    }
    return `Results for "${searchTerm}"`;
  }, [searchTerm]);

  if (!searchTerm) {
    return null;
  }

  return (
    <Stack gap="6" minH="70vh">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        w="full"
      >
        <Heading fontWeight="semibold" fontSize={{ base: "lg", md: "xl" }}>
          {searchTerm ? (
            <>
              Results for <Text as="span" color="purple.300">“{searchTerm}”</Text>
            </>
          ) : (
            heading
          )}
        </Heading>
        <HStack gap={3}>
          {searchTerm && !isInitialLoading && (
            <Badge
              colorPalette="purple"
              variant="subtle"
              rounded="full"
              px={3}
              py={1}
            >
              {totalResults.toLocaleString()} results
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            disabled={isFetching}
          >
            Clear search
          </Button>
        </HStack>
      </Stack>

      {searchTerm && hasResults && (
        <HStack color="#A1A1A1" fontSize="sm">
          <span>Page {page} of {totalPages.toLocaleString()}</span>
        </HStack>
      )}

      {isError ? (
        <Text textAlign="center" color="red.300">
          {(error as Error)?.message ?? "Unable to fetch search results."}
        </Text>
      ) : (
        <>
        <Box
          bg="#0F0D23"
          rounded="2xl"
          shadow="xl"
          border="1px solid"
          borderColor="rgba(138,43,226,0.15)"
          p={{ base: 3, md: 4 }}
        >
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
            gap="6"
          >
            {isInitialLoading
              ? Array.from({ length: 12 }).map((_, idx) => (
                  <Stack
                    key={`search-skeleton-${idx}`}
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
              : hasResults
              ? data?.results.map((movie: PopularMovie) => (
                  <MotionBox
                    key={`${movie.id}-${movie.title}`}
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
                ))
              : (
                  <Stack
                    gridColumn="1 / -1"
                    alignItems="center"
                    justifyContent="center"
                    py={10}
                    gap={3}
                    color="gray.300"
                  >
                    <Text>No matches found for “{searchTerm}”.</Text>
                    <Button size="sm" variant="outline" onClick={clearSearch}>
                      Clear search
                    </Button>
                  </Stack>
                )}
          </Grid>
          {hasResults && (
            <MotionBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={4}
              initial={{ opacity: 0.8, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              mt={6}
            >
              <Button
                aria-label="Previous page"
                variant="outline"
                colorPalette="purple"
                size="sm"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1 || isFetching}
              >
                <ChevronLeft />
              </Button>

              <Box minW="120px" textAlign="center">
                {isFetching && !isLoading ? (
                  <Spinner size="sm" color="purple.400" />
                ) : (
                  <Text fontSize="sm" color="#A1A1A1">
                    page {page} of {totalPages.toLocaleString()}
                  </Text>
                )}
              </Box>

              <Button
                aria-label="Next page"
                variant="outline"
                colorPalette="purple"
                size="sm"
                onClick={() => {
                  if (data && page < data.total_pages) {
                    setPage((prev) => prev + 1);
                  }
                }}
                disabled={(!!data && page >= data.total_pages) || isFetching}
              >
                <ChevronRight />
              </Button>
            </MotionBox>
          )}
        </Box>
        </>
      )}
    </Stack>
  );
};

export default SearchResults;
