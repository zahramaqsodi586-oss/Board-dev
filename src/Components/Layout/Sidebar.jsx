import { NavLink } from "react-router-dom";


function Sidebar(){

  const navigation = [
    {
      name: "Dashboard",
       path: "/",
       icon: "📊",
    },
    {
      name: "Projects", 
      path: "/projects",
      icon: "🗂️",
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: "✅",
    },
    {
      name:"Team",
      path: "/team",
      icon: "👥",
    },
    {
      name: "Settings", 
      path: "/settings",
      icon: "⚙️",
    },
  ]

  return(
    <aside className="w-64 min-h-[calc(100vh-4rem)] border-r bg-white p-4">
    <nav className="space-y-2">
      {navigation.map((item) => (

        <NavLink
        to={item.path}
        key={item.path}
        className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg transition
         ${isActive ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600 hover:bg-gray-50"} ` }>
          <span>{item.icon}</span>
          <span>{item.name}</span>

        </NavLink>


      ))}

      
      </nav>
      </aside>
  )
}


export default Sidebar;