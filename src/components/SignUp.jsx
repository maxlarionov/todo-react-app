import React, { useEffect } from 'react'
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
import { postUser } from './services'
import { useTranslation } from 'react-i18next'

const SignUp = ({ noteBox, setNoteBox, setSingUp }) => {
	const { users, setUsers, setIsLoading } = useAppContext()

	const { t } = useTranslation()

	const [person, setPerson] = useState(``)
	const [pass, setPass] = useState('')

	const signUp = (person, pass) => {
		if (!!users) {
			const checkedUser = users.find(user => user.login === person)
			if (!!checkedUser) {
				setNoteBox({ text: t('signup.errortNote'), color: 'red' })
			} else {
				setIsLoading(true)
				const newUser = { todos: [], login: person, password: pass }
				postUser(newUser)
					.then(data => {
						setIsLoading(false)
						return setUsers(prevState => [...prevState, data])
					})
				setSingUp(false)
			}
		}
	}

	useEffect(() => {
		setNoteBox({ text: t('login.defaultNote'), color: 'black' })
	}, [setNoteBox, t])

	return (
		<Box
			my={['50px', '100px', '30px']}
		>
			<DrawerHeader
				fontSize={'24px'}
			>
				{t('signup.title')}</DrawerHeader>
			<DrawerBody>
				<Box
					color={noteBox.color}
					my='10px'
				>
					{noteBox.text}
				</Box>

				<Input
					backgroundColor='white'
					placeholder={t('signup.loginInput')}
					value={person}
					onChange={(e) => setPerson(e.target.value)}
				/>
				<Input
					my={4}
					backgroundColor='white'
					type='password'
					placeholder={t('signup.passInput')}
					value={pass}
					onChange={(e) => setPass(e.target.value)}
				/>

				<Flex
					justifyContent='space-between'
				>
					<Button
						onClick={() => setSingUp(false)}
					>
						{t('signup.backButton')}
					</Button>
					<Button
						colorScheme='blue'
						onClick={() => signUp(person, pass)}
					>
						{t('signup.signUpButton')}
					</Button>
				</Flex>
			</DrawerBody>
		</Box>

	)
}

export default SignUp