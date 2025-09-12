
import { Provider } from "./components/ui/provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"


const queryClient = new QueryClient()

function App() {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        
      </QueryClientProvider>
    </Provider>
  )
}
export default App