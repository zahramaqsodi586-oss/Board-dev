import KanbanTaskCard from "./KanbanTaskCard";


const COLUMNS = [
  {
    status: "Todo",
    title: "To Do",
    headerStyle: "border-gray-300",
    countStyle: "bg-gray-100 text-gray-700",
  },
  {
    status: "In Progress",
    title: "In Progress",
    headerStyle: "border-blue-400",
    countStyle: "bg-blue-100 text-blue-700",
  },
  {
    status: "Completed",
    title: "Completed",
    headerStyle: "border-green-400",
    countStyle: "bg-green-100 text-green-700",
  },
];

function KanbanBoard({tasks, projects, onStatusChange}){

  return(
    <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3">
      {COLUMNS.map((column) => {
        const columnTasks = tasks.filter((task) => task.status === column.status);

        return(
          <section key={column.status} className="min-w-0 rounded-xl bg-gray-50 p-3">
            <div className={`mb-4 flex items-center justify-between border-b pb-3 ${column.headerStyle}`}>
              <h2 className="font-semibold text-gray-800">{column.title}</h2>

              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${column.countStyle}`}>
                {columnTasks.length}
              </span>
            </div>

            <div className="space-y-3">
              {columnTasks.length === 0 ? (
                <div className="rounded-lg border border-dashed border-gray-300 p-5 text-center text-sm text-gray-500">
                  No tasks in this column
                  </div>
              ) : (
                columnTasks.map((task) => {
                  const project = projects.find(
                    (item) => item.id === task.projectId
                  );

                  return(
                    <KanbanTaskCard 
                    key={task.id}
                    task={task}
                    projectName={
                      project?.name ?? "unknown project"
                    }
                    onStatusChange={onStatusChange}
                    />
                  );
                })
              )
            }
            </div>




          </section>
        )
      })}
    </div>
  )


}

export default KanbanBoard;