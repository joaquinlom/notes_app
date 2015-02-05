var args = arguments[0] || {};

/**
 *Funcion para Guardar Modelo ala BD y agregarla ala coleccion. 
 */
function save(){
	//Setter para los valores
	var title = $.title.getValue();
	var text = $.descripction.getValue();
	var photo = $.photo_selected.toBlob();
	
	console.log(photo);
	
	model = {title: title,text:text,photo:photo};
	
	var notes = Alloy.Collections.note;
	
	var creation_date_ = new Date().getTime();
	var photo_name =  creation_date_+".png";
	
	var simple_note = Alloy.createModel('note',
	{
		title:model.title,
		text : model.text,
		creation_date: creation_date_,
		modify_date :new Date().getTime(), //Inicar la fecha de creacion y modificacion con la fecha en que se creo. 
		photo: photo_name
	});
	
	//Usar metodo de la coleccion para verificar si el modelo creado por el usuario no esta duplicado.
	if(notes.checkUniqueness(simple_note)){
		
			notes.add(simple_note);
			
			//Guardar el modelo ala base de datos	
			simple_note.save();
			
			//Refrescar la coleccion
			notes.fetch();
			
			createImage(photo,photo_name);
			
			$.add_holder.close();		
			//Cerrar la ventana despues de guardar el modelo
	}else{
		alert("Nota duplicada ");
	}

}

/**
 * Listener para el boton y elegir una imagen de la galeria. 
 */
$.select_photo.addEventListener('click',function(e){
	 var options = {
    success: function(e) {
    	//Callback cuando fue exitoso la seleccion de imagen
     $.photo_selected.image = e.media;

    },
    cancel: function() {
      //Callback cuando se cancelo
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

$.save.addEventListener('click',save);


function getDate(date) {
   var yyyy = date.getFullYear().toString();
   var mm = (date.getMonth()+1).toString(); 
   var dd  = date.getDate().toString();
   return (mm[1]?mm:"0"+mm[0])+ '-' + (dd[1]?dd:"0"+dd[0]) + '-' + yyyy; // padding
} 


