import { CSSReset, ColorModeProvider } from '@chakra-ui/core'
import { ThemeProvider } from 'emotion-theming'
import theme from '../theme'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ThemeProvider>
  )
}

export default MyApp
