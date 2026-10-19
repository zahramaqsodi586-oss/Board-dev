import { useMemo, useState } from "react";
import { useProjects } from "../Hooks/useProjects";
import { useTasks } from "../Hooks/useTasks";
import TaskCard from "../Components/Tasks/TaskCard";


function Tasks(){

  const { tasks , setTasks } = useTasks();
  const { projects } = useProjects();

  const [search, setSearch ] = useState("");
  const [ statusFilter, setstatusFilter] = useState("All");
  const [priorityfilter, setPriorityFilter] = useState("All");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || task.status === statusFilter;
      const matchespriority = priorityfilter === "All" || task.priority === priorityfilter;

      return matchesSearch && matchesStatus && matchespriority;
    })
  }, [tasks, search, statusFilter, priorityfilter]);


  function handleDelete(taskToDelete){
    const confirmed = window.confirm(
      `Are you sure you want to delete "${taskToDelete.title}"?`
    );

    if(!confirmed){
      return;
    }

    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskToDelete.id ))
  }

  function handleToggleComplete(taskToUpdate){
    
    setTasks((currentTasks) => currentTasks.map((task) => 
      task.id === taskToUpdate.id   
         ? {
              ...task, 
              status : task.status === "Completed" 
                      ? "Todo" 
                      : "Completed"
            }
          : task
        ));



  }

  return(
 <div className="p-6">
    <div className="mb-8 ">
      <h1
       className="text-3xl font-bold text-gray-900">Tasks</h1>

       <p  className="mt-2 text-gray-500">
        Organize your work and track your progress.</p>
    </div>

    {filteredTasks.length === 0 ? (
      <div className="rounded-xl border bg-white p-10 text-center">
        <h2 className="font-semibold text-gray-800">No tasks found.</h2>

        <p className="mt-2 text-sm text-gray-500"> Try changing your search or filters.</p>

        </div>


    ) : (
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {filteredTasks.map((task) => {
          const project = projects.find((item) => item.id === task.projectId);

          return(
            <TaskCard
            task={task}
            key={task.id}
            projectName={project?.name ?? "Unknown Project"}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDelete}
            />
          )
        })}
      </div>
    )}
    </div>
  )
}

export default Tasks;