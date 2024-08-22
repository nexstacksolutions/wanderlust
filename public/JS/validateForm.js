(() => {
  "use strict";

  // Function to set input border color and icon visibility based on validity
  const setBorderColorAndIcon = (input, isValid) => {
    input.style.borderColor = isValid ? "green" : "red"; // Set valid/invalid colors

    const feedback = input.nextElementSibling;
    const icon = feedback ? feedback.nextElementSibling : null; // Handle missing siblings gracefully

    if (feedback && feedback.classList.contains("invalid-feedback")) {
      feedback.style.opacity = isValid ? "0" : "1"; // Adjust opacity based on validity
    }

    if (icon) {
      icon.style.opacity = "1"; // Show/hide icon
      icon.style.color = isValid ? "green" : "red"; // Show/hide icon
      icon.textContent = isValid ? "check" : "error"; // Show/hide icon
    }
  };

  // Fetch all forms with the "needs-validation" class
  const validationForms = document.querySelectorAll(".needs-validation");

  // Loop over each form and add event listener
  validationForms.forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        let hasErrors = false; // Flag to track errors

        // Check form validity and set flag
        hasErrors = !form.checkValidity();

        // Prevent submission and add "was-validated" class if errors exist
        if (hasErrors) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");

        // Toggle border color and icon visibility for each input field
        form.querySelectorAll(".form-control").forEach((input) => {
          setBorderColorAndIcon(input, input.checkValidity());
        });

        // Add event listener to handle input changes within the form
        form.addEventListener("input", () => {
          form.querySelectorAll(".form-control").forEach((input) => {
            setBorderColorAndIcon(input, input.checkValidity());
          });
        });
      },
      false
    );
  });
})();
