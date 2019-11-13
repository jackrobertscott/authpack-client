import { ITheme } from '../contexts/Theme'

const color = (
  index: number = 0,
  alpha: number = 1,
  red: number = 255,
  green: number = 127.5,
  blue: number = 8
) => `rgba(${index * red}, ${index * green}, ${index * blue}, ${alpha})`

export const BlueHarvester: ITheme = {
  global: {
    radius: 3,
  },
  button: {
    label: color(0.85),
    labelHover: color(0.95),
    labelDisabled: color(0.4),
    background: color(0.45),
    backgroundMinor: color(0.4),
    backgroundDisabled: color(0.15),
    backgroundHover: color(0.5),
    shadow: `0 0 13px -3px ${color(0.15, 0.15)}`,
    border: `none`,
  },
  input: {
    label: color(0.8),
    helper: color(0.6),
    placeholder: color(0.55),
    value: color(0.75),
    valueHover: color(0.95),
    background: color(0.325),
    backgroundHover: color(0.375),
    backgroundDisabled: color(0.15),
    shadow: `0 0 13px -3px ${color(0, 0.25)}`,
    border: `none`,
    on: color(0.6),
    off: color(0.2),
  },
  gadgets: {
    title: color(0.95),
    subtitle: color(0.6),
    branding: color(0.55),
    brandingHover: color(0.85),
    header: color(0.25),
    border: `1px solid ${color(0.2)}`,
    background: color(0.25),
  },
  page: {
    title: color(0.95),
    subtitle: color(0.65),
    branding: color(0.55),
    brandingHover: color(0.85),
    label: color(0.65),
    labelHover: color(0.75),
    header: color(0.25),
    headerHover: color(0.35),
    border: `1px solid ${color(0.2)}`,
    background: color(0.25),
  },
  scroller: {
    background: color(0.3),
    backgroundHover: color(0.4),
  },
  sideBar: {
    title: color(0.85),
    footer: color(0.75),
    options: color(0.75),
    optionsHover: color(0.75),
    optionsFocused: color(0.65),
    background: color(0.2),
    backgroundHover: color(0.25),
    border: `1px solid ${color(0.15)}`,
  },
  searchBar: {
    label: color(0.75),
    labelHover: color(0.85),
    labelDisabled: color(0.45),
    placeholder: color(0.65),
    background: color(0.25),
    backgroundHover: color(0.35),
    backgroundDisabled: color(0.225),
    border: `1px solid ${color(0.2)}`,
  },
  iconBar: {
    icon: color(0.75),
    iconHover: color(0.85),
    iconFocused: color(0.85),
    iconBackground: color(0.15),
    iconBackgroundHover: color(0.25),
    background: color(0.15),
    border: `1px solid ${color(0.125)}`,
  },
  pointer: {
    label: color(1),
    helper: color(0.85),
    background: color(0.45),
    shadow: `0 0 13px -3px ${color(0.15, 0.15)}`,
    border: `1px solid ${color(0.225)}`,
  },
  menu: {
    label: color(1),
    helper: color(0.85),
    background: color(0.45),
    backgroundHover: color(0.5),
    border: `1px solid ${color(0.425)}`,
  },
  modal: {
    background: color(0.15),
    shadow: `0 0 18px -3px ${color(0.1, 0.55)}`,
    border: `1px solid ${color(0.125)}`,
    cover: color(0.1, 0.5),
  },
  snippet: {
    label: color(0.7),
    value: color(0.85),
    arrow: color(0.7),
    background: color(0.275),
    backgroundHover: color(0.325),
    border: `1px solid ${color(0.225)}`,
  },
  table: {
    label: color(0.75),
    value: color(0.9),
    header: color(0.275),
    headerHover: color(0.325),
    background: color(0.3),
    backgroundHover: color(0.35),
    border: `1px solid ${color(0.225)}`,
  },
  empty: {
    label: color(0.85),
    helper: color(0.65),
    background: color(0.35),
    shadow: `0 0 13px -3px ${color(0.15, 0.15)}`,
    border: `1px solid ${color(0.25)}`,
    cover: `linear-gradient(to top, ${color(0.3)}, ${color(
      0.3,
      0.95
    )} 65%, ${color(0.3, 0.7)})`,
  },
  toaster: {
    label: color(1),
    helper: color(0.75),
    background: color(0.35),
    backgroundHover: color(0.4),
    shadow: `0 0 13px -3px ${color(0.15, 0.55)}`,
    border: `1px solid ${color(0.2)}`,
  },
  poster: {
    label: color(0.85),
    helper: color(0.65),
    background: color(0.3),
    border: `1px solid ${color(0.225)}`,
  },
  focus: {
    label: color(0.85),
    helper: color(0.65),
    background: color(0.275),
  },
}
