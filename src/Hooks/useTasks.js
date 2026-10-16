import { useContext } from "react";
import { TasksContext } from "../Context/TasksContext";


function useTasks(){

  const context = useContext(TasksContext);

  if(context == null){
    throw new Error("useTasks must be used within a Tasksprovider")
  }

  return context;
}