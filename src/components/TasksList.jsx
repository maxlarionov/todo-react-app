import React from 'react'
import {
	Box
} from '@chakra-ui/react'
import Task from './Task'
import { useAppContext } from './app-context'
import Empty from './Empty'

const TasksList = () => {
	const { tasks } = useAppContext()

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