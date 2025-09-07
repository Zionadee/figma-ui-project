async function loadProfile() {
    const res = await fetch("https://randomuser.me/api/");
    const data = await res.json();
    const user = data.results[0];
  
    document.getElementById("profile").innerHTML = `
      <div class="flex flex-col items-center">
        <img src="${user.picture.large}" class="rounded-full w-24 h-24 mb-4"/>
        <h2 class="text-xl font-bold">${user.name.first} ${user.name.last}</h2>
        <p class="text-gray-600 mb-2">${user.email}</p>
        <button class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Edit Profile</button>
      </div>
    `;
  }
  loadProfile();