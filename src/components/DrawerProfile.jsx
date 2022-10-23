import React from 'react'
import { Box, Center, DrawerBody, Flex, Image, useColorModeValue } from '@chakra-ui/react'
import logo from '../imgs/logo.svg'
import { useState } from 'react'
import { useAppContext } from '../context/app-context'
import { useTranslation } from 'react-i18next'
import SolidButton from './ui/SolidButton'
import OutlineButton from './ui/OutlineButton'
import LinkButton from './ui/LinkButton'
import { deleteUser, editData } from '../services'
import MyInput from './ui/MyInput'

const Profile = () => {
	const { tasks, setUsers, setUser, user, userId, mainColor, setModal, setIsLoading } = useAppContext()
	const textColor = useColorModeValue('black', mainColor)
	const { t } = useTranslation()
	const [error, setError] = useState(false)
	const [editedImg, setEditedImg] = useState('')
	const [editedName, setEditedName] = useState('')

	const cleanUpLocalStorage = () => {
		localStorage.removeItem('user')
		localStorage.removeItem('id')
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
						<MyInput
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
						<MyInput
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
					<OutlineButton
						onClick={logOut}
					>
						{t('profile.logOutUserButton')}
					</OutlineButton>
					<SolidButton
						onClick={() => backToMain()}
					>
						{t('profile.backToMainButton')}
					</SolidButton>
				</Flex>
				<Box
					display={['block', 'block', 'flex']}
					justifyContent='center'
				>
					<Box
						fontWeight='600'
						p='5px'
						mr='5px'
					>
						Developers:
					</Box>
					<Box
						fontSize='14px'
						mx='5px'
					>
						Code
						<LinkButton href='https://github.com/maxlarionov' isExternal>Max Larionov</LinkButton>
					</Box>
					<Box
						fontSize='14px'
						mx='5px'
					>
						Design
						<LinkButton href='https://www.behance.net/Assasinsas528c' isExternal>Alex Tkachenko</LinkButton>
					</Box>
				</Box>
			</DrawerBody>
		</Box>
	)
}

export default Profile