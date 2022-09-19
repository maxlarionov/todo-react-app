import React from 'react'
import {
	Box,
	Button,
	DrawerBody,
	DrawerHeader,
	Flex,
	Input,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useAppContext } from './app-context'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Login = ({ noteBox, setNoteBox, setSingUp }) => {
	const { setAuthModal, setUserId, users, handleLanguageChange, language } = useAppContext()

	const { t } = useTranslation()


	const [person, setPerson] = useState(``)
	const [pass, setPass] = useState('')

	const checkAuth = (person, pass) => {
		if (!!users) {
			users.forEach(user => {
				if (person === user.login && pass === user.password) {
					setUserId(user.id)
					setPerson('')
					setPass('')
					setNoteBox({ text: t('login.defaultNote'), color: 'black' })
					setAuthModal(false)
				} else setNoteBox({ text: t('login.errorNote'), color: 'red' })
			})
		}
	}

	useEffect(() => {
		return () => setNoteBox({ text: t('login.defaultNote'), color: 'black' })
	}, [setNoteBox, t])

	return (
		<Box
			my={['50px', '100px', '30px']}
		>
			<DrawerHeader
				color='black'
				// color={['red', 'white', 'black']}
				fontSize={'24px'}
			>
				{t('login.title')}
			</DrawerHeader>
			<DrawerBody>
				<Flex
					my='10px'
					justifyContent='space-between'
					alignItems='center'
				>
					<Box
						color={noteBox.color}
					>
						{noteBox.text}
					</Box>
					<Button
						fontSize='12px'
						h='30px'
						colorScheme='cyan'
						variant='outline'
						onClick={handleLanguageChange}
					>
						{language === 'en' ? t('EN') : t('UA')}
					</Button>
				</Flex>

				<Input
					backgroundColor='white'
					placeholder={t('login.loginInput')}
					value={person}
					onChange={(e) => setPerson(e.target.value)}
				/>
				<Input
					my={4}
					backgroundColor='white'
					type='password'
					placeholder={t('login.passInput')}
					value={pass}
					onChange={(e) => setPass(e.target.value)}
				/>
				<Flex
					justifyContent='space-between'
				>
					<Button
						onClick={() => setAuthModal(false)}
					>
						{t('login.testingButton')}
					</Button>
					<Button
						onClick={() => setSingUp(true)}
					>
						{t('login.signUpButton')}
					</Button>
					< Button
						colorScheme='blue'
						onClick={() => checkAuth(person, pass)}
					>
						{t('login.logInButton')}
					</Button>
				</Flex>
			</DrawerBody>
		</Box>
	)
}

export default Login