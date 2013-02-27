Ext.define('podcastpal.view.FeedsList', {
    extend: 'Ext.List',
    xtype: 'feedslist',
    requires: ['podcastpal.store.Feeds', 'podcastpal.view.FeedsListItem'],
    
    config: {
        title: 'Podcast Feeds',
        //itemTpl: '<div class="feed-list-item"></div><div style="padding-left:1.7em">{title}</div>',
        itemTpl: '{title}',
        store: 'Feeds',
        onItemDisclosure: true,
        
        toolbarButtons: [
                         {
                        	 xtype: 'button',
                        	 id: 'removeFeed',
                        	 text: 'Remove',
                    	     align: 'right'
                    	 }
        ]
        
        
    }
    
    
});