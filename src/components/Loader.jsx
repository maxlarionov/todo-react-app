import React from 'react'
import { Box, Center, Spinner, useColorModeValue } from '@chakra-ui/react'
import { useAppContext } from '../context/app-context'

const Loader = () => {
	const { isLoading } = useAppContext()
	const backgroundColor = useColorModeValue('#FAFAFA', '#1C203B')

	return (
		isLoading && (
			<Box>
				<Center
					position='fixed'
					w='100%'
					h='100%'
					top='0'
					left='0'
					bgColor='black'
					opacity='0.7'
					zIndex='1401'
				>
					<Box
						display='flex'
						alignItems='center'
						justifyContent='center'
						bgColor={backgroundColor}
						h='60px'
						w='60px'
						borderRadius='10px'
					>
						<Spinner size='lg' />
					</Box>
				</Center>
			</Box >
		)
	)
}

export default Loader