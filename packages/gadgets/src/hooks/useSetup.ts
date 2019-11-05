import { useEffect } from 'react'
import { SettingsStore } from '../utils/settings'
import { radio } from '../utils/radio'
import { useRefreshSession } from '../graphql/useRefreshSession'
import { useRetrieveApp } from '../graphql/useRetrieveApp'
import { useSettings } from './useSettings'

export const useSetup = () => {
  const gqlApp = useRetrieveApp()
  const gqlSession = useRefreshSession()
  const settings = useSettings()
  useEffect(() => {
    radio.message({
      name: 'wga:plugin:ready',
    })
    return SettingsStore.listen(data => {
      radio.message({
        name: 'wga:plugin:set',
        payload: data,
      })
    })
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    gqlSession.fetch().then(({ session }) => {
      return SettingsStore.change(data => ({
        ...data,
        session,
        bearer: session ? `Bearer ${session.token}` : undefined,
      }))
    })
    gqlApp.fetch().then(({ app }) => {
      SettingsStore.change((old: any) => ({
        ...old,
        appname: app.name || old.app.name,
        subscribed: app.subscribed || false,
      }))
    })
    // eslint-disable-next-line
  }, [settings.state.bearer])
  useEffect(() => {
    return radio.listen(({ name, payload }) => {
      if (!name || !name.startsWith('wga:gadgets')) return
      console.log(`Gadget received: ${name} - ${Date.now() % 86400000}`)
      switch (name) {
        case 'wga:gadgets:request':
          radio.message({
            name: 'wga:plugin:set',
            payload: SettingsStore.state,
          })
          break
        case 'wga:gadgets:set':
          SettingsStore.change(payload)
          break
        case 'wga:gadgets:open':
          SettingsStore.change(data => ({ ...data, open: true }))
          break
        case 'wga:gadgets:domain':
          SettingsStore.change(data => ({ ...data, domain: payload }))
          break
        case 'wga:gadgets:update':
          if (gqlSession.data && gqlSession.data.session)
            gqlSession.fetch().then(({ session }: any) => {
              return SettingsStore.change(data => ({
                ...data,
                session,
                bearer: session ? `Bearer ${session.token}` : undefined,
              }))
            })
          break
        default:
          console.warn(`Unhandled settings radio event ${name}`)
      }
    })
    // eslint-disable-next-line
  }, [])
}
