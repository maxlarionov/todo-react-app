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
   const [Modal, setModal] = useState('close')
   const [users, setUsers] = useState([])
   const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
   const [userId, setUserId] = useState(localStorage.getItem('id'))
   const [isLoading, setIsLoading] = useState(false)
   const [language, setLanguage] = useLocalStorage('language', 'en')
   const [profileImg, setProfileImg] = useState(localStorage.getItem('photo'))
   // const [profileImg, setProfileImg] = useState('https://images7.memedroid.com/images/UPLOADED484/611bd18aecbfd.jpeg')

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

   const mainColor = '#4553CF'

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
      Modal,
      setModal,
      users,
      setUsers,
      user,
      setUser,
      userId,
      setUserId,
      isLoading,
      setIsLoading,
      language,
      setLanguage,
      handleLanguageChange,
      mainColor,
      profileImg,
      setProfileImg
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
      Modal,
      setModal,
      users,
      setUsers,
      user,
      setUser,
      userId,
      setUserId,
      isLoading,
      setIsLoading,
      language,
      setLanguage,
      handleLanguageChange,
      mainColor,
      profileImg,
      setProfileImg
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
            Modal,
            setModal,
            users,
            setUsers,
            user,
            setUser,
            userId,
            setUserId,
            isLoading,
            setIsLoading,
            language,
            setLanguage,
            handleLanguageChange,
            mainColor,
            profileImg,
            setProfileImg
         }}
      >
         {children}
      </AppContext.Provider>
   )
}

export const useAppContext = () => {
   return useContext(AppContext)
}
