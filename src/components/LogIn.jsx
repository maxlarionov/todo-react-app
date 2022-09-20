import React from 'react'
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
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Login = ({ noteBox, setNoteBox, setSingUp }) => {
	const { setAuthModal, setUserId, users } = useAppContext()

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
			{/* <DrawerHeader
				color='black'
				// color={['red', 'white', 'black']}
				fontSize={'24px'}
			>
				{t('login.title')}
			</DrawerHeader> */}
			<Center
				mt={['0px', '15px', '30px']}
			>
				<Image src={logo} w={492} />
			</Center>
			<DrawerBody>
				{/* <Box
						color={noteBox.color}
					>
						{noteBox.text}
					</Box> */}
				<Box
					fontFamily='Montserrat, sans-serif'
					fontWeight='700'
					color="#4553CF"
					my="24px"
				>
					{t('login.title')}
				</Box>

				<Input
					backgroundColor='white'
					placeholder={t('login.loginInput')}
					focusBorderColor='#4553CF'
					value={person}
					onChange={(e) => setPerson(e.target.value)}
				/>
				<Input
					my={4}
					backgroundColor='white'
					type='password'
					placeholder={t('login.passInput')}
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
						onClick={() => setAuthModal(false)}
					>
						{t('login.testingButton')}
					</Button>
					<Button
						fontSize='12px'
						variant='outline'
						p='10px'
						color='#4553CF'
						border={'2px solid'}
						borderColor=''
						borderRadius='10px'
						_hover={{ bg: 'rgba(69, 83, 207, 0.1)' }}
						onClick={() => setSingUp(true)}
					>
						{t('login.signUpButton')}
					</Button>
					< Button
						fontSize='12px'
						fontWeight='500'
						bg='#4553CF'
						color='white'
						px='35px'
						borderRadius='10px'
						fontFamily='Montserrat, sans-serif'
						_hover={{ borderColor: 'rgba(69, 83, 207)', bgColor: 'rgba(53, 63, 156)' }}
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