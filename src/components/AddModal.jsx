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

const AddModal = () => {
	const { tasks, setTasks, addModal, setAddModal, textTask, setTextTask, userId, setIsLoading } = useAppContext()
	const { t } = useTranslation()

	const addTask = (e) => {
		setIsLoading(true)
		const newTask = { id: Date.now(), text: textTask, complete: false, }
		editDataTask(userId, { todos: [...tasks, newTask] })
			.then(data => {
				setIsLoading(false)
				return setTasks(data.todos)
			})
		closeAddModal()
	}

	const closeAddModal = () => {
		setTextTask('')
		setAddModal(false)
	}

	return (
		<Modal isOpen={addModal} onClose={closeAddModal}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{t('main.createTitle')}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Input
						value={textTask}
						onChange={(e) => setTextTask(e.target.value)}
						placeholder={t('main.createText')}
					/>
				</ModalBody>
				<ModalFooter>
					<Button
						colorScheme='green'
						onClick={addTask}
					>
						{t('main.createButton')}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default AddModal