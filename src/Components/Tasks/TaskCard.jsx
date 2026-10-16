

function TaskCard({task, projectName, onToggleComplete, onDelete}){

  const priorityStyles = {
    Low: "bg-gray-100 text-gray-700",
    Medium : "bg-yellow-100 text-yellow-700",
    High : "bg-red-100 text-red-700",
  };

  const statusStyles = {
    Todo : "bg-gray-100 text-gray-700",
    "In Progress" : "bg-blue-100 text-blue-700",
    Completed : "bg-green-100 text-green-700",
  };

  return(
    <div
    className="rounded-xl border border-gray-200 bg-white p-5">

      <div className="flex items-start gap-3">

        <input
        type="checkbox"
        checked={task.status === "Completed"}
        onChange={() => onToggleComplete(task)}
        aria-label={`Mark ${task.title} as Completed`}
        className="mt-1 h-4 w-4 cursor-pointer accent-blue-600"
        />

        <div className="min-w-0 flex-1">
          <h3 className={`font-semibold ${task.status === "Completed" ? "text-gray-400 line-through" : "text-gray-900"}`}>
            {task.title}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {task.description || "No description provided."}
            </p>
        </div>

        <button
        type="button"
        onClick={() => onDelete(task)}
        className="rounded-lg px-2 py-1 text-sm text-red-600 hover:bg-red-50">
          Delete
        </button>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[task.status] ?? statusStyles.Todo}`}>
            {task.status}
          </span>

          <span className={`rounded-full px-3 py-1 text-xs font-medium ${priorityStyles[task.priority] ?? priorityStyles.Medium}`}>
            {task.priority}
          </span>
        </div>


        <div className="mt-4 flex flex-wrap justify-between gap-2 border-t text-gray-500 pt-4">
          <span>Project: {projectName}</span>
          <span>Due: {task.dueDate || "No due date"}</span>
        </div>


      </div>

    </div>

  )
}

export default TaskCard;