# Unstable 🚧 JavaScript SDK Quickstart

> [Authpack](https://authpack.io) 🔒 A complete user and team management system

Simple integration with client side JavaScript apps.

## 1. Install

Install using npm or yarn.

```shell
npm i --save @authpack/sdk
```

## 2. Setup

Create a new `Gadgets` instance which will control the modal used to authenticate your users.

```ts
import * as Authpack from '@authpack/sdk'

export const gadgets = new Authpack.Gadgets({
  key: 'wga-client-key-...',
})
```

You can find your `wga-client-key` in the **settings** section of the Authpack [dashboard](https://v1.authpack.io).

## 3. Options

To enable teams inside your gadgets; provide the following options.

```ts
import * as Authpack from '@authpack/sdk'

export const gadgets = new Authpack.Gadgets({
  key: 'wga-client-key-...',
})
```

## 4. Usage

Authpack stores the current gadget state inside a single object, making it easy to update your app's user interface.

### 4.1. State

The state includes the current user, team, bearer token, ready state and more. See the full state object [here](https://github.com/jackrobertscott/authpack-client/blob/master/docs/quick/state.md).

### 4.2. Show

Show the gadgets as modal over the top of your app.

```ts
gadgets.show()
```

### 4.3. Hide

Manually hide the gadgets from the current user.

```ts
gadgets.hide()
```

**Note:** the user also has the ability to close the gadgets themselves.

### 4.4. Listen

Add an event listener to observe the gadgets state as it updates.

```ts
gadgets.listen((state) => {
  if (state.ready) {
    if (state.user) {
      console.log(state.user)
    } else if (!state.open) {
      gadgets.show()
    }
  }
})
```

### 4.5. Logout

Logout the user manually and end the current session.

```ts
gadgets.exit()
```

**Note:** the user also has the ability to logout from within the gadgets.

### 4.6. Current

Get the current Authpack state object.

```ts
const state = gadgets.current()
```

**Note** the Authpack state may change frequently and as such; `gadgets.current()` should only be used in unqiue circumstances where `gadgets.listen()` can not be used.

## Links

- [Home](https://github.com/jackrobertscott/authpack-client)
- [Website](https://authpack.io)
- [Dashboard](https://v1.authpack.io)