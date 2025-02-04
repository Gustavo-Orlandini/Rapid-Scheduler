import { Flex, Image, Text } from "@chakra-ui/react";
import OriginalLogo from '../../assets/Logo/OriginalLogo.webp'

export function HeaderBar() {
    return (
        <Flex
            as="header"
            bg="gray.10"
            p="0.5rem 3rem"
            w="100%"
            zIndex={2}
            className="no-print"
            borderBottomRadius="50px"
            align='center'
            transition="all 0.3s"
            _hover={{
                borderBottomRadius: "0",
            }}
        >
            <Image src={OriginalLogo} boxSize='4rem' />
            <Text
                as='h1'
                fontWeight='700'
                fontSize="2xl"
                fontFamily={'"Roboto", sans-serif'}
            >
                RapidScheduler
            </Text>
        </Flex>
    );
}
