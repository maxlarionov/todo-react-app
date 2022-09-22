import React from 'react'
import { useAppContext } from '../app-context'
import { Button, useColorMode } from '@chakra-ui/react'


const LinkButton = ({ children, ...props }) => {
	const { mainColor } = useAppContext()
	const { colorMode } = useColorMode()

	return (
		<Button
			fontFamily='Montserrat, sans-serif'
			fontWeight='500'
			fontSize='12px'
			variant='outline'
			border='none'
			color={colorMode === 'light' ? mainColor : 'white'}
			_hover={{ textDecoration: 'underline' }}
			{...props}
		>
			{children}
		</Button>
	)
}

export default LinkButton