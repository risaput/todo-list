const Todo = (function() {
  let tasks = [];

  const formBtn = document.getElementById('form-btn');
  const formInput = document.getElementById('form-input');
  const todo = document.getElementById('todo');

  function addTask() {
    const newTask = {
      task: formInput.value,
      time: 'Sab, Sep 30 07.13',
      done: false
    }

    formInput.value = '';
    tasks.push(newTask);
    showTask()
  }

  function createElem(elem, name) {
    const element = document.createElement(elem);
    element.className = name;
    return element;
  }

  function handleClick(e) {
    const section = e.target.parentElement;
    const span = section.firstChild;

    const tasksCopy = Array.from(tasks);
    const ind = tasksCopy.findIndex(t => t.task == span.textContent);

    if (e.target.classList.contains('todo-remove')) {
      tasksCopy.splice(ind, 1);
      tasks = tasksCopy;
      section.remove();
    }

    if (e.target.classList.contains('todo-content')) {
      tasks[ind].done = !tasks[ind].done;
      const val = tasks[ind].done ? 'line-through' : 'none';
      span.style.textDecoration = val;
    }
  }

  function addBtnRemove() {
    const todoList = Array.from(
      document.getElementsByClassName('todo-list')
    );
    const span = createElem(
      'span',
      'todo__remove todo-remove'
    )
    span.append('[x]');

    for (list of todoList) {
      list.append(span);
    }
  }

  function showTask() {
    let ind = 0;
    for (task of tasks) {
      ind = tasks.indexOf(task);
    }
    const span = createElem(
      'span',
      'todo__content todo-content'
    )
    const section = createElem(
      'section',
      'todo__list todo-list'
    )
    span.append(tasks[ind].task);
    section.append(span);
    todo.append(section);

    addBtnRemove()
  }

  return {
    start: function() {
      formBtn.addEventListener('click', addTask);
      window.addEventListener('click', handleClick);
    },
  }

})();

Todo.start();