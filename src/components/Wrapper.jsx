import React from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'

const Wrapper = ({ children }) => {
	const backgroundColor = useColorModeValue('#FAFAFA', '#1C203B')

	return (
		<Box
			bgColor={backgroundColor}
			minH='100vh'
		>
			<Box
				w={['90%', '90%', '720px']}
				m='0 auto'
			>
				{children}
			</Box>
		</Box>
	)
}

export default Wrapper