import React from 'react'
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/react'
import { useAppContext } from './app-context'
import { editDataTask } from './services'
import { useTranslation } from 'react-i18next'

const EditModal = () => {
	const { tasks, setTasks, editModal, setEditModal, setTextTask, editTask, setEditTask, userId, setIsLoading } = useAppContext()
	const { t } = useTranslation()

	const edit = () => {
		setIsLoading(true)
		const editedTasks = tasks.map(task => {
			if (task.id === editTask.id) {
				return { ...task, text: editTask.text }
			} else {
				return task
			}
		})
		editDataTask(userId, { todos: editedTasks })
			.then(() => {
				setIsLoading(false)
				return setTasks(editedTasks)
			},
				setEditTask(''),
				setEditModal(false)
			)
	}

	const deletedTask = (id) => {
		setIsLoading(true)
		const newTasksArr = tasks.filter(task => task.id !== id)
		editDataTask(userId, { todos: newTasksArr })
			.then(() => {
				setIsLoading(false)
				setEditModal(false)
				return setTasks(newTasksArr)
			})
	}

	const closeEditModal = () => {
		setTextTask('')
		setEditModal(false)
	}

	const onChangeEdit = (e) => {
		const value = e.target.value
		setEditTask(prevState => {
			return { ...prevState, text: value }
		})
	}

	return (
		<Modal isOpen={editModal} onClose={closeEditModal}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{t('main.editTitle')}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Input
						value={editTask.text}
						onChange={onChangeEdit}
						placeholder={t('main.createText')}
					/>
				</ModalBody>
				<ModalFooter
					justifyContent='space-between'
				>
					<Button
						variant='outline'
						colorScheme='red'
						onClick={() => deletedTask(editTask.id)}
					>
						{t('main.deleteButton')}
					</Button>
					<Button
						colorScheme='green'
						onClick={edit}
					>
						{t('main.editButton')}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default EditModal