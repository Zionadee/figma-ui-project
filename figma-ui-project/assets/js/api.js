// Centralized API calls (optional helper)

// Get all courses from Fake Store
async function fetchCourses() {
    const res = await fetch("https://fakestoreapi.com/products");
    return await res.json();
  }
  
  // Get assignments from JSONPlaceholder
  async function fetchAssignments(limit = 10) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
    return await res.json();
  }
  
  // Get a random user profile
  async function fetchProfile() {
    const res = await fetch("https://randomuser.me/api/");
    return await res.json();
  }