import {
  createElement as element,
  FC,
  ReactNode,
  Fragment,
  useState,
} from 'react'
import { useTheme } from '../hooks/useTheme'
import { css } from 'emotion'
import { Icon } from './Icon'
import { Scroller } from './Scroller'
import { Snippet } from './Snippet'

export const SideBar: FC<{
  title: string
  footer?: string
  children: ReactNode
  space?: boolean
  options: Array<
    | {
        label: string
        icon?: string
        prefix?: string
        heading?: boolean
        click?: () => void
        focused?: boolean
      }
    | false
  >
}> = ({ title, footer, space, children, options }) => {
  const theme = useTheme()
  const [open, openChange] = useState<boolean>(true)
  const bp = `@media (max-width: ${1035 + 50}px)`
  return element('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'row',
      overflow: 'hidden',
    }),
    children: [
      element('div', {
        key: 'sideBar',
        className: css({
          all: 'unset',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          position: 'relative',
          width: '260px',
          minWidth: '260px',
          background: theme.sideBar.background,
          borderRight: theme.sideBar.border,
          [bp]: {
            display: open ? 'flex' : 'none',
            width: '100%',
            minWidth: '100%',
            borderRight: 'none',
            position: 'absolute',
            zIndex: 1000,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          },
        }),
        children: element(Scroller, {
          borderleft: true,
          children: [
            element(Title, {
              key: 'title',
              title,
              space,
            }),
            element(Options, {
              key: 'options',
              options: options.filter(Boolean).map((data: any) => ({
                ...data,
                click: () => {
                  if (data.click) data.click()
                  openChange(false)
                },
              })),
              bp,
            }),
            footer &&
              element(Footer, {
                key: 'footer',
                footer,
              }),
          ],
        }),
      }),
      element('div', {
        key: 'children',
        className: css({
          all: 'unset',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          overflow: 'hidden',
        }),
        children: [
          element('div', {
            key: 'back',
            className: css({
              all: 'unset',
              display: 'none',
              flexDirection: 'column',
              flexShrink: 0,
              [bp]: {
                display: 'flex',
              },
            }),
            children: element(Snippet, {
              icon: 'angle-left',
              label: 'Back',
              click: () => openChange(true),
              noicon: true,
            }),
          }),
          element(Fragment, {
            key: 'children',
            children,
          }),
        ],
      }),
    ],
  })
}

const Title: FC<{
  title: string
  space?: boolean
}> = ({ title, space }) => {
  const theme = useTheme()
  return element('div', {
    children: title,
    className: css({
      lineHeight: '1em',
      fontSize: '1.5rem',
      padding: '25px 25px 20px',
      color: theme.sideBar.title,
      marginBottom: space ? 35 : undefined,
    }),
  })
}

const Footer: FC<{
  footer: string
}> = ({ footer }) => {
  const theme = useTheme()
  return element('div', {
    children: footer,
    className: css({
      whiteSpace: 'pre',
      transition: '200ms',
      marginTop: 'auto',
      padding: '20px 25px 25px',
      color: theme.sideBar.footer,
    }),
  })
}

const Options: FC<{
  bp: string
  options: Array<{
    label: string
    icon?: string
    prefix?: string
    heading?: boolean
    click?: () => void
    focused?: boolean
  }>
}> = ({ bp, options }) => {
  const theme = useTheme()
  return element('div', {
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 40,
    }),
    children: options.map(
      ({ label, icon, prefix, heading, click, focused }, index) => {
        if (heading) {
          return element('div', {
            key: `option-${index}`,
            className: css({
              all: 'unset',
              display: 'flex',
              alignItems: 'center',
              padding: '15px 25px',
              marginTop: 35,
              color: theme.sideBar.heading,
            }),
            children: [
              element('div', {
                key: 'label',
                children: label,
                className: css({
                  marginRight: 'auto',
                }),
              }),
              icon &&
                element('div', {
                  key: 'icon',
                  onClick: click,
                  className: css({
                    padding: 7.5,
                    margin: -7.5,
                    cursor: 'pointer',
                    transition: '200ms',
                    borderRadius: theme.global.radius,
                    '&:hover': {
                      color: theme.sideBar.optionsHover,
                      background: theme.sideBar.backgroundHover,
                    },
                  }),
                  children: element(Icon, {
                    key: 'icon',
                    icon,
                    prefix,
                  }),
                }),
            ],
          })
        }
        return element('div', {
          key: `option-${index}`,
          onClick: click,
          className: css({
            all: 'unset',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            transition: '200ms',
            padding: '15px 25px',
            color: focused
              ? theme.sideBar.optionsFocused
              : theme.sideBar.options,
            background: focused ? theme.sideBar.backgroundFocused : undefined,
            '&:hover': {
              color: theme.sideBar.optionsHover,
              background: theme.sideBar.backgroundHover,
            },
          }),
          children: [
            icon &&
              element(Icon, {
                key: 'icon',
                icon,
                prefix,
              }),
            element('div', {
              key: 'label',
              children: label,
              className: css({
                marginLeft: 10,
              }),
            }),
            element('div', {
              key: 'right',
              className: css({
                all: 'unset',
                display: 'none',
                marginLeft: 'auto',
                [bp]: {
                  display: 'flex',
                },
              }),
              children: element(Icon, {
                key: 'icon',
                icon: 'angle-right',
              }),
            }),
          ],
        })
      }
    ),
  })
}
