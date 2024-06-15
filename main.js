const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const list_element = document.querySelector("#tasks");
const btn_remove_all = document.querySelector('#remove-all');

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const task = input.value;

  if (!task) {
    alert("Please fill out the task");
    return;
  }

  const task_element = document.createElement("div");
  task_element.classList.add("task");

  const task_content_element = document.createElement("div");
  task_content_element.classList.add("content");

  task_element.appendChild(task_content_element);

  const task_input_element = document.createElement("input");
  task_input_element.classList.add("text");
  task_input_element.type = "text";
  task_input_element.value = task;
  task_input_element.setAttribute("readonly", "readonly");

  task_content_element.appendChild(task_input_element);

  const task_actions_element = document.createElement("div");
  task_actions_element.classList.add("actions");

  const task_success_element = document.createElement("button");
  task_success_element.classList.add("success");
  task_success_element.innerHTML = "Success";

  const task_delete_element = document.createElement("button");
  task_delete_element.classList.add("delete");
  task_delete_element.innerHTML = "Delete";

  const task_edit_element = document.createElement("button");
  task_edit_element.classList.add("edit");
  task_edit_element.innerHTML = "Edit";

  task_actions_element.appendChild(task_edit_element);
  task_actions_element.appendChild(task_delete_element);
  task_actions_element.appendChild(task_success_element);

  task_element.appendChild(task_actions_element);

  list_element.appendChild(task_element);

  input.value = "";

  task_success_element.addEventListener("click", () => {
    task_success_element.innerHTML === "Success" ? task_success_element.innerHTML = "Cancel" : task_success_element.innerHTML = "Success";
    task_element.classList.toggle("success-btn");
  });

  task_delete_element.addEventListener("click", () => {
    list_element.removeChild(task_element);
  });

  task_edit_element.addEventListener("click", () => {
    if (task_edit_element.innerHTML == "Edit") {
      task_edit_element.innerHTML = "Save";
      input.focus();
    } else {
      task_edit_element.innerHTML = "Edit";
      task_input_element.value = input.value;
      input.value = "";
    }
  });
});

btn_remove_all.addEventListener("click", () => {
  while (list_element.firstChild) {
    list_element.removeChild(list_element.firstChild);
  }
});
