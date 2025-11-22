const todoInput = document.getElementById("inputBox");
const todoAddBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const editModal = document.getElementById("editModal");
const editInput = document.getElementById("editInput");
const saveEditBtn = document.getElementById("saveEditBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");
let currentTaskSpan = null;

todoAddBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTodo();
});

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = text;

  const btnWrap = document.createElement("div");
  btnWrap.className = "btns";


  const editBtn = document.createElement("button");
  editBtn.className = "editBtn";
  editBtn.textContent = "Edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "deleteBtn";
  deleteBtn.textContent = "Delete";

  btnWrap.appendChild(editBtn);
  btnWrap.appendChild(deleteBtn);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(btnWrap);
  todoList.appendChild(li);
  todoInput.value = "";

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      span.classList.add("completed");
    } else {
      span.classList.remove("completed");
    }
  });

  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  editBtn.addEventListener("click", () => {
    currentTaskSpan = span;
    editInput.value = span.textContent;
    editModal.style.display = "flex";
  });
}

saveEditBtn.addEventListener("click", () => {
  const newText = editInput.value.trim();

  if (newText !== "") {
    currentTaskSpan.textContent = newText;
  }

  editModal.style.display = "none";
});

cancelEditBtn.addEventListener("click", () => {
  editModal.style.display = "none";
});
