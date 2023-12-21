document.addEventListener("DOMContentLoaded", function () {
    // const scriptURLAdmin = "https://script.google.com/macros/s/AKfycbyxtcehxZwNx77I0QYUOqLC8ZAOG9jWRVZIDoP_24nR0bWKUR2FQN7YQ8AuSuQZUT2x/exec"
    // const scriptURLMD = "https://script.google.com/macros/s/AKfycbzFSSWqyZDoefkXarZgjDd26X2J4tPzotfkEpHsq_Oy7ES2neY8OXxTykxAroOKANWu/exec"
    const googleSheet = "https://script.google.com/macros/s/AKfycbxHha_XQ3qKAYbsGZoeK0VtaMJsIvkW1i0yaMqYtsQLPcd9q_Y5N_bYJNJT2ug1p-LaXg/exec"
    const form = document.forms["contactForm"];
    const output = document.getElementById("output");
    output.textContent = "Response";
    output.style.opacity = 0; 
    let isSubmitting = false;
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      if (isSubmitting) {
  
        return;
      }
  
      isSubmitting = true;
  
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const message = document.getElementById("message").value;
  
      if (name === "" || email === "" || phone === "") {
        output.textContent = "All fields are required!";
        output.style.opacity = 1; 
        isSubmitting = false;
        return;
      }
  
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!nameRegex.test(name)) {
        output.classList.add("text-danger");
        output.textContent = "Invalid name. Please use only letters.";
        isSubmitting = false;
        output.style.opacity = 1; 
        return;
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        output.classList.add("text-danger");
        output.textContent = "Invalid email address.";
        isSubmitting = false;
        output.style.opacity = 1; 
        return;
      }
  
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phone)) {
        output.classList.add("text-danger");
        output.textContent = "Phone.No should be in 10 digits.";
        output.style.opacity = 1; 
        isSubmitting = false;
        return;
      }
  
      Promise.all([
         fetch(googleSheet, { method: "POST", body: new FormData(form) }),
        // fetch(scriptURLMD, { method: "POST", body: new FormData(form) })
      ])
        .then((responses) => Promise.all(responses.map((response) => response.json())))
        .then((responses) => {
          const allSuccessful = responses.every(response => response.result === "success");
  
          if (allSuccessful) {
            alert("Thank you! Your form is submitted successfully.");
            output.classList.remove("text-danger");
            output.classList.add("text-success");
            output.textContent = "Form submitted successfully!";
            output.style.opacity = 1; 
            form.reset();
            setTimeout(function () {
              output.style.opacity = 0; 
              output.textContent = "Response";
  
            }, 2000);
          } else {
            alert("Error in request");
            output.classList.add("text-danger");
            output.textContent = "Internal server error";
            output.style.opacity = 1; 
          }
  
          isSubmitting = false; 
        })
        .catch((error) => {
        
          alert("Error in request");
          output.classList.add("text-danger");
          output.textContent = "Internal server error";
          output.style.opacity = 1; 
          isSubmitting = false; 
        });
    });
  });
  