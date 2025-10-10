
import { VStack } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Trending from "./components/TrendingSection";
import PopularSection from "./components/PopularSection";
import SearchResults from "./components/SearchResults";
import { Routes, Route } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import { useMoviesStore } from "./stores/moviesStore";

const App = () => {
  const searchTerm = useMoviesStore((state) => state.searchTerm.trim());

  return (
    <Routes>
      <Route
        path="/"
        element={
          <VStack gap={'20'} p={'8'}>
            <Header />
            <SearchResults />
            <AnimatePresence initial={false}>
              {!searchTerm && (
                <motion.div
                  style={{ width: '100%' }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <VStack gap={'20'} w={'full'}>
                    <Trending />
                    <PopularSection />
                  </VStack>
                </motion.div>
              )}
            </AnimatePresence>
          </VStack>
        }
      />
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Routes>
  );
}

export default App