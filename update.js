document.addEventListener("DOMContentLoaded", () => {
  const taskId = getTaskIdFromUrl();
  if (taskId) {
    fetchTask(taskId);
  }

  const taskForm = document.getElementById("taskForm");
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    updateTask(taskId);
  });
});

function getTaskIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("taskId");
}

function fetchTask(taskId) {
  const token = localStorage.getItem("token");
  console.log("token:", token);

  if (!token) {
    console.error("Token not found in local storage");
    return;
  }
  fetch(`http://localhost:3000/api/v1/todoApp/task/getTask/${taskId}`, {
    method: "GET",
    headers: {
      authorization: `${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched task:", data);
      document.getElementById("title").value = data.message.title;
      document.getElementById("description").value = data.message.description;
      document.getElementById("completed").checked = data.message.completed;
    })
    .catch((error) => console.error("Error fetching task:", error));
}

function updateTask(taskId) {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const completed = document.getElementById("completed").checked;

  const token = localStorage.getItem("token");

  fetch(`http://localhost:3000/api/v1/todoApp/task/update/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify({
      title,
      description,
      completed,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      // Handle successful update, maybe redirect to another page
      window.location.href = "todo.html"; // Redirect to todo.html or any other page
    })
    .catch((error) => {
      console.error("Error updating task:", error);
    });
}
