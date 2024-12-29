(() => { 
  // state variables
  let toDoListArray = [];
  // ui variables
  const form = document.querySelector(".form"); 
  const input = form.querySelector(".form__input");
  const ul = document.querySelector(".toDoList"); 
  const clearAllButton = form.querySelector(".clear-all");

  // event listeners
  form.addEventListener('submit', e => {
    e.preventDefault(); // prevent default behaviour - Page reload
    let itemId = String(Date.now()); // give item a unique ID
    let toDoItem = input.value; // get/assign input value
    addItemToDOM(itemId, toDoItem);
    addItemToArray(itemId, toDoItem);
    input.value = ''; // clear the input box
  });

  clearAllButton.addEventListener('click', () => {
    clearAllItems();
  });

  ul.addEventListener('click', e => {
    let id = e.target.getAttribute('data-id');
    if (!id) return; // user clicked in something else
    removeItemFromDOM(id);
    removeItemFromArray(id);
  });

  // functions 
  function addItemToDOM(itemId, toDoItem) {    
    const li = document.createElement('li');
    li.setAttribute("data-id", itemId);
    li.innerText = toDoItem;
    ul.appendChild(li);
  }
  
  function addItemToArray(itemId, toDoItem) {
    toDoListArray.push({ itemId, toDoItem });
    console.log(toDoListArray);
  }
  
  function removeItemFromDOM(id) {
    const li = document.querySelector(`[data-id="${id}"]`);
    ul.removeChild(li);
  }
  
  function removeItemFromArray(id) {
    toDoListArray = toDoListArray.filter(item => item.itemId !== id);
    console.log(toDoListArray);
  }
  
  function clearAllItems() {
    // Clear the UI
    ul.innerHTML = '';
    // Clear the array
    toDoListArray = [];
    console.log('All items cleared:', toDoListArray);
  }
})();
