import * as yup from 'yup'
import { createElement as create, FC, useEffect } from 'react'
import {
  Gadgets,
  useSchema,
  Button,
  Layout,
  Control,
  InputBoolean,
} from 'wga-theme'
import { useGlobal } from '../hooks/useGlobal'
import { createUseServer } from '../hooks/useServer'

export const UpdateSession: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const global = useGlobal()
  const gqlGetSession = useGetSession()
  const gqlUpdateSession = useUpdateSession()
  const schema = useSchema({
    schema: SchemaUpdateSession,
    submit: value => {
      gqlUpdateSession
        .fetch({ id, value })
        .then(({ session }) => change && change(session.id))
    },
  })
  useEffect(() => {
    gqlGetSession.fetch({ id }).then(({ session }) => schema.set(session))
    // eslint-disable-next-line
  }, [id])
  return create(Gadgets, {
    title: 'Update Session',
    subtitle: global.appname,
    children: create(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        create(Control, {
          key: 'disabled',
          label: 'Disabled',
          helper: 'Prevent session from authenticating api requests',
          error: schema.error('disabled'),
          children: create(InputBoolean, {
            value: schema.value('disabled'),
            change: schema.change('disabled'),
          }),
        }),
        create(Button, {
          key: 'submit',
          label: 'Update',
          disabled: !schema.valid,
          click: schema.submit,
        }),
      ],
    }),
  })
}

const SchemaUpdateSession = yup.object().shape({
  disabled: yup
    .boolean()
    .required('Please provide the current disabled status'),
})

const useGetSession = createUseServer<{
  session: {
    disabled: string
  }
}>({
  query: `
    query apiGetSession($id: String!) {
      session: apiGetSession(id: $id) {
        disabled
      }
    }
  `,
})

const useUpdateSession = createUseServer<{
  session: {
    id: string
  }
}>({
  query: `
    mutation apiUpdateSession($id: String!, $value: UpdateSessionValue!) {
      session: apiUpdateSession(id: $id, value: $value) {
        id
      }
    }
  `,
})
