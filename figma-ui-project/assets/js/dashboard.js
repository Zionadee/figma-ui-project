// Load user name from localStorage
document.addEventListener('DOMContentLoaded', () => {
  const userName = localStorage.getItem('userName') || localStorage.getItem('userEmail')?.split('@')[0] || 'Student';
  const userNameEl = document.getElementById('userName');
  if (userNameEl) {
    userNameEl.textContent = userName.charAt(0).toUpperCase() + userName.slice(1);
  }
});

async function loadCourses() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    const courseCount = document.getElementById("courseCount");
    if (courseCount) {
      courseCount.textContent = data.length;
    }
  } catch (error) {
    console.error('Error loading courses:', error);
    const courseCount = document.getElementById("courseCount");
    if (courseCount) courseCount.textContent = '--';
  }
}

async function loadTasks() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
    const data = await res.json();
    const pending = data.filter(t => !t.completed);
    
    // Update pending count
    const taskCount = document.getElementById("taskCount");
    if (taskCount) {
      taskCount.textContent = pending.length;
    }
    
    // Display recent assignments
    const recentContainer = document.getElementById('recentAssignments');
    if (recentContainer && pending.length > 0) {
      recentContainer.innerHTML = pending.slice(0, 3).map(task => `
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
          <div class="flex-1">
            <p class="font-medium text-gray-900 text-sm">${task.title}</p>
            <p class="text-xs text-gray-500 mt-1">Status: <span class="text-amber-600 font-medium">Pending</span></p>
          </div>
          <svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Error loading tasks:', error);
    const taskCount = document.getElementById("taskCount");
    if (taskCount) taskCount.textContent = '--';
  }
}

// Load data
loadCourses();
loadTasks();