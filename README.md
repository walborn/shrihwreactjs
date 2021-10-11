# School CI server

School CI server – client-side of service made with **NextJS + ReactContext/Redux**.

### Branches
`master` — **ReactJS + useContext** (context api: **useReducer / useContext** hooks)
`redux` - **ReactJS + ReduxJS**

### Install
```
git clone https://github.com/walborn/shrihwreactjs
cd shrihwreactjs
yarn && yarn dev
```

Open `http://localhost:3000` in web-browser


### Routes
`/` — **Start page** (if no settings configured), otherwise **History page**

`/settings` — **Settings page**


# Redux branch

### Notes
The Redux `Provider` is implemented in `pages/_app.js`. The `MyApp` component is wrapped in a `withReduxStore` function, the redux `store` will be initialized in the function and then passed down to `MyApp` as `this.props.initialReduxState`, which will then be utilized by the `Provider` component.

Every initial server-side request will utilize a new `store`. However, every `Router` or `Link` action will persist the same `store` as a user navigates through the `pages`. To demonstrate this example, we can navigate back and forth to `/show-redux-state` using the provided `Link`s. However, if we navigate directly to `/show-redux-state` (or refresh the page), this will cause a server-side render, which will then utilize a new store.

