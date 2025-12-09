// Profile JavaScript

async function loadProfile() {
  const profileDiv = document.getElementById("profile");
  const loading = document.getElementById("loading");

  try {
    // Get user data from localStorage or fetch random user
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    let user;
    if (userName && userEmail) {
      // Use stored user data
      user = {
        name: userName,
        email: userEmail,
        picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&size=200&background=7c3aed&color=fff&bold=true`
      };
    } else {
      // Fetch random user
      const res = await fetch("https://randomuser.me/api/");
      const data = await res.json();
      const randomUser = data.results[0];
      user = {
        name: `${randomUser.name.first} ${randomUser.name.last}`,
        email: randomUser.email,
        picture: randomUser.picture.large
      };
    }

    // Hide loading
    if (loading) loading.classList.add('hidden');
    if (profileDiv) profileDiv.classList.remove('hidden');

    profileDiv.innerHTML = `
      <div class="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur opacity-25 
                      group-hover:opacity-50 transition duration-300"></div>
          <img src="${user.picture}" 
               class="relative w-32 h-32 rounded-full border-4 border-slate-700 object-cover"/>
        </div>
        
        <div class="flex-1 text-center lg:text-left">
          <h2 class="text-3xl font-bold text-white mb-2">${user.name}</h2>
          <p class="text-slate-400 mb-6">${user.email}</p>
          
          <div class="flex flex-wrap gap-3 justify-center lg:justify-start">
            <button onclick="editProfile()" 
                    class="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white 
                           rounded-xl hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-200 font-medium">
              Edit Profile
            </button>
            <button onclick="changePassword()" 
                    class="px-6 py-2.5 border-2 border-slate-600 text-slate-300 rounded-xl 
                           hover:border-violet-500 hover:text-violet-400 transition-all duration-200 font-medium">
              Change Password
            </button>
          </div>
        </div>
      </div>
    `;

    loadStats();
    loadAccountInfo(user);
  } catch (error) {
    console.error('Error loading profile:', error);
    if (loading) loading.classList.add('hidden');
    if (profileDiv) {
      profileDiv.classList.remove('hidden');
      profileDiv.innerHTML = `
        <div class="text-center py-12">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
            <svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <p class="text-slate-400 mb-4">Failed to load profile</p>
          <button onclick="loadProfile()" 
                  class="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors font-medium">
            Try Again
          </button>
        </div>
      `;
    }
  }
}

async function loadStats() {
  // Get enrolled courses count
  const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
  const enrolledEl = document.getElementById('enrolledCount');
  if (enrolledEl) enrolledEl.textContent = enrolled.length;

  // Local assignments data
  const assignments = [
    { completed: false }, { completed: false }, { completed: true },
    { completed: false }, { completed: true }, { completed: false },
    { completed: true }, { completed: false }, { completed: true },
    { completed: false }, { completed: true }, { completed: false },
  ];
  
  const completed = assignments.filter(a => a.completed).length;
  const pending = assignments.filter(a => !a.completed).length;

  const completedEl = document.getElementById('completedCount');
  const pendingEl = document.getElementById('pendingCount');
  
  if (completedEl) completedEl.textContent = completed;
  if (pendingEl) pendingEl.textContent = pending;
}

function loadAccountInfo(user) {
  const container = document.getElementById('accountInfo');
  if (!container) return;
  
  const memberSince = new Date();
  memberSince.setMonth(memberSince.getMonth() - 2);
  const memberDate = memberSince.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  container.innerHTML = `
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-1">
        <label class="text-sm font-medium text-slate-500">Full Name</label>
        <p class="text-slate-200 font-medium">${user.name}</p>
      </div>
      <div class="space-y-1">
        <label class="text-sm font-medium text-slate-500">Email Address</label>
        <p class="text-slate-200 font-medium">${user.email}</p>
      </div>
      <div class="space-y-1">
        <label class="text-sm font-medium text-slate-500">Account Status</label>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium 
                     bg-emerald-500/10 text-emerald-400">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          Active
        </span>
      </div>
      <div class="space-y-1">
        <label class="text-sm font-medium text-slate-500">Member Since</label>
        <p class="text-slate-200 font-medium">${memberDate}</p>
      </div>
    </div>
  `;
}

function editProfile() {
  if (typeof showToast === 'function') {
    showToast('Edit profile feature coming soon!', 'info');
  } else {
    alert('Edit profile functionality - coming soon!');
  }
}

function changePassword() {
  if (typeof showToast === 'function') {
    showToast('Change password feature coming soon!', 'info');
  } else {
    alert('Change password functionality - coming soon!');
  }
}

// Load profile on page load
loadProfile();
