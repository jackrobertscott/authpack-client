import { createElement as create, FC } from 'react'
import { PageSidebar } from '../templates/PageSidebar'
import { ListUsers } from '../screens/list/ListUsers'
import { ListSessions } from '../screens/list/ListSessions'
import { ListProviders } from '../screens/list/ListProviders'

export type IRouterSidebarUsers = {}

export const RouterSidebarUsers: FC<IRouterSidebarUsers> = () => {
  return create(PageSidebar, {
    title: 'Users',
    screens: [
      {
        icon: 'user',
        label: 'See all users',
        children: create(ListUsers),
      },
      {
        icon: 'share-alt',
        label: 'See all providers',
        children: create(ListProviders),
      },
      {
        icon: 'history',
        label: 'See all sessions',
        children: create(ListSessions),
      },
      {
        icon: 'code',
        label: 'See install guide',
        children: null,
      },
    ],
  })
}
