import React from 'react'
import {
	Box,
	Center,
	DrawerBody,
	Flex,
	Image,
	Input,
	useColorModeValue,
} from '@chakra-ui/react'
import logo from '../imgs/logo.svg'
import { useState } from 'react'
import { useAppContext } from './app-context'
import { useTranslation } from 'react-i18next'
import SolidButton from './ui/SolidButton'
import OutlineButton from './ui/OutlineButton'
import LinkButton from './ui/LinkButton'
import { deleteUser, editData } from './services'

const Profile = () => {
	const { tasks, setUsers, setUser, user, userId, mainColor, setModal, setIsLoading } = useAppContext()
	const textColor = useColorModeValue('black', mainColor)
	const bgInputColor = useColorModeValue('white', '#1C203B')
	const { t } = useTranslation()
	const [error, setError] = useState(false)
	const [editedImg, setEditedImg] = useState('')
	const [editedName, setEditedName] = useState('')

	const cleanUpLocalStorage = () => {
		localStorage.removeItem('user')
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

	const changeData = (newData, keyData) => {
		setIsLoading(true)
		if (!!newData) {
			const key = keyData
			setUser(prevState => {
				return { ...prevState, [key]: newData }
			})
			const editedUser = { ...user, [key]: newData }
			localStorage.setItem('user', JSON.stringify(editedUser))
			editData(userId, { [key]: newData })
				.then(() => {
					setIsLoading(false)
					setError(false)
				})
		} else {
			setError(true)
			setIsLoading(false)
		}
	}

	return (
		<Box
			maxW='560px'
			alignItems='left'
		>
			<DrawerBody>
				<Center
					mt={['10px', '20px', '30px']}
					mb={['5px', '10px', '15px']}
				>
					<Image src={logo} w='100%' />
				</Center>
				<Box
					fontFamily='Montserrat, sans-serif'
					fontWeight='700'
					fontSize='18px'
					color={textColor}
					my="15px"
				>
					{t('profile.title')}
				</Box>
				<Flex>
					<Box
						h='150px'
						my='10px'
						borderRadius='50%'
						overflow='hidden'
						flex='0 0 150px'
					>
						<Image
							objectFit='cover'
							h='100%'
							w='auto'
							src={user.photo}
							alt='Profile photo'
						/>
					</Box>
					<Flex
						mx='20px'
						flexDirection='column'
						justifyContent='center'
					>
						<Box
							color={mainColor}
							fontFamily='Montserrat, sans-serif'
							fontSize='30px'
							fontWeight='700'
						>
							{user.name}
						</Box>
						<Box
							color={textColor}
							fontFamily='Montserrat, sans-serif'
							fontSize='14px'
							fontWeight='500'
						>
							{t('profile.subText')} {tasks.length}
						</Box>
					</Flex>
				</Flex>
				{error ? (
					<Box
						textAlign='center'
						color='red'
						my='10px'
					>
						{t('profile.error')}
					</Box>
				) : (
					<Box display={'none'}></Box>
				)}

				<Box
					my='20px'
				>
					<Box
						my='10px'
						color={textColor}
						fontFamily='Montserrat, sans-serif'
						fontSize='16px'
						fontWeight='500'
					>
						{t('profile.photoTitle')}
					</Box>
					<Flex
						gap='10px'
					>
						<Input
							bgColor={bgInputColor}
							placeholder={t('profile.photoPlaceholder')}
							value={editedImg}
							onChange={(e) => setEditedImg(e.target.value)}
						/>
						<LinkButton
							onClick={() => changeData(editedImg, 'photo')}
						>
							{t('profile.changeButton')}
						</LinkButton>
					</Flex>
				</Box>
				<Box
					my='20px'
				>
					<Box
						my='10px'
						color={textColor}
						fontFamily='Montserrat, sans-serif'
						fontSize='16px'
						fontWeight='500'
					>
						{t('profile.nameTitle')}
					</Box>
					<Flex
						gap='10px'
					>
						<Input
							bgColor={bgInputColor}
							placeholder={t('profile.namePlaceholder')}
							value={editedName}
							onChange={(e) => setEditedName(e.target.value)}
						/>
						<LinkButton
							onClick={() => changeData(editedName, 'name')}
						>
							{t('profile.changeButton')}
						</LinkButton>
					</Flex>
				</Box>
				<Flex
					my='30px'
					justifyContent='space-around'
					alignItems='center'
				>
					<OutlineButton
						onClick={() => deleteProfile()}
					>
						{t('profile.deleteUserButton')}
					</OutlineButton>
					<SolidButton
						onClick={logOut}
					>
						{t('profile.logOutUserButton')}
					</SolidButton>
					<OutlineButton
						onClick={() => backToMain()}
					>
						{t('profile.backToMainButton')}
					</OutlineButton>
				</Flex>
			</DrawerBody>
		</Box>
	)
}

export default Profile