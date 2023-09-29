const Todo = (function() {
  let tasks = [];

  const formBtn = document.getElementById('form-btn');
  const formInput = document.getElementById('form-input');
  const todo = document.getElementById('todo');

  function addTask() {
    tasks.push(formInput.value)
    formInput.value = ''
    showTask()
  }

  function createElem(elem, name) {
    const element = document.createElement(elem);
    element.className = name;
    return element;
  }

  window.addEventListener('click', function(e) {
    if (e.target.classList.contains('todo-remove')) {
      const section = e.target.parentElement;
      const content = section.firstChild.textContent;
      
      const tasksCopy = [].concat(tasks)
      const ind = tasksCopy.indexOf(content);
      tasksCopy.splice(ind, 1);
      
      tasks = tasksCopy;
      section.remove()
    }
  })

  function addBtnRemove() {
    const todoList = Array.from(
      document.getElementsByClassName('todo-list')
    );
    const span = createElem(
      'span',
      'todo__remove todo-remove'
    )
    span.append('[x]')
    
    for (list of todoList) {
      list.append(span)
    }
  }

  function showTask() {
    let ind = 0
    for (task of tasks) {
      ind = tasks.indexOf(task)
    }
    const span = createElem(
      'span',
      'todo__content'
    )
    const section = createElem(
      'section',
      'todo__list todo-list'
    )
    span.append(tasks[id])
    section.append(span)
    todo.append(section)
    
    addBtnRemove()
  }

  return {
    start: function() {
      formBtn.addEventListener('click', addTask)
    }
  }

})();

Todo.start()