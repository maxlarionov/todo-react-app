import React from 'react'
import { useAppContext } from '../app-context'
import { Button, useColorModeValue } from '@chakra-ui/react'


const OutlineButton = ({ children, ...props }) => {
	const { mainColor } = useAppContext()
	const hoverButtonColor = useColorModeValue({ bg: 'rgba(69, 83, 207, 0.1)' }, { bg: 'rgba(69, 83, 207, 0.3)' })

	return (
		<Button
			fontSize='12px'
			variant='outline'
			p='10px'
			color={mainColor}
			border='2px solid'
			borderColor={mainColor}
			borderRadius='10px'
			_hover={hoverButtonColor}
			{...props}
		>
			{children}
		</Button>
	)
}

export default OutlineButton