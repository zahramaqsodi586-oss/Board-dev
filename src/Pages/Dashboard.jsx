
import ProjectCard from "../Components/Dashboard/ProjectCard";
import StatCard from "../Components/Dashboard/StatCard";
import { useProjects } from "../Hooks/useProjects";
import { useTasks } from "../Hooks/useTasks";
import { isTaskOverdue } from "../Utils/taskUtils";



function Dashboard() { 

  const {projects} = useProjects();
  const { tasks } = useTasks();

  const stats=[
    {
      title: "Total Projects",
      value: projects.length
    },
    {
      title: "Total tasks",
      value: tasks.length
    },
    {
      title: "Completed",
      value: projects.filter((project) => project.status === "Completed").length
    },
    {
      title: "In Progress", 
      value: projects.filter((project) => project.status === "In Progress").length
    }
  ]


  return ( 
    
  <div className="p-6">
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-gray-900">
      Dashboard
    </h1>

    <p className="mt-2 text-gray-500">
      Welcome back! Here's what's happening with your projects.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

    {stats.map((item) => 
    (
      <StatCard key={item.title} title={item.title} value={item.value} />
    ))}

 

  </div>


  {/* //Task cards */}
  <section className="mt-8">
    <div className="flex items-center justify-between mb-5">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Recent projects</h2>
        <p className="text-sm text-gray-500 mt-1">Keep track of your active projects.</p>
      </div>

      <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.slice(0,3).map((project) => {

        const taskCount = tasks.filter((task) => task.projectId === project.id).length;

        return(
          <ProjectCard
          key={project.id}
          project={project}
          taskCount={taskCount}
          />
        )
      })}

      
    </div>
  </section>

   {/* //project cards */}
  <section className="mt-8">
    <div className="flex items-center justify-between mb-5">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Recent Tasks</h2>
        <p className="text-sm text-gray-500 mt-1">Keep track of your active tasks.</p>
      </div>

      <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.slice(0,3).map((task) => {
        const project = projects.find((item) => item.id === task.projectId);

        return(
          <div
          key={task.id}
            className="flex flex-col gap-3 rounded-xl border bg-white p-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h3 className="{`font-medium` }">{task.title}</h3>

                <p className="mt-1 text-sm text-gray-500">{project?.name ?? "Unknown project"}</p>
              </div>

              <div className="flex  justify-between items-center gap-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                  {task.status}
                </span>

                {isTaskOverdue(task) && (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                    Overdue
                  </span>
                )}
              </div>

              </div>

        );
        
      })}

      
    </div>
  </section>







</div>

); }


export default Dashboard;