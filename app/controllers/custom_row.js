var args = arguments[0] || {};

if ($model) {  
	 $.row.model = $model;  
	 //$.row.filter = $.model.get('title');
	 var date = "";
	 //Mostrar texto si la nota fue creada ayer
	 var day_now = new Date();
	 var date_note = new Date(parseFloat($model.get('creation_date')));

	//Codigo feo para mostrar una cadena dependiendo si la nota fue creada Ayer,esta semana, la semana pasada o difernete mes
	 if( (day_now.getDay() - date_note.getDay()) == 1){
	 	date = "Yesterdar"; // o yesterday? 
	 }else if( Math.abs(day_now.getDay() - date_note.getDay()) < 7 ){
	 	date = "This Week";
	 }else if( Math.abs(day_now.getDay() - date_note.getDay()) >= 7){
	 	date = "Last Week";
	 }else if( Math.abs(day_now.getDay() - date_note.getDay()) > 28){
	 	date = "Last Month";
	 }else{
	 	date = getDate(date_note);
	 }
	 
	 $.date.setText(date);
	var photo = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,$model.get('photo'));
	
	//Hacer un thumbnail de la imagen para no renderizar la imagen
	$.image.setImage(photo.read().imageAsThumbnail(50,2,1));
	

	 	
	
	 
} 