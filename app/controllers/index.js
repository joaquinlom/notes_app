

//Coleccion de notas 
var notes = Alloy.Collections.note;
//Obtenerlas y ordenarlas atraves de la fecha modificada
notes.fetch();
notes.setSortField("modify_date", "DESC");
notes.sort();

$.index.open();

$.index.addEventListener('close',function(e){
	//Necesario para eliminar memoria, quitar binding con la vista.
	$.destroy();
});

function add_note(){
	//Abrimos la ventana para crear una nota nueva.
	   var add_window  = Alloy.createController('add');
      	add_window.getView().open();
}

$.notes_view.addEventListener('click',function(e){
	//Listener al click del row. y abrir la ventana de detalles
	 if (e.row.model) {  
 		 var detailObj = notes.get(e.row.model);  
 		 var win = Alloy.createController('details',{"model":detailObj});  
    	 win.getView().open();  
 	}  
});


$.index.addEventListener("open", function() {
	    	$.index.barColor = "black";
});



