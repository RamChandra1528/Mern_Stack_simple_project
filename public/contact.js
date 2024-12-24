const form = document.getElementById("formStudent");

form.addEventListener("submit", (event) => {
  const Name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const work = document.getElementById("work").value;

  if (Name === "" || email === "" || work === "") {
    alert("Please fill in all fields");
    event.preventDefault(); 
  } else {
    alert("Form submitted successfully");
  }
});

document.getElementById("formStudent").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission

  // Collect form data
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries()); // Convert FormData to an object

  // Send data to the server
  fetch("/form_submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      return response.json();
    })
    .then((result) => {
      alert("Form submitted successfully!");
      e.target.reset(); // Reset the form fields
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
      alert("There was an error. Please try again.");
    });
});
