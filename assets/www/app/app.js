Ext.application({
    name: 'podcastpal',
    
    models: ['Feed', 'FeedItem'],
    stores: ['Feeds', 'FeedItems', 'PlaylistFeedItems'],
    views: ['Container'],
    controllers: ['Controller'],
    
    launch: function() {

    	var _this = this;
    	
    	if(this.launchCnt == null) this.launchCnt = 0;
    	this.launchCnt++;
    	
        if(!window.device && this.launchCnt == 1) {
        	
        	var callbackFn = function() { _this.launch.apply(_this, arguments); }
        	//deviceready is a phonegap event fired when device is ready
        	document.addEventListener("deviceready", callbackFn, false);
        	//call launch after 5s incase we're not running on a mobile device (in which case deviceready will not fire)
        	setTimeout(callbackFn, 5000)
        	return;
        }
        
        //if already launched, return
        if(this.launched == true) { return; }
        
        this.launched = true;
        
        Ext.Viewport.add({
        	xtype: 'tabcontainer'
        });
    	

    }
});