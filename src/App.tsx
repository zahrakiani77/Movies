
import { VStack } from "@chakra-ui/react";
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
            {!searchTerm && (
              <>
                <Trending />
                <PopularSection />
              </>
            )}
          </VStack>
        }
      />
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Routes>
  );
}

export default App