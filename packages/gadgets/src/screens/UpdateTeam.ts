import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const UpdateTeam: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Update Team',
    subtitle: settings.appname,
    children: null,
  })
}

const useUpdateTeam = createUseServer<{
  team: {
    id: string
  }
}>({
  name: 'wgaUpdateTeam',
  query: `
    mutation wgaUpdateTeam($id: String!, $name: String, $tag: String, $description: String) {
      team: wgaUpdateTeam(id: $id, name: $name, tag: $tag, description) {
        id
      }
    }
  `,
})
