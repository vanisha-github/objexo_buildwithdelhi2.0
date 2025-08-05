// Toggle Login Box Visibility
function toggleLogin() {
  const loginBox = document.getElementById('loginBox');
  loginBox.classList.toggle('hidden');
}


// Switch to Signup Form
document.getElementById('toSignup').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('signupForm').classList.remove('hidden');
});
// Switch back to Login Form
document.getElementById('toLogin').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('signupForm').classList.add('hidden');
  document.getElementById('loginForm').classList.remove('hidden');
});


document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value.trim();
  if (name === '' || email === '' || password === '') {
    alert('Please fill all the required fields.');
    return;
  }
  document.getElementById('signupForm').classList.add('hidden');
  document.getElementById('loginForm').classList.remove('hidden');
});

// Close popup when clicking outside the box
document.getElementById('popupContainer').addEventListener('click', function(e) {
  if (e.target === this) {
    togglePopup();
  }
});