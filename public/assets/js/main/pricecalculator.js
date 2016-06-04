//-------------------------------------Functions to build form--------------
var buildFood = function(data){
  var foodEle = $('#food').find('.filldata');
  foodEle.empty();
  $.each(data.food,function(itemkey,item){
    //console.log(item);
    foodEle.append($('<div/>', {
      class: 'checkbox'
    }).append(
      $('<label/>').append(
        $('<input/>' , {
          type: 'checkbox' ,
          value: itemkey ,
          name : 'foodcheck',
          onchange : 'disablebook()'
        })
      ).append(item.name)
      .append($('<strong/>').append(' Rs' + item.price))
    ));
  });
};
var buildVenue = function(data){
  var venueEle = $('#venue').find('.filldata');
  venueEle.empty();
  $.each(data.venue,function(key,location){
    venueEle.append($('<div/>',{
      class : 'radio'
    })
    .append($('<label/>')
    .append($('<input>' , {
      type : 'radio',
      value : key,
      name : 'venue',
      onchange : 'disablebook()'
    }))
    .append(location.name)
    .append($('<strong/>')
    .append(" Rs" + location.price)
  )));
  });
}
var buildForm = function(){
  $.ajax({
    method : 'post',
    url : '/getform',
    cache : true ,
    async : false
  }).success(function(data){
    //console.log(data);
    buildFood(data);
    buildVenue(data);
  }).fail(function(err){
    console.log("Failed due to "+err);
  });
};
//------------------------------------------------------------------------------


//--------------------------Functions to calculate price------------------------
/*var calculateFood = function(){
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
}*/
//------------------------------------------------------------------------------

//--------------------------------Temporary Changes-----------------------------
var getprice = function(){
  $('#finalPrice').text("Please Wait");
  $.ajax({
    url : '/calculatePrice' ,
    method : 'POST' ,
    data : $('#priceform').serialize()
  }).done(function(data){
    if(data.success){
      $('#finalPrice').text(data.price + ' /-');
      $('#book').removeClass('disabled');
    }else{
      console.log("Request Failed");
      $('#finalPrice').text("Error");
    }

  }).fail(function(err){
    console.log("Request Failed due to "+err);
    $('#finalPrice').text("Error");
  });
}
var disablebook = function(){
  $('#book').addClass('disabled');
};
//------------------------------------------------------------------------------
$(document).ready(function(){
  buildForm();
  disablebook();
});
