
import {
  Box,
  Flex,
  Text,
  Icon,
  HStack,
  Image,
  Badge,
  VStack,
  Divider,
  Button
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";


const MovieCard = () => {
  return (
    <Box bg="gray.900" color="white" borderRadius="2xl" boxShadow="2xl" p={6} maxW="6xl" mx="auto">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={4}>
        <Box>
          <Text fontSize="3xl" fontWeight="bold" p={0}>
            Squid Game 2
          </Text>
          <Text fontSize="sm" color="gray.400">
            2024 • PG-13 • 2h 46m
          </Text>
        </Box>
        <HStack spacing={2}>
          <Icon as={StarIcon} color="yellow.400" />
          <Text fontWeight="bold">8.9/10</Text>
          <Text color="gray.400">(200K)</Text>
        </HStack>
      </Flex>

      {/* Poster + Trailer */}
      <Flex gap={4} mb={6}>
        <Image
          src="https://upload.wikimedia.org/wikipedia/en/d/d0/Squid_Game_poster.jpg"
          alt="Squid Game 2 Poster"
          borderRadius="lg"
          w="40%"
          objectFit="cover"
        />
        <Box
          flex="1"
          borderRadius="lg"
          overflow="hidden"
          pos="relative"
        >
          <Image
            src="https://static1.srcdn.com/wordpress/wp-content/uploads/2023/09/squid-game-netflix-show.jpg"
            alt="Squid Game 2 Trailer"
            objectFit="cover"
          />
          <Box
            pos="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <Button
              colorScheme="pink"
              borderRadius="full"
              size="lg"
              fontWeight="bold"
            >
              ▶ Trailer
            </Button>
          </Box>
        </Box>
      </Flex>

      {/* Genres */}
      <HStack spacing={3} mb={4}>
        <Badge colorScheme="purple" px={3} py={1} borderRadius="lg">
          Adventure
        </Badge>
        <Badge colorScheme="red" px={3} py={1} borderRadius="lg">
          Action
        </Badge>
        <Badge colorScheme="blue" px={3} py={1} borderRadius="lg">
          Drama
        </Badge>
      </HStack>

      {/* Overview */}
      <Text mb={4} color="gray.300">
        Hundreds of cash-strapped players accept a strange invitation to
        compete in children’s games. Inside, a tempting prize awaits with
        deadly high stakes: a survival game that has a whopping 45.6
        billion-won prize at stake.
      </Text>

      <Divider borderColor="gray.700" my={4} />

      {/* Details */}
      <VStack align="start" spacing={2} fontSize="sm">
        <Text>
          <b>Release date:</b> December 26, 2024 (Worldwide)
        </Text>
        <Text>
          <b>Countries:</b> United States, Canada, UAE, Hungary, Italy,
          New Zealand
        </Text>
        <Text>
          <b>Languages:</b> English, Korean, Hindi, Arabic, German,
          Spanish
        </Text>
        <Text>
          <b>Budget:</b> $21.4 million
        </Text>
        <Text>
          <b>Revenue:</b> $900 Million
        </Text>
        <Text>
          <b>Tagline:</b> 45.6 Billion Won is Child’s Play
        </Text>
        <Text>
          <b>Production Companies:</b> Legendary Entertainment, Warner
          Bros. Entertainment, Villeneuve Films
        </Text>
      </VStack>

      {/* Footer */}
      <Flex justify="flex-end" mt={6} gap={2}>
        <Button colorScheme="purple">بستن</Button>
        <Button variant="outline" colorScheme="purple">
          Visit Homepage
        </Button>
      </Flex>
    </Box>
  );
};

export default MovieCard;
