import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Updated to the correct path
import { UserProvider } from './components/contexts/UserContext.jsx'
import { SpeedInsightsProps } from '@vercel/speed-insights/*'


createRoot(document.getElementById('root')).render(
  <UserProvider>
    <App />
  </UserProvider>
)
