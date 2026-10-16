import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ProjectProvider } from './Context/ProjectContext.jsx'
import { TasksProvider } from './Context/TasksContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ProjectProvider>
      <TasksProvider>
           <App />
      </TasksProvider>
    </ProjectProvider>
    </BrowserRouter>
  </StrictMode>,
)
