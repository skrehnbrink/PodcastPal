Ext.define('podcastpal.view.FeedsListItem', {
    extend: 'Ext.dataview.component.DataItem',
    requires: ['Ext.Button', 'Ext.Component'],
    xtype: 'feedslistitem',

    config: {
    	cls: 'feeds-list-item',
    	
        deleteButton: {
        	iconCls: 'delete_black2',
        	iconMask: true
        },
        title: {
            cls: 'x-title',
            flex: 1
        },
        
        dataMap: {
            getTitle: {
            	setHtml: 'title'
            }
        },
        
        layout: {
            type: 'hbox',
            align: 'left'
        }
    },

    applyDeleteButton: function(config) {
        return Ext.factory(config, Ext.Button, this.getDeleteButton());
    },

    updateDeleteButton: function(newDeleteButton, oldDeleteButton) {
        if (oldDeleteButton) {
            this.remove(oldDeleteButton);
        }

        if (newDeleteButton) {
            this.add(newDeleteButton);
        }
    },
    
    applyTitle: function(config) {
        return Ext.factory(config, Ext.Component, this.getTitle());
    },

    updateTitle: function(newTitle, oldTitle) {
        if (oldTitle) {
            this.remove(oldTitle);
        }

        if (newTitle) {
            this.add(newTitle);
        }
    }
});