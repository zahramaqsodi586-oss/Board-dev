
import ProjectCard from "../Components/Dashboard/ProjectCard";
import StatCard from "../Components/Dashboard/StatCard";
import { useProjects } from "../Hooks/useProjects";



function Dashboard() { 

  const {projects} = useProjects();

  const stats=[
    {
      title: "Total Projects",
      value: projects.length
    },
    {
      title: "Total tasks",
      value: projects.reduce((total, project) => total + (Number(project.tasks) || 0), 0 )
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


  {/* //project cards */}
  <section className="mt-8">
    <div className="flex items-center justify-between mb-5">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Recent projects</h2>
        <p className="text-sm text-gray-500 mt-1">Keep track of your active projects.</p>
      </div>

      <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) =>(
        <ProjectCard key={project.id} project={project} />

      ))}
    </div>
  </section>






</div>

); }


export default Dashboard;