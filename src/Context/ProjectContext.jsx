import { createContext, useState } from "react";
import { projects as initialProjects } from "../Data/InitialData";
import { useLocalStorage } from "../Hooks/useLocalStorage";


export const ProjectContext = createContext(null);

export const ProjectProvider = ({ children }) => {

  const [projects, setProjects] = useLocalStorage("project-dev", initialProjects);
  return(
    <ProjectContext.Provider value={{ projects , setProjects}}>
      {children}
    </ProjectContext.Provider>
  )
}

