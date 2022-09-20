import React from 'react'
import {
	Box
} from '@chakra-ui/react'

const Wrapper = ({ children }) => {
	return (
		<Box
			bgColor='#FAFAFA'
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