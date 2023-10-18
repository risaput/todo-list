window.onload = function() {

  let initTasks = [
    { isDone: false, task: "Learn", time: "Sab, Sep 30 07.13" },
    { isDone: false, task: "Play", time: "Sab, Sep 30 07.13" },
    { isDone: true, task: "Buy Coffee", time: "Sab, Sep 30 07.13" },
  ];

  let savedTasks = JSON.parse(localStorage.getItem('todos')) || initTasks;

  const content = document.getElementById('content');
  const inputText = document.getElementById('input-text');
  const inputTime = document.getElementById('input-time');

  for (let task of savedTasks) showTask(task)

  function createElem(elem, name) {
    const element = document.createElement(elem);
    element.className = name;
    return element;
  }

  window.addEventListener('click', function(evt) {
    const { classList } = evt.target;
    const savedTasksCopy = Array.from(savedTasks);

    if (classList.contains('todo-remove')) {
      const section = evt.target.parentElement;
      const text = section.firstChild.textContent;

      const idx = savedTasksCopy.findIndex(tasks => tasks.task == text);
      savedTasksCopy.splice(idx, 1);
      
      updateLocalStorage(savedTasksCopy)
      section.remove();
    }

    if (classList.contains('todo-list')) {
      const span = evt.target.firstChild;
      const idx = savedTasksCopy.findIndex(tasks => tasks.task == span.textContent);

      savedTasksCopy[idx].isDone = !savedTasksCopy[idx].isDone;
      updateLocalStorage(savedTasksCopy)
      
      const val = savedTasksCopy[idx].isDone ? 'line-through' : 'none';
      span.style.textDecoration = val;
    }
  })

  function updateLocalStorage(arr) {
    localStorage.setItem('todos', JSON.stringify(arr));
    savedTasks = JSON.parse(localStorage.getItem('todos')) || [];
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

    if (task.isDone) {
      span.style.textDecoration = 'line-through';
    }

    span.append(task.task);
    section.append(span);

    small.append(task.time)
    section.append(small)

    content.append(section);

    addBtnRemove()
  }


  const modal = document.getElementById('modal');

  window.addEventListener('click', function(evt) {
    const modalWrapper = modal.firstElementChild;
    const id = evt.target.id;

    if (id == 'modal-btn') {
      modal.classList.add('active');
      modalWrapper.style.animation = 'slide .7s'
    }
    if (id == 'modal') {
      modal.classList.remove('active')
      modalWrapper.style.animation = 'none'
    }
  })

  function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
      if (input.required)
        modal.classList.remove('active')
    })
  }

  const form = document.getElementById('form')

  form.addEventListener('submit', function(evt) {
    evt.preventDefault()

    checkRequired([inputText, inputTime])

    const newTask = {
      task: inputText.value,
      time: inputTime.value,
      isDone: false
    }
    //const dateTime = `${new Date().toDateString()} ${inputTime.value}`
    savedTasks.push(newTask)
    localStorage.setItem('todos', JSON.stringify(savedTasks))
    showTask(newTask)

  })

}