Ext.require(['*']);

Ext.onReady(function() {

    Ext.tip.QuickTipManager.init();

    var dragZone,
        availablePhones = Ext.create('Ext.view.View', {
        store: getPhoneStore(),
        tpl  : Ext.create('Ext.XTemplate',
            '<tpl for=".">',
                '<div class="phone">',
                    '<img src="{image}"/><br>',
                    '{name}<br>',
                    '{price}<br>',
                    '{reviews} Reviews<br>',
                '</div>',
            '</tpl>'
        ),
        itemSelector: '.phone',
        listeners: {
            render: function(v) {
                  dragZone = Ext.create('Ext.view.DragZone', {
                    ddGroup: 'phones',
                    view: availablePhones
                });
            }
        }
    });

    var dropZone,
        shoppingCart = Ext.create('Ext.view.View', {
        id: 'cart',
        store: {
            proxy: {
                type: 'memory',
                model: 'Mobile'
            }
        },
        tpl: new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="phone">',
                    '<img src="{image}"/>',
                    '<div>{name}</div>',
                    '<div>{price:currency}</div>',
                '</div>',
            '</tpl>'
        ),
        itemSelector: 'div.phone',
        listeners: {
            render: function(v) {
                dropZone = Ext.create('Ext.view.DropZone', {
                    ddGroup: 'phones',
                    view: shoppingCart,

                    // What to do on drop: Just the dragged record to this View's Store
                    handleNodeDrop: function(dragData, overRecord, position) {
                        var store = shoppingCart.getStore(),
                            rec = dragData.records[0];

                        // Add phone to cart
                        store.add(rec);

                    }
                });
            }
        }
    });

    w = Ext.create('Ext.window.Window', {
        title: 'Buy phones',
        height: 400,
        width: 600,
        layout: {
             type: 'vbox',
             align: 'stretch'
        },
        items: [{
            xtype: 'panel',
            title: 'Available phones',
            items: availablePhones,
            flex: 1,
            autoScroll: true
        }, {
            xtype: 'panel',
            title: 'Shopping Cart',
            items: shoppingCart,
            flex: 1
        }]
    });
	w.show();
});
