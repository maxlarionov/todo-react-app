import React from 'react'
import {
	Center,
	Button,
	Flex,
	Image
} from '@chakra-ui/react'
import logo from '../imgs/logo.png'
import { useAppContext } from './app-context'
import { useTranslation } from 'react-i18next'

const Header = () => {
	const { t } = useTranslation()

	const { setAddModal, setAuthModal, handleLanguageChange, language } = useAppContext()

	const openAddModal = () => {
		setAddModal(true)
	}

	return (
		<Flex
			flexDir='column'
			justifyContent='center'
			alignContent='center'
			py={['0px', '0px', '5px']}
			gap={['0px', '10px', '20px']}
			w='100%'
		>
			<Center
				mt={['0px', '10px', '20px']}
			>
				<Image src={logo} w={250} />
			</Center>

			<Flex
				justifyContent='space-between'
			>
				<Button
					colorScheme='cyan'
					variant='outline'
					onClick={() => setAuthModal(true)}
				>
					{t('main.accButton')}
				</Button>
				<Button
					colorScheme='green'
					onClick={() => openAddModal()}
				>
					{t('main.addButton')}
				</Button>
				<Button
					colorScheme='cyan'
					variant='outline'
					onClick={handleLanguageChange}
				>
					{language === 'en' ? t('EN') : t('UA')}
				</Button>
			</Flex>
		</Flex>

	)
}

export default Header