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

  function addItemToDOM(itemId, toDoItem) {    
      const li = document.createElement('li');
      li.setAttribute("data-id", itemId);

      const span = document.createElement('span');
      span.innerText = toDoItem;

      const deleteButton = document.createElement('button');
      deleteButton.innerText = "❌";
      deleteButton.classList.add('delete-button');
      deleteButton.setAttribute("data-id", itemId);

      li.appendChild(span);
      li.appendChild(deleteButton);
      ul.appendChild(li);
  }
  
  function addItemToArray(itemId, toDoItem) {
      toDoListArray.push({ itemId, toDoItem });
      console.log(toDoListArray);
  }
  
  function removeItemFromDOM(id) {
      const li = document.querySelector(`[data-id="${id}"]`);
      if (li) ul.removeChild(li);
  }
  
  function removeItemFromArray(id) {
      toDoListArray = toDoListArray.filter(item => item.itemId !== id);
      console.log(toDoListArray);
  }

  function clearAllItems() {
      ul.innerHTML = '';
      toDoListArray = [];
      console.log('All items cleared:', toDoListArray);
  }
})();
