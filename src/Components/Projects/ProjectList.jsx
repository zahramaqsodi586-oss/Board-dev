import ProjectCard from "../Dashboard/ProjectCard";


function ProjectList({ projects, onEdit, onDelete}){

  if(projects.length == 0){
    return(
      <div className="bg-white border rounded-xl p-10 text-center">
        <h3 className="text-lg font-semibold text-gray-800">No Project found</h3>

        <p className="text-gray-500 mt-2">try adding a project to get started.</p>

      </div>
    )
  }


  return(
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard 
        key={project.id}
        project={project}
        onEdit={onEdit}
        onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default ProjectList;