import React from 'react'
import {
  ChakraProvider
} from '@chakra-ui/react'
import { AppProvider } from './components/app-context'
import Modal from './components/Modal'
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
          <Modal />
          <Loader />
        </Wrapper>
      </ChakraProvider>
    </AppProvider>
  )
}

export default App
