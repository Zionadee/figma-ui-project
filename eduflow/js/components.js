// Shared UI Components for EduFlow

// Get current page name
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  return page;
}

// Render sidebar with active state
function renderSidebar() {
  const currentPage = getCurrentPage();
  
  const navItems = [
    { href: 'dashboard.html', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: 'courses.html', label: 'Courses', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { href: 'assignments.html', label: 'Assignments', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { href: 'profile.html', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
  ];

  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  sidebar.innerHTML = `
    <div class="p-6 border-b border-slate-700/50">
      <h2 class="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
        EduFlow
      </h2>
      <p class="text-xs text-slate-500 mt-1">Learning Platform</p>
    </div>
    
    <nav class="flex-1 p-4 space-y-2">
      ${navItems.map(item => {
        const isActive = currentPage === item.href;
        return `
          <a href="${item.href}" 
             class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25' 
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}">
            <svg class="w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-violet-400'}" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${item.icon}"/>
            </svg>
            <span class="font-medium">${item.label}</span>
            ${isActive ? '<div class="ml-auto w-1.5 h-1.5 rounded-full bg-white"></div>' : ''}
          </a>
        `;
      }).join('')}
    </nav>
    
    <div class="p-4 border-t border-slate-700/50">
      <button onclick="logout()" 
              class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                     bg-slate-800/50 text-slate-400 hover:bg-red-500/10 hover:text-red-400
                     transition-all duration-200 group">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
        </svg>
        <span class="font-medium">Logout</span>
      </button>
    </div>
  `;
}

// Toast notification system
function showToast(message, type = 'success') {
  const colors = {
    success: 'from-emerald-500 to-green-500',
    error: 'from-red-500 to-rose-500',
    info: 'from-blue-500 to-indigo-500'
  };
  
  const icons = {
    success: 'M5 13l4 4L19 7',
    error: 'M6 18L18 6M6 6l12 12',
    info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  };

  const toast = document.createElement('div');
  toast.className = `fixed top-6 right-6 flex items-center gap-3 px-5 py-4 rounded-2xl 
                     bg-gradient-to-r ${colors[type]} text-white shadow-2xl z-50
                     transform translate-x-full opacity-0 transition-all duration-300`;
  toast.innerHTML = `
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${icons[type]}"/>
    </svg>
    <span class="font-medium">${message}</span>
  `;
  
  document.body.appendChild(toast);
  
  // Animate in
  requestAnimationFrame(() => {
    toast.classList.remove('translate-x-full', 'opacity-0');
  });
  
  // Animate out
  setTimeout(() => {
    toast.classList.add('translate-x-full', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Initialize sidebar on DOM load
document.addEventListener('DOMContentLoaded', renderSidebar);
