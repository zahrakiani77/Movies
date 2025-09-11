import { VStack } from "@chakra-ui/react"
import Header from "./components/Header"
import Trending from "./components/Trending"

const App = () => {
  return (
    <VStack gap={'20'}>
      <Header />
      <Trending />
    </VStack>
  );
}

export default App