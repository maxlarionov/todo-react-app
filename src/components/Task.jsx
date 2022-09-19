import React from 'react'
import {
	Flex,
	Checkbox,
	Text,
	Box
} from '@chakra-ui/react'
import { useAppContext } from './app-context'
import { editDataTask } from './services'



const Task = ({ task }) => {

	const { tasks, setEditModal, setTasks, setEditTask, userId, setIsLoading } = useAppContext()

	const openEditModal = () => {
		setEditModal(true)
		setEditTask({ text: task.text, id: task.id })
	}

	const checkDone = (id) => {
		setIsLoading(true)
		const newTasksArr = tasks.map(task => {
			if (task.id === id) {
				return { ...task, complete: !task.complete }
			}
			else return task
		})

		editDataTask(userId, { todos: newTasksArr })
			.then(() => {
				setIsLoading(false)
				return setTasks(newTasksArr)
			})
	}

	return (
		<Flex
			bgColor='yellow.300'
			p={3}
			my={[3, 4, 5]}
			borderRadius='10px'
			gap='10px'
			onClick={openEditModal}
			cursor='pointer'
		>
			<Box
				display='flex'
				alignItems={'center'}
				onClick={e => e.stopPropagation()}
			>
				<Checkbox
					colorScheme='green'
					borderColor='#282828'
					defaultChecked={task.complete}
					onChange={() => checkDone(task.id)}
				/>
			</Box>
			<Text>{task.text}</Text>
		</Flex >
	)
}

export default Task