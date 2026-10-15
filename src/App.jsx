import { Route, Routes } from "react-router-dom"
import MainLayout from "./Components/Layout/MainLayout"
import Dashboard from "./Pages/Dashboard"
import Projects from "./Pages/Projects"
import Tasks from "./Pages/Tasks"
import Team from "./Pages/Team"
import Settings from "./Pages/Settings"


function App() {
  

  return (
   
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={ <Dashboard /> } />
          <Route path="/projects" element={ <Projects /> } />
          <Route path="/tasks" element={ <Tasks />} />
          <Route path="/team" element={ <Team /> } />
          <Route path="/settings" element={ <Settings /> } />
        
        </Route>
      </Routes>
   
  )
}

export default App
