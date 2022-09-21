import React, { useEffect } from 'react'
import {
	Box
} from '@chakra-ui/react'
import Task from './Task'
import { useAppContext } from './app-context'
import { getTasks } from './services'
import Empty from './Empty'

const TasksList = () => {
	const { tasks, setTasks, userId, setIsLoading } = useAppContext()

	useEffect(() => {
		setIsLoading(true)
		getTasks(userId)
			.then(data => {
				setIsLoading(false)
				return setTasks(data.todos)
			})
	}, [setTasks, userId, setIsLoading])

	return (
		<Box>
			{tasks[0] ? (
				tasks.map(task =>
					<Task key={task.id} task={task} />
				)
			) : (
				<Empty />
			)}

		</Box>
	)
}

export default TasksList