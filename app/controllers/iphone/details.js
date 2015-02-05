var args = arguments[0] || {};
 

var notes = Alloy.Collections.note;
var note = notes.get(args.model);




$.photo.setImage(note.get('photo'));
$.title.setValue(note.get('title'));
$.text.setValue(note.get('text'));
if(note.get('modify_date') != '0'){
	//Se a modificado
	var edit_date = new Date(parseFloat(note.get('modify_date')));
	$.date.setText(getDate(edit_date));
}

$.edit.addEventListener('click',function(e){
	var title = $.title.getValue();
	var text = $.text.getValue();
	var photo = $.photo.toImage();
	var modify_date = new Date().getTime();
	model = {
		title: title,
		text:text,
		photo:photo,
		modify_date:modify_date
		};
		
	note.set(model);
});

$.photo.addEventListener('click',function(e){
	 var options = {
    success: function(e) {
      // fired when user selects from gallery
      // e.media == the image data
    $.photo.image = e.media;
    },
    cancel: function() {
      // fired when user cancels
    },
    error: function(error) {
      // fired when there's an error
      // error.code is a constant, like Titanium.Media.NO_CAMERA
      console.log(error);
      alert("Seleccione otra Imagen..");
    },
    allowEditing: true,
    mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
  };
  Ti.Media.openPhotoGallery(options);
});


$.details.addEventListener("open", function() {
    if (Ti.Platform.osname === "android") {
        if (!$.details.activity) {
            Ti.API.error("Can't access action bar on a lightweight window.");
        } else {	
            actionBar = $.details.activity.actionBar;
           
            if (actionBar) {
                actionBar.title = note.get('title');
                  $.details.activity.onCreateOptionsMenu=function(e){
                	var menu = e.menu;
                	var add_button = menu.add({ 
                		title : "Eliminar", 
                		icon : "images/ic_action_add.png", 
                		showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS 
                		});
                	add_button.addEventListener("click", function(e){ 
      					 var alert = Titanium.UI.createAlertDialog({ 
      					 	title: 'Delete data', 
      					 	message: 'Sure?', 
      					 	buttonNames: ['Yes', 'No'], 
      					 	cancel: 1 });
				alert.addEventListener('click', function(e) {
   							//Clicked cancel, first check is for iphone, second for android
  							 if (e.cancel === e.index || e.cancel === true) {
      							return;
  								}

    			switch (e.index) {
      				case 0: 
      				//Acepto
      					note.destroy();
      					notes.fetch();
      					$.details.close();
      				break;
      				case 1: Titanium.API.info('Clicked button 1 (NO)');
      				break;
      				default:
      				break;
      				}
      			});
					alert.show();
      			});		
                };
                
                
            }
            
        }
    }
});


notes.on('remove',function(note){
	console.log(note);
});

function getDate(date) {
   var yyyy = date.getFullYear().toString();
   var mm = (date.getMonth()+1).toString(); 
   var dd  = date.getDate().toString();
   return (mm[1]?mm:"0"+mm[0])+ '-' + (dd[1]?dd:"0"+dd[0]) + '-' + yyyy; // padding
} 