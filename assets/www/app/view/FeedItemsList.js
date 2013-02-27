Ext.define('podcastpal.view.FeedItemsList', {
    extend: 'Ext.List',
    xtype: 'feeditemslist',
    requires: ['podcastpal.store.FeedItems'],
    
    config: {
        title: 'Podcasts',
        itemTpl: '{title}',
        store: 'FeedItems',
        
        toolbarButtons: [
                         {
                        	 xtype: 'button',
                        	 id: 'addToPlayer',
                        	 text: 'Add to Player',
                    	     align: 'right'
                    	 }
        ]

    }
});