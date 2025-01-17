import * as yup from 'yup'
import { createElement as element, FC } from 'react'
import {
  useSchema,
  Button,
  Layout,
  Control,
  InputString,
  testAlphanumeric,
  Page,
  InputBoolean,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'

export const CreateUser: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const gqlCreateUser = useCreateUser()
  const schema = useSchema({
    schema: SchemaCreateUser,
    submit: value => {
      gqlCreateUser
        .fetch({ value })
        .then(({ user }) => change && change(user.id))
    },
  })
  return element(Page, {
    title: 'New',
    subtitle: 'User',
    children: element(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        element(Layout, {
          key: 'name',
          divide: true,
          media: true,
          children: [
            element(Control, {
              key: 'name_given',
              label: 'First Name',
              error: schema.error('name_given'),
              children: element(InputString, {
                value: schema.value('name_given'),
                change: schema.change('name_given'),
                placeholder: 'Fred',
              }),
            }),
            element(Control, {
              key: 'name_family',
              label: 'Last Name',
              error: schema.error('name_family'),
              children: element(InputString, {
                value: schema.value('name_family'),
                change: schema.change('name_family'),
                placeholder: 'Blogs',
              }),
            }),
          ],
        }),
        element(Layout, {
          key: 'email',
          divide: true,
          media: true,
          children: [
            element(Control, {
              key: 'email',
              label: 'Email',
              error: schema.error('email'),
              children: element(InputString, {
                value: schema.value('email'),
                change: schema.change('email'),
                placeholder: 'example@email.com',
              }),
            }),
            element(Control, {
              key: 'verified',
              label: 'Verified',
              error: schema.error('verified'),
              children: element(InputBoolean, {
                value: schema.value('verified'),
                change: schema.change('verified'),
              }),
            }),
          ],
        }),
        element(Layout, {
          key: 'username',
          divide: true,
          media: true,
          children: [
            element(Control, {
              key: 'username',
              label: 'Username',
              error: schema.error('username'),
              children: element(InputString, {
                value: schema.value('username'),
                change: schema.change('username'),
                placeholder: 'example_username_123',
              }),
            }),
            element(Control, {
              key: 'password',
              label: 'Password',
              error: schema.error('password'),
              children: element(InputString, {
                value: schema.value('password'),
                change: schema.change('password'),
                placeholder: '* * * * * * * *',
                password: true,
              }),
            }),
          ],
        }),
        element(Button, {
          key: 'submit',
          label: 'Create',
          loading: gqlCreateUser.loading,
          disabled: !schema.valid,
          click: schema.submit,
        }),
      ],
    }),
  })
}

const SchemaCreateUser = yup.object().shape({
  name_given: yup.string(),
  name_family: yup.string(),
  username: yup
    .string()
    .test(
      'alphamun',
      'Please use only numbers, letters and underscores',
      testAlphanumeric
    ),
  email: yup
    .string()
    .email('Please make sure you have used a valid email address')
    .required('Please provide your email'),
  password: yup
    .string()
    .min(6, 'Password must be more than 6 characters')
    .required('Please provide your password'),
  verified: yup.boolean(),
})

const useCreateUser = createUseServer<{
  user: {
    id: string
  }
}>({
  query: `
    mutation CreateUser($value: CreateUserValue!) {
      user: CreateUser(value: $value) {
        id
      }
    }
  `,
})
