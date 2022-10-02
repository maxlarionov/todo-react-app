import React, { useEffect } from 'react'
import { Box, Center, DrawerBody, Flex, Image, useColorModeValue, } from '@chakra-ui/react'
import logo from '../imgs/logo.svg'
import { useState } from 'react'
import { useAppContext } from '../context/app-context'
import { postUser } from '../services'
import { useTranslation } from 'react-i18next'
import SolidButton from './ui/SolidButton'
import LinkButton from './ui/LinkButton'
import MyInput from './ui/MyInput'

const SignUp = ({ noteBox, setNoteBox }) => {
	const { users, setUsers, setIsLoading, mainColor, setModal } = useAppContext()
	const textColor = useColorModeValue('black', mainColor)
	const { t } = useTranslation()
	const [name, setName] = useState('')
	const [login, setLogin] = useState('')
	const [pass, setPass] = useState('')
	const defaultUserPhoto = 'https://github.com/maxlarionov/todo-react-app/blob/master/src/imgs/user.png?raw=true'

	const signUp = (name, login, pass) => {
		if (!!users) {
			const checkedUser = users.find(user => user.login === login)
			if (!!checkedUser) {
				setNoteBox({ text: t('signup.incorrectNote'), color: 'red' })
			} else if (login.length >= 3 && pass.length >= 3) {
				setIsLoading(true)
				const newUser = { name: name, login: login, password: pass, photo: defaultUserPhoto, todos: [] }
				postUser(newUser)
					.then(data => {
						setIsLoading(false)
						return setUsers(prevState => [...prevState, data])
					})
				setModal('logIn')
			} else {
				setNoteBox({ text: t('signup.errorNote'), color: 'red' })
			}
		}
	}

	useEffect(() => {
		setNoteBox(false)
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
					{t('signup.title')}
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
				<Box>
					<MyInput
						placeholder={t('signup.nameInput')}
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Box>
				<MyInput
					placeholder={t('signup.loginInput')}
					my={4}
					value={login}
					onChange={(e) => setLogin(e.target.value)}
				/>
				<MyInput
					type='password'
					placeholder={t('signup.passInput')}
					value={pass}
					onChange={(e) => setPass(e.target.value)}
				/>
				<Flex
					mt='16px'
					flexDirection='column'
					alignItems='center'
				>
					<SolidButton
						onClick={() => signUp(name, login, pass)}
					>
						{t('signup.signUpButton')}
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
						onClick={() => setModal('logIn')}
					>
						{t('signup.backButton')}
					</LinkButton>
				</Flex>
			</DrawerBody>
		</Box>
	)
}

export default SignUp