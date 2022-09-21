import React from 'react'
import {
	Drawer,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useAppContext } from './app-context'
import Login from './LogIn'
import SignUp from './SignUp'

const AuthModal = () => {
	const { authModal, setAuthModal } = useAppContext()
	const backgroundColor = useColorModeValue('#FAFAFA', '#1C203B')

	const [noteBox, setNoteBox] = useState(false)
	const [singUp, setSingUp] = useState(false)

	return (
		<Drawer isOpen={authModal} onClose={() => setAuthModal(false)} size='full' placement='left'>
			<DrawerOverlay />
			<DrawerContent
				alignItems='center'
				backgroundColor={backgroundColor}
			>
				<DrawerCloseButton />
				{!singUp ? (
					<Login noteBox={noteBox} setNoteBox={setNoteBox} singUp={singUp} setSingUp={setSingUp} />
				) : (
					<SignUp noteBox={noteBox} setNoteBox={setNoteBox} singUp={singUp} setSingUp={setSingUp} />
				)}
			</DrawerContent>
		</Drawer >
	)
}

export default AuthModal