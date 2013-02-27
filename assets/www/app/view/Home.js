Ext.define('podcastpal.view.Home', {
	
    extend: 'Ext.navigation.View',
    xtype: 'homepanel',
    requires: [
        'podcastpal.view.FeedsList',
        'podcastpal.view.FeedItemsList'
    ],
    
    config: {
        iconCls: 'home',
        title: 'Home',

        items: [
                { xtype: 'feedslist' }
        ]
    },
    
    setToolbarButtons: function(view) {
    	
    	var btnContainer = this.getNavigationBar().getAt(2);
    	
    	if(this.getNavigationBar().buttons != null) {
	    	for(var i=0; i<this.getNavigationBar().buttons.length; i++) {
	    		var button = this.getNavigationBar().buttons[i];
	    		btnContainer.remove(button, true);
	    	}
    	}
    	
    	this.getNavigationBar().buttons = [];
    	    	
    	if(view.getToolbarButtons() != null) {
	    	for(var i=0; i<view.getToolbarButtons().length; i++) {
	    		var button = view.getToolbarButtons()[i];
	    		var buttonObj = this.getNavigationBar().add(button);
	    		this.getNavigationBar().buttons.push(buttonObj);
	    	}
    	}
    },
    
    push: function(view, eOpts) {
    	this.callParent(arguments);
    	
    	this.setToolbarButtons(this.getActiveItem());
    	
    	
    },
    
    pop: function(view, eOpts) {
    	this.callParent(arguments);
    	
    	this.setToolbarButtons(this.getActiveItem());
    	
    	
    },
    
    initialize: function() {
    	this.callParent(arguments);
    	
    	this.setToolbarButtons(this.getActiveItem());
    }
    
    
    
});
