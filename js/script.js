async function validateForm(event) {

  event = event || window.event;
  event.preventDefault();

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
  // sendEmail(name, email, organization);

  // document.querySelector('.form-field button').style.opacity='0.5';
  var el = document.querySelector('#contactForm');
  el.style.opacity='0.5';

  var res = await API('mailme',{email: email, name: name, organization: organization});
  if(!res[0]) errorMessage.textContent = 'Error:' + res[1];
  else el.innerHTML = 'Thank you for a message<p>' + res[1];

  return false; // Prevent the default form submission
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]{2,}\.[^\s@]{2,}$/;
  return emailRegex.test(email);
}


API = async function(action,data) {
      data.action = action;
      var url = "https://kuvio-backend.kuvio.pro/"+action;
      try {
          const response = await fetch(url, { method: 'POST', body: JSON.stringify(data) });
          if(!response.ok) throw new Error(`HTTP error status: ${response.status}`);
          const r = await response.json();
          if(r.error || typeof(r.result)=='undefined') throw new Error('Error '+r.error);
          return [true,r.result];
      } catch(er) {
          return [false,er];
      }
};