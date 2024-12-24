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
