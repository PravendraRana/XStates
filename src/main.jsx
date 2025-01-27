import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import StateSelector from './StateSelector'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StateSelector/>
  </StrictMode>,
)
