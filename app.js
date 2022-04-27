//Storage controller
const StorageCtrl = (function () {})();

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
    items: [
      { id: 0, name: 'Steak Dinner', calories: 1200 },
      { id: 0, name: 'Cookie', calories: 400 },
      { id: 0, name: 'Eggs', calories: 300 },
    ],
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
    },
  };
})();

//UI controller

const UICtrl = (function () {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
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
  };
})();

//App controller
const App = (function (ItemCtrl, UICtrl, StorageCtrl) {
  const loadEventListeners = function () {
    const UISelectors = UICtrl.getSelectors();

    document
      .querySelector(UISelectors.addBtn)
      .addEventListener('click', itemAddSubmit);
  };

  const itemAddSubmit = function (e) {
    e.preventDefault();

    const input = UICtrl.getItemInput();

    if (input.name !== '' && input.calories !== '') {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
    }
  };
  return {
    init: function () {
      const items = ItemCtrl.getItems();
      UICtrl.populateList(items);

      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl, StorageCtrl);

App.init();
