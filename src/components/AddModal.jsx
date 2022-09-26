import React from 'react'
import {
	Box,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useColorMode,
	useColorModeValue
} from '@chakra-ui/react'
import { useAppContext } from './app-context'
import { editDataTask } from './services'
import { useTranslation } from 'react-i18next'
import SolidButton from './ui/SolidButton'

const AddModal = () => {
	const { tasks, setTasks, addModal, setAddModal, textTask, setTextTask, userId, setIsLoading, mainColor, setModal } = useAppContext()
	const { t } = useTranslation()
	const { colorMode } = useColorMode()
	const bgInputColor = useColorModeValue('white', '#1C203B')
	const personName = localStorage.getItem('name')

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
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Input
						backgroundColor={bgInputColor}
						focusBorderColor={mainColor}
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