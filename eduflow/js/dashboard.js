// Dashboard JavaScript

// Local course data (same as courses.js)
const dashboardCourses = [
  { id: 1, title: "Introduction to Python Programming", image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop" },
  { id: 2, title: "Web Development Bootcamp", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop" },
  { id: 3, title: "Data Science Fundamentals", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" },
  { id: 4, title: "Digital Marketing Masterclass", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" },
  { id: 5, title: "UI/UX Design Essentials", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop" },
  { id: 6, title: "Machine Learning A-Z", image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop" },
  { id: 7, title: "Business English Communication", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop" },
  { id: 8, title: "Financial Accounting Basics", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop" },
  { id: 9, title: "Mobile App Development with React Native", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop" },
  { id: 10, title: "Project Management Professional", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop" },
  { id: 11, title: "Cybersecurity Fundamentals", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop" },
  { id: 12, title: "Photography Masterclass", image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=300&fit=crop" },
];

// Local assignments data
const dashboardAssignments = [
  { id: 1, title: "Complete Chapter 5 Reading - Introduction to Algorithms", completed: false, course: "Computer Science 101", dueDate: "Dec 15" },
  { id: 2, title: "Submit Essay: The Impact of AI on Modern Society", completed: false, course: "English Composition", dueDate: "Dec 12" },
  { id: 3, title: "Math Problem Set #8 - Linear Algebra", completed: true, course: "Mathematics", dueDate: "Dec 10" },
  { id: 4, title: "Group Project: Build a Weather App", completed: false, course: "Web Development", dueDate: "Dec 20" },
  { id: 5, title: "Watch Lecture Video: Database Normalization", completed: true, course: "Database Systems", dueDate: "Dec 8" },
  { id: 6, title: "Lab Report: Chemical Reactions Experiment", completed: false, course: "Chemistry 101", dueDate: "Dec 14" },
];

document.addEventListener('DOMContentLoaded', () => {
  // Load user name
  const userName = localStorage.getItem('userName') || localStorage.getItem('userEmail')?.split('@')[0] || 'Student';
  const userNameEl = document.getElementById('userName');
  if (userNameEl) {
    userNameEl.textContent = userName.charAt(0).toUpperCase() + userName.slice(1);
  }
  
  // Load all data
  loadDashboardData();
});

async function loadDashboardData() {
  await Promise.all([
    loadCourseCount(),
    loadTaskCount(),
    loadRecentAssignments(),
    loadEnrolledCourses()
  ]);
}

async function loadCourseCount() {
  const el = document.getElementById("courseCount");
  const loader = document.getElementById("courseLoader");
  
  // Simulate loading
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (loader) loader.classList.add('hidden');
  if (el) {
    el.textContent = dashboardCourses.length;
    el.classList.remove('hidden');
  }
}

async function loadTaskCount() {
  const el = document.getElementById("taskCount");
  const loader = document.getElementById("taskLoader");
  
  // Simulate loading
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const pending = dashboardAssignments.filter(t => !t.completed).length;
  
  if (loader) loader.classList.add('hidden');
  if (el) {
    el.textContent = pending;
    el.classList.remove('hidden');
  }
}

async function loadRecentAssignments() {
  const container = document.getElementById('recentAssignments');
  if (!container) return;
  
  // Simulate loading
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const pending = dashboardAssignments.filter(t => !t.completed).slice(0, 3);
  
  if (pending.length > 0) {
    container.innerHTML = pending.map(task => `
      <div class="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl 
                  hover:bg-slate-800 transition-all duration-200 group cursor-pointer"
           onclick="window.location.href='assignments.html'">
        <div class="flex-1 min-w-0">
          <p class="font-medium text-slate-200 text-sm truncate">${task.title}</p>
          <p class="text-xs text-slate-500 mt-1">
            ${task.course} · <span class="text-amber-400">Due: ${task.dueDate}</span>
          </p>
        </div>
        <div class="ml-4 p-2 rounded-lg bg-amber-500/10 text-amber-400 
                    group-hover:bg-amber-500/20 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
      </div>
    `).join('');
  } else {
    container.innerHTML = `
      <div class="text-center py-8 text-slate-500">
        <p>No pending assignments!</p>
      </div>
    `;
  }
}

async function loadEnrolledCourses() {
  const container = document.getElementById('enrolledCourses');
  const countEl = document.getElementById('enrolledCount');
  if (!container) return;
  
  const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
  
  if (countEl) {
    countEl.textContent = enrolled.length;
  }
  
  if (enrolled.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8">
        <p class="text-slate-500 mb-4">You haven't enrolled in any courses yet.</p>
        <a href="courses.html" 
           class="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg 
                  hover:bg-violet-700 transition-colors font-medium text-sm">
          Browse Courses
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    `;
    return;
  }
  
  const myCourses = dashboardCourses.filter(c => enrolled.includes(c.id)).slice(0, 4);
  
  container.innerHTML = myCourses.map(course => `
    <div class="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl 
                hover:bg-slate-800 transition-all duration-200">
      <img src="${course.image}" alt="${course.title}" 
           class="w-12 h-12 object-cover rounded-lg"/>
      <div class="flex-1 min-w-0">
        <p class="font-medium text-slate-200 text-sm truncate">${course.title}</p>
        <div class="flex items-center gap-2 mt-1">
          <div class="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full" 
                 style="width: ${Math.floor(Math.random() * 60) + 20}%"></div>
          </div>
          <span class="text-xs text-slate-500">In Progress</span>
        </div>
      </div>
    </div>
  `).join('');
}
