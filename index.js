(() => { 
  let toDoListArray = [];
  const form = document.querySelector(".form"); 
  const input = form.querySelector(".form__input");
  const ul = document.querySelector(".toDoList"); 
  const clearAllButton = form.querySelector(".clear-all");

  form.addEventListener('submit', e => {
      e.preventDefault();
      const itemId = String(Date.now());
      const toDoItem = input.value.trim();
      if (toDoItem === '') return; // Ignore empty submissions
      addItemToDOM(itemId, toDoItem);
      addItemToArray(itemId, toDoItem);
      input.value = '';
  });

  ul.addEventListener('click', e => {
      const id = e.target.getAttribute('data-id');
      if (!id) return;

      if (e.target.classList.contains('delete-button')) {
          removeItemFromDOM(id);
          removeItemFromArray(id);
      }
  });

  clearAllButton.addEventListener('click', () => {
      clearAllItems();
  });

  const addItemToDOM = (itemId, toDoItem, completed = false) => {
      const li = document.createElement('li');
      li.setAttribute("data-id", itemId);
      if (completed) li.classList.add('completed');

      const span = document.createElement('span');
      span.innerText = toDoItem;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = completed;
      checkbox.addEventListener('change', () => {
          li.classList.toggle('completed');
          const item = toDoListArray.find(item => item.itemId === itemId);
          if (item) item.completed = checkbox.checked;
          saveToLocalStorage();
      });

      const deleteButton = document.createElement('button');
      deleteButton.innerText = "❌";
      deleteButton.classList.add('delete-button');
      deleteButton.addEventListener('click', () => {
          ul.removeChild(li);
          toDoListArray = toDoListArray.filter(item => item.itemId !== itemId);
          saveToLocalStorage();
      });

      const taskControls = document.createElement('div');
      taskControls.classList.add('task-controls');
      taskControls.append(checkbox, deleteButton);

      li.append(span, taskControls);
      ul.appendChild(li);
  };

  const addItemToArray = (itemId, toDoItem) => {
      toDoListArray.push({ itemId, toDoItem, completed: false });
      saveToLocalStorage();
  };

  const removeItemFromDOM = (id) => {
      const li = document.querySelector(`[data-id="${id}"]`);
      if (li) ul.removeChild(li);
  };

  const removeItemFromArray = (id) => {
      toDoListArray = toDoListArray.filter(item => item.itemId !== id);
      saveToLocalStorage();
  };

  const clearAllItems = () => {
      ul.innerHTML = '';
      toDoListArray = [];
      saveToLocalStorage();
  };

  const saveToLocalStorage = () => {
      localStorage.setItem('toDoList', JSON.stringify(toDoListArray));
  };

  const loadFromLocalStorage = () => {
      const data = JSON.parse(localStorage.getItem('toDoList')) || [];
      toDoListArray = data;
      toDoListArray.forEach(({ itemId, toDoItem, completed }) => {
          addItemToDOM(itemId, toDoItem, completed);
      });
  };

  loadFromLocalStorage();
})();
