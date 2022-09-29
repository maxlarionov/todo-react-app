import { Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import AddModal from './AddModal'
import { useAppContext } from './app-context'
import EditModal from './EditModal'
import Header from './Header'
import { getTasks } from '../services'
import TasksList from './TasksList'

const Main = () => {
	const { auth, setAuth, setTasks, userId, setIsLoading, setModal } = useAppContext()

	useEffect(() => {
		setIsLoading(true)
		if (!!userId) {
			getTasks(userId)
				.then(data => {
					setIsLoading(false)
					setAuth(true)
					return setTasks(data.todos)
				})
		} else {
			setModal('logIn')
			setIsLoading(false)
		}
	}, [setAuth, setTasks, userId, setIsLoading, setModal])

	return (
		<Box>
			{auth ? (
				<Box>
					<Header />
					<TasksList />
					<AddModal />
					<EditModal />
				</Box>
			) : (
				<Box></Box>
			)}
		</Box>
	)
}

export default Main