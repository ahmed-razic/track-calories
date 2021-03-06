//Storage controller
const StorageCtrl = (function () {
  return {
    storeItem: function (newItem) {
      let items;

      if (localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }

      items.push(newItem);
      localStorage.setItem('items', JSON.stringify(items));
    },

    getItems: function () {
      let items;

      if (localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }

      return items;
    },

    updateItem: function (updatedItem) {
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach((item, index) => {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },

    deleteItem: function (id) {
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach((item, index) => {
        if (id === item.id) {
          items.splice(index, 1);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },

    clearItems: function () {
      localStorage.removeItem('items');
    },
  };
})();

//Item controller
const ItemCtrl = (function () {
  //Item contructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  //Data structure
  const data = {
    //items: [
    // { id: 0, name: 'Steak Dinner', calories: 1200 },
    // { id: 0, name: 'Cookie', calories: 400 },
    // { id: 0, name: 'Eggs', calories: 300 },
    //],
    items: StorageCtrl.getItems(),
    currentItem: null,
    totalCalories: 0,
  };

  return {
    getItems: function () {
      return data.items;
    },
    logData: function () {
      return data;
    },
    addItem: function (name, calories) {
      let ID;
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      calories = parseInt(calories);

      const newItem = new Item(ID, name, calories);

      data.items.push(newItem);

      return newItem;
    },

    getItemById: function (id) {
      let found = null;

      data.items.forEach(function (item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },

    setCurrentItem: function (item) {
      data.currentItem = item;
    },

    getCurrentItem: function () {
      return data.currentItem;
    },

    getTotalCalories: function () {
      let total = 0;
      data.items.forEach(function (item) {
        total += item.calories;
      });
      data.totalCalories = total;

      return data.totalCalories;
    },

    updateItem: function (name, calories) {
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },

    deleteItem: function (id) {
      const ids = data.items.map(function (item) {
        return item.id;
      });

      const index = ids.indexOf(id);

      data.items.splice(index, 1);
    },

    clearAllItems: function () {
      data.items = [];
    },
  };
})();

//UI controller

const UICtrl = (function () {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories',
    listItems: '#item-list li',
    clearAll: '#clear-btn',
  };

  return {
    populateList: function (items) {
      let html = '';
      items.forEach((item) => {
        html += `<li id=${item.id} class="collection-item">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      </li>`;
      });

      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    getSelectors: function () {
      return UISelectors;
    },

    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },

    addListItem: function (item) {
      UICtrl.showList();
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;

      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement('beforeend', li);
    },

    updateListItem: function (item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      listItems = Array.from(listItems);

      listItems.forEach(function (listItem) {
        const itemId = listItem.getAttribute('id');

        if (itemId === `item-${item.id}`) {
          document.querySelector(
            `#${itemId}`
          ).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
        }
      });
    },

    deleteListItem: function (id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },

    clearInputs: function () {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },

    addItemToForm: function () {
      document.querySelector(UISelectors.itemNameInput).value =
        ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value =
        ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },

    clearAllItems: function () {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      listItems = Array.from(listItems);

      listItems.forEach(function (item) {
        item.remove();
      });
    },

    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },

    showList: function () {
      document.querySelector(UISelectors.itemList).style.display = 'block';
    },

    showTotalCalories: function (total) {
      document.querySelector(UISelectors.totalCalories).textContent = total;
    },

    clearEditState: function () {
      UICtrl.clearInputs();
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
    },

    showEditState: function () {
      document.querySelector(UISelectors.addBtn).style.display = 'none';
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
    },
  };
})();

//App controller
const App = (function (ItemCtrl, UICtrl, StorageCtrl) {
  const loadEventListeners = function () {
    const UISelectors = UICtrl.getSelectors();

    document.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        return false;
      }
    });

    document
      .querySelector(UISelectors.addBtn)
      .addEventListener('click', itemAddSubmit);

    document
      .querySelector(UISelectors.itemList)
      .addEventListener('click', itemEditClick);

    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener('click', itemUpdateSubmit);

    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener('click', itemDeleteSubmit);

    document
      .querySelector(UISelectors.backBtn)
      .addEventListener('click', UICtrl.clearEditState);

    document
      .querySelector(UISelectors.clearAll)
      .addEventListener('click', clearAll);
  };

  const itemAddSubmit = function (e) {
    e.preventDefault();

    const input = UICtrl.getItemInput();

    if (input.name !== '' && input.calories !== '') {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      UICtrl.addListItem(newItem);
      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);

      StorageCtrl.storeItem(newItem);

      UICtrl.clearInputs();
    }
  };

  const itemEditClick = function (e) {
    e.preventDefault();

    if (e.target.classList.contains('edit-item')) {
      const listId = e.target.parentNode.parentNode.id;
      const listIdArray = listId.split('-');
      const id = parseInt(listIdArray[1]);

      const itemToEdit = ItemCtrl.getItemById(id);

      ItemCtrl.setCurrentItem(itemToEdit);

      UICtrl.addItemToForm();
    }
  };

  const itemUpdateSubmit = function (e) {
    e.preventDefault();

    const input = UICtrl.getItemInput();
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    UICtrl.updateListItem(updatedItem);

    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);

    StorageCtrl.updateItem(updatedItem);

    UICtrl.clearEditState();
  };

  const itemDeleteSubmit = function (e) {
    e.preventDefault();

    const currentItem = ItemCtrl.getCurrentItem();

    ItemCtrl.deleteItem(currentItem.id);

    UICtrl.deleteListItem(currentItem.id);

    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);

    StorageCtrl.deleteItem(currentItem.id);

    UICtrl.clearEditState();
  };

  const clearAll = function (e) {
    e.preventDefault();
    ItemCtrl.clearAllItems();
    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);
    UICtrl.clearAllItems();

    StorageCtrl.clearItems();

    UICtrl.hideList();
  };

  return {
    init: function () {
      UICtrl.clearEditState();
      const items = ItemCtrl.getItems();

      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        UICtrl.populateList(items);
      }

      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);

      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl, StorageCtrl);

App.init();
