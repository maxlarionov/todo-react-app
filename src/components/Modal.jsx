import React from 'react'
import {
	Drawer,
	DrawerContent,
	DrawerOverlay,
	useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useAppContext } from './app-context'
import Login from './LogIn'
import SignUp from './SignUp'
import Profile from './Profile'

const AuthModal = () => {
	const { Modal } = useAppContext()
	const backgroundColor = useColorModeValue('#FAFAFA', '#1C203B')
	const [noteBox, setNoteBox] = useState(false)

	return (
		<Drawer isOpen={Modal !== 'close' ? true : false} size='full' placement='left'>
			<DrawerOverlay />
			<DrawerContent
				alignItems='center'
				backgroundColor={backgroundColor}
			>
				{Modal === 'logIn' ? (
					<Login noteBox={noteBox} setNoteBox={setNoteBox} />
				) : (
					Modal === 'signUp' ? (
						<SignUp noteBox={noteBox} setNoteBox={setNoteBox} />
					) : (
						<Profile />
					)
				)}
			</DrawerContent>
		</Drawer >
	)
}

export default AuthModal