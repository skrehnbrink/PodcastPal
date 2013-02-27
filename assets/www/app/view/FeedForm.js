Ext.define('podcastpal.view.FeedForm', {
	
    extend: 'Ext.form.Panel',
    xtype: 'feedform',
    
	config: {
		iconCls: 'add_black',
        title: 'New Feed',
        
	    submitOnAction: false,
	    items: [
	        {
	        	xtype: 'toolbar',
	        	docked: 'top',
			    title: 'Add Podcast Feed',
			    items: [
					    {xtype:'spacer'},
					    {
					        text: 'Save',
					        id: 'saveFeed'
					    }
					]
			},       
	        {
	        	name : 'url',
	        	label: 'URL',
	        	xtype: 'textfield'
	        }
	    ],
	}

});