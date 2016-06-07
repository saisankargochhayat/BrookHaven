//-------------------------------------Functions to build form------------------
var mainJSON;
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
$.urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if(results)
   return decodeURIComponent(results[1] || 0);
  else {
    return null;
  }
};
var subeventappend =function(value,text){
  $('#subeventselect').append($('<option>', {
    value: value,
    text: text
}));
};
var eventappend =function(value,text){
  $('#eventselect').append($('<option>', {
    value: value,
    text: text
}));
};
var buildeventform = function(data){
  $.each(data.event,function(key,value){
    eventappend(key,value.name);
  });
  var eventid = $.urlParam('event');
  $('#eventselect').val(eventid);
  addsubevents();
}
var addsubevents = function(){
  id=$('#eventselect option:selected').val();
  console.log("Id is "+id);
  $('#subeventselect').find('option').remove();
  console.log(mainJSON.event[id].subevent);
  $.each(mainJSON.event[id].subevent,function(key,value){
    subeventappend(key,value.name);
  });
  var subeventid = $.urlParam('subevent');
  $('#subeventselect').val(subeventid);
};
//--------------------------------Get the form elements-------------------------
var buildForm = function(){
  $.ajax({
    method : 'post',
    url : '/getform',
    cache : true ,
    async : false
  }).success(function(data){
    //console.log(data);
    mainJSON = data;
    console.log(mainJSON);
    buildFood(data);
    buildVenue(data);
    buildeventform(data);
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
