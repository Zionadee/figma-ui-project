async function loadCourses() {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    document.getElementById("courseCount").textContent = data.length;
  }
  
  async function loadTasks() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
    const data = await res.json();
    const pending = data.filter(t => !t.completed).length;
    document.getElementById("taskCount").textContent = pending;
  }
  
  loadCourses();
  loadTasks();