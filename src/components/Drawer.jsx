import React from 'react'
import { Drawer, DrawerContent, DrawerOverlay, useColorModeValue } from '@chakra-ui/react'
import { useState } from 'react'
import { useAppContext } from '../context/app-context'
import DrawerLogin from './DrawerLogIn'
import DrawerSignUp from './DrawerSignUp'
import DrawerProfile from './DrawerProfile'

const AuthModal = () => {
	const { Modal } = useAppContext()
	const backgroundColor = useColorModeValue('#FAFAFA', '#1C203B')
	const [noteBox, setNoteBox] = useState(false)

	return (
		<Drawer isOpen={Modal !== 'close' ? true : false} size='full' placement='left' blockScrollOnMount={false}>
			<DrawerOverlay />
			<DrawerContent
				alignItems='center'
				backgroundColor={backgroundColor}
			>
				{Modal === 'logIn' ? (
					<DrawerLogin noteBox={noteBox} setNoteBox={setNoteBox} />
				) : (
					Modal === 'signUp' ? (
						<DrawerSignUp noteBox={noteBox} setNoteBox={setNoteBox} />
					) : (
						<DrawerProfile />
					)
				)}
			</DrawerContent>
		</Drawer >
	)
}

export default AuthModal