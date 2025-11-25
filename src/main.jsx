import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initializeProducts, initializeCategories } from './utils/dataManager'

// Initialiser les données au démarrage
initializeProducts()
initializeCategories()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

