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
      { id: 0, name: 'Steak Dinner', callories: 1200 },
      { id: 0, name: 'Cookie', callories: 400 },
      { id: 0, name: 'Eggs', callories: 300 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  return {
    logData: function () {
      return data;
    },
  };
})();

//UI controller

const UICtrl = (function () {})();

//App controller
const App = (function (ItemCtrl, UICtrl, StorageCtrl) {
  return {
    init: function () {
      console.log('Initializing app...');
    },
  };
})(ItemCtrl, UICtrl, StorageCtrl);

App.init();
