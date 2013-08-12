/* 
 * What are the objects in this exercise?
 * What are their properties and methods?
 * How do your objects interact with their respective DOM elements?
 */


function Item(name, price) {
  this.name = name;
  this.price = parseFloat(price);
}

Item.prototype.render = function() {
  return "<tr class='item'>\
            <td class='item_name'>"+this.name+"</td>\
            <td class='item_price'>"+this.price+"</td>\
          </tr>"
}

function GroceryList() {
  this.items = [];
  this.tableBody = $('#grocery_list').find('tbody');
}

GroceryList.prototype.addItem = function(item) {
  this.items.push(item);
  this.renderNewItem(item);
  this.renderTotal();
}

GroceryList.prototype.renderNewItem = function(item) {
  this.tableBody.append(item.render());
}

GroceryList.prototype.total = function() {
  var total = 0;
  for (i in this.items) {
    total += this.items[i].price;
  }
  return total.toFixed(2);
}

GroceryList.prototype.renderTotal = function() {
  $('#total_cost').text(this.total());
}

function addToList(event, ui) {
  var dragged_item = $(ui.draggable);
  var item =  new Item(dragged_item.find(".item_name").text(),dragged_item.find(".item_price").text());
  groceryList.addItem(item);
}

$(document).ready(function(){

  groceryList = new GroceryList();

  $(".item").draggable({
    helper: 'clone'
  });

  $("#grocery_list").droppable({
    drop: addToList
  });
});


