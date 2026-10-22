

function ProjectCard({ project, onEdit, onDelete, taskCount }) {


  return (
    <div className="bg-white border rounded-xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {project.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{project.description}</p>
        </div>

        <span
          className={`text-xs font-medium px-3 py-1 rounded-full
         ${project.status === "Completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
        >
          {project.status}
        </span>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">Progress</span>
          <span className="font-medium text-gray-700">
            {project.progress} %
          </span>
        </div>

        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-5 pt-4 border-t flex items-center justify-between gap-3 ">
        <span className="text-sm text-gray-600">
           {taskCount ?? project.tasks ?? 0} tasks
        </span>

        <div className="flex gap-2">
          {onEdit && (
            <button 
            type="button"
            onClick={() => onEdit(project)}
            className="rounded-lg border px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"> Edit </button>
          )}

          {onDelete && (
            <button 
            type="button"
            onClick={() => onDelete(project)}
            className="rounded-lg px-3 py-1.5 text-sm text-red-600 hover:bg-red-50">
              Delete
            </button>
          )}
        </div>
       
      </div>
    </div>
  );
}

export default ProjectCard;
