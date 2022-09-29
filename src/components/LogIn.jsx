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
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import SolidButton from './ui/SolidButton'
import LinkButton from './ui/LinkButton'

const Login = ({ noteBox, setNoteBox }) => {
	const { setAuth, users, setUser, mainColor, setModal, setUserId } = useAppContext()
	const textColor = useColorModeValue('black', mainColor)
	const bgInputColor = useColorModeValue('white', '#1C203B')
	const { t } = useTranslation()
	const [person, setPerson] = useState(``)
	const [pass, setPass] = useState('')

	const checkAuth = (person, pass) => {
		if (!!users) {
			users.forEach(user => {
				if (person === user.login && pass === user.password) {
					const userData = { login: user.login, id: user.id, name: user.name, photo: user.photo }
					localStorage.setItem('user', JSON.stringify(userData))
					localStorage.setItem('id', user.id)
					setAuth(true)
					setUser(userData)
					setUserId(user.id)
					setPerson('')
					setPass('')
					setNoteBox(false)
					setModal('close')
				} else setNoteBox({ text: t('login.errorNote'), color: 'red' })
			})
		}
	}

	useEffect(() => {
		return () => setNoteBox(false)
	}, [setNoteBox, t])

	return (
		<Box
			my={['50px', '100px', '30px']}
		>
			<Center
				mt={['0px', '15px', '30px']}
			>
				<Image src={logo} w={492} />
			</Center>
			<DrawerBody>
				<Box
					fontFamily='Montserrat, sans-serif'
					fontWeight='700'
					fontSize='18px'
					color={textColor}
					my="15px"
				>
					{t('login.title')}
				</Box>
				{noteBox ? (
					<Box
						color={noteBox.color}
						my='10px'
					>
						{noteBox.text}
					</Box>
				) : (
					<Box display={'none'}></Box>
				)}
				<Input
					backgroundColor={bgInputColor}
					focusBorderColor={mainColor}
					placeholder={t('login.loginInput')}
					value={person}
					onChange={(e) => setPerson(e.target.value)}
				/>
				<Input
					backgroundColor={bgInputColor}
					focusBorderColor={mainColor}
					my={4}
					type='password'
					placeholder={t('login.passInput')}
					value={pass}
					onChange={(e) => setPass(e.target.value)}
				/>
				<Flex
					flexDirection='column'
					alignItems='center'
				>
					<SolidButton
						onClick={() => checkAuth(person, pass)}
					>
						{t('login.logInButton')}
					</SolidButton>
					<Box
						fontFamily='Montserrat, sans-serif'
						fontWeight='500'
						fontSize='12px'
						mt='15px'
						color={textColor}
					>
						{t('login.orButton')}
					</Box>
					<LinkButton
						onClick={() => setModal('signUp')}
					>
						{t('login.signUpButton')}
					</LinkButton>
				</Flex>
			</DrawerBody>
		</Box >
	)
}

export default Login