import { KeyStore } from 'events-and-things'

export type ISettings = {
  domain?: string
  bearer?: string
  ready: boolean
  open: boolean
  devmode: boolean
  appname?: string
  subscribed: boolean
  team_required: boolean
  session?: {
    id: string
    token: string
  }
  user?: {
    id: string
    email: string
    username?: string
    given_name?: string
    family_name?: string
  }
  team?: {
    id: string
    name: string
    tag: string
    description?: string
  }
  permissions?: Array<{
    id: string
    name: string
    tag: string
    description?: string
  }>
}

export const defaults: ISettings = {
  ready: false,
  open: false,
  devmode: false,
  subscribed: false,
  team_required: false,
}

export const SettingsStore = new KeyStore<ISettings>(defaults)
