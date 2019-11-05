import { createUseServer } from '../hooks/useServer'

export const useRemoveTeam = createUseServer<
  {
    id: string
  },
  {
    team: {
      id: string
    }
  }
>({
  name: 'RemoveTeam',
  query: `
    mutation RemoveTeam($id: String!) {
      team: RemoveTeam(id: $id) {
        id
      }
    }
  `,
})
