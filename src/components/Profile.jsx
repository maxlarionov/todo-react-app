import React from 'react'
import {
	Box,
	DrawerBody,
	Editable,
	EditableInput,
	EditablePreview,
	Flex,
	Image,
	useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useAppContext } from './app-context'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import SolidButton from './ui/SolidButton'
import OutlineButton from './ui/OutlineButton'
import { deleteUser } from './services'

const Profile = () => {
	const { tasks, users, setUsers, userId, mainColor, setModal, setIsLoading } = useAppContext()
	const textColor = useColorModeValue('black', mainColor)
	const bgInputColor = useColorModeValue('white', '#1C203B')
	const { t } = useTranslation()
	const [person, setPerson] = useState(``)
	const [pass, setPass] = useState('')

	const name = localStorage.getItem('name')

	const cleanUpLocalStorage = () => {
		localStorage.removeItem('login')
		localStorage.removeItem('id')
		localStorage.removeItem('name')
	}

	const logOut = () => {
		setModal('logIn')
		cleanUpLocalStorage()
	}

	const deleteProfile = () => {
		setIsLoading(true)
		deleteUser(userId)
			.then(() => {
				setModal('logIn')
				cleanUpLocalStorage()
				setIsLoading(false)
				return setUsers(prevState => prevState.filter(user => user.id !== userId))
			})
	}

	const backToMain = () => {
		setModal('close')
	}

	return (
		<Box
			w='480px'
			alignItems='left'
			my={['50px', '100px', '30px']}
		>
			<DrawerBody>
				<Box
					fontFamily='Montserrat, sans-serif'
					fontWeight='700'
					fontSize='18px'
					color={textColor}
					my="15px"
				>
					Profile
				</Box>

				<Box>
					Photo
					<Box
						w='100px'
						h='100px'
					>
						<Image
							h='100px'
							src='https://images7.memedroid.com/images/UPLOADED484/611bd18aecbfd.jpeg' />
					</Box>
				</Box>

				<Box
					my='20px'
				>
					Name
					<Editable defaultValue={name}>
						<EditablePreview />
						<EditableInput />
					</Editable>
				</Box>

				<Flex
					justifyContent='space-around'
					alignItems='center'
				>
					<OutlineButton
						onClick={() => deleteProfile()}
					>
						DELETE
					</OutlineButton>
					<SolidButton
						onClick={logOut}
					>
						{t('main.logOutButton')}
					</SolidButton>
					<OutlineButton
						onClick={() => backToMain()}
					>
						BACK
					</OutlineButton>
				</Flex>
			</DrawerBody>
		</Box >
	)
}

export default Profile