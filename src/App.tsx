import { VStack } from "@chakra-ui/react"
import Header from "./components/Header"
import Trending from "./components/TrendingSection"
import PopularSection from "./components/PopularSection";

const App = () => {
  return (
    <VStack gap={'20'}>
      <Header />
      <Trending />
      <PopularSection/>
    </VStack>
  );
}

export default App