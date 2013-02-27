Ext.define('podcastpal.view.Container', {
	
	extend: 'Ext.TabPanel',
	xtype: 'tabcontainer',
	
    requires: [
        'podcastpal.view.Home',
        'podcastpal.view.FeedForm',
        'podcastpal.view.PlayList'
    ],

    config: {
    	tabBar: {
            docked: 'bottom',
            layout: {
                pack: 'center'
            }
        },
        items: [
            { xtype: 'homepanel' },
            { xtype: 'feedform' },
            { xtype: 'playlist' }
        ]
    }
});