import { createElement as create } from 'react'
import { storiesOf } from '@storybook/react'
import { RouterCentral } from '../src/routers/RouterCentral'
import { RouterManagerUsers } from '../src/routers/RouterManagerUsers'
import { RouterManagerWorkspaces } from '../src/routers/RouterManagerWorkspaces'
import { RouterManagerMemberships } from '../src/routers/RouterManagerMemberships'
import { RouterManagerRoles } from '../src/routers/RouterManagerRoles'
import { RouterManagerSessions } from '../src/routers/RouterManagerSessions'

console.clear()

const storiesPageRouters = storiesOf('Page Routers', module)

storiesPageRouters.add('Central', () => {
  return create(RouterCentral)
})

const storiesGadgetsRouters = storiesOf('Gadgets Routers', module)

storiesGadgetsRouters.add('Users Manager', () => {
  return create(RouterManagerUsers)
})

storiesGadgetsRouters.add('Workspaces Manager', () => {
  return create(RouterManagerWorkspaces)
})

storiesGadgetsRouters.add('Memberships Manager', () => {
  return create(RouterManagerMemberships)
})

storiesGadgetsRouters.add('Roles Manager', () => {
  return create(RouterManagerRoles)
})

storiesGadgetsRouters.add('Sessions Manager', () => {
  return create(RouterManagerSessions)
})
