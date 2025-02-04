import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./styles/theme";
import { ApiProvider } from "./contexts/ApiContext";
import { Routes } from "./Routes/Routes";

function App() {

  return (
    <ChakraProvider theme={theme}>
      <ApiProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ApiProvider>
    </ChakraProvider>
  )
}

export default App
