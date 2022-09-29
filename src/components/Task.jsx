import React from 'react'
import { Flex, Checkbox, Text, Box } from '@chakra-ui/react'
import { useAppContext } from '../context/app-context'
import { editDataTask } from '../services'

const Task = ({ task }) => {
	const { tasks, setEditModal, setTasks, setEditTask, userId, setIsLoading, mainColor } = useAppContext()

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
			py='20px'
			px='30px'
			my={[3, 4, 5]}
			fontSize='12px'
			fontFamily='Montserrat, sans-serif'
			fontWeight='600'
			color={mainColor}
			border='1px solid'
			borderColor='#4553CF'
			borderRadius='10px'
			gap='10px'
			cursor='pointer'
			_hover={{ bg: 'rgba(69, 83, 207, 0.1)' }}
			onClick={openEditModal}
		>
			<Box
				display='flex'
				alignItems={'center'}
				onClick={e => e.stopPropagation()}
			>
				<Checkbox
					colorScheme='green'
					borderColor='#FFDA00'
					defaultChecked={task.complete}
					onChange={() => checkDone(task.id)}
				/>
			</Box>
			<Text>{task.text}</Text>
		</Flex >
	)
}

export default Task