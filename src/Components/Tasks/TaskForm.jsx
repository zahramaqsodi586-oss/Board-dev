import { useState } from "react";
import { useProjects } from "../../Hooks/useProjects";
import Button from "../UI/Button";

function TaskForm({task , onSubmit, onCancel}){

  const { projects } = useProjects();

  const [formData , setFormData] = useState(
    {
      title: task?.title ?? "",
      description: task?.description ?? "",
      projectId: task?.projectId ?? projects[0]?.id ?? "",
      status: task?.status ?? "Todo",
      priority: task?.priority ?? "Medium",
      dueDate: task?.dueDate ?? "",
    }
  );

  function handleChange(event){
    const {name, value} = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  function handleSubmit(event){
    event.preventDefault();

    const title = formData.title.trim();
    if(!title){
      return;
    }

    onSubmit({
      ...formData,
      title,
      description: formData.description.trim(),
      projectId: Number(formData.projectId),
    });
  }

  if(projects.length === 0){
    return(
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          You need to create a project before adding a task.
        </p>
        <div className="flex justify-end">
          <Button variant="secondary" onClick={onCancel}>
            Close
          </Button>
        </div>
      </div>
    )
  }




  return(
   <form 
   onSubmit ​={handleSubmit} className="space-y-5">
   <div>
 <label
 htmlFor="task-title"
 className="mb-2 block text-sm font-medium text-gray-700"
 >
 Task Title
 </label>
 <input
 id="task-title"
 name="title"
 value={formData.title}
 onChange ​={handleChange}
 required
 maxLength={120}
 placeholder="e.g. Build the login page"
 className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
 />
 </div>

 <div>
 <label
 htmlFor="task-description"
 className="mb-2 block text-sm font-medium text-gray-700"
 >
 Description
 </label>
 <textarea
 id="task-description"
 name="description"
 value={formData.description}
 onChange ​={handleChange}
 rows={3}
 placeholder="Describe what needs to be done..."
 className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
 />
 </div>

 <div>
 <label
 htmlFor="task-project"
 className="mb-2 block text-sm font-medium text-gray-700"
 >
 Project
 </label>
 <select
 id="task-project"
 name="projectId"
 value={formData.projectId}
 onChange ​= {handleChange}
 required
 className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
 >
 {projects.map((project) => (
 <option key={project.id} value={project.id}>
 {project.name}
 </option>
 ))}
 </select>
 </div>

 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
 <div>
 <label
 htmlFor="task-status"
 className="mb-2 block text-sm font-medium text-gray-700"
 >
 Status
 </label>
 <select
 id="task-status"
 name="status"
 value={formData.status}
 onChange​={handleChange}
 className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
 >
 <option value="Todo">To Do</option>
 <option value="In Progress">In Progress</option>
 <option value="Completed">Completed</option>
 </select>
 </div>

 <div>
 <label
 htmlFor="task-priority"
 className="mb-2 block text-sm font-medium text-gray-700"
 >
 Priority
 </label>
 <select
 id="task-priority"
 name="priority"
 value={formData.priority}
 onChange​={handleChange}
 className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
 >
 <option value="Low">Low</option>
 <option value="Medium">Medium</option>
 <option value="High">High</option>
 </select>
 </div>
 </div>

 <div>
 <label
 htmlFor="task-due-date"
 className="mb-2 block text-sm font-medium text-gray-700"
 >
 Due Date
 </label>
 <input
 id="task-due-date"
 type="date"
 name="dueDate"
 value={formData.dueDate}
 onChange​={handleChange}
 className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
 />
 </div>

 <div className="flex justify-end gap-3 border-t pt-5">
 <Button variant="secondary" onClick​={onCancel}>
 Cancel
 </Button>
 <Button type="submit">
 {task ? "Save Changes" : "Create Task"}
 </Button>
 </div>
 </form>




  )
}

export default TaskForm;