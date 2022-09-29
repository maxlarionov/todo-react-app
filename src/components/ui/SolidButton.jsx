import React from 'react'
import { useAppContext } from '../../context/app-context'
import { Button } from '@chakra-ui/react'


const SolidButton = ({ children, ...props }) => {
	const { mainColor } = useAppContext()

	return (
		<Button
			fontSize='12px'
			fontWeight='500'
			bg={mainColor}
			color='white'
			px='35px'
			borderRadius='10px'
			fontFamily='Montserrat, sans-serif'
			_hover={{ bgColor: 'rgba(53, 63, 156)' }}
			{...props}
		>
			{children}
		</Button>
	)
}

export default SolidButton