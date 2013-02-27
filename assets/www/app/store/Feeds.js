
Ext.define('podcastpal.store.Feeds', {
	
    extend: 'Ext.data.Store',
	config: {
		model: 'podcastpal.model.Feed',
		proxy: {
			type: 'localstorage',
		    id  : 'podcastpal.models.Feed'
		}
	}
});
