function doClick(e) {
    alert($.label.text);
}



var notes = Alloy.Collections.note;
notes.fetch();
notes.setSortField("modify_date", "DESC");
notes.sort();

$.index.open();

$.index.addEventListener('close',function(e){
	$.destroy();
});

function add_note(){
	   var add_window  = Alloy.createController('add');
      	add_window.getView().open();
}

$.notes_view.addEventListener('click',function(e){
	 if (e.row.model) {  
 		 var detailObj = notes.get(e.row.model);  
 		 var win = Alloy.createController('details',{"model":detailObj});  
    	 win.getView().open();  
 	}  
});


$.index.addEventListener("open", function() {
	    	$.index.barColor = "black";
});



