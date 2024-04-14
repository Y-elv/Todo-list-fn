const loginForm = document.getElementById("loginForm");
const messageDiv = document.getElementById("message");
let arr = [];

loginForm.addEventListener("submit", handleLoginSubmit);

function setMessage(message, color) {
  messageDiv.textContent = message;
  messageDiv.style.color = color;
}

async function handleLoginSubmit(e) {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  console.log("Email:", email);
  console.log("Password:", password);

  if (!email && !password) {
    setMessage("Please fill in all the required fields.\n", "red");
    return;
  } else {
    if (!password) {
      setMessage("Please enter password\n", "red");
      return;
    }

    if (!email) {
      setMessage("Please enter your email address.\n", "red");
      return;
    }
  }

  try {
    // Post form data using fetch
    const response = await fetch(
      "http://localhost:3000/api/v1/todoApp/user/loginUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    if (response.status === 401) {
      // If unauthorized, set invalid email or password message
      setMessage("Invalid email or password", "red");
      return;
    }

    if (!response.ok) {
      throw new Error("Failed to login");
    }
    const data = await response.json();
    const token = data.token;

    // Store the token in local storage
    localStorage.setItem("token", token);

    console.log("Form submitted successfully");
    setMessage("login successfully", "green");

     window.location.href = "todo.html";

    // Clear form fields
    loginForm.reset();
  } catch (error) {
    console.error("Error posting form data:", error);
    setMessage("Error submitting form. Please try again later.", "red");
  }

  const person = {
    email,
    password,
  };

  arr.push(person);
  console.log(arr);
}
