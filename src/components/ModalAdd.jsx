import React from 'react'
import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useColorMode, } from '@chakra-ui/react'
import { useAppContext } from '../context/app-context'
import { editDataTask } from '../services'
import { useTranslation } from 'react-i18next'
import SolidButton from './ui/SolidButton'
import MyInput from './ui/MyInput'

const AddModal = () => {
	const { tasks, setTasks, addModal, setAddModal, textTask, setTextTask, user, userId, setIsLoading, mainColor, setModal, language } = useAppContext()
	const { t } = useTranslation()
	const { colorMode } = useColorMode()
	const personName = user.name

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

	const openProfile = () => {
		closeAddModal()
		setModal('profile')
	}

	return (
		<Modal isOpen={addModal} onClose={closeAddModal} size={'lg'}>
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
						{t('main.createTitle')}
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
						value={textTask}
						onChange={(e) => setTextTask(e.target.value)}
						placeholder={t('main.createText')}
					/>
				</ModalBody>
				<ModalFooter>
					<SolidButton
						color={colorMode === 'light' ? '#FAFAFA' : '#1D2633'}
						onClick={addTask}
					>
						{t('main.createButton')}
					</SolidButton>
				</ModalFooter>
			</ModalContent>
		</Modal >
	)
}

export default AddModal