import { useTasks } from "../../Hooks/useTasks";
import ProjectCard from "../Dashboard/ProjectCard";


function ProjectList({ projects, onEdit, onDelete}){
  const { tasks } = useTasks();

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

      {projects.map((project) => {

        const taskCount = tasks.filter(
          (task) => task.projectId === project.id,
        ).length;


      return(
        <ProjectCard 
        key={project.id}
        project={project}
        onEdit={onEdit}
        taskCount={taskCount}
        onDelete={onDelete}
        />
      );
  })}
    </div>
  )
}

export default ProjectList;