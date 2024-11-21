function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const organization = document.getElementById("organization").value.trim();
    const errorMessage = document.getElementById("errorMessage");

    errorMessage.textContent = ""; // Clear previous errors

    // Basic validation
    if (!name) {
      errorMessage.textContent = "Name is required.";
      return false;
    }
    if (!email) {
      errorMessage.textContent = "Email is required.";
      return false;
    }
    if (!validateEmail(email)) {
      errorMessage.textContent = "Invalid email format.";
      return false;
    }
    if (!organization) {
      errorMessage.textContent = "Organization is required.";
      return false;
    }

    // If all validations pass, send the email
    sendEmail(name, email, organization);
    return false; // Prevent the default form submission
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function sendEmail(name, email, organization) {
    const mailtoLink = `mailto:yavelena@gmail.com?subject=Contact Form Submission&body=Name: ${encodeURIComponent(
      name
    )}%0D%0AEmail: ${encodeURIComponent(email)}%0D%0AOrganization: ${encodeURIComponent(organization)}`;
    window.location.href = mailtoLink;
}