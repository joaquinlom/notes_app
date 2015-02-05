function doClick(e) {
    alert($.label.text);
}
var search = Ti.UI.Android.createSearchView({
    	hintText: "Table Search"
});

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

$.notes_view.addEventListener('click',function(e){
	 if (e.row.model) {  
 		 var detailObj = notes.get(e.row.model);  
 		 var win = Alloy.createController('details',{"model":detailObj});  
    	 win.getView().open();  
 	}  
});


$.index.addEventListener("open", function() {

        if (!$.index.activity) {
            Ti.API.error("Can't access action bar on a lightweight window.");
        } else {
            actionBar = $.index.activity.actionBar;
           
            if (actionBar) {
                actionBar.title = "Awesome Note App";
                $.index.activity.onCreateOptionsMenu=function(e){
                	var menu = e.menu;
                	var add_button = menu.add({ 
                		title : "Add", 
                		icon : "images/ic_action_add.png", 
                		showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS 
                		});
                		add_button.addEventListener("click", function(e) 
      					{ 
      						var add_window  = Alloy.createController('add');
      						add_window.getView().open();
      					});	
      					
      					var search_button = menu.add({
        				title: 'Table Search',
        				actionView : search,
        				icon: (Ti.Android.R.drawable.ic_menu_search ? Ti.Android.R.drawable.ic_menu_search : "my_search.png"),
        				showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM | Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW
    					});	
    					search_button.addEventListener('collapse',function(e){
    						//En Android 4.0+ es necesario ya que el evento cancel no se lanza
    						notes.fetch();
    						notes.setSortField("modify_date", "DESC");
							notes.sort();
    					});
    					search.addEventListener('change',function(e){
    						//Listener cuando el texto Cambie.
    						var data = e.source.value;
    						if(data != ""){
    							//Hacer un fetch con una query para hacer un filtro
    							var table = notes.config.adapter.collection_name;    						
    							notes.fetch({query: { statement: 'SELECT * from ' + table + ' where title like ? ', params: [ "%"+data+"%"] }});
    							notes.setSortField("modify_date", "DESC");
								notes.sort();	
    							}
    					});
    					search.addEventListener('cancel',function(e){
    						//Cuando el usuario cancela la operacion reinicia la coleccion.
    						notes.fetch();
    						notes.setSortField("modify_date", "DESC");
							notes.sort();
    					});
                };
            }
        }

});



