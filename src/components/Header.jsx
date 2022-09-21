import React from 'react'
import {
	Center,
	Button,
	Flex,
	Image,
	Box,
	useColorMode,
	useColorModeValue
} from '@chakra-ui/react'
import logo from '../imgs/logo.svg'
import themeWhite from '../imgs/theme-w.svg'
import themeDark from '../imgs/theme-d.svg'
import { useAppContext } from './app-context'
import { useTranslation } from 'react-i18next'

const Header = () => {
	const { t } = useTranslation()
	const { setAddModal, setAuthModal, handleLanguageChange, language } = useAppContext()
	const { colorMode, toggleColorMode } = useColorMode()
	const hoverButtonColor = useColorModeValue({ bg: 'rgba(69, 83, 207, 0.1)' }, { bg: 'rgba(69, 83, 207, 0.3)' })
	const backgroundThemeColor = useColorModeValue('none', '#4553CF')



	const openAddModal = () => {
		setAddModal(true)
	}

	return (
		<Flex
			fontFamily=' Montserrat, sans-serif'
			fontWeight='700'
			flexDir='column'
			justifyContent='center'
			alignContent='center'
			py={['0px', '0px', '5px']}
			gap={['0px', '10px', '20px']}
			w='100%'
		>
			<Center
				mt={['10px', '20px', '30px']}
				mb={['5px', '10px', '15px']}
			>
				<Image src={logo} w={492} />
			</Center>

			<Flex
				justifyContent='space-between'
			>
				<Button
					fontSize='12px'
					variant='outline'
					p='10px'
					color='#4553CF'
					border='2px solid'
					borderColor=''
					borderRadius='10px'
					_hover={hoverButtonColor}
					onClick={() => setAuthModal(true)}
				>
					{t('main.logOutButton')}
				</Button>
				<Button
					fontSize='12px'
					fontWeight='500'
					bg='#4553CF'
					color='white'
					px='35px'
					borderRadius='10px'
					_hover={{ bgColor: 'rgba(53, 63, 156)' }}
					onClick={() => openAddModal()}
				>
					{t('main.addButton')}
				</Button>
				<Box
				>
					<Button
						fontSize='12px'
						variant='outline'
						p='10px'
						color='#4553CF'
						border='2px solid'
						borderColor=''
						borderRadius='10px'
						bg={backgroundThemeColor}
						_hover={hoverButtonColor}
						mr='10px'
						onClick={toggleColorMode}
					>
						<Image src={colorMode === 'light' ? themeWhite : themeDark} />
					</Button>
					<Button
						fontSize='12px'
						variant='outline'
						p='10px'
						color='#4553CF'
						border='2px solid'
						borderColor=''
						borderRadius='10px'
						_hover={hoverButtonColor}
						onClick={handleLanguageChange}
					>
						{language === 'en' ? t('EN') : t('UA')}
					</Button>
				</Box>

			</Flex>
		</Flex>

	)
}

export default Header