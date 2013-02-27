
Ext.define('podcastpal.model.FeedItem', {
	
    extend: 'Ext.data.Model',
	config: {
		fields: [
		         {name: "title", type: "string"},
		         {name: "link", type: "string"},
		         {name: "description", type: "string"},
		         {name: "pubDate", type: "string"},
		         {name: "url", type: "string"},
		         {name: "path", type: "string"}
		        
		    ]
	}
});

