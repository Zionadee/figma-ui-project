async function loadCourses() {
  const container = document.getElementById("courseList");
  const loading = document.getElementById("loading");
  
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const courses = await res.json();
    
    // Hide loading, show courses
    if (loading) loading.classList.add('hidden');
    if (container) container.classList.remove('hidden');
    
    // Get enrolled courses from localStorage
    const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    
    container.innerHTML = courses.map(c => {
      const isEnrolled = enrolled.includes(c.id);
      return `
        <div class="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
          <div class="relative mb-4">
            <img src="${c.image}" alt="${c.title}" class="h-40 w-full object-contain rounded-lg bg-gray-50"/>
            ${isEnrolled ? '<span class="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">Enrolled</span>' : ''}
          </div>
          <h3 class="font-bold text-base mb-2 line-clamp-2 h-12">${c.title}</h3>
          <p class="text-xs text-gray-600 mb-3 line-clamp-3">${c.description}</p>
          <div class="flex items-center justify-between">
            <span class="text-lg font-bold text-indigo-600">$${c.price}</span>
            <button 
              onclick="enrollCourse(${c.id})"
              class="enrollBtn ${isEnrolled ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              ${isEnrolled ? 'disabled' : ''}
            >
              ${isEnrolled ? 'Enrolled ✓' : 'Enroll Now'}
            </button>
          </div>
        </div>
      `;
    }).join("");
  } catch (error) {
    console.error('Error loading courses:', error);
    if (loading) loading.classList.add('hidden');
    if (container) {
      container.classList.remove('hidden');
      container.innerHTML = `
        <div class="col-span-full text-center py-12">
          <p class="text-gray-500 mb-4">Failed to load courses. Please try again.</p>
          <button onclick="loadCourses()" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Retry
          </button>
        </div>
      `;
    }
  }
}

function enrollCourse(courseId) {
  const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
  
  if (!enrolled.includes(courseId)) {
    enrolled.push(courseId);
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolled));
    
    // Show success message
    showNotification('Successfully enrolled in course!');
    
    // Reload courses to update UI
    loadCourses();
  }
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in { animation: fade-in 0.3s ease-out; }
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
document.head.appendChild(style);

loadCourses();