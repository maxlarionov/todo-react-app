import React, { useEffect } from 'react'
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
import { postUser } from './services'
import { useTranslation } from 'react-i18next'
import SolidButton from './ui/SolidButton'
import LinkButton from './ui/LinkButton'

const SignUp = ({ noteBox, setNoteBox }) => {
	const { users, setUsers, setIsLoading, mainColor, setModal } = useAppContext()
	const textColor = useColorModeValue('black', mainColor)
	const bgInputColor = useColorModeValue('white', '#1C203B')
	const { t } = useTranslation()
	const [person, setPerson] = useState('')
	const [pass, setPass] = useState('')

	const signUp = (person, pass) => {
		if (!!users) {
			const checkedUser = users.find(user => user.login === person)
			if (!!checkedUser) {
				setNoteBox({ text: t('signup.incorrectNote'), color: 'red' })
			} else if (person.length >= 3 && pass.length >= 3) {
				setIsLoading(true)
				const newUser = { todos: [], login: person, password: pass }
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
				<Input
					backgroundColor={bgInputColor}
					focusBorderColor={mainColor}
					placeholder={t('signup.loginInput')}
					value={person}
					onChange={(e) => setPerson(e.target.value)}
				/>
				<Input
					focusBorderColor={mainColor}
					backgroundColor={bgInputColor}
					my={4}
					type='password'
					placeholder={t('signup.passInput')}
					value={pass}
					onChange={(e) => setPass(e.target.value)}
				/>
				<Flex
					flexDirection='column'
					alignItems='center'
				>
					<SolidButton
						onClick={() => signUp(person, pass)}
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