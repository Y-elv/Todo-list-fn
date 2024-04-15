const createForm = document.getElementById("taskForm");
const messageDiv = document.getElementById("message");
let arr = [];

createForm.addEventListener("submit", handleCreateSubmit);

function setMessage(message, color) {
  messageDiv.textContent = message;
  messageDiv.style.color = color;
}

async function handleCreateSubmit(e) {
  e.preventDefault();

  const title = createForm.title.value;
  const description = createForm.description.value;
  const completed = createForm.completed.checked;

  console.log("title:", title);
  console.log("description:", description);
  console.log("completed:", completed);

  if (!title && !description) {
    setMessage("Please fill in all the required fields.\n", "red");
    return;
  } else {
    if (!title) {
      setMessage("Please enter title\n", "red");
      return;
    }

    if (!description) {
      setMessage("Please enter your description .\n", "red");
      return;
    }
  }

  const token = localStorage.getItem("token");
  console.log("token:", token);

  if (!token) {
    console.error("Token not found in local storage");
    return;
  }

  try {
    // Post form data using fetch
    const response = await fetch(
      "http://localhost:3000/api/v1/todoApp/task/createTask",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
        body: JSON.stringify({
          title: title,
          description: description,
          completed: completed,
        }),
      }
    );

    if (response.status === 401) {
      // If unauthorized, set invalid email or password message
      setMessage("Invalid email or password", "red");
      return;
    }

    if (!response.ok) {
      throw new Error("Failed to create task");
    }
    const data = await response.json();

    console.log("Form submitted successfully");
    setMessage("Form submitted successfully", "green");

    window.location.href = "todo.html";

    // Clear form fields
    createForm.reset();
  } catch (error) {
    console.error("Error posting form data:", error);
    setMessage("Error submitting form. Please try again later.", "red");
  }

  const task = {
    title,
    description,
    completed,
  };

  arr.push(task);
  console.log(arr);
}
