window.onload = function() {

  let initTasks = [
    { isDone: false, task: "Learn", time: "Sab, Sep 30 07.13" },
    { isDone: false, task: "Play", time: "Sab, Sep 30 07.13" },
    { isDone: true, task: "Buy Coffee", time: "Sab, Sep 30 07.13" },
  ];

  let savedTasks = JSON.parse(localStorage.getItem('todos')) || initTasks;
  const content = document.getElementById('content');

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

  function handleClick(evt) {
    const { classList } = evt.target;
    const savedTasksCopy = Array.from(savedTasks);
    
    if (classList.contains('todo-remove')) {
      const section = evt.target.parentElement;
      const text = section.firstChild.textContent;

      const idx = savedTasksCopy.findIndex(tasks => tasks.task == text);
      savedTasksCopy.splice(idx, 1);

      localStorage.setItem('todos', JSON.stringify(savedTasksCopy));
      savedTasks = JSON.parse(localStorage.getItem('todos')) || []
      section.remove();
    }

    if (classList.contains('todo-list')) {
      const span = evt.target.firstChild
      const idx = savedTasksCopy.findIndex(tasks => tasks.task == span.textContent);
      savedTasksCopy[idx].isDone = !savedTasksCopy[idx].isDone;
      localStorage.setItem('todos', JSON.stringify(savedTasksCopy));
      savedTasks = JSON.parse(localStorage.getItem('todos')) || []
      const val = savedTasksCopy[idx].isDone ? 'line-through' : 'none';
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
    span.append('❌');

    for (list of todoList) list.append(span);

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
    

    const todo = task ? task :
      savedTasks[savedTasks.length - 1];

    span.append(todo.task);
    section.append(span);

    small.append(todo.time)
    section.append(small)

    content.append(section);

    addBtnRemove()
  }

  function modalToggle(evt) {
    const modal = document.getElementById('modal');
    const modalWrapper = document.getElementById('modal-wrapper');
    const id = evt.target.id

    if (id == 'modal-btn') {
      modal.classList.add('active')
      modalWrapper.classList.add('active')
    }
    if (id == 'modal' || id == 'input-add') {
      modal.classList.remove('active')
      modalWrapper.classList.remove('active')
    }
  }

  const inputAdd = document.getElementById('input-add')
  inputAdd.addEventListener('click', addTask)
  window.addEventListener('click', modalToggle)

  content.addEventListener('click', handleClick);

}