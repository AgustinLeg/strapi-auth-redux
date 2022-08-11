import { Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

export const Profile = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <Stack>
      <Heading>{user.username}</Heading>
      <Heading>{user.email}</Heading>
    </Stack>
  )
}
