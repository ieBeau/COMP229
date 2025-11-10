import './styles/index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import { UserProvider } from './context/UserContext.jsx'
import { DataProvider } from './context/DataContext.jsx'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <DataProvider>
        <Router>
          <App />
        </Router>
      </DataProvider>
    </UserProvider>
  </StrictMode>,
)
