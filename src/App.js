import React from 'react'
import {
  ChakraProvider
} from '@chakra-ui/react'
import Header from './components/Header'
import TasksList from './components/TasksList'
import { AppProvider } from './components/app-context'
import AddModal from './components/AddModal'
import EditModal from './components/EditModal'
import Modal from './components/Modal'
import Wrapper from './components/Wrapper'
import Loader from './components/Loader'
import '@fontsource/montserrat/700.css'
import '@fontsource/montserrat/600.css'

function App() {
  return (
    <AppProvider>
      <ChakraProvider>
        <Wrapper>
          <Header />
          <TasksList />
          <AddModal />
          <EditModal />
          <Modal />
          <Loader />
        </Wrapper>
      </ChakraProvider>
    </AppProvider>
  )
}

export default App
