let allAssignments = [];
let currentFilter = 'all';

async function loadAssignments() {
  const list = document.getElementById("todoList");
  const loading = document.getElementById("loading");
  const emptyState = document.getElementById("emptyState");

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=15");
    allAssignments = await res.json();
    
    // Hide loading
    if (loading) loading.classList.add('hidden');
    if (list) list.classList.remove('hidden');
    
    renderAssignments();
  } catch (error) {
    console.error('Error loading assignments:', error);
    if (loading) loading.classList.add('hidden');
    if (list) {
      list.classList.remove('hidden');
      list.innerHTML = `
        <div class="text-center py-8">
          <p class="text-red-600 mb-4">Failed to load assignments</p>
          <button onclick="loadAssignments()" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Try Again
          </button>
        </div>
      `;
    }
  }
}

function renderAssignments() {
  const list = document.getElementById("todoList");
  const emptyState = document.getElementById("emptyState");
  
  let filtered = allAssignments;
  
  if (currentFilter === 'pending') {
    filtered = allAssignments.filter(t => !t.completed);
  } else if (currentFilter === 'completed') {
    filtered = allAssignments.filter(t => t.completed);
  }
  
  if (filtered.length === 0) {
    list.classList.add('hidden');
    emptyState.classList.remove('hidden');
    return;
  }
  
  list.classList.remove('hidden');
  emptyState.classList.add('hidden');
  
  list.innerHTML = filtered.map(t => `
    <li class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1">
          <h3 class="font-medium text-gray-900 mb-1">${t.title}</h3>
          <p class="text-sm text-gray-500">Assignment #${t.id}</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="px-3 py-1 rounded-full text-xs font-medium ${
            t.completed 
              ? 'bg-green-100 text-green-700' 
              : 'bg-amber-100 text-amber-700'
          }">
            ${t.completed ? '✓ Completed' : '⏰ Pending'}
          </span>
          ${!t.completed ? `
            <button onclick="markComplete(${t.id})" class="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
              Mark Done
            </button>
          ` : ''}
        </div>
      </div>
    </li>
  `).join("");
}

function filterAssignments(filter) {
  currentFilter = filter;
  
  // Update button styles
  document.getElementById('filterAll').className = 
    filter === 'all' 
      ? 'px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium' 
      : 'px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300';
  
  document.getElementById('filterPending').className = 
    filter === 'pending' 
      ? 'px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium' 
      : 'px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300';
  
  document.getElementById('filterCompleted').className = 
    filter === 'completed' 
      ? 'px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium' 
      : 'px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300';
  
  renderAssignments();
}

function markComplete(id) {
  const assignment = allAssignments.find(t => t.id === id);
  if (assignment) {
    assignment.completed = true;
    renderAssignments();
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notification.textContent = '✅ Assignment marked as complete!';
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
  }
}

loadAssignments();