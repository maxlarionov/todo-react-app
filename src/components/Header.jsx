import React from 'react'
import {
	Center,
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
import OutlineButton from './ui/OutlineButton'
import SolidButton from './ui/SolidButton'

const Header = () => {
	const { t } = useTranslation()
	const { user, setAddModal, setModal, handleLanguageChange, language, mainColor } = useAppContext()
	const { colorMode, toggleColorMode } = useColorMode()
	const backgroundThemeColor = useColorModeValue('none', mainColor)
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
			py={['10px', '15px', '20px']}
			gap={['10px', '10px', '20px']}
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
				flexDirection={['column', 'row']}
				gap={['10px', '0px']}
			>
				<Flex
					alignItems='center'
					gap='1'
					maxW='120px'
					cursor='pointer'
					_hover={{ opacity: 0.7 }}
					onClick={() => setModal('profile')}
				>
					<OutlineButton
						bgImage={user.photo}
						bgSize='cover'
						bgPosition='center'
						_hover={{ bgImage: [user.photo] }}
						_active={{ bgImage: [user.photo] }}
						onClick={(e) => e.preventDefault}
					/>
					<Box
						color={mainColor}
					>
						{user.name}
					</Box>
				</Flex>

				<SolidButton
					px={['15px', '25px', '35px']}
					onClick={() => openAddModal()}
				>
					{t('main.addButton')}
				</SolidButton>
				<Box
					position={['absolute', 'static']}
					right='20px'
				>
					<OutlineButton
						bg={backgroundThemeColor}
						mr='10px'
						onClick={toggleColorMode}
					>
						<Image src={colorMode === 'light' ? themeWhite : themeDark} />
					</OutlineButton>
					<OutlineButton
						onClick={handleLanguageChange}
					>
						{language === 'en' ? t('UA') : t('EN')}
					</OutlineButton>
				</Box>
			</Flex>
		</Flex >
	)
}

export default Header