import { createContext, useContext, useEffect, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import i18n from "./i18n"
import { getUsers } from "./services"

const AppContext = createContext()

export const useAppState = () => {
   const [tasks, setTasks] = useState([])
   const [addModal, setAddModal] = useState(false)
   const [textTask, setTextTask] = useState('')
   const [editModal, setEditModal] = useState(false)
   const [editTask, setEditTask] = useState('')
   const [authModal, setAuthModal] = useState(true)
   const [userId, setUserId] = useState(1)
   const [users, setUsers] = useState([])
   const [isLoading, setIsLoading] = useState(false)

   const [language, setLanguage] = useLocalStorage('language', 'en')

   const handleLanguageChange = () => {
      if (language === 'en') {
         i18n.changeLanguage('ua')
         setLanguage('ua')
      } else if (language === 'ua') {
         i18n.changeLanguage('en')
         setLanguage('en')
      }
   }

   useEffect(() => {
      getUsers()
         .then(data => setUsers(data))
   }, [])

   return {
      tasks,
      setTasks,
      addModal,
      setAddModal,
      textTask,
      setTextTask,
      editModal,
      setEditModal,
      editTask,
      setEditTask,
      authModal,
      setAuthModal,
      userId,
      setUserId,
      users,
      setUsers,
      isLoading,
      setIsLoading,
      language,
      setLanguage,
      handleLanguageChange
   }
}

export const AppProvider = ({ children }) => {
   const {
      tasks,
      setTasks,
      addModal,
      setAddModal,
      textTask,
      setTextTask,
      editModal,
      setEditModal,
      editTask,
      setEditTask,
      authModal,
      setAuthModal,
      userId,
      setUserId,
      users,
      setUsers,
      isLoading,
      setIsLoading,
      language,
      setLanguage,
      handleLanguageChange
   } = useAppState()

   return (
      <AppContext.Provider
         value={{
            tasks,
            setTasks,
            addModal,
            setAddModal,
            textTask,
            setTextTask,
            editModal,
            setEditModal,
            editTask,
            setEditTask,
            authModal,
            setAuthModal,
            userId,
            setUserId,
            users,
            setUsers,
            isLoading,
            setIsLoading,
            language,
            setLanguage,
            handleLanguageChange
         }}
      >
         {children}
      </AppContext.Provider>
   )
}

export const useAppContext = () => {
   return useContext(AppContext)
}