import { createRoot } from 'react-dom/client'
import { store } from './app/store';
import { Provider } from 'react-redux';
import App from './App';
import { CookiesProvider } from 'react-cookie';

createRoot(document.getElementById('root')).render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>
)
