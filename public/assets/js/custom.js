//Function to extract url parameters
$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if(results)
	 return decodeURIComponent(results[1] || 0);
  else {
    return null;
  }
}


var appendit =function(value,text){
  $('#subeventselect').append($('<option>', {
    value: value,
    text: text
}));
}

var addsubevents = function(){
  id=$('#eventselect option:selected').val();
  $('#otherinput').prop('hidden',true);
  $('#subevent').prop('hidden',false);
  $('#subeventselect').find('option').remove();
  $('#subeventselect').prop('disabled',false);
	$('#submitbtn').prop('disabled',false);
	$('#subeventselect').prop('required',true);
	$('#otherinputselect').prop('required',false);
  switch (id) {
    case 'wedding':
        $('#subeventselect').prop('disabled',true);
        appendit('wedding','Wedding');
      break;
    case 'social_gathering':
        appendit('thread_ceremony','Thread Ceremony');
        appendit('naming_ceremony','Naming Ceremony');
        appendit('reception_ceremony','Reception');
      break;
      case 'party':

          appendit('birthday_party','Birthday parties');
          appendit('bachelor_party','Bachelor parties');
          appendit('cocktail_party','Cocktail parties');
          appendit('anniversary_party','Anniversary parties');
          appendit('promotion_party','Promotion parties');
        break;
        case 'corporate_event':

            appendit('meeting','Meeting');
            appendit('sales_training','Sales Training');
            appendit('conference','Conference');
            appendit('product_launch','Product Launch');
          break;
          case 'student_event':
              appendit('alumni_meet','Alumni Meet');
              appendit('farewell_party','Farewell Party');
              appendit('fresher_party','Fresher Party');
              appendit('reunion_party','Reunion Party');
            break;
          case 'award_ceremony':
              $('#subeventselect').prop('disabled',true);
              appendit('award_ceremony','Award Ceremony');
            break;
          case 'exhibition':
              $('#subeventselect').prop('disabled',true);
              appendit('exhibition','Exhibition');
            break;
          case 'others':
              $('#subevent').prop('hidden',true);
              $('#otherinput').prop('hidden',false);
							$('#subeventselect').prop('required',false);
							$('#otherinputselect').prop('required',true);
            break;
            default:

  }
	var subeventid = $.urlParam('subevent');
	$('#subeventselect').val(subeventid);

};
$(document).ready(function(){
  var eventid = $.urlParam('event');
  $('#eventselect').val(eventid);
  addsubevents();
});
