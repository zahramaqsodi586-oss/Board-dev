
export function isTaskOverdue(task, today = new Date()){

  if(!task.dueDate || task.status === "Completed"){
    return false;
  }

  // use the browser's local calendar date.
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const todayString = `${year}-${month}-${day}`;

  //ISO date strings can be completed chronologically.
  return task.dueDate < todayString;
}