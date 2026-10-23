function KanbanTaskCard({ task, projectName }) {
  const priorityStyles = {
    Low: "bg-gray-100 text-gray-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700",
  };

  function handleDragStart(event) {
    //store the Id of the text which is being dragged.
    event.dataTransfer.setData("text/plain", task.id);

    // Tell the browser that this item is allowed to be dragged.
    event.dataTransfer.effectAllowed = "move";
  }

  return (
    <article
      draggable
      onDragStart={handleDragStart}
      className=" cursor-grab rounded-xl border border-gray-200 bg-white p-4 shadow hover:shadow-md transition active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900 ">{task.title}</h3>

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

      <div className="mt-4 border-t pt-3 text-xs text-gray-400">
        <span>⠿ </span>Drag this card to change its status
      </div>
    </article>
  );
}

export default KanbanTaskCard;
