import React from 'react'
import {
	Drawer,
	DrawerContent,
	DrawerOverlay,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useAppContext } from './app-context'
import Login from './LogIn'
import SignUp from './SignUp'
import { useTranslation } from 'react-i18next'

const AuthModal = () => {
	const { authModal } = useAppContext()
	const { t } = useTranslation()

	const [noteBox, setNoteBox] = useState({ text: t('login.defaultNote'), color: 'black' })
	const [singUp, setSingUp] = useState(false)

	return (
		<Drawer isOpen={authModal} size='full' placement='left'>
			<DrawerOverlay />
			<DrawerContent
				alignItems='center'
				backgroundColor='#FAFAFA'
			>
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