const Todo = (function() {
  let tasks = [];

  const formBtn = document.getElementById('form-btn');
  const formInput = document.getElementById('form-input');
  const todos = document.getElementById('todo');

  function addTask() {
    tasks.push(formInput.value)
    formInput.value = ''
    showTasks()
  }

  function createEl(task) {
    const section = document.createElement('section')
    const span = document.createElement('span')
    section.className = 'todo__list'
    span.append(task)
    section.append(span)
    return section.outerHTML
  }

  function showTasks() {
    let content = '';
    tasks.forEach(function(task) {
      content += createEl(task)
    })

    todos.innerHTML = content
  }

  return {
    add: function() {
      formBtn.addEventListener('click', addTask)
    }
  }

})();

Todo.add()