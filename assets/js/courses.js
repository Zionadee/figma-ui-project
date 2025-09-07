async function loadCourses() {
    const res = await fetch("https://fakestoreapi.com/products");
    const courses = await res.json();
    const container = document.getElementById("courseList");
  
    container.innerHTML = courses.map(c =>
      `<div class="bg-white p-4 rounded shadow">
         <img src="${c.image}" alt="${c.title}" class="h-32 object-contain mx-auto mb-4"/>
         <h3 class="font-bold text-sm mb-2">${c.title}</h3>
         <p class="text-xs text-gray-600 mb-2">${c.description.slice(0, 80)}...</p>
         <button class="bg-blue-600 text-white px-3 py-1 rounded text-sm">Enroll</button>
       </div>`
    ).join("");
  }
  loadCourses();