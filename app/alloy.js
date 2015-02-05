// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
function createImage(image,name){
	//Funcion util para crear una imagen  y guardarla, sobreescribiendo la anterior
	var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,name);
	if(f.write(image,false)){
				console.log("Success");
				
	}else{
				alert("no se pudo escribir");
		}		
}


