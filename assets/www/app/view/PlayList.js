Ext.define('podcastpal.view.PlayList', {
	
    extend: 'Ext.Container',
    xtype: 'playlist',
    requires: ['podcastpal.store.PlaylistFeedItems'],
    
    config: {
    	iconCls: 'music1',
        title: 'Player',
        layout: 'fit',
        
	    items: [
	            {
			        docked: 'top',
			        xtype: 'toolbar',
			        title: 'Podcast Player'
	            },
	            {
	    	        xtype: 'list',
	    	        itemTpl: '{title}',
	    	        store: 'PlaylistFeedItems'
	    	        
	    	    },
	    	    {
			        docked: 'bottom',
			        xtype: 'toolbar',
			        layout: {
			        	pack: 'left'
			        },
				    
			        items: [
			                {
			                	iconCls: 'play1',
			                	iconMask: true,
			                    //text: 'Play',
			                    id: 'play'
			                    
			                },
			                
			                {
			                	iconCls: 'stop',
			                	iconMask: true,
			                    //text: 'Stop',
			                    id: 'stop'
			                }
			        ]
	            },
	    ],
	    
	}
});
