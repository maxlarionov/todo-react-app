import React from 'react'
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useColorMode } from '@chakra-ui/react'
import { useAppContext } from '../context/app-context'
import { editDataTask } from '../services'
import { useTranslation } from 'react-i18next'
import SolidButton from './ui/SolidButton'
import delButton from '../imgs/delete-icon.svg'
import hoverDelButton from '../imgs/delete-icon-hover.svg'
import fullDelButton from '../imgs/delete-icon-full.svg'
import MyInput from './ui/MyInput'

const EditModal = () => {
	const { tasks, setTasks, editModal, setEditModal, setTextTask, editTask, setEditTask, user, userId, setIsLoading, mainColor, setModal, language } = useAppContext()
	const { t } = useTranslation()
	const { colorMode } = useColorMode()
	const personName = user.name

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

	const openProfile = () => {
		setEditTask('')
		setEditModal(false)
		setModal('profile')
	}

	return (
		<Modal isOpen={editModal} onClose={closeEditModal} size={'lg'}>
			<ModalOverlay bg='blackAlpha.300' backdropFilter='blur(6px)' />
			<ModalContent
				bg={colorMode === 'light' ? '#FAFAFA' : '#1C203B'}
			>
				<ModalHeader
					pt='20px'
					pb='5px'
					color={mainColor}
				>
					<Box
						fontFamily='Montserrat, sans-serif'
						fontWeight='700'
						pb='0px'
					>
						{t('main.editTitle')}
					</Box>
					{language === 'en' ? (
						<Box
							fontFamily='Montserrat, sans-serif'
							fontWeight='500'
							fontSize='11px'
						>
							<Box
								cursor='pointer'
								display='inline-block'
								fontWeight='700'
								_hover={{ textDecoration: 'underline' }}
								onClick={openProfile}
							>
								{personName}
							</Box>
							{t('main.createSubTitle')}
						</Box>
					) : (
						<Box
							fontFamily='Montserrat, sans-serif'
							fontWeight='500'
							fontSize='11px'
						>
							{t('main.createSubTitle')}
							<Box
								cursor='pointer'
								display='inline-block'
								fontWeight='700'
								_hover={{ textDecoration: 'underline' }}
								onClick={openProfile}
							>
								{personName}
							</Box>
						</Box>
					)}
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<MyInput
						value={editTask.text}
						onChange={onChangeEdit}
						placeholder={t('main.createText')}
					/>
				</ModalBody>
				<ModalFooter
					justifyContent='space-between'
				>
					<Button
						bgImage={delButton}
						bgRepeat='no-repeat'
						bgSize='cover'
						w='40px'
						h='40px'
						transition='0.3s'
						_hover={{ bgImage: [hoverDelButton] }}
						_active={{ bgImage: [fullDelButton] }}
						onClick={() => deletedTask(editTask.id)}
					/>
					<SolidButton
						color={colorMode === 'light' ? '#FAFAFA' : '#1D2633'}
						onClick={edit}
					>
						{t('main.editButton')}
					</SolidButton>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default EditModal