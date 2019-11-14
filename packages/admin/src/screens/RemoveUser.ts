import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/GadgetsRemove'
import { useUniversal } from '../hooks/useUniversal'

export const RemoveUser: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const universal = useUniversal()
  const gqlRemoveUser = useRemoveUser()
  return create(Gadgets, {
    title: 'Remove User',
    subtitle: universal.appname,
    children: create(ConfirmRemove, {
      helper: 'Permanently remove this user',
      alert: 'Please confirm the removal of this user',
      change: () => gqlRemoveUser.fetch({ id }).then(() => change && change()),
    }),
  })
}

const useRemoveUser = createUseServer<{
  user: {
    id: string
  }
}>({
  query: `
    mutation apiRemoveUser($id: String!) {
      user: apiRemoveUser(id: $id) {
        id
      }
    }
  `,
})
