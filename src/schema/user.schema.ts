import { object, string, ref } from 'yup'

export const createUserScehma = object({
  body: object({
    name: string().required('Name is Required'),
    password: string()
      .required('Password is required')
      .min(6, 'Password is too short'),
    passwordConfirmation: string().oneOf(
      [ref('password'), null],
      'Password must match'
    ),
    email: string()
      .email('Must be an valid email')
      .required('Email is required'),
  }),
})
