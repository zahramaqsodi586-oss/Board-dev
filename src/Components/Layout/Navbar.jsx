


function Navbar(){

  return(
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">
          DevBoard
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-900">
          🔔
        </button>

        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
          Z
        </div>
      </div>

    </header>
  )
}

export default Navbar;