Ext.define('podcastpal.controller.Controller', {
	
    extend: 'Ext.app.Controller',
    
    config: {

    	refs: {
    		container: 'tabcontainer',
    		home: 'homepanel',
    		feedForm: 'feedform',
    		feedsList: 'feedslist',
    		feedItemsList: 'feeditemslist',
    		playList: 'playlist',
    		addToPlayerButton: '#addToPlayer',
    		saveFeedButton: '#saveFeed',
    		removeFeedButton: '#removeFeed',
    		playButton: '#play',
    		stopButton: '#stop'
    	},
    	
    	control: {
    		'feedslist': {
    			disclose: 'loadFeed'
    		},
    		'addToPlayerButton': {
                tap: 'downloadFeedItems'
            },
            'saveFeedButton': {
            	tap: 'saveFeed'
            },
            'removeFeedButton': {
            	tap: 'removeFeed'
            },
            'playButton': {
            	tap: 'playPodcast'
            },
            'stopButton': {
            	tap: 'stopPodcast'
            }
    	}
    },
    
        
    saveFeed: function() {
    	
    	
    	var url = this.getFeedForm().getValues()['url'];
    	console.info('saving feed...url: ' + url);
    	
    	if(!url.indexOf('http://') == 0) {
    		url = 'http://' + url;
    	}
    	
    	var _this = this;
    	Ext.Ajax.request({
    	    url: url,
    	    timeout: 3000,
    	    method: 'GET',
    	    success: function(xhr) {

    	    	var text = xhr.responseText;
    	    	    	    	
    	    	var channelContent = _this.getTagContent('channel', text);
    	    	
    	    	if(channelContent != null) {
	    	    	var title = _this.getTagContent('title', channelContent);
	    	    	var description = _this.getTagContent('description', channelContent);
	    	    	
	    	    	var feed = Ext.ModelMgr.create({
	    	    					url: url,
	    	    					title: title,
	    	    					description: description
	    	    				}, 'podcastpal.model.Feed');
	    	    	
	    	    	var store = Ext.data.StoreManager.lookup('Feeds');
	    	    	store.add(feed);
	    	    	store.sync();
	    	    	
	    	    	console.info('feed added: ' + title + ' ' + description);
	    	    	
	    	    	_this.getContainer().setActiveItem(_this.getHome());
	    	    	
    	    	} else {
    	    		console.info('feeds.saveFeed: Channel not found!');
    	    	}
    	    },
    	    failure: function(response, opts) {
    	    	console.log('feeds.saveFeed: server-side failure with status code ' + response.status);
    	    }
    	});
    	
    },
    
    removeFeed: function() {
    	this.getFeedsList().getStore().remove(this.getFeedsList().getSelection());
    	this.getFeedsList().getStore().sync();
	},

    loadFeed: function(list, record) {
    	
    	console.info('loading feed: ' + record.get('title'));
    	
    	var _this = this;
    	Ext.Ajax.request({
    	    url: record.get('url'),
    	    timeout: 3000,
    	    method: 'GET',
    	    success: function(xhr) {
    	    	var text = xhr.responseText;
    	    	    	    	
    	    	var channelContent = _this.getTagContent('channel', text);
    	    	
    	    	if(channelContent != null) {
    	    		var store = Ext.data.StoreManager.lookup('FeedItems');
    	    		store.removeAll();
    	    		
    	    		var itemIdx = channelContent.indexOf('<item>');
    	    		while(itemIdx != -1 && store.getCount() < 26) {
    	    			
    	    			var item = _this.getTagContent('item', channelContent);
    	    			var itemEndTag = '</item>';
    	    			var itemEndIdx = channelContent.indexOf(itemEndTag);
    	    			channelContent = channelContent.substring(itemEndIdx + itemEndTag.length);
    	    			
    	    	    	var title = _this.getTagContent('title', item);
    	    	    	var link = _this.getTagContent('link', item);
    	    	    	var description = _this.getTagContent('description', item);
    	    	    	var pubDate = _this.getTagContent('pubDate', item);
    	    	    	var url = _this.getTagAttribute('enclosure', 'url', item);
    	    	    	
    	    	    	var feedItem = Ext.ModelMgr.create({
    	    	    					title: title,
    	    	    					link: link,
    	    	    					description: description,
    	    	    					pubDate: pubDate,
    	    	    					url: url
    	    	    				}, 'podcastpal.model.FeedItem');
    	    	    	
    	    	    	store.add(feedItem);
    	    	    	
    	    	    	//console.info('feed item added: ' + title + ' ' + description);

    	    			itemIdx = channelContent.indexOf('<item>');
    	    		}
	    	    	
    	    		_this.getHome().push({
    	    			xtype: 'feeditemslist'
    	    		});
	    	    	
    	    	} else {
    	    		console.info('feeds.loadFeed: Channel not found!');
    	    	}
    	    },
    	    failure: function(response, opts) {
    	    	console.log('feeds.loadFeed: server-side failure with status code ' + response.status);
    	    }
    	});
    	
    	
    },
    
    downloadFeedItems: function(options) {
    	
    	console.info('start podcast download');
    	
    	var _this = this;
    	
    	//show loading message
    	Ext.Viewport.setMasked({
			xtype: 'loadmask',
		    indicator: true
		});
    	        
	    for(var i=0; i<this.getFeedItemsList().getSelection().length; i++) {	
	    	var feedItem = this.getFeedItemsList().getSelection()[i];
	    	var url = feedItem.get('url');
	    	var urlArr = url.split('/');
	    	var filename = urlArr[urlArr.length-1];
	    		    	
	    	console.info('start download: "' + filename + '"');
	    	
	    	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
            	function onFileSystemSuccess(fileSystem) {  
	    			
	    			fileSystem.root.getDirectory("Podcasts", {create: true, exclusive:false}, 
	    				function(d1) {
		    				var start = 'file://';
		    				var startIdx = d1.fullPath.indexOf('file://');
		    				var path = d1.fullPath.substring(startIdx + start.length);
		    				path = path + '/' + filename;
		    				_this.downloadFile(url, path, feedItem);
	    				},
	    				function(error) {
	    					console.log("error getting Podcasts dir: " + error.code);
	    				}
	    			);
	    			
	    		},
	    		function(evt) {
	    			console.log('onFileSystemError: ' + evt);
	    			Ext.Viewport.setMasked(false);
	    		}
	    	);
	    	
	    }

    },
    
    downloadFile: function(url, sPath, feedItem) {
    	console.log('starting download, url: ' + url + ' path: ' + sPath);
    			
    	var fileTransfer = new FileTransfer();
		fileTransfer.download(url, sPath,
        	  function(theFile) {
         		console.log("download complete: " + theFile.toURL());
           		
         		var start = 'file://';
				var startIdx = theFile.toURL().indexOf('file://');
				var dir = theFile.toURL().substring(startIdx + start.length);
           		feedItem.set('path', dir);
           		
           		var store = Ext.data.StoreManager.lookup('PlaylistFeedItems');
           		store.add(feedItem);

           		
           		Ext.Viewport.setMasked(false);
           	},
                    
           	function(error) {
           		console.log("error downloading " + url + ' :' + error.code);
           		Ext.Viewport.setMasked(false);
           	}
		);    
		
    },
    
    playPodcast: function(options) {
    	
    	var feedItem = this.getPlayList().getAt(1).getSelection()[0];
    	var path = feedItem.get('path');
    	
    	console.log('playPodcast: ' +  path);
    	
    	// Play the audio file at url
        this.podcastMedia = new Media(path,
            // success callback
            function() {
                console.log("playAudio():Audio Success");
            },
            // error callback
            function(err) {
                console.log("playAudio():Audio Error ("+err.code + "): " + err.message);
                for(x in error) {
           			console.log(x + ': ' + error[x]);
           		}
            }
        );

        // Play audio
        this.podcastMedia.play();
    	
    },
    
    stopPodcast: function(options) {
    	
    	this.podcastMedia.stop();
    },
    
    getTagContent: function(tag, xml) {
    	
    	var tagContent = null;
    	var openTag = '<' + tag + '>';
    	var closeTag = '</' + tag + '>';
    	
    	var openTagIdx = xml.indexOf(openTag);
    	var closeTagIdx = xml.indexOf(closeTag);
    	
    	if(openTagIdx != -1 && closeTagIdx != -1) {
    		tagContent = xml.substring(openTagIdx + openTag.length, closeTagIdx);
    		
    	}
    	
    	//console.info('getTagContent(' + tag + ') returning: ' + tagContent);
    	return tagContent;
    },
    
    getTagAttribute: function(tag, attr, xml) {
    	
    	var tagContent = null;
    	var openTag = '<' + tag;
    	    	
    	var openTagIdx = xml.indexOf(openTag);
    	
    	if(openTagIdx != -1) {
    		xml = xml.substring(openTagIdx);
    		openTag = attr + '="';
    		closeTag = '"';
    		
    		var openTagIdx = xml.indexOf(openTag);
        	var closeTagIdx = xml.indexOf(closeTag, openTagIdx + openTag.length);
        	
        	if(openTagIdx != -1 && closeTagIdx != -1) {
        		tagContent = xml.substring(openTagIdx + openTag.length, closeTagIdx);
        		
        	}
    	}
    	
    	//console.info('getTagAttribute(' + tag + ',' + attr +') returning: ' + tagContent);
    	return tagContent;
    }
    
});