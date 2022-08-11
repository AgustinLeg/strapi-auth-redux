import { Link as RouterLink } from 'react-router-dom'

import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { RiSunLine, RiMoonLine } from 'react-icons/ri'
import { ModalAuth } from '../auth/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'

export const links = [
  {
    url: '/',
    label: 'Home',
  },
  {
    url: '/profile',
    label: 'Perfil',
  },
]

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(logout())
  }

  return (
    <Box borderBottom="1px solid" px={5}>
      <Flex minH="75px" alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={!isOpen ? <AiOutlineMenu /> : <AiOutlineClose />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          ml={2}
          onClick={isOpen ? onClose : onOpen}
        />

        <Heading size="md" textTransform="capitalize">
          <Link href={'/'}>AdaShop</Link>
        </Heading>

        <Flex alignItems={'center'} gap={{ base: 1, lg: 3 }}>
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
            justify="flex-end"
          >
            {links.map((link) => (
              <Link as={RouterLink} key={`link-${link.label}`} to={link.url}>
                {link.label}
              </Link>
            ))}
          </HStack>
          <Text as="span" display={['none', null, 'block']}>
            |
          </Text>
          <Icon
            as={colorMode === 'dark' ? RiSunLine : RiMoonLine}
            onClick={toggleColorMode}
            w={6}
            h={6}
            role="button"
          />
          {/* Menu del usuario */}
          {user ? (
            <Button onClick={handleClick}>Cerrar sesion</Button>
          ) : (
            <ModalAuth />
          )}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {links.map((link) => (
              <Link key={`link-${link.label}`} href={link.url}>
                link.label
              </Link>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
}
