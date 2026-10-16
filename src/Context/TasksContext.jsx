import { Children, createContext } from "react";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import { initialTasks } from "../Data/initialTasks";


export const TasksContext = createContext(null);

export function TasksProvider({ Children }) {

  const [tasks, setTasks] = useLocalStorage("tasks-dev", initialTasks);

  return(
    <TasksContext.Provider value={{tasks, setTasks}}>
      {Children}
    </TasksContext.Provider>
  )

}