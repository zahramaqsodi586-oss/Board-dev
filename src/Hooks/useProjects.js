import { useContext } from "react";
import { ProjectContext } from "../Context/ProjectContext";


export function useProjects(){

  const context = useContext(ProjectContext);

  if(context == 0){
    throw new Error("Every Project must have project provider.")
  }

  return context;
  

}