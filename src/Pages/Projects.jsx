import { useState } from "react";
import ProjectList from "../Components/Projects/ProjectList";
import { useProjects } from "../Hooks/useProjects";
import Button from "../Components/UI/Button";
import Modal from "../Components/UI/Modal";
import ProjectForm from "../Components/Projects/ProjectForm";




function Projects(){

  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);

 const { projects, setProjects } = useProjects();


  const filteredProjects = projects.filter((project) => 
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleCloseModal(){

    setIsModalOpen(false);
    setProjectToDelete(null);
  }

  function handleCreateProject(projectData){

    setProjects((currentProjects) => [
      ...currentProjects, 

     { ...projectData,
      id: Date.now(),
      tasks:0,
      progress:0
     }
    ])

    setIsModalOpen(false);
  }

  function handleEditProject(project){

    setSelectedProject(project);
    setIsModalOpen(true);
  }

  function handleUpdateProject(updateProject){

    setProjects((currentProjects) => 

      currentProjects.map((project) => 
        project.id === selectedProject.id
      ? {...project, ...updateProject}
      : project
      )
    
    );

    setIsModalOpen(false);
    setSelectedProject(null);


  }

  function handleToDeleteProject(){
    if(!projectToDelete) return;

    setProjects((currentProjects) =>
    currentProjects.filter((p) => p.id !== projectToDelete.id)
  );
  setProjectToDelete(null);
  }

  


  return(
    <div className="p-6">

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
           <h1 className="text-3xl font-bold text-gray-900">
          Projects
        </h1>

        <p className="mt-2 text-gray-500">Manage all of your projects.</p>
        </div>

        <Button 
      variant="primary"
      onClick={() =>{
        setSelectedProject(null);
        setIsModalOpen(true);
      }
      } 
      >
         New Project

      </Button>
       
      </div>

      {/* //search */}
      <div className="mb-6">
        <input 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search projects..."
        className="w-full max-w-md rounded-lg border border-gray-300 bg-white px-4 
        py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 -3"/>
      </div>

      
      

      <Modal 
           onClose = {handleCloseModal}
           isOpen = {isModalOpen}
           title = {selectedProject ? "Edit Project" : "Create New Project"}
      >
        <ProjectForm
        key={selectedProject ? selectedProject.id : "new Project"}
        project={selectedProject}
        onCancel={handleCloseModal}
        onSumbit={selectedProject ? handleUpdateProject : handleCreateProject}
        
        />

      </Modal>

      {/* //Delete confirmation */}
      <Modal 
        isOpen={Boolean(projectToDelete)}
        onClose={() => setProjectToDelete(null)}
        title="Delete Project"
        >
          <p className="text-gray-600">
            Are you sure you want to delete {" "}
            <strong>{projectToDelete?.name}</strong>? This action can not be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <Button
              variant="secondary"
              onClick={() => setProjectToDelete(null)}>
                Cancel
              </Button>



              <Button
              variant="danger"
              onClick={handleToDeleteProject}>
                Delete Project
              </Button>
            </div>

        </Modal>




      



      <ProjectList 
      projects={filteredProjects} 
      onEdit={handleEditProject}
      onDelete={setProjectToDelete}
      />
    </div>
  )
}


export default Projects;