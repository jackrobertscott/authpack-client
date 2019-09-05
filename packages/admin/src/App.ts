import { createElement as create, FC } from 'react'
import { css } from 'emotion'
import { Button, Gadget, Inputs } from 'wga-theme'

export const App: FC<{}> = () => {
  return create('div', {
    className: css({
      padding: 50,
    }),
    children: create(Gadget.Router, {
      brand: 'Your App',
      screens: [
        {
          icon: 'user',
          label: 'Login',
          children: create(Gadget.Spacer, {
            children: [
              create(Inputs.Label, {
                key: 'name',
                name: 'Name',
                description: 'Full name please',
                children: create(Inputs.Container, {
                  children: [
                    create(Inputs.String, {
                      key: 'input',
                      placeholder: 'Fred Blogs',
                    }),
                    create(Inputs.Pointer, {
                      key: 'icon',
                      label: 'This field is required',
                      children: create(Inputs.Icon, {
                        name: 'bell',
                      }),
                    }),
                  ],
                }),
              }),
              create(Inputs.Label, {
                key: 'age',
                name: 'Age',
                description: 'How old are you?',
                children: create(Inputs.Container, {
                  children: [
                    create(Inputs.Number, {
                      key: 'input',
                      placeholder: '35',
                    }),
                  ],
                }),
              }),
              create(Button.Container, {
                label: 'Submit',
                click: () => console.log(123),
              }),
            ],
          }),
        },
        {
          icon: 'user',
          label: 'Login',
          children: 'Hello',
        },
        {
          icon: 'user',
          label: 'Login',
          children: 'Hello',
        },
      ],
    }),
  })
}