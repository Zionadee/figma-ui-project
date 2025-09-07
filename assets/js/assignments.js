async function loadAssignments() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
    const todos = await res.json();
    const list = document.getElementById("todoList");
  
    list.innerHTML = todos.map(t =>
      `<li class="p-3 rounded shadow bg-white flex justify-between">
         <span>${t.title}</span>
         <span class="${t.completed ? 'text-green-600' : 'text-red-600'} font-semibold">
           ${t.completed ? "Completed" : "Pending"}
         </span>
       </li>`
    ).join("");
  }
  loadAssignments();