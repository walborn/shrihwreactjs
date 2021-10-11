import { SettingsProvider } from '../store/settings/context'

import '../styles.css'

export default function App({ Component, pageProps }) {
  return (
    <SettingsProvider>
      <Component {...pageProps} />
    </SettingsProvider>
  )
}