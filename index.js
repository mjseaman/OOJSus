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

var makeGroceryList = function(){
  var private = {
      items:[],
      tableBody:(function(){
        return $('#grocery_list').find('tbody')
      })  ,
    }
  private.total = function() {
    var total = 0;
    for (i in this.items) {
      total += this.items[i].price;
    }
    return total.toFixed(2);
  }

  var public = {}
  
  public.addItem = function(item) {
    private.items.push(item);
    public.renderNewItem(item);
    this.renderTotal();
  }
  public.renderNewItem = function(item) {
    private.tableBody.append(item.render());
  }
  public.renderTotal = function() {
    $('#total_cost').text(private.total());
  }
  public.addToList = function(event, ui) {
    var dragged_item = $(ui.draggable);
    var item =  new Item(dragged_item.find(".item_name").text(),dragged_item.find(".item_price").text());
    public.addItem(item);
  }
  return public
}


$(document).ready(function(){

  groceryList = makeGroceryList()

  $(".item").draggable({
    helper: 'clone'
  });

  $("#grocery_list").droppable({
    drop: groceryList.addToList
  });
});


