import React from 'react'
import {
	Box,
	Spinner
} from '@chakra-ui/react'
import { useAppContext } from './app-context'

const Loader = () => {
	const { isLoading } = useAppContext()

	return (
		isLoading && (
			<Box>
				<Box
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
						bgColor='white'
						h='60px'
						w='60px'
						mt='150px'
						ml='48%'
						borderRadius='10px'
					>
						<Spinner size='lg' />
					</Box>
				</Box>
			</Box >
		)
	)
}

export default Loader