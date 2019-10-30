import { createContext, useContext } from 'react'

interface IKeys {
  [key: string]: any
}

export interface ITheme extends IKeys {
  global: {
    radius: number
    fonts: number
  }
  button: {
    label: string
    labelHover: string
    labelDisabled: string
    background: string
    backgroundMinor: string
    backgroundDisabled: string
    backgroundHover: string
    border: string
  }
  input: {
    label: string
    helper: string
    background: string
    backgroundHover: string
    backgroundFocused: string
    border: string
  }
  gadgets: {
    title: string
    subtitle: string
    branding: string
    brandingHover: string
    header: string
    border: string
    background: string
    scrollbar: string
  }
  page: {
    title: string
    subtitle: string
    branding: string
    brandingHover: string
    header: string
    border: string
    background: string
    scrollbar: string
    corner: string
    cornerHover: string
    cornerBackground: string
    cornerBackgroundHover: string
  }
  sideBar: {
    background: string
    border: string
    title: string
    footer: string
    options: string
    optionsHover: string
    optionsFocused: string
  }
  iconBar: {
    icon: string
    iconHover: string
    iconFocused: string
    iconBackground: string
    iconBackgroundHover: string
    background: string
  }
  pointer: {
    width: number
    label: string
    helper: string
    background: string
    backgroundHover: string
    shadow: string
    border: string
    lining: string
  }
  modal: {
    width: number
    height: number
    background: string
    shadow: string
    border: string
    cover: string
  }
  snippet: {
    label: string
    value: string
    arrow: string
    background: string
    backgroundHover: string
    border: string
  }
  table: {
    label: string
    value: string
    header: string
    headerHover: string
    background: string
    backgroundHover: string
    border: string
  }
}

export const Theme = createContext<ITheme>({
  global: {
    fonts: 15,
    radius: 3,
  },
  button: {
    label: '#FFFFFF',
    labelHover: '#FFFFFF',
    labelDisabled: '#444444',
    background: '#595959',
    backgroundMinor: '#494949',
    backgroundDisabled: '#222222',
    backgroundHover: '#777777',
    border: 'none',
  },
  input: {
    label: '#FFFFFF',
    helper: '#D5D5D5',
    background: '#323232',
    backgroundHover: '#292929',
    backgroundFocused: '#5C5C5C',
    border: 'none',
  },
  gadgets: {
    title: '#CCCCCC',
    subtitle: '#777777',
    branding: '#777777',
    brandingHover: '#EEEEEE',
    header: '#3B3B3B',
    border: 'none',
    background: '#414141',
    scrollbar: '#505050',
  },
  page: {
    title: '#CCCCCC',
    subtitle: '#777777',
    branding: '#595959',
    brandingHover: '#999999',
    header: '#3B3B3B',
    border: 'none',
    background: '#414141',
    scrollbar: '#505050',
    corner: '#777777',
    cornerHover: '#999999',
    cornerBackground: '#454545',
    cornerBackgroundHover: '#515151',
  },
  sideBar: {
    background: '#353535',
    border: 'none',
    title: '#999999',
    footer: '#414141',
    options: '#777777',
    optionsHover: '#999999',
    optionsFocused: '#B8B8B8',
  },
  iconBar: {
    icon: '#777777',
    iconHover: '#999999',
    iconFocused: '#C4C4C4',
    iconBackground: 'transparent',
    iconBackgroundHover: '#191919',
    background: '#2C2C2C',
  },
  pointer: {
    width: 280,
    label: '#FFFFFF',
    helper: '#CCCCCC',
    background: '#777777',
    backgroundHover: '#888888',
    shadow: '0 0 25px -5px rgba(0, 0, 0, 0.35)',
    border: 'none',
    lining: 'none',
  },
  modal: {
    width: 560,
    height: 600,
    background: '#111111',
    shadow: '0 0 25px -5px rgba(0, 0, 0, 0.35)',
    border: 'none',
    cover: 'rgba(0, 0, 0, 0.45)',
  },
  snippet: {
    label: '#FFFFFF',
    value: '#CCCCCC',
    arrow: '#888888',
    background: '#494949',
    backgroundHover: '#595959',
    border: '1px solid #454545',
  },
  table: {
    label: '#CCCCCC',
    value: '#FFFFFF',
    header: '#4A4A4A',
    headerHover: '#585858',
    background: '#4F4F4F',
    backgroundHover: '#585858',
    border: '1px solid #454545',
  },
})

export const useTheme = (overrides: Partial<ITheme> = {}): ITheme => {
  const theme = useContext(Theme)
  return Object.keys(theme).reduce((all, key) => {
    if (overrides[key]) all[key] = { ...theme[key], ...overrides[key] }
    return all
  }, theme)
}
