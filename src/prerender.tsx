import { renderToString } from 'react-dom/server'
import { I18nextProvider } from 'react-i18next'
import App from './App'
import i18n from './i18n'

export function prerender() {
    const html = renderToString(
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    )

    return { html }
}
