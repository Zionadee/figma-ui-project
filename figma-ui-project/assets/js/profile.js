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
        picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&size=200&background=4f46e5&color=fff`
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
      <div class="flex flex-col md:flex-row items-center gap-8">
        <img src="${user.picture}" class="rounded-full w-32 h-32 border-4 border-indigo-100"/>
        <div class="flex-1 text-center md:text-left">
          <h2 class="text-3xl font-bold text-gray-900 mb-2">${user.name}</h2>
          <p class="text-gray-600 mb-4">${user.email}</p>
          <div class="flex flex-wrap gap-3 justify-center md:justify-start">
            <button onclick="editProfile()" class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
              Edit Profile
            </button>
            <button onclick="changePassword()" class="px-6 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 font-medium">
              Change Password
            </button>
          </div>
        </div>
      </div>
      
      <div class="mt-8 pt-8 border-t border-gray-200">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Account Information</h3>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
            <p class="text-gray-900">${user.name}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
            <p class="text-gray-900">${user.email}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-500 mb-1">Account Status</label>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
              ✓ Active
            </span>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-500 mb-1">Member Since</label>
            <p class="text-gray-900">November 2024</p>
          </div>
        </div>
      </div>
    `;

    loadStats();
  } catch (error) {
    console.error('Error loading profile:', error);
    if (loading) loading.classList.add('hidden');
    if (profileDiv) {
      profileDiv.classList.remove('hidden');
      profileDiv.innerHTML = `
        <div class="text-center py-8">
          <p class="text-red-600 mb-4">Failed to load profile</p>
          <button onclick="loadProfile()" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Try Again
          </button>
        </div>
      `;
    }
  }
}

async function loadStats() {
  try {
    // Get enrolled courses count
    const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    document.getElementById('enrolledCount').textContent = enrolled.length;

    // Get assignment stats
    const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
    const assignments = await res.json();
    const completed = assignments.filter(a => a.completed).length;
    const pending = assignments.filter(a => !a.completed).length;

    document.getElementById('completedCount').textContent = completed;
    document.getElementById('pendingCount').textContent = pending;
  } catch (error) {
    console.error('Error loading stats:', error);
  }
}

function editProfile() {
  alert('Edit profile functionality - coming soon!');
}

function changePassword() {
  alert('Change password functionality - coming soon!');
}

loadProfile();