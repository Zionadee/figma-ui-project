// Assignments JavaScript

let allAssignments = [];
let currentFilter = 'all';

async function loadAssignments() {
  const list = document.getElementById("todoList");
  const loading = document.getElementById("loading");
  const emptyState = document.getElementById("emptyState");

  // Realistic education assignments (no API needed)
  allAssignments = [
    { id: 1, title: "Complete Chapter 5 Reading - Introduction to Algorithms", completed: false, course: "Computer Science 101", dueDate: "Dec 15" },
    { id: 2, title: "Submit Essay: The Impact of AI on Modern Society", completed: false, course: "English Composition", dueDate: "Dec 12" },
    { id: 3, title: "Math Problem Set #8 - Linear Algebra", completed: true, course: "Mathematics", dueDate: "Dec 10" },
    { id: 4, title: "Group Project: Build a Weather App", completed: false, course: "Web Development", dueDate: "Dec 20" },
    { id: 5, title: "Watch Lecture Video: Database Normalization", completed: true, course: "Database Systems", dueDate: "Dec 8" },
    { id: 6, title: "Lab Report: Chemical Reactions Experiment", completed: false, course: "Chemistry 101", dueDate: "Dec 14" },
    { id: 7, title: "Quiz Preparation: World War II History", completed: true, course: "World History", dueDate: "Dec 9" },
    { id: 8, title: "Python Coding Challenge #5", completed: false, course: "Python Programming", dueDate: "Dec 16" },
    { id: 9, title: "Research Paper Outline: Climate Change", completed: true, course: "Environmental Science", dueDate: "Dec 7" },
    { id: 10, title: "Peer Review: Classmate's Short Story", completed: false, course: "Creative Writing", dueDate: "Dec 13" },
    { id: 11, title: "Final Project Proposal Submission", completed: true, course: "Capstone Project", dueDate: "Dec 5" },
    { id: 12, title: "Complete Online Module: Data Privacy", completed: false, course: "Cybersecurity Basics", dueDate: "Dec 18" },
  ];
  
  // Simulate loading
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Hide loading
  if (loading) loading.classList.add('hidden');
  if (list) list.classList.remove('hidden');
  
  updateCounts();
  renderAssignments();
}

function updateCounts() {
  const total = allAssignments.length;
  const pending = allAssignments.filter(t => !t.completed).length;
  const completed = allAssignments.filter(t => t.completed).length;
  
  const totalEl = document.getElementById('totalCount');
  const pendingEl = document.getElementById('pendingCount');
  const completedEl = document.getElementById('completedCount');
  
  if (totalEl) totalEl.textContent = total;
  if (pendingEl) pendingEl.textContent = pending;
  if (completedEl) completedEl.textContent = completed;
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
    if (list) list.classList.add('hidden');
    if (emptyState) {
      emptyState.classList.remove('hidden');
      const emptyText = document.getElementById('emptyText');
      if (emptyText) {
        emptyText.textContent = currentFilter === 'pending' 
          ? 'No pending assignments. Great job!' 
          : currentFilter === 'completed' 
            ? 'No completed assignments yet.' 
            : 'No assignments found.';
      }
    }
    return;
  }
  
  if (list) list.classList.remove('hidden');
  if (emptyState) emptyState.classList.add('hidden');
  
  list.innerHTML = filtered.map((t, index) => `
    <li class="bg-slate-800/50 p-5 rounded-2xl hover:bg-slate-800 transition-all duration-200
               animate-fade-in" style="animation-delay: ${index * 50}ms">
      <div class="flex items-start justify-between gap-4">
        <div class="flex items-start gap-4 flex-1">
          <button onclick="toggleComplete(${t.id})" 
                  class="mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center
                         transition-all duration-200 flex-shrink-0
                         ${t.completed 
                           ? 'bg-emerald-500 border-emerald-500' 
                           : 'border-slate-600 hover:border-violet-500'}">
            ${t.completed ? `
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            ` : ''}
          </button>
          <div class="flex-1 min-w-0">
            <h3 class="font-medium text-slate-200 ${t.completed ? 'line-through text-slate-500' : ''}">
              ${t.title}
            </h3>
            <div class="flex flex-wrap items-center gap-3 mt-2">
              <span class="text-xs text-slate-500">${t.course}</span>
              <span class="text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-400">Due: ${t.dueDate}</span>
            </div>
          </div>
        </div>
        <span class="px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0
                     ${t.completed 
                       ? 'bg-emerald-500/10 text-emerald-400' 
                       : 'bg-amber-500/10 text-amber-400'}">
          ${t.completed ? '✓ Completed' : '⏰ Pending'}
        </span>
      </div>
    </li>
  `).join("");
}

function filterAssignments(filter) {
  currentFilter = filter;
  
  // Update button styles
  const buttons = ['filterAll', 'filterPending', 'filterCompleted'];
  const filterMap = { filterAll: 'all', filterPending: 'pending', filterCompleted: 'completed' };
  
  buttons.forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (btn) {
      const isActive = filterMap[btnId] === filter;
      btn.className = `px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
        ${isActive 
          ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25' 
          : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`;
    }
  });
  
  renderAssignments();
}

function toggleComplete(id) {
  const assignment = allAssignments.find(t => t.id === id);
  if (assignment) {
    assignment.completed = !assignment.completed;
    updateCounts();
    renderAssignments();
    
    // Show notification
    if (typeof showToast === 'function') {
      showToast(
        assignment.completed ? 'Assignment marked as complete!' : 'Assignment marked as pending',
        'success'
      );
    }
  }
}

function markComplete(id) {
  toggleComplete(id);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes fade-in {
    from { 
      opacity: 0; 
      transform: translateY(10px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  .animate-fade-in {
    animation: fade-in 0.3s ease-out forwards;
    opacity: 0;
  }
`;
document.head.appendChild(style);

// Load assignments on page load
loadAssignments();
