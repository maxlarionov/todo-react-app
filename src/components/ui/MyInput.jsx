import { Input, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useAppContext } from '../../context/app-context'

const MyInput = ({ ...props }) => {
	const { mainColor } = useAppContext()
	const bgInputColor = useColorModeValue('white', '#1C203B')

	return (
		<Input
			color={mainColor}
			backgroundColor={bgInputColor}
			focusBorderColor={mainColor}
			{...props}
		/>
	)
}

export default MyInput