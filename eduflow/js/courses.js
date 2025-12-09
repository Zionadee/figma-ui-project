// Realistic education courses (no API needed)
const educationCourses = [
  { id: 1, title: "Introduction to Python Programming", description: "Learn Python from scratch. Cover variables, loops, functions, and build real projects. Perfect for beginners with no coding experience.", price: 49.99, image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop", category: "Programming", duration: "8 weeks", level: "Beginner" },
  { id: 2, title: "Web Development Bootcamp", description: "Master HTML, CSS, JavaScript, and React. Build responsive websites and web applications from scratch.", price: 79.99, image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop", category: "Web Development", duration: "12 weeks", level: "Beginner" },
  { id: 3, title: "Data Science Fundamentals", description: "Learn data analysis, visualization, and machine learning basics using Python, Pandas, and Scikit-learn.", price: 89.99, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop", category: "Data Science", duration: "10 weeks", level: "Intermediate" },
  { id: 4, title: "Digital Marketing Masterclass", description: "Master SEO, social media marketing, Google Ads, and content strategy to grow any business online.", price: 59.99, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop", category: "Marketing", duration: "6 weeks", level: "Beginner" },
  { id: 5, title: "UI/UX Design Essentials", description: "Learn user interface and user experience design. Master Figma, wireframing, prototyping, and design thinking.", price: 69.99, image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop", category: "Design", duration: "8 weeks", level: "Beginner" },
  { id: 6, title: "Machine Learning A-Z", description: "Comprehensive machine learning course covering supervised, unsupervised learning, and neural networks.", price: 99.99, image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop", category: "AI & ML", duration: "14 weeks", level: "Advanced" },
  { id: 7, title: "Business English Communication", description: "Improve your professional English skills for meetings, presentations, emails, and negotiations.", price: 39.99, image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop", category: "Language", duration: "6 weeks", level: "Intermediate" },
  { id: 8, title: "Financial Accounting Basics", description: "Understand financial statements, bookkeeping, and accounting principles for business success.", price: 54.99, image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop", category: "Finance", duration: "8 weeks", level: "Beginner" },
  { id: 9, title: "Mobile App Development with React Native", description: "Build cross-platform iOS and Android apps using React Native and JavaScript.", price: 84.99, image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop", category: "Mobile Development", duration: "10 weeks", level: "Intermediate" },
  { id: 10, title: "Project Management Professional", description: "Learn project management methodologies including Agile, Scrum, and traditional waterfall approaches.", price: 74.99, image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop", category: "Business", duration: "8 weeks", level: "Intermediate" },
  { id: 11, title: "Cybersecurity Fundamentals", description: "Learn network security, ethical hacking basics, and how to protect systems from cyber threats.", price: 79.99, image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop", category: "Security", duration: "10 weeks", level: "Beginner" },
  { id: 12, title: "Photography Masterclass", description: "Master your camera, composition, lighting, and photo editing to take stunning photographs.", price: 44.99, image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=300&fit=crop", category: "Creative", duration: "6 weeks", level: "Beginner" },
];

async function loadCourses() {
  const container = document.getElementById("courseList");
  const loading = document.getElementById("loading");
  const searchInput = document.getElementById("searchInput");
  
  // Store courses for filtering
  window.allCourses = educationCourses;
  
  // Simulate loading
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Hide loading, show courses
  if (loading) loading.classList.add('hidden');
  if (container) container.classList.remove('hidden');
  
  renderCourses(educationCourses);
  
  // Setup search
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = educationCourses.filter(c => 
        c.title.toLowerCase().includes(query) || 
        c.description.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query)
      );
      renderCourses(filtered);
    });
  }
}

function renderCourses(courses) {
  const container = document.getElementById("courseList");
  const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
  
  if (courses.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12">
        <p class="text-slate-400">No courses found matching your search.</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = courses.map(c => {
    const isEnrolled = enrolled.includes(c.id);
    return `
      <div class="group bg-slate-800/50 rounded-2xl overflow-hidden hover:bg-slate-800 
                  transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 
                  hover:-translate-y-1">
        <div class="relative h-48 overflow-hidden">
          <img src="${c.image}" alt="${c.title}" 
               class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
          <div class="absolute top-3 left-3 px-2 py-1 bg-slate-900/80 backdrop-blur rounded-lg text-xs text-slate-300">
            ${c.category}
          </div>
          ${isEnrolled ? `
            <span class="absolute top-3 right-3 px-3 py-1 bg-emerald-500 text-white text-xs 
                         font-bold rounded-full shadow-lg">
              ✓ Enrolled
            </span>
          ` : ''}
        </div>
        
        <div class="p-5">
          <h3 class="font-bold text-slate-200 mb-2 line-clamp-2 min-h-[3rem] 
                     group-hover:text-white transition-colors">
            ${c.title}
          </h3>
          <p class="text-sm text-slate-500 mb-4 line-clamp-2">
            ${c.description}
          </p>
          
          <div class="flex items-center gap-4 mb-4 text-xs text-slate-400">
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              ${c.duration}
            </span>
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              ${c.level}
            </span>
          </div>
          
          <div class="flex items-center justify-between pt-4 border-t border-slate-700/50">
            <span class="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 
                         bg-clip-text text-transparent">
              $${c.price}
            </span>
            <button 
              onclick="enrollCourse(${c.id})"
              class="px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
                     ${isEnrolled 
                       ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                       : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-violet-500/25'}"
              ${isEnrolled ? 'disabled' : ''}
            >
              ${isEnrolled ? 'Enrolled ✓' : 'Enroll Now'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function enrollCourse(courseId) {
  const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
  
  if (!enrolled.includes(courseId)) {
    enrolled.push(courseId);
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolled));
    
    // Show success notification
    if (typeof showToast === 'function') {
      showToast('Successfully enrolled in course!', 'success');
    }
    
    // Re-render courses to update UI
    if (window.allCourses) {
      renderCourses(window.allCourses);
    }
  }
}

// Add line-clamp styles
const style = document.createElement('style');
style.textContent = `
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
document.head.appendChild(style);

// Load courses on page load
loadCourses();
