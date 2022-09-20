import React, { useEffect } from 'react'
import {
	Box,
	Button,
	Center,
	DrawerBody,
	Flex,
	Image,
	Input,
} from '@chakra-ui/react'
import logo from '../imgs/logo.svg'
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
			<Center
				mt={['0px', '15px', '30px']}
			>
				<Image src={logo} w={492} />
			</Center>

			<DrawerBody>
				<Box
					fontFamily='Montserrat, sans-serif'
					fontWeight='700'
					color="#4553CF"
					my="24px"
				>
					{t('signup.title')}
				</Box>
				{/* <Box
					color={noteBox.color}
				>
					{noteBox.text}
				</Box> */}

				<Input
					backgroundColor='white'
					placeholder={t('signup.loginInput')}
					focusBorderColor='#4553CF'
					value={person}
					onChange={(e) => setPerson(e.target.value)}
				/>
				<Input
					my={4}
					backgroundColor='white'
					type='password'
					placeholder={t('signup.passInput')}
					focusBorderColor='#4553CF'
					value={pass}
					onChange={(e) => setPass(e.target.value)}
				/>

				<Flex
					justifyContent='space-between'
				>
					<Button
						fontSize='12px'
						variant='outline'
						p='10px'
						color='#4553CF'
						border={'2px solid'}
						borderColor=''
						borderRadius='10px'
						_hover={{ bg: 'rgba(69, 83, 207, 0.1)' }}
						onClick={() => setSingUp(false)}
					>
						{t('signup.backButton')}
					</Button>
					<Button
						fontSize='12px'
						fontWeight='500'
						bg='#4553CF'
						color='white'
						px='35px'
						borderRadius='10px'
						fontFamily='Montserrat, sans-serif'
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