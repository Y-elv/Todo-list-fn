const form = document.getElementById("signupForm");

const messageDiv = document.getElementById("message");
let arr = [];

form.addEventListener("submit", handleSignupSubmit);

function setMessage(message, color) {
  messageDiv.textContent = message;
  messageDiv.style.color = color;
}

async function handleSignupSubmit(e) {
  e.preventDefault();

  const email = form.email.value;
  const password = form.password.value;
  const confirmPassword = form.coPassword.value;

  console.log("Email:", email);
  console.log("Password:", password);
  console.log("Confirm Password:", confirmPassword);

  if (!confirmPassword && !email && !password) {
    setMessage("Please fill in all the required fields.\n", "red");
    return;
  } else {
    if (!password) {
      setMessage("Please enter password\n", "red");
      return;
    }
    if (!confirmPassword) {
      setMessage("Please enter confirm password\n", "red");
      return;
    }
    if (!email) {
      setMessage("Please enter your email address.\n", "red");
      return;
    } else {
      const emailRegex =
        /^[^\s@%?,/<>\-]+@(gmail\.com|yahoo\.com|otherdomain\.com)$/;
      if (!emailRegex.test(email)) {
        setMessage(
          "Please enter a valid email address with the correct domain (e.g., gmail.com, yahoo.com, otherdomain.com).\n",
          "red"
        );
        return;
      }
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match", "red");
      return;
    }
  }

  try {
    // Post form data using fetch
    const response = await fetch(
      "http://localhost:3000/api/v1/todoApp/user/registerUser",
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

    console.log("Form submitted successfully");
    setMessage("Your account has been created", "green");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 4000);

    // Clear form fields
    form.reset();
  } catch (error) {
    console.error("Error posting form data:", error);
    setMessage("Error submitting form. Please try again later.", "red");
  }

  const person = {
    email,
    password,
    confirm: confirmPassword,
  };

  arr.push(person);
  console.log(arr);
}
