Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux.DataView', '../ux/DataView/');

Ext.require([
    'Ext.data.*',
    'Ext.util.*',
    'Ext.Viewport',
    'Ext.view.*',
    'Ext.XTemplate',
    'Ext.panel.Panel',
    'Ext.tip.*',
    'Ext.toolbar.*',
    'Ext.slider.Multi'
]);

Ext.onReady(function() {

    Ext.tip.QuickTipManager.init();

    var dataview = Ext.create('Ext.view.View', {
        store: getPhoneStore(),
        anchor: 'none 100%',
        tpl: Ext.create('Ext.XTemplate',
            '<table height="100%" class="phone-grid">',

            // First row contains first half of Store
            '<tr>',
                '<tpl for=".">',
                    '<tpl if="xindex &lt;= xcount/2">',
                        '<td class="phone">',
                            '<img src="{image}"/><br>',
                            '{name}<br>',
                            '{price}<br>',
                            '{reviews:plural("review")}<br>',
                        '</td>',
                    '</tpl>',
                '</tpl>',
            '</tr>',

            // Second row contains second half of Store
            '<tr>',
                '<tpl for=".">',
                    '<tpl if="xindex &gt; xcount/2">',
                        '<td class="phone">',
                            '<img src="{image}"/><br>',
                            '{name}<br>',
                            '{price}<br>',
                            '{reviews:plural("review")}<br>',
                        '</td>',
                    '</tpl>',
                '</tpl>',
            '</tr>',
        '</table>'),

        id: 'phones',
        itemSelector: 'td.phone',
        overItemCls : 'phone-hover',
        multiSelect : false,
        height: 510,
        listeners: {
            render: function(v) {
                var dz = Ext.create('Ext.view.DragZone', {
                    ddGroup: 'phones',
                    view: v,
                    getDragText: function() {
                        var data = this.dragData,
                            phone = this.dragData.records[0];

                        data.fromPosition = Ext.fly(v.getNode(phone)).down('img').getXY();

                        // Work around the padding given to the proxy element.
                        // TODO: Adjust for it in the repair method.
                        data.fromPosition[0] -= 20;
                        data.fromPosition[1] -= 5;
                        return '<img src="' + phone.get('image') + '"><div>' + phone.get('name') + '</div>';
                    }
                });
                v.plugins = v.plugins || [];
                v.plugins.push(dz);
            },
            single: true
        }
    });

    var phonePanel = Ext.create('Ext.panel.Panel', {
        frame: true,
        title: 'Available Phones',
        layout: 'anchor',
        items : dataview,
        margins: '0 0 3 0',
        autoScroll: true
    });

    var shoppingCart = Ext.create('Ext.panel.Panel', {
        frame: true,
        title: 'Shopping cart',
        layout: 'fit',
        items : {
            xtype: 'dataview',
            id: 'cart',
            store: {
                proxy: {
                    type: 'memory',
                    model: 'Mobile'
                }
            },
            tpl: new Ext.XTemplate(
                '{[this.onStart()]}',
                '<tpl for=".">',
                    '<div class="phone">',
                        '<div class="delete-tool" data-qtip="Delete this purchase"></div>',
                        '<img src="{image}"/>',
                        '<div>{name}</div>',
                        '<div>{price:currency}</div>',
                    '</div>',
                    '{[this.incrementTotals(values)]}',
                '</tpl>',
                '<h2 style="clear:left">Your total: {[Ext.util.Format.currency(this.total)]}</h2>', {

                onStart: function(values) {
                    this.total = 0;
                    return '';
                },

                // Keep track of price
                incrementTotals: function(values) {
                    this.total += values.price;
                    return '';
                }
            }),
            itemSelector: 'div.phone',
            overItemCls : 'phone-hover',
            listeners: {
                itemclick: function(view, rec, node, index, e) {
                    if (e.getTarget('.delete-tool')) {
                        view.store.remove(rec);

                        // There's still a node under the mouse: Add the overCls to it
                        if (view.store.getAt(index)) {
                            Ext.fly(view.getNode(index)).addCls(view.overItemCls);
                        }
                        return false;
                    }
                },
                render: {
                    fn: function(v) {
                        var dz = Ext.create('Ext.view.DropZone', {
                            ddGroup: 'phones',
                            view: v,

                            // No drop indicator - we just append new phones
                            indicator: Ext.createWidget('component', {
                                renderTo: v.el,
                                style: 'display:none;height:0;width:0',
                                cls: 'x-hidden'
                            }),

                            // What to do on drop: Just add a copy of the record to this View's Store
                            handleNodeDrop: function(data, overRecord, position) {
                                var store = v.getStore(),

                                    // Create a new Mobile record with a new, unique ID
                                    rec = data.records[0].copy(Ext.id()),
                                    newNode;

                                store.add(rec);

                                // Start hover immediately.
                                newNode = Ext.get(v.getNode(rec));
                                if (newNode.getRegion().contains(new Ext.EventObjectImpl(event).getPoint())) {
                                    newNode.addCls(v.overItemCls);
                                }
                            }
                        });
                        v.plugins = v.plugins || [];
                        v.plugins.push(dz);
                    },
                    single: true
                }
            },
            autoScroll: true
        },
        flex: 1,
        margins: '3 0 0 0'
    });

    Ext.create('Ext.Viewport', {
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'component',
            dock: 'top',
            id: 'header',
            weight: -1,
            height: 30,
            autoEl: {
                tag: 'h1',
                html: 'Phone Shopping cart'
            }
        }, {
            xtype: 'container',
            flex: 1,
            layout: {
                type: 'vbox',
                padding: 5,
                align: 'stretch'
            },
            items: [
                phonePanel,
                shoppingCart
            ]
        }]
    });

});