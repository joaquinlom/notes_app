exports.definition = {
	config: {
		columns: {
		    "title": "TEXT",
		    "text": "TEXT",
		    "creation_date": "TEXT",
		    "modify_date": "TEXT",
		    "photo": "TEXT"
		},
		defaults:{
			"modify_date" : "0"
		},
		adapter: {
			type: "sql",
			collection_name: "note",
			idAttribute: "creation_date"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here

		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
		    initialize: function () {
                //Dato por default para hacer sort
                this.sortField = "modify_date";
                
                this.sortDirection = "ASC";
            },
            /**
             * 
 			 * @param {Object} model
 			 * Modelo a checar contra toda la coleccion
             */
            /*
             * Return Boolean : 
             * True: si hay duplicado
             * False: si no hay duplicado
             */
            checkUniqueness: function(model){
            	//Funcion para checar duplicado en la coleccion actual
            	
   				 var isDupe = this.any(function(_model) {
   				 		if((_model.get('title') === model.get('title')) || (_model.get('text') === model.get('text')) ){
   				 			return true;
   				 		}
    				    return false;
 				   });
   				 if (isDupe) {
      			  return false;
   				 }else{
   				 	return true;
   				 }
            }
			, comparator : function(model) {
                return model.get(this.sortField);
            },
            //http://developer.appcelerator.com/question/156009/how-to-sort-a-collection-particularly-descending
            //Codigo agregado gracias a Mark Pemburn.
            setSortField: function (field, direction) {
                this.sortField = field;
                this.sortDirection = direction;
            },
            sortBy: function (iterator, context) {
                var obj = this.models;
                var direction = this.sortDirection;
 
                return _.pluck(_.map(obj, function (value, index, list) {
                    return {
                        value: value,
                        index: index,
                        criteria: iterator.call(context, value, index, list)
                    };
                }).sort(function (left, right) {
                    // swap a and b for reverse sort
                    var a = direction === "ASC" ? left.criteria : right.criteria;
                    var b = direction === "ASC" ? right.criteria : left.criteria;
 
                    if (a !== b) {
                        if (a > b || a === void 0) return 1;
                        if (a < b || b === void 0) return -1;
                    }
                    return left.index < right.index ? -1 : 1;
                }), 'value');
            }
		});	

		return Collection;
	}
};