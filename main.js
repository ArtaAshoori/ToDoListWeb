const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const list_element = document.querySelector("#tasks");

const btn_remove_all = document.querySelector('#remove-all');

const btn_filter_all = document.querySelector('#filter-all')
const btn_filter_success = document.querySelector('#filter-success')
const btn_filter_not_success = document.querySelector('#filter-not-success')

const createTaskElement = (task) => {
  const taskElementHtml = `
  <div class="task">
      <div class="content">
        <input type="text" class="text" value="${task}" readonly="readonly" />
      </div>
      <div class="actions">
        <button class="success">Success</button>
        <button class="delete">Delete</button>
        <button class="edit">Edit</button>
      </div>
    </div>
  `;

  const container = document.createElement("div");
  container.innerHTML = taskElementHtml;

  const task_element = container.firstElementChild;

  const task_input_element = task_element.querySelector(".text");
  const task_success_element = task_element.querySelector(".success");
  const task_delete_element = task_element.querySelector(".delete");
  const task_edit_element = task_element.querySelector(".edit");

  addTaskActions(task_element, task_input_element, task_edit_element, task_success_element, task_delete_element);

  return task_element;
}

const addTaskActions = (task_element, task_input_element, task_edit_element, task_success_element, task_delete_element) => {
  task_success_element.addEventListener("click", toggleSuccess);
  task_delete_element.addEventListener("click", toggleDelete);
  task_edit_element.addEventListener("click", toggleEdit);

  function toggleSuccess() {
    task_success_element.textContent = task_success_element.textContent === "Success" ? "Cancel" : "Success";
    task_element.classList.toggle("success-btn");
  }

  function toggleDelete() {
    list_element.removeChild(task_element);
  }

  function toggleEdit() {
    if (task_edit_element.textContent === "Edit") {
      task_edit_element.textContent = "Save";
      task_input_element.removeAttribute("readonly");
      task_input_element.focus();
    } else {
      if (task_input_element.value.trim() === "") {
        alert("Task cannot be empty");
        task_input_element.focus();
        return;
      }
      task_edit_element.textContent = "Edit";
      task_input_element.setAttribute("readonly", "readonly");
    }
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const task = input.value;

  if (!task) {
    alert("Please fill out the task");
    return;
  }

  const task_element = createTaskElement(task);
  list_element.appendChild(task_element);
  input.value = "";
});

btn_remove_all.addEventListener("click", () => {
  while (list_element.firstChild) {
    list_element.removeChild(list_element.firstChild);
  }
});

const filterTasks = (status) => {
  const tasks = document.querySelectorAll(".task");
  tasks.forEach(task => {
    switch (status) {
      case "all":
        task.style.display = "flex"
        break;
      case "success":
        task.classList.contains("success-btn") ? task.style.display = "flex" : task.style.display = "none"
        break;
      case "not-success":
        !task.classList.contains("success-btn") ? task.style.display = "flex" : task.style.display = "none"
        break;
    }
  });
}

btn_filter_all.addEventListener('click', () => filterTasks("all"));
btn_filter_success.addEventListener('click', () => filterTasks("success"));
btn_filter_not_success.addEventListener('click', () => filterTasks("not-success"));
