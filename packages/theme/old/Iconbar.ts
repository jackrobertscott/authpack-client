import OutsideClickHandler from 'react-outside-click-handler'
import {
  createElement as create,
  FC,
  useContext,
  ReactNode,
  useState,
} from 'react'
import { css } from 'emotion'
import { Theme } from './Theme'

export interface IIconbarSubmenu {
  icon: string
  label: string
  description: string
  click?: () => void
}

export interface IIconbar {
  Container: FC<{
    top: ReactNode
    bottom?: ReactNode
  }>
  Spacer: FC<{
    children: ReactNode
  }>
  Icon: FC<{
    name: string
    click?: () => void
    active?: boolean
  }>
  Pointer: FC<{
    icon?: string
    label: string
    submenu?: IIconbarSubmenu[]
    children: ReactNode
  }>
  Submenu: FC<IIconbarSubmenu>
}

export const Iconbar: IIconbar = {
  Container: ({ top, bottom }) => {
    const theme = useContext(Theme)
    return create('div', {
      children: [
        create(Iconbar.Spacer, {
          key: 'top',
          children: top,
        }),
        bottom &&
          create(Iconbar.Spacer, {
            key: 'bottom',
            children: bottom,
          }),
      ],
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 0',
        width: '75px',
        flexShrink: 0,
        background: theme.iconbar.background,
      }),
    })
  },
  Spacer: ({ children }) => {
    return create('div', {
      children,
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *, & > div': {
          marginBottom: '25px',
          '&:last-child': {
            marginBottom: 0,
          },
        },
      }),
    })
  },
  Icon: ({ name, click, active }) => {
    const theme = useContext(Theme)
    return create('div', {
      onClick: click,
      className: `fas far fa-${name} ${css({
        fontSize: '25px',
        transition: '200ms',
        textAlign: 'center',
        width: '30px',
        lineHeight: '1.5em',
        cursor: 'pointer',
        color: active ? theme.iconbar.colorActive : theme.iconbar.color,
        '&:hover': !active && {
          color: theme.iconbar.colorHover,
        },
      })}`,
    })
  },
  Pointer: ({ icon = 'check-circle', label, submenu, children }) => {
    const [active, activeChange] = useState(false)
    const theme = useContext(Theme)
    return create('div', {
      onClick: () => submenu && submenu.length && activeChange(!active),
      children: [
        create((() => children) as FC, {
          key: 'children',
        }),
        create(OutsideClickHandler, {
          key: 'popup',
          onOutsideClick: () => active && activeChange(false),
          children: create('div', {
            children: create('div', {
              children: [
                create('div', {
                  key: 'title',
                  children: [
                    create('div', {
                      key: 'label',
                      children: label,
                      className: css({
                        all: 'unset',
                        flexGrow: 1,
                      }),
                    }),
                    create('div', {
                      key: 'icon',
                      className: `fas far fa-${icon} ${css({
                        lineHeight: '1.5em',
                      })}`,
                    }),
                  ],
                  className: css({
                    all: 'unset',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexGrow: 1,
                    padding: '15px',
                  }),
                }),
                active &&
                  submenu &&
                  create('div', {
                    key: 'submenu',
                    children: submenu.map((item, index) =>
                      create(Iconbar.Submenu, {
                        key: `${item.label}${index}`,
                        ...item,
                      })
                    ),
                    className: css({
                      all: 'unset',
                      display: 'flex',
                      flexDirection: 'column',
                    }),
                  }),
              ],
              className: css({
                all: 'unset',
                display: 'flex',
                flexGrow: 1,
                flexDirection: 'column',
                overflow: 'hidden',
                fontSize: theme.global.fonts,
                borderRadius: theme.global.radius,
                background: theme.pointers.background,
                border: theme.pointers.border,
                color: theme.pointers.color,
                boxShadow: '0 1px 25px -5px rgba(0, 0, 0, 0.35)',
              }),
            }),
            className: `toggle-pointer ${css({
              all: 'unset',
              minWidth: '290px',
              position: 'absolute',
              zIndex: active ? 500 : 100,
              left: '100%',
              top: '-7.5px',
              paddingLeft: '7.5px',
              display: active ? 'flex' : 'none',
            })}`,
          }),
        }),
      ],
      className: css({
        all: 'unset',
        display: 'flex',
        position: 'relative',
        '&:hover .toggle-pointer': {
          display: 'flex',
        },
      }),
    })
  },
  Submenu: ({ icon, label, description, click }) => {
    const theme = useContext(Theme)
    return create('div', {
      onClick: click,
      children: [
        create('div', {
          key: 'icon',
          className: `fas far fa-${icon} ${css({
            lineHeight: '1.5em',
            marginRight: '7.5px',
            textAlign: 'center',
            width: '20px',
            color: theme.pointers.label,
          })}`,
        }),
        create('div', {
          key: 'marker',
          children: [
            create('div', {
              key: 'label',
              children: label,
              className: css({
                color: theme.pointers.label,
              }),
            }),
            create('div', {
              key: 'description',
              children: description || '...',
              className: css({
                color: theme.pointers.description,
              }),
            }),
          ],
          className: css({
            display: 'flex',
            flexDirection: 'column',
          }),
        }),
      ],
      className: css({
        all: 'unset',
        display: 'flex',
        padding: '15px',
        cursor: 'pointer',
        transition: '200ms',
        borderTop: theme.pointers.innerBorder,
        '&:hover': {
          background: theme.pointers.innerBackground,
        },
      }),
    })
  },
}
