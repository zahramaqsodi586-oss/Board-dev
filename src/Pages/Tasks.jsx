import { useMemo, useState } from "react";
import { useProjects } from "../Hooks/useProjects";
import { useTasks } from "../Hooks/useTasks";
import TaskCard from "../Components/Tasks/TaskCard";
import Button from "../Components/UI/Button";
import TaskForm from "../Components/Tasks/TaskForm";
import Modal from "../Components/UI/Modal";
import KanbanBoard from "../Components/Tasks/KanbanBoard";



function Tasks(){


  const [view, setView ] = useState("board");
  const { tasks , setTasks } = useTasks();
  const { projects } = useProjects();

  const [search, setSearch ] = useState("");
  const [ statusFilter, setstatusFilter] = useState("All");
  const [priorityfilter, setPriorityFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

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

  function handleCloseModal(){
    setIsModalOpen(false);
    setSelectedTask(null);
  }

//create task function 
  function handleCreateTask(TaskData){

    setTasks((currentTasks) => [
      ...currentTasks,

      {
        ...TaskData,
       id: Date.now()
      }
    ])

    setIsModalOpen(false);
    setSelectedTask(null);
  }


//edit task function
  function handleEditTask(task){

    setSelectedTask(task);
    setIsModalOpen(true);

  }

  // update task function
  function handleUpdateTask(updateTask){

    setTasks((currentTasks) => 

      currentTasks.map((task) => 
      task.id === selectedTask.id
        ?  {...task, ...updateTask}
        : task
      )
    
    );

    setIsModalOpen(false);
    setSelectedTask(null);

  }

  //close modal function
  function handleCloseModal(){

    setIsModalOpen(false);
    setSelectedTask(null);
  }

// handle status change function
  function handleStatusChange(taskToUpdate, newStatus){
    setTasks((currentTasks) =>
    currentTasks.map((task) =>
    task.id === taskToUpdate.id ?
     {...task, status: newStatus}
     : task
    )
  );


  }




  //Tasks completed => count
  const completedTasks = tasks.filter((task) => task.status === "Completed").length;

  //Tasks in progress => count
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress").length;

  //tasks todo => count
  const todoTasks = tasks.filter((task) => task.status === "Todo").length;

  return(
 <div className="p-6">

    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ">

      <div>
          <h1
       className="text-3xl font-bold text-gray-900">Tasks</h1>

       <p  className="mt-2 text-gray-500">
        Organize your work and track your progress.</p>
      </div>

      <div className="flex flex-wrap gap-2 items-center">

        <Button onClick={() => setView("list")} variant={`${view === "list" ? "primary" : "secondary"}`}>List</Button>
        <Button onClick={() => setView("board")} variant={`${view === "board" ? "primary" : "secondary"}`}>Board</Button>


        <Button onClick={() => setIsModalOpen(true)}>Create Task</Button>

      </div>

      




     
    </div>

    {/* //task card */}

    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900">Todo</h3>
        <p className="text-3xl font-bold text-blue-600">{todoTasks}</p>
      </div>

       <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900">In Progress</h3>
        <p className="text-3xl font-bold text-yellow-500">{inProgressTasks}</p>
      </div>


      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900">Completed</h3>
        <p className="text-3xl font-bold text-green-500">{completedTasks}</p>
      </div>

    </div>

    {/* //Search and filters */}
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <input 
      type="text"
      placeholder="Search tasks..."
      className="w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      />

      <select
      className="w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      value={statusFilter}
      onChange={(e) => setstatusFilter(e.target.value)}
      >

        <option value="All">All statuses</option>
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        </select>


        <select
        className="w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        value={priorityfilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
    </div>






    {view === "board" ? (
      
      <KanbanBoard tasks={filteredTasks} projects={projects} onStatusChange={handleStatusChange} />
    )
    :
    
    filteredTasks.length === 0 ? (
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
            onEdit={handleEditTask}
            />
          )
        })}
      </div>
    )}

    <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={selectedTask ? "Edit Task" : "Create Task"}>

      <TaskForm
      key={selectedTask?.id ?? "New Task"}
      task={selectedTask}
      onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
      onCancel={handleCloseModal}
      />

    </Modal>







    </div>
  )
}

export default Tasks;