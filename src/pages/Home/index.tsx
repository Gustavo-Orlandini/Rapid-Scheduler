import { Center, Flex, Image, Text } from '@chakra-ui/react'
import { HeaderBar } from '../../components/HeaderBar'
import BookingCalendar from './components/bookingCalendar'


export function Home() {

    return (
        <Flex w='100%' h='10rem' flexDir="column" >
            <HeaderBar />
            <Center >
                <BookingCalendar />
            </Center>
        </Flex>
    )
}

