
Ext.define('podcastpal.model.Feed', {
	
    extend: 'Ext.data.Model',
	config: {
		fields: [
		         {name: "url", type: "string"},
		         {name: "title", type: "string"},
		         {name: "description", type: "string"}
		        
		    ]
	}
});
