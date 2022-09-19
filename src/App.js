import React from 'react'
import {
  ChakraProvider
} from '@chakra-ui/react'
import Header from './components/Header'
import TasksList from './components/TasksList'
import { AppProvider } from './components/app-context'
import AddModal from './components/AddModal'
import EditModal from './components/EditModal'
import AuthModal from './components/AuthModal'
import Wrapper from './components/Wrapper'
import Loader from './components/Loader'

function App() {
  return (
    <AppProvider>
      <ChakraProvider>
        <Wrapper>
          <Header />
          <TasksList />
          <AddModal />
          <EditModal />
          <AuthModal />
          <Loader />
        </Wrapper>
      </ChakraProvider>
    </AppProvider>
  )
}

export default App
