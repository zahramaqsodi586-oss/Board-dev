import { useState } from "react";
import KanbanTaskCard from "./KanbanTaskCard";


const COLUMNS = [
  {
    status: "Todo",
    title: "To Do",
    headerStyle: "border-gray-300",
    countStyle: "bg-gray-100 text-gray-700",
  },
  {
    status: "In Progress",
    title: "In Progress",
    headerStyle: "border-blue-400",
    countStyle: "bg-blue-100 text-blue-700",
  },
  {
    status: "Completed",
    title: "Completed",
    headerStyle: "border-green-400",
    countStyle: "bg-green-100 text-green-700",
  },
];

function KanbanBoard({tasks, projects, onStatusChange}){

  const [dragOverStatus, setDragOverStatus] = useState(null);

  function handleDragOver(event, status){

    //Allow the task to be dropped in this area
    event.preventDefault();

    //tell the browser this is a move operation
    event.dataTransfer.dropEffect = "move"
    setDragOverStatus(status);
  }


  function handleDrop(event, newStatus){
    event.preventDefault();

    const taskId = event.dataTransfer.getData("text/plain");

    //Find the task dragged
    const draggedTask = tasks.find((task) => String(task.id) === taskId);

    if(draggedTask && draggedTask.status !== newStatus){
      onStatusChange(draggedTask, newStatus);
    }

    setDragOverStatus(null);
  }



  return(
    <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3">
      {COLUMNS.map((column) => {
        const columnTasks = tasks.filter((task) => task.status === column.status);

        const isDropTarget = dragOverStatus === column.status;

        return(
          <section
           key={column.status}
           onDrop={(event) => handleDrop(event, column.status)}
           onDragOver={(event) => handleDragOver(event, column.status)}
           onDragLeave={() => setDragOverStatus(null)}
            className={`min-w-0 rounded-xl border-2 p-3 transition-colors ${isDropTarget
              ? "border-blue-500 bg-blue-50"
              : "border-transparent bg-gray-50"
            }`}>
            <div className={`mb-4 flex items-center justify-between border-b pb-3 ${column.headerStyle}`}>
              <h2 className="font-semibold text-gray-800">{column.title}</h2>

              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${column.countStyle}`}>
                {columnTasks.length}
              </span>
            </div>

            <div className="space-y-3">
              {columnTasks.length === 0 ? (
                <div className="rounded-lg border border-dashed border-gray-300 p-5 text-center text-sm text-gray-500">
                drag the tasks in here
                  </div>
              ) : (
                columnTasks.map((task) => {
                  const project = projects.find(
                    (item) => item.id === task.projectId
                  );

                  return(
                    <KanbanTaskCard 
                    key={task.id}
                    task={task}
                    projectName={
                      project?.name ?? "unknown project"
                    }
                    onStatusChange={onStatusChange}
                    />
                  );
                })
              )
            }
            </div>




          </section>
        )
      })}
    </div>
  )


}

export default KanbanBoard;