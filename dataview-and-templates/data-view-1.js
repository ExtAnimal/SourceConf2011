Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux.DataView', '../ux/DataView/');

Ext.require([
    'Ext.data.*',
    'Ext.util.*',
    'Ext.view.View',
    'Ext.XTemplate',
    'Ext.panel.Panel',
    'Ext.toolbar.*',
    'Ext.window.*',
    'Ext.slider.Multi'
]);

Ext.onReady(function() {

    var dataview = Ext.create('Ext.view.View', {
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

        id: 'phones',
        itemSelector: 'div.phone',
        autoScroll  : true,
        listeners: {
            itemclick: function(view, rec, node, index, e) {
                Ext.Msg.alert('Clicked', 'You clicked ' + rec.get('name'));
            }
        }
    });

    Ext.create('Ext.panel.Panel', {
        frame: true,
        title: 'An ugly View of phones',
        layout: 'fit',
        items : dataview,
        height: 555,
        width : 650,
        renderTo: document.body
    });
});