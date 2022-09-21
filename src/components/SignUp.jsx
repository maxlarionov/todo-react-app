import React, { useEffect } from 'react'
import {
	Box,
	Button,
	Center,
	DrawerBody,
	Flex,
	Image,
	Input,
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react'
import logo from '../imgs/logo.svg'
import { useState } from 'react'
import { useAppContext } from './app-context'
import { postUser } from './services'
import { useTranslation } from 'react-i18next'

const SignUp = ({ noteBox, setNoteBox, setSingUp }) => {
	const { users, setUsers, setIsLoading } = useAppContext()
	const { colorMode } = useColorMode()
	const textColor = useColorModeValue('black', '#4553CF')
	const bgInputColor = useColorModeValue('white', '#1C203B')

	const { t } = useTranslation()

	const [person, setPerson] = useState(``)
	const [pass, setPass] = useState('')

	const signUp = (person, pass) => {
		if (!!users) {
			const checkedUser = users.find(user => user.login === person)
			if (!!checkedUser) {
				setNoteBox({ text: t('signup.errorNote'), color: 'red' })
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
					placeholder={t('signup.loginInput')}
					focusBorderColor='#4553CF'
					value={person}
					onChange={(e) => setPerson(e.target.value)}
				/>
				<Input
					my={4}
					backgroundColor={bgInputColor}
					type='password'
					placeholder={t('signup.passInput')}
					focusBorderColor='#4553CF'
					value={pass}
					onChange={(e) => setPass(e.target.value)}
				/>

				<Flex
					flexDirection='column'
					alignItems='center'
				>
					<Button
						fontSize='12px'
						fontWeight='500'
						bg='#4553CF'
						color='white'
						px='35px'
						borderRadius='10px'
						fontFamily='Montserrat, sans-serif'
						_hover={{ borderColor: 'rgba(69, 83, 207)', bgColor: 'rgba(53, 63, 156)' }}
						onClick={() => signUp(person, pass)}
					>
						{t('signup.signUpButton')}
					</Button>

					<Box
						fontFamily='Montserrat, sans-serif'
						fontWeight='500'
						fontSize='12px'
						mt='15px'
						color={textColor}
					>
						або
					</Box>

					<Button
						fontFamily='Montserrat, sans-serif'
						fontWeight='500'
						fontSize='12px'
						variant='outline'
						color={colorMode === 'light' ? '#4553CF' : 'white'}
						border='none'
						_hover={{ textDecoration: 'underline' }}
						onClick={() => setSingUp(false)}
					>
						{t('signup.backButton')}
					</Button>
				</Flex>
			</DrawerBody>
		</Box>

	)
}

export default SignUp