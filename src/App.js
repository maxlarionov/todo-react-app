import React from 'react'
import {
  ChakraProvider
} from '@chakra-ui/react'
import { AppProvider } from './context/app-context'
import Drawer from './components/Drawer'
import Wrapper from './components/Wrapper'
import Loader from './components/Loader'
import '@fontsource/montserrat/700.css'
import '@fontsource/montserrat/600.css'
import Main from './components/Main'

function App() {
  return (
    <AppProvider>
      <ChakraProvider>
        <Wrapper>
          <Main />
          <Drawer />
          <Loader />
        </Wrapper>
      </ChakraProvider>
    </AppProvider>
  )
}

export default App
