import React from 'react'
import {
	Box,
	Center,
	DrawerBody,
	Editable,
	EditableInput,
	EditablePreview,
	Flex,
	Image,
	Input,
	useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useAppContext } from './app-context'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import SolidButton from './ui/SolidButton'
import LinkButton from './ui/LinkButton'
import OutlineButton from './ui/OutlineButton'

const Profile = () => {
	const { tasks, users, mainColor, setModal } = useAppContext()
	const textColor = useColorModeValue('black', mainColor)
	const bgInputColor = useColorModeValue('white', '#1C203B')
	const { t } = useTranslation()
	const [person, setPerson] = useState(``)
	const [pass, setPass] = useState('')

	const name = localStorage.getItem('name')

	const logOut = () => {
		setModal('logIn')
		localStorage.removeItem('login')
		localStorage.removeItem('id')
	}

	return (
		<Box
			w='480px'
			alignItems='left'
			my={['50px', '100px', '30px']}
		>
			<DrawerBody>
				<Box
					fontFamily='Montserrat, sans-serif'
					fontWeight='700'
					fontSize='18px'
					color={textColor}
					my="15px"
				>
					Profile
				</Box>

				<Box>
					Your name
					<Box
						w='100px'
						h='100px'
					>
						<Image
							h='100px'
							src='https://memepedia.ru/wp-content/uploads/2019/01/hamster-768x432.jpg' />
					</Box>
				</Box>

				<Box>
					Your name
					<Editable defaultValue={name}>
						<EditablePreview />
						<EditableInput />
					</Editable>
				</Box>

				<Flex
					flexDirection='column'
					alignItems='center'
				>
					<OutlineButton
						onClick={() => console.log(tasks)}
					>
						Delete
					</OutlineButton>
					<SolidButton
						onClick={logOut}
					>
						Log out
					</SolidButton>
				</Flex>
			</DrawerBody>
		</Box >
	)
}

export default Profile