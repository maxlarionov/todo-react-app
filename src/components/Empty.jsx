import React from 'react'
import { Box, Center, Img, useColorMode } from '@chakra-ui/react'
import emptyW from '../imgs/empty-w.png'
import emptyD from '../imgs/empty-d.png'
import { useTranslation } from 'react-i18next'
import { useAppContext } from '../context/app-context'

const Empty = () => {
	const { t } = useTranslation()
	const { setAddModal } = useAppContext()
	const { colorMode } = useColorMode()

	return (
		<Center
			flexDirection='column'
		>
			<Img
				src={colorMode === 'light' ? emptyW : emptyD}
				w={['60%', '50%', '300px']}
				mt={['10%', '10%', '50px']}
			/>
			<Box
				display='block'
				textAlign='center'
			>
				<Box
					fontFamily='Montserrat, sans-serif'
					fontWeight='700'
					fontSize='24px'
					color={colorMode === 'light' ? 'black' : 'white'}
					mt="15px"
				>
					{t('main.emptyTitle')}
				</Box>
				<Box
					display='inline-block'
					fontFamily='Montserrat, sans-serif'
					fontWeight='500'
					cursor='pointer'
					p='5px'
					_hover={{ textDecoration: 'underline' }}
					onClick={() => setAddModal(true)}
				>
					{t('main.emptyText')}
				</Box>
			</Box>
		</Center>
	)
}

export default Empty