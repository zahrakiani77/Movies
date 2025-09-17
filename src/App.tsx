
import { VStack } from "@chakra-ui/react"
import Header from "./components/Header"
import Trending from "./components/TrendingSection"
import PopularSection from "./components/PopularSection";
import { Routes, Route } from 'react-router-dom';
import MovieDetail from './components/MovieDetail';

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <VStack gap={'20'} p={'8'}>
            <Header />
            <Trending />
            <PopularSection/>
          </VStack>
        }
      />
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Routes>
  );
}

export default App