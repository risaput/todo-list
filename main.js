const Todo = (function() {

  let initTasks = [
    { isDone: false, task: "Learn", time: "Sab, Sep 30 07.13" },
    { isDone: false, task: "Play", time: "Sab, Sep 30 07.13" },
    { isDone: true, task: "Buy Coffee", time: "Sab, Sep 30 07.13" },
  ];

  let savedTasks = JSON.parse(localStorage.getItem('todos')) || initTasks;

 const elem = {
  modal: document.getElementById('modal'),
  modal_wp: document.getElementById('modal-wrapper')
}

  const inputBtn = document.getElementById('input-add');
  const inputText = document.getElementById('input-text');
  const inputTime = document.getElementById('input-time');

  const content = document.getElementById('content');

  function addTask() {
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
      ind = savedTasksCopy.findIndex(t => t.task == span.textContent);
      savedTasksCopy.splice(ind, 1);

      localStorage.setItem('todos', JSON.stringify(savedTasksCopy));
      savedTasks = JSON.parse(localStorage.getItem('todos')) || []
      e.target.parentElement.remove();
    }

    if (e.target.classList.contains('todo-content')) {
      savedTasks[ind].isDone = !savedTasks[ind].isDone;
      const val = savedTasks[ind].isDone ? 'line-through' : 'none';
      e.target.style.textDecoration = val;
    }

    if (e.target.classList.contains('modal')) {
      modal.classList.remove('active')
      //modalWrapper.classList.remove('active')
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

    for (list of todoList) {
      list.append(span);
    }
  }

  function showTask(task) {
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

    const todo = task ? task : savedTasks[savedTasks.length - 1];

    span.append(todo.task);
    section.append(span);

    small.append(todo.time)
    section.append(small)

    content.append(section);

    addBtnRemove()
  }

  return {
    click: function() {
      inputBtn.addEventListener('click', addTask);
      window.addEventListener('click', handleClick);
    },
    showModal: function() {
      elem.modal.classList.add('active')
      elem.modal_wp.classList.add('active');
    }
  }

})();

Todo.click()