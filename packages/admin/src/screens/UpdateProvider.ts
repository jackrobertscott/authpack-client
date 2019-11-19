import * as yup from 'yup'
import { createElement as create, FC, useEffect, useState } from 'react'
import {
  Gadgets,
  useSchema,
  Layout,
  Control,
  InputString,
  InputStringArray,
  Poster,
} from 'wga-theme'
import { useUniversal } from '../hooks/useUniversal'
import { createUseServer } from '../hooks/useServer'

export const UpdateProvider: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const universal = useUniversal()
  const gqlGetProvider = useGetProvider()
  const gqlUpdateProvider = useUpdateProvider()
  const [details, detailsChange] = useState<
    { name: string; preset: string } | undefined
  >()
  const schema = useSchema({
    schema: SchemaUpdateProvider,
    poller: value => {
      gqlUpdateProvider
        .fetch({ id, value })
        .then(({ provider }) => change && change(provider.id))
    },
  })
  useEffect(() => {
    gqlGetProvider
      .fetch({ id })
      .then(({ provider: { name, preset, ...provider } }) => {
        detailsChange({ name, preset })
        schema.set(provider)
      })
    // eslint-disable-next-line
  }, [id])
  return create(Gadgets, {
    title: 'Update Provider',
    subtitle: universal.app_name,
    loading: gqlUpdateProvider.loading,
    children: create(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: !gqlGetProvider.data
        ? null
        : [
            details &&
              create(Poster, {
                icon: details.preset,
                label: details.name,
                helper: 'Update provider details',
              }),
            create(Control, {
              key: 'client',
              label: 'Client Id',
              helper: `The oauth client id provided by ${schema.value(
                'preset'
              ) || 'the app'}`,
              error: schema.error('client'),
              children: create(InputString, {
                value: schema.value('client'),
                change: schema.change('client'),
                placeholder: '...',
              }),
            }),
            create(Control, {
              key: 'secret',
              label: 'Secret',
              helper: `The oauth secret provided by ${schema.value('preset') ||
                'the app'}`,
              error: schema.error('secret'),
              children: create(InputString, {
                value: schema.value('secret'),
                change: schema.change('secret'),
                placeholder: '...',
              }),
            }),
            create(Control, {
              key: 'redirect_uri',
              label: 'Redirect URI',
              helper:
                'The user will be sent to this location after authenticating',
              error: schema.error('redirect_uri'),
              children: create(InputString, {
                value: schema.value('redirect_uri'),
                change: schema.change('redirect_uri'),
                placeholder: 'https://v1.windowgadgets.io',
              }),
            }),
            create(Control, {
              key: 'scopes',
              label: 'Scopes',
              helper: 'A set of oauth permission scopes',
              error: schema.error('scopes'),
              children: create(InputStringArray, {
                value: schema.value('scopes'),
                change: schema.change('scopes'),
                placeholder: '...',
              }),
            }),
          ],
    }),
  })
}

const SchemaUpdateProvider = yup.object().shape({
  client: yup.string().required('Please provide the oauth client id'),
  secret: yup.string(),
  redirect_uri: yup.string().required('Please provide your oauth redirect uri'),
  scopes: yup
    .array()
    .of(yup.string().required())
    .default([]),
})

const useGetProvider = createUseServer<{
  provider: {
    name: string
    preset: string
    client: string
    redirect_uri: string
    scopes: string[]
  }
}>({
  query: `
    query apiGetProvider($id: String!) {
      provider: apiGetProvider(id: $id) {
        name
        preset
        client
        redirect_uri
        scopes
      }
    }
  `,
})

const useUpdateProvider = createUseServer<{
  provider: {
    id: string
  }
}>({
  query: `
    mutation apiUpdateProvider($id: String!, $value: UpdateProviderValue!) {
      provider: apiUpdateProvider(id: $id, value: $value) {
        id
      }
    }
  `,
})