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
import { postUser } from '../services'
import { useTranslation } from 'react-i18next'
import SolidButton from './ui/SolidButton'
import LinkButton from './ui/LinkButton'

const SignUp = ({ noteBox, setNoteBox }) => {
	const { users, setUsers, setIsLoading, mainColor, setModal } = useAppContext()
	const textColor = useColorModeValue('black', mainColor)
	const bgInputColor = useColorModeValue('white', '#1C203B')
	const { t } = useTranslation()
	const [name, setName] = useState('')
	const [login, setLogin] = useState('')
	const [pass, setPass] = useState('')
	const defaultUserPhoto = 'https://lh3.googleusercontent.com/dFUJ4IyxbYW7jnrzl13rNpGneB963e4RSR1X_3rvrQEDi9MH4be5Ik_I09nB8DEkPzFGT0NF4mtu1bwuWhJjbFItoIWqxbrFef_7E7a1cebGnpl5PPlN-4T12tni33uGmxFZx96y-7-O1OnvaTjkhGq_CQVOjIWo4lJBRuwRYTNdeJp1YLuG_RUUTKzq6g-Hl0v5xyStTWQ7kSBNR9tsQF9rIpY_5kvcAshAfSdhKV2ySEa1I-uVSvWMS9B236_7xexLL9g6_MLqWG5rF_uPB645ZA5AMPquvjkN8yE2i-dXNgHd-W2OTlcEPty46jHcLq4Ij8FHBTsGpDfjQ4v3DI6cT73eXk_H8tMBBC-Ak6yFDDyE9C5f0DFt5RbOze4bKbE9yYPcm7UWseZEUxbl_6e4pO0frtsG18zubNhudmP_qsGnFaCZJYJsg2-nsZBRrRe6M3_tkMKAkmtjdu3Aq4U6CA8MT8nZAKJgD3QPUqE-JspIO6J7aRUCjv9XTFEUIhArW3SigawvsmQqL78Ad9gnqtesYNP6eQ65jLRwlsjOuKscVTvbztxhT3_si4d63DhzDY4MEyJNYJC-YVQ-AoyQOs0KxekTHGh9RngH02oMXEncvaK2ovLuK-Rku8hUHW68MnYSQtaN2sRufVzL2nqV4b0C9WTWg7loneqhsVsC4DGc1WX4fKWiaeVd-nPWjgu5icNolMYxQfKB3WftqKQgegu9bYP0czxTMMguZKrgHaQERbFPXG7zAdhX7RLRm8VYaUYMehDdSz-uViYZDOhzwJlBiOfY0fYAzuBUuZi8T8hPDw5aTUxCqmEnCLS_rpUh=w800-h300-no?authuser=0'
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
					<Input
						backgroundColor={bgInputColor}
						focusBorderColor={mainColor}
						placeholder={t('signup.nameInput')}
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Box>
				<Input
					backgroundColor={bgInputColor}
					focusBorderColor={mainColor}
					placeholder={t('signup.loginInput')}
					my={4}
					value={login}
					onChange={(e) => setLogin(e.target.value)}
				/>
				<Input
					focusBorderColor={mainColor}
					backgroundColor={bgInputColor}
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