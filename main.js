window.onload = function() {

  let initTasks = [
    { isDone: false, task: "Learn", time: "Sab, Sep 30 07.13" },
    { isDone: false, task: "Play", time: "Sab, Sep 30 07.13" },
    { isDone: true, task: "Buy Coffee", time: "Sab, Sep 30 07.13" },
  ];

  let savedTasks = JSON.parse(localStorage.getItem('todos')) || initTasks;

  function addTask() {
    const inputText = document.getElementById('input-text');
    const inputTime = document.getElementById('input-time');

    //const dateTime = `${new Date().toDateString()} ${inputTime.value}`

    const newTask = {
      task: inputText.value,
      time: inputTime.value,
      isDone: false
    }

    inputText.value = '';
    savedTasks.push(newTask)
    localStorage.setItem('todos', JSON.stringify(savedTasks))
    showTask()
  }

  for (let task of savedTasks) showTask(task)

  function createElem(elem, name) {
    const element = document.createElement(elem);
    element.className = name;
    return element;
  }

  function handleClick(e) {
    const savedTasksCopy = Array.from(savedTasks);
    let ind = 0;

    if (e.target.classList.contains('todo-remove')) {
      const section = e.target.parentElement;
      const span = section.firstChild
      ind = savedTasksCopy.findIndex(tsk => tsk.task == span.textContent);
      savedTasksCopy.splice(ind, 1);

      localStorage.setItem('todos', JSON.stringify(savedTasksCopy));
      savedTasks = JSON.parse(localStorage.getItem('todos')) || []
      e.target.parentElement.remove();
    }

    if (e.target.classList.contains('todo-content')) {
      savedTasks[ind].isDone = !savedTasks[ind].isDone;
      const val = savedTasks[ind].isDone ? 'line-through' : 'none';
      e.target.style.textDecoration = val;
      console.log(ind);

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
    span.append('❌');

    for (list of todoList) list.append(span);
  }

  function showTask(task) {
    const content = document.getElementById('content');

    const span = createElem(
      'span',
      'todo__content todo-content'
    )
    const small = createElem(
      'small',
      'todo__time'
    )
    const section = createElem(
      'section',
      'todo todo-list'
    )

    const todo = task ? task :
      savedTasks[savedTasks.length - 1];

    span.append(todo.task);
    section.append(span);

    small.append(todo.time)
    section.append(small)

    content.append(section);

    addBtnRemove()
  }

  function showModal(evt) {
    const modal = document.getElementById('modal');
    const modalWrapper = document.getElementById('modal-wrapper');

    if (evt.target.id == 'modal-btn') {
      modal.classList.add('active');
      modalWrapper.classList.add('active');
    }
    if (evt.target.id == 'modal' || evt.target.id == 'input-add') {
      modal.classList.remove('active')
      modalWrapper.classList.remove('active')
    }
  }

  window.addEventListener('click', showModal)

  document.getElementById('input-add')
    .addEventListener('click', addTask);

  window.addEventListener('click', handleClick);

}