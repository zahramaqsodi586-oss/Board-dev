import Button from "../UI/Button";


const STATUSES = ["Todo", "In Progress", "Completed"];

function KanbanTaskCard({task, projectName, onStatusChange}){

  const currentIndex = STATUSES.indexOf(task.status);

  function moveTask(direction){
    const nextIndex = currentIndex + direction;

    if(nextIndex < 0 || nextIndex >= STATUSES.length){
      return;
    }

    onStatusChange(task, STATUSES[nextIndex]);
  }

  const priorityStyles = {
    Low: "bg-gray-100 text-gray-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700"
  }

  return(

    <article className="rounded-xl border border-gray-200 bg-white p-4 shadow">

      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900 ">
          {task.title}
        </h3>

        <span 
        className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${
          priorityStyles[task.priority] ?? priorityStyles.Medium
        }`}
        >
          {task.priority}
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-500">
        {task.description || "No description provided."}
      </p>

      <div className="mt-4 space-y-1 text-xs text-gray-500">
        <p>Project: {projectName}</p>
        <p>Due date: {task.dueDate || "No set"}</p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 border-t pt-3">
        <Button type="button" onClick={() => moveTask(-1)} variant="secondary" disabled={currentIndex <= 0}>
        Back
        </Button>

        <Button type="button" onClick={() => moveTask(1)} disabled={currentIndex === -1 || currentIndex >= STATUSES.length -1}>
          Next
        </Button>

      </div>



    </article>
  )
}

export default KanbanTaskCard;