var args = arguments[0] || {};


function save(){
	
	$.save.removeEventListener('click',save);
		
	var title = $.title.getValue();
	var text = $.descripction.getValue();
	var photo = $.photo_selected.toBlob();
	
	model = {title: title,text:text,photo:photo};
	var notes = Alloy.Collections.note;
	
	var simple_note = Alloy.createModel('note',
	{
		title:model.title,
		text : model.text,
		creation_date: new Date().getTime(),
		modify_date :new Date().getTime(), 
		photo: model.photo
	});
	
	notes.add(simple_note);
	
	simple_note.save();
	
	notes.fetch();
	
	$.add_holder.close();
}

$.select_photo.addEventListener('click',function(e){
	 var options = {
    success: function(e) {
      // fired when user selects from gallery
      // e.media == the image data
     $.photo_selected.image = e.media;
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

$.save.addEventListener('click',save);


function getDate(date) {
   var yyyy = date.getFullYear().toString();
   var mm = (date.getMonth()+1).toString(); 
   var dd  = date.getDate().toString();
   return (mm[1]?mm:"0"+mm[0])+ '-' + (dd[1]?dd:"0"+dd[0]) + '-' + yyyy; // padding
} 