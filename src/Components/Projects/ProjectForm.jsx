import { useState } from "react";
import Button from "../UI/Button";


function ProjectForm({project, onSumbit, onCancel}){

  const [formData, setFormData] = useState(
    {
      name: project?.name || "",
      description: project?.description || "",
      status:  project?.status || "planning"
    }
  );

  function handleChange(event){

    const{name, value} = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  function handleSubmit(event){
    event.preventDefault();

    const name = formData.name.trim();

    if(!name){
      return;
    }

    onSumbit({
      name,
      description: formData.description.trim(),
      status: formData.status,
    })

  }



  return(
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label
        htmlFor="project-name"
        className="mb-2 block text-sm font-medium text-gray-700">
          Project Name
          </label>

        <input
        id="project-name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="e.g Mobile App"
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none
        focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
         />

      </div>


      <div>
        <label
        htmlFor="project-description"
        className="mb-2 block text-sm font-medium text-gray-700">
         description
          </label>

        <textarea
        id="project-description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="What is the project about ?"
        required
        className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none
        focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
         />

      </div>

     <div>
        <label
        htmlFor="project-status"
        className="mb-2 block text-sm font-medium text-gray-700">
       Initial status
          </label>

        <select
        id="project-status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        required
        className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none
        focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
         >
          <option value="Planning">Planning</option>
          <option value="In Progress">In Progress</option>  
          <option value="Completed">Completed</option>
          </select>


      </div>

      <div className="flex justify-end gap-3 border-t pt-5">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

         <Button variant="primary" type="submit">
          Create project
        </Button>
      </div>

    </form>
  )
}

export default ProjectForm;