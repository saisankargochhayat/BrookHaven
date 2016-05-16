//-------------------------------------Functions to build form--------------
var buildFood = function(){
  var foodEle = $('#food').find('.filldata');
  foodEle.empty();
  $.each(data.food,function(itemName,itemValue){
    foodEle.append($('<div/>', {
      class: 'checkbox'
    }).append(
      $('<label/>').append(
        $('<input/>' , {
          type: 'checkbox' ,
          value: itemValue ,
          onchange : 'calculatePrice()'
        })
      ).append(itemName)
      .append($('<strong/>').append(' Rs' + itemValue))
    ));
  });
};
var buildVenue = function(){
  var venueEle = $('#venue').find('.filldata');
  venueEle.empty();
  $.each(data.venue,function(location,price){
    venueEle.append($('<div/>',{
      class : 'radio'
    })
    .append($('<label/>')
    .append($('<input>' , {
      type : 'radio',
      value : price,
      name : 'venue',
      onclick: 'calculatePrice()'
    }))
    .append(location)
    .append($('<strong/>')
    .append(" Rs" + price)
  )));
  });
}
var buildForm = function(){
  buildFood();
  buildVenue();
};
//------------------------------------------------------------------------------


//--------------------------Functions to calculate price------------------------
var calculateFood = function(){
  var foodPrice = 0;
  var foodEle = $('#food').find('input:checked');
  $.each(foodEle,function(id,food){
    foodPrice += parseInt(food.value);
  });
  var peopleEle = $('#people').find('input');
  var people = peopleEle.prop('value');
  return foodPrice * people;
}
var calculateVenue = function(){
  var venueEle = $('#venue').find('input:checked');
  if(venueEle.length){
    return venueEle.prop('value');
  }else{
    return 0;
  }
}
var calculatePrice = function(){
  var TotalPrice = parseInt(calculateFood()) + parseInt(calculateVenue());
  console.log(TotalPrice);
  $('#finalPrice').text(TotalPrice);
}
//------------------------------------------------------------------------------
$(document).ready(function(){
  buildForm();
  calculatePrice();
});