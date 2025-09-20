// import { Grid, Heading, Skeleton, SkeletonText, Stack, VStack } from "@chakra-ui/react";
// import PopularCard from "./ui/PopularCard"
// import { usePopularMovies } from "../hooks/usePopularMovies";


// const PopularSection = () => {
//     const { data, isLoading } = usePopularMovies();
//   return (
//     <Stack gap={"10"}>
//       <Heading fontWeight={"semibold"} fontSize={"xl"} textAlign={"center"}>
//         Popular
//       </Heading>


//       <Grid
//         templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }}
//         templateRows={{ base: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
//         gap="6"
//       >
//         {isLoading
//           ? Array.from({ length: 8 }).map((_, idx) => (
//               <VStack
//                 key={`popular-skel-${idx}`}
//                 bg="#0F0D23"
//                 rounded={"xl"}
//                 shadow={"2xl"}
//                 overflow={"hidden"}
//                 p="3"
//               >
//                 <Skeleton height="150px" width="100%" rounded="xl" />
//                 <SkeletonText mt="4" noOfLines={2}  width="80%" />
//               </VStack>
//             ))
//           : data?.results.map((movies) => (
//               <PopularCard key={movies.id} movie={movies} />
//             ))}
//       </Grid>
//     </Stack>
//   );
// }

// // export default PopularSection
// import {
//   Grid,
//   Heading,
//   Skeleton,
//   SkeletonText,
//   Stack,
//   VStack,
//   Button,
//   Spinner,
//   Box,
// } from "@chakra-ui/react";
// import PopularCard from "./ui/PopularCard";
// import { usePopularMovies } from "../hooks/usePopularMovies";
// import { useState } from "react";
// import { ChevronRight, ChevronLeft } from "lucide-react";
// import { motion } from "framer-motion";

// const MotionBox = motion(Box);

// const PopularSection = () => {
//   const [page, setPage] = useState(1);
//   const { data, isLoading, isFetching } = usePopularMovies(page);

//   const handleNext = () => {
//     if (data && page < data.total_pages) setPage((prev) => prev + 1);
//   };

//   const handlePrev = () => {
//     if (page > 1) setPage((prev) => prev - 1);
//   };

//   return (
//     <Stack gap="10">
//       <Heading fontWeight="semibold" fontSize="xl" textAlign="center">
//         Popular
//       </Heading>

//       <Grid
//         templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
//         gap="6"
//       >
//         {isLoading
//           ? Array.from({ length: 12 }).map((_, idx) => (
//               <VStack
//                 key={`popular-skel-${idx}`}
//                 bg="#0F0D23"
//                 rounded="xl"
//                 shadow="2xl"
//                 overflow="hidden"
//                 p="3"
//               >
//                 <Skeleton height="150px" width="100%" rounded="xl" />
//                 <SkeletonText mt="4" noOfLines={2} width="80%" />
//               </VStack>
//             ))
//           : data?.results.slice(0, 12).map((movie) => (
//               <MotionBox
//                 key={movie.id}
//                 position="relative"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4 }}
//               >
//                 <PopularCard movie={movie} />
//                 {isFetching && !isLoading && (
//                   <Box
//                     position="absolute"
//                     top="0"
//                     left="0"
//                     width="100%"
//                     height="100%"
//                     bg="rgba(15,13,35,0.4)"
//                     display="flex"
//                     alignItems="center"
//                     justifyContent="center"
//                     rounded="xl"
//                   >
//                     <Spinner size="lg" color="purple.400" />
//                   </Box>
//                 )}
//               </MotionBox>
//             ))}
//       </Grid>

//       <MotionBox
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         gap={4}
//         initial={{ opacity: 0.8, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.3 }}
//       >
//         <Button onClick={handlePrev} isDisabled={page === 1 || isFetching}>
//           <ChevronLeft />
//         </Button>

//         <Box minW="60px" textAlign="center">
//           {isFetching && !isLoading ? (
//             <Spinner size="sm" color="purple.400" />
//           ) : (
//             <span>page {page}</span>
//           )}
//         </Box>

//         <Button
//           onClick={handleNext}
//           isDisabled={data && page >= data.total_pages || isFetching}
//         >
//           <ChevronRight />
//         </Button>
//       </MotionBox>
//     </Stack>
//   );
// };

// export default PopularSection;

// import {
//   Grid,
//   Heading,
//   Stack,
//   VStack,
//   Button,
//   Spinner,
//   Box,
// } from "@chakra-ui/react";
// import PopularCard from "./ui/PopularCard";
// import { usePopularMovies } from "../hooks/usePopularMovies";
// import { useState } from "react";
// import { ChevronRight, ChevronLeft } from "lucide-react";
// import { motion } from "framer-motion";

// const MotionBox = motion(Box);

// const PopularSection = () => {
//   const [page, setPage] = useState(1);
//   const { data, isLoading, isFetching } = usePopularMovies(page);

//   const handleNext = () => {
//     if (data && page < data.total_pages) setPage((prev) => prev + 1);
//   };

//   const handlePrev = () => {
//     if (page > 1) setPage((prev) => prev - 1);
//   };

 
//   if (!data && isLoading) return null;

//   return (
//     <Stack gap="10">
//       <Heading fontWeight="semibold" fontSize="xl" textAlign="center">
//         Popular
//       </Heading>

//       <Grid
//         templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
//         gap="6"
//       >
//         {data?.results.slice(0, 12).map((movie) => (
//           <MotionBox
//             key={movie.id}
//             position="relative"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//           >
//             <PopularCard movie={movie} />
//             {isFetching && !isLoading && (
//               <Box
//                 position="absolute"
//                 top="0"
//                 left="0"
//                 width="100%"
//                 height="100%"
//                 bg="rgba(15,13,35,0.4)"
//                 display="flex"
//                 alignItems="center"
//                 justifyContent="center"
//                 rounded="xl"
//               >
//                 <Spinner size="lg" color="purple.400" />
//               </Box>
//             )}
//           </MotionBox>
//         ))}
//       </Grid>

//       <MotionBox
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         gap={4}
//         initial={{ opacity: 0.8, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.3 }}
//       >
//         <Button onClick={handlePrev} isDisabled={page === 1 || isFetching}>
//           <ChevronLeft />
//         </Button>

//         <Box minW="60px" textAlign="center">
//           {isFetching && !isLoading ? (
//             <Spinner size="sm" color="purple.400" />
//           ) : (
//             <span>page {page}</span>
//           )}
//         </Box>

//         <Button
//           onClick={handleNext}
//           isDisabled={data && page >= data.total_pages || isFetching}
//         >
//           <ChevronRight />
//         </Button>
//       </MotionBox>
//     </Stack>
//   );
// };

// export default PopularSection;
import {
  Grid,
  Heading,
  Stack,
  VStack,
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

const PopularSection = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = usePopularMovies(page);
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
        {data?.results.slice(0, 12).map((movie) => (
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
        <Button onClick={handlePrev} isDisabled={page === 1 || isFetching}>
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
          isDisabled={data && page >= data.total_pages || isFetching}
        >
          <ChevronRight />
        </Button>
      </MotionBox>
    </Stack>
  );
};

export default PopularSection;
