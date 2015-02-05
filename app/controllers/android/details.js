var args = arguments[0] || {};
 

var notes = Alloy.Collections.note;
var note = notes.get(args.model);

var photo = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,note.get('photo'));
	 if(photo.exists()){
	 	if(photo.isFile()){
		 		$.photo.setImage(photo.read());
	 	}	 	
	 }else{
	 	
	 }

//Setter los input con los valores del modelo asignado



	
	
$.title.setValue(note.get('title'));
$.text.setValue(note.get('text'));

//Mostrar fecha de modificado si se a modificado
if(note.get('modify_date') != '0'){
	//Se a modificado
	var edit_date = new Date(parseFloat(note.get('modify_date')));
	$.date.setText(getDate(edit_date));
}

//Editar los valores con en los input y la foto
$.edit.addEventListener('click',function(e){
	var title = $.title.getValue();
	var text = $.text.getValue();
	var photo_ = $.photo.toBlob();
	var modify_date = new Date().getTime();
	

	
	model = {
		title: title,
		text:text,
		modify_date:modify_date
		};
	
	createImage(photo_,note.get('photo'));
	note.set(model);
	alert("Se guardo Exitosamente.");
});

$.photo.addEventListener('click',function(e){
	 var options = {
    success: function(e) {
      // fired when user selects from gallery
    	//Reajustar la imagen para que no haya problema con el tamanio
    	  var resizedImage = e.media.imageAsResized(1024, 1024);
     	$.photo.image = resizedImage;
    },
    cancel: function() {
      // fired when user cancels
    },
    error: function(error) {
      // fired when there's an error
      // error.code is a constant, like Titanium.Media.NO_CAMERA
      console.log(error);
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
             
      		
      		var picture_add = menu.add({
      			        title : "Agregar Imagen", 
                		icon : "images/ic_action_camera.png", 
                		showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS 
      		});
      		
      		picture_add.addEventListener('click',function(e){
      			 var options = {
    				success: function(e) {
      			// fired when user selects from gallery
      				// e.media == the image data
    				     var resizedImage = e.media.imageAsResized(1024, 1024);
     					$.photo.image = resizedImage;
    				},
    				cancel: function() {
      					// fired when user cancels
    					},
    				error: function(error) {
      					// fired when there's an error
      				// error.code is a constant, like Titanium.Media.NO_CAMERA
      				console.log(error);
    				},
    				allowEditing: true,
    				mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
  					};
  					Ti.Media.openPhotoGallery(options);
      		});
      		var remove_button = menu.add({ 
                		title : "Eliminar", 
                		icon : "images/ic_action_delete_128.png", 
                		showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS 
                		});
                		
           remove_button.addEventListener("click", function(e){ 
      		var alert = Titanium.UI.createAlertDialog({ 
      				title: 'Eliminar Nota', 
      				message: 'Esta Seguro?', 
      			    buttonNames: ['Si', 'No'], 
      				cancel: 1 });
      				
			alert.addEventListener('click', function(e) {
  				if (e.cancel === e.index || e.cancel === true) {
      				return;
  				}
  				switch (e.index) {
      				case 0: 
      					//Acepto
      					//ELimino el modelo
      					note.destroy();
      					//Actualizo la coleccion
      					notes.fetch();
      					//Cierro la ventana de detalles
      					$.details.close();
      				break;
      				case 1: Titanium.API.info('Clicked button 1 (NO)');
      				break;
      				default:
      				break;
      				}
      			});
      			
			alert.show();
			
      		});//Se termina listener	
	       };//Se termina la creacion del menu
                
                
          }//If del actionbar
            
        }//If si estamos en una ventana heavyweight
    }//Si estamos en Android
});



function getDate(date) {
   var yyyy = date.getFullYear().toString();
   var mm = (date.getMonth()+1).toString(); 
   var dd  = date.getDate().toString();
   return (mm[1]?mm:"0"+mm[0])+ '-' + (dd[1]?dd:"0"+dd[0]) + '-' + yyyy; // padding
} 