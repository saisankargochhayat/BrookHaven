//-------------------------------------Functions to build form------------------
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
//--------------------------------Get the form elements-------------------------
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
//---------------------------------Get the Price from the selected data---------
var showloader = function(){
    $('#pageloader').css('display','block');
    $('.loader-item').css('display','block');
}
var hideloader = function(){
  $('#pageloader').css('display','none');
  $('.loader-item').css('display','none');
}
var getprice = function(){
  $('#finalPrice').text("Please Wait");
  showloader();
  var form = $('#priceform').serialize();
  console.log(form);
  $.ajax({
    url : '/bookwithquote' ,
    method : 'POST' ,
    data : form
  }).done(function(data){
    if(data.success){
      $('#finalPrice').text('Rs ' + data.price + ' /-');
      enablebook();
      hideloader();
    }else{
      console.log("Request Failed");
      $('#finalPrice').text("Error");
    }

  }).fail(function(err){
    console.log("Request Failed due to "+err);
    $('#finalPrice').text("Error");
  });
}
//---------------------------------Booking with Price---------------------------

var bookit = function(){
  showloader();
  var obj = $('#priceform').serialize();
  $.ajax({
    method : 'POST',
    url : '/bookwithquote',
    data : obj
  }).success(function(data){
    if(data.success){
      hideloader();
      window.location.href = '/booked.html';
    }else{
      console.log("Request Failed Due to " + data.msg);
    }
  }).fail(function(err){
    console.log("Request Failed Due to " + err);
  });
};
//------------------------------------------------------------------------------
var disablebook = function(){
  $('#book').addClass('disabled');
  $('.personalDataForm').hide();
  $('#booking').val(0);
};
var enablebook = function(){
  $('#book').removeClass('disabled');
  $('.personalDataForm').show();
  $('#booking').val(1);
}
//------------------------------------------------------------------------------
$(document).ready(function(){
  buildForm();
  disablebook();
});
