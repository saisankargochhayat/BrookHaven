var buildFood = function(){
  var foodEle = $('#food').find('.filldata');
  foodEle.empty();
  $.each(data.food,function(itemName,itemValue){
    console.log(itemName + " " + itemValue);
    foodEle.append($('<div/>', {
      class: 'checkbox'
    }).append(
      $('<label/>').append(
        $('<input/>' , {
          type: 'checkbox' ,
          value: itemValue
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
    console.log(location + " " + price);
    venueEle.append($('<div/>',{
      class : 'radio'
    })
    .append($('<label/>')
    .append($('<input>' , {
      type : 'radio',
      value : price,
      name : 'venue'
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
$(document).ready(function(){
  buildForm();
});
