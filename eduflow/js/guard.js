// Auth Guard - Protects pages that require authentication
function requireAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
  }
}

// Run auth check immediately
requireAuth();

// Logout function
function logout() {
  // Clear all user data
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("enrolledCourses");
  
  // Redirect to login
  window.location.href = "login.html";
}
