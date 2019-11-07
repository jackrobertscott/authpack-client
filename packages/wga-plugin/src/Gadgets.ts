import { Radio } from 'events-and-things'
import { SettingsStore, ISettings } from './utils/settings'

export class Gadgets {
  private iframeId: string
  private iframe?: HTMLIFrameElement
  private radio?: Radio<{ name: string; payload?: any }>
  private unlistener?: () => any
  private ready: boolean
  private queue: Array<() => void>
  constructor({ suffix, domain }: { suffix?: string; domain: string }) {
    this.iframeId = `wga-plugin${suffix ? `-${suffix}` : ''}`
    this.render()
    this.ready = false
    this.queue = []
    this.send('wga:gadgets:domain', {
      domain,
      url: document.location.host,
    })
  }
  /**
   * Get the current state of the gadgets.
   */
  public get state() {
    return SettingsStore.current.session
  }
  /**
   * Listen to changes to the internal state.
   */
  public listen(callback: (current: ISettings) => void) {
    return SettingsStore.listen(settings => {
      callback(settings)
      if (this.iframe) {
        this.iframe.style.pointerEvents = settings.open ? 'all' : 'none'
      }
    })
  }
  /**
   * Open the gadgets.
   */
  public open() {
    this.send('wga:gadgets:open')
  }
  /**
   * Open the gadgets.
   */
  private send(name: string, payload?: any) {
    const message = () =>
      this.radio &&
      this.radio.message({
        name,
        payload,
      })
    if (this.ready) message()
    else this.queue.push(message)
  }
  /**
   * Create an iframe with gadgets.
   */
  private render() {
    const src = document.location.hostname.includes('localhost')
      ? 'http://localhost:3100'
      : 'https://plugin.wga.windowgadgets.io'
    this.iframe = document.createElement('iframe')
    this.iframe.src = src
    this.iframe.id = this.iframeId
    this.iframe.width = '100%'
    this.iframe.height = '100%'
    this.iframe.style.border = 'none'
    this.iframe.style.boxShadow = 'none'
    this.iframe.style.position = 'fixed'
    this.iframe.style.top = '0'
    this.iframe.style.bottom = '0'
    this.iframe.style.right = '0'
    this.iframe.style.left = '0'
    this.iframe.style.zIndex = '1000'
    this.iframe.style.transition = '200ms'
    this.iframe.style.pointerEvents = 'none'
    document.body.appendChild(this.iframe)
    if (this.radio) this.radio.destroy()
    this.radio = new Radio(this.iframe.contentWindow, {
      key: 'wga',
      origin: src,
    })
    if (this.unlistener) this.unlistener()
    this.unlistener =
      this.radio &&
      this.radio.listen(({ name, payload }) => {
        console.log(`Plugin received: ${name} - ${Date.now() % 86400000}`)
        switch (name) {
          case 'wga:plugin:set':
            SettingsStore.change(payload)
            break
          case 'wga:plugin:ready':
            this.ready = true
            this.queue.forEach(cb => cb())
            break
          default:
            console.warn(`Handler not found for ${name}`)
        }
      })
  }
}
