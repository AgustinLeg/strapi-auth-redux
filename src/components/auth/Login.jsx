import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/slices/authSlice'

const schema = object({
  email: string()
    .email('Este no es un email valido')
    .required('Campo requerido'),
  password: string().min(8, 'Minimo 8 caracteres').required('Campo requerido'),
})

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'ashley@ashley.com',
      password: 'adapasswordtest',
    },
  })
  // para registrar a un usuario
  // /api/auth/local/register

  const dispatch = useDispatch()

  const onSubmit = async ({ email, password }) => {
    const url =
      'https://strapiecommerce-production-f2a0.up.railway.app/api/auth/local'
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: email, password }),
    })
    const user = await response.json()

    dispatch(login(user))
  }

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.email}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input id="email" {...register('email')} />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.password}>
        <FormLabel htmlFor="password">Contraseña</FormLabel>
        <Input id="password" {...register('password')} />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
        Iniciar Sesion
      </Button>
    </Stack>
  )
}
