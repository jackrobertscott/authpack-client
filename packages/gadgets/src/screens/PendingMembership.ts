import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const PendingMembership: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Finalise Pending Membership',
    subtitle: settings.appname,
    children: null,
  })
}

const usePendingMembership = createUseServer<{
  user: {
    id: string
  }
}>({
  name: 'PendingMembership',
  query: `
    mutation PendingMembership($id: String!, $value: PendingMembershipValue!) {
      user: PendingMembership(id: $id, value: $value) {
        id
      }
    }
  `,
})
