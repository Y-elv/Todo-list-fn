function fetchTasks() {
  const token = localStorage.getItem("token");
  console.log("token:", token);

  if (!token) {
    console.error("Token not found in local storage");
    return;
  }

  fetch("http://localhost:3000/api/v1/todoApp/task/getAll", {
    method: "GET",
    headers: {
      authorization: `${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Failed to fetch tasks");
      }

      return response.json();
    })
    .then((data) => {
      console.log(data.message);
      displayTasks(data.message);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

fetchTasks();

function displayTasks(tasks) {
  const tasksContainer = document.querySelector(".content");
  // Clear previous tasks if any
  tasksContainer.innerHTML = "";

  tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.innerHTML = `
                <div class="left">
                    <input type="checkbox" id="${task.id}" ${
      task.completed ? "checked" : ""
    }>
                    <label for="${task.id}">${task.title}</label>
                    <p>|</p>
                    <p>${task.description}</p>
                </div>
                <div class="right">
                    <i class="fa-solid fa-pen-to-square"data-task-id="${
                      task.id
                    }"></i>
                    <i class="fa-solid fa-trash"data-task-id="${task.id}"></i>
                </div>
            `;
    tasksContainer.appendChild(taskElement);

     const deleteIcon = taskElement.querySelector(".fa-trash");
     deleteIcon.addEventListener("click", () => {
       deleteTask(task._id);
     });

     const editIcon = taskElement.querySelector(".fa-pen-to-square");
     editIcon.addEventListener("click", () => {
       redirectToUpdatePage(task._id);
     });

     function redirectToUpdatePage(taskId) {
       // Redirect to update.html with taskId as a query parameter
       window.location.href = `updateTask.html?taskId=${taskId}`;
     }
  });
}

function deleteTask(taskId) {
  const token = localStorage.getItem("token");

  fetch(`http://localhost:3000/api/v1/todoApp/task/delete/${taskId}`, {
    method: "DELETE",
    headers: {
      authorization: `${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      // Refresh the task list after successful deletion
      fetchTasks();
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

