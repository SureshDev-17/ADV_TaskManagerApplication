const TaskTable = ({
  tasks,
  userView,
  adminView,
  onUpdateTask,
  onDeleteTask,
}) => {

  return (
    <div className="overflow-x-auto bg-card border border-border/70 rounded-3xl shadow-card">

      <table className="w-full text-primary table-auto">

        <thead className="bg-surface border-b border-border/70 sticky top-0">

          <tr>

            <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-muted uppercase tracking-[0.08em]">
              Task
            </th>

            <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-muted uppercase tracking-[0.08em]">
              Assigned To
            </th>

            <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-muted uppercase tracking-[0.08em]">
              Priority
            </th>

            <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-muted uppercase tracking-[0.08em]">
              Due Date
            </th>

            <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-muted uppercase tracking-[0.08em]">
              Status
            </th>

            {(userView || adminView) && (
              <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-muted uppercase tracking-[0.08em]">
                Action
              </th>
            )}

          </tr>

        </thead>

        <tbody>

          {tasks.map((task) => (

            <tr
              key={task.id}
              className="border-b border-border/70 hover:bg-surface transition-colors duration-300"
            >

              {/* TASK TITLE */}
              <td className="px-4 py-4 font-medium text-sm md:text-base whitespace-normal break-words">
                {task.title}
              </td>

              {/* ASSIGNED USER */}
              <td className="px-4 py-4 text-sm md:text-base font-semibold text-primary tracking-wide">
                {task.assignedToUser}
              </td>

              {/* PRIORITY */}
              <td className="px-4 py-4">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                    task.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : task.priority === "Medium"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {task.priority}
                </span>

              </td>

              {/* DUE DATE */}
              <td className="px-4 py-4 text-muted text-sm">
                {new Date(task.dueDate)
                   .toLocaleDateString("en-GB")}
              </td>

              {/* STATUS */}
              <td className="px-4 py-4">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                    task.status === "Completed"
                      ? "bg-emerald-100 text-emerald-800"
                      : task.status === "In Progress"
                      ? "bg-sky-100 text-sky-800"
                      : task.status === "Pending"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {task.status}
                </span>

              </td>

              {/* USER ACTION */}
              {userView && (

                <td className="px-4 py-4">

                  <button
                    type="button"
                    disabled={task.isUpdated}
                    onClick={() =>
                      onUpdateTask?.(task.id)
                    }
                    className={`px-3 py-2 rounded-xl text-sm transition-all duration-300 ${
                      task.isUpdated
                        ? "bg-muted text-white cursor-not-allowed"
                        : "bg-button text-buttonText hover:bg-buttonHover"
                    }`}
                  >
                    {task.isUpdated
                      ? "Locked"
                      : "Update"}
                  </button>

                </td>

              )}

              {/* ADMIN ACTIONS */}
              {adminView && (

                <td className="px-4 py-4">

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <button onClick={() => onUpdateTask(task)}               
                  className="px-3 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm transition-all duration-300"
>
                          Edit
                      </button>
                    {/* <button
                      type="button"
                      onClick={() =>
                        onUpdateTask?.(task.id)
                      }
                      className="px-3 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm transition-all duration-300"
                    >
                      Edit
                    </button> */}

                    <button
                      type="button"
                      onClick={() =>
                        onDeleteTask?.(task.id)
                      }
                      className="px-3 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm transition-all duration-300"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              )}

            </tr>

          ))}

        </tbody>

      </table>

      {/* EMPTY STATE */}
      {tasks.length === 0 && (

        <div className="text-center py-10 text-muted">
          No Tasks Available
        </div>

      )}

    </div>
  );
};

export default TaskTable;