Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux.DataView', '../ux/DataView/');

Ext.require([
    'Ext.data.*',
    'Ext.util.*',
    'Ext.tip.*',
    'Ext.view.View',
    'Ext.XTemplate',
    'Ext.panel.Panel',
    'Ext.toolbar.*',
    'Ext.slider.Multi'
]);

Ext.onReady(function() {

    Ext.util.Format.currencySign = '£';
    Ext.tip.QuickTipManager.init();

    var dataview = Ext.create('Ext.view.View', {
        store: getPhoneStore(),
        tpl  : Ext.create('Ext.XTemplate',

            // Overall header
            '<h1>{[values.matchingPhones]} matching phones</h1>',

            // Begin iteration through record data
            '<tpl for=".">',

                // Process header lines in the data array
                '<tpl if="header">',
                    '<h2>{header}</h2>',
                '</tpl>',

                // Process summary lines in the data array
                '<tpl if="avgPrice">',
                    '<h3>{brand} average price: {avgPrice:currency}</h3>',
                '</tpl>',

                // Process item lines in the data array
                '<tpl if="price">',
                    // Each phone item is encapsulated by a table
                    '<table class="phone" data-qtip="Click to toggle review visibility">',
                        '<tr>',
                            '<td class="phone-image">',
                                '<img src="{image}"/><br>',
                            '</td>',
                            '<td class="phone-details">',
                                '<div class="name">{name}</div>',
                                '<div class="price">{price:currency}</div>',
                                '<div class="reviews">{reviews:plural("review")}</div>',
                            '</td>',
                        '</tr>',
                        '<tr>',
                            '<td colspan="2">',
                                '<div class="review" style="display:none">{review}</div>',
                            '</td>',
                        '</tr>',
                    '</table>',
                '</tpl>',
            '</tpl>'
        ),

        // Return the data array which the iterative template uses
        // The array will contain brand header lines, and brand summary lines as well
        // as item lines.
        // The template processes each line type appropriately
        collectData : function(records, startIndex) {
            var r = [],
                i = 0,
                len = r.matchingPhones = records.length,
                persistanceProperty = (this.store.model || this.store.proxy.model).prototype.persistanceProperty,
                data,
                currentBrand,
                groupCount = 0,
                totalPrice = 0;

            for(; i < len; i++) {
                // Extract data from record using prepareData
                data = this.prepareData(records[i][persistanceProperty], startIndex + i, records[i]);

                // Add total data line
                if (data.brand != currentBrand) {
                    if (i) {
                        r[r.length] = {
                            brand: currentBrand,
                            avgPrice: totalPrice / groupCount
                        };
                    }
                    currentBrand = data.brand;
                    groupCount = 0;
                    totalPrice = 0;

                    // Add header line for new brand
                    r[r.length] = {
                        header: currentBrand + ' phones'
                    };

                }
                r[r.length] = data;
                groupCount += 1;
                totalPrice += data.price;
            }

            // Add final total data line
            r[r.length] = {
                brand: currentBrand,
                avgPrice: totalPrice / groupCount
            };

            return r;
        },

        // method which creates transient values in each record's item data.
        // In this case, we just create a bogus review field with filler text
        prepareData: function(data, index, record) {
            data = Ext.apply({}, data);
            data.price /= 1.6479;
            data.review = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam imperdiet, turpis id tempor aliquet, lorem massa feugiat tellus, et euismod sapien nisi sed libero. Nulla luctus mauris quis justo volutpat quis imperdiet odio pharetra. Sed elementum lacinia nisi, ac porttitor odio sodales vitae. Nulla diam mi, volutpat a semper et, lacinia at magna. Donec lacus nibh, adipiscing nec viverra sit amet, tempus sit amet lectus. Ut nibh libero, ornare a faucibus sit amet, dignissim sit amet magna. Nulla in elementum est. Integer arcu nulla, bibendum in sodales ut, elementum ac justo. Cras imperdiet dolor a velit malesuada pellentesque. Quisque elit nunc, sollicitudin non sagittis sed, gravida vitae arcu. Aenean dictum ipsum sed sem convallis volutpat. Integer ut tellus non risus facilisis lacinia vitae in tortor.";
            return data;
        },

        id: 'phones',
        itemSelector: 'table.phone',
        overItemCls : 'phone-hover',
        multiSelect : true,
        autoScroll  : true,
        listeners: {

            // Click shows/hides the site's review
            itemclick: function(view, rec, node, index, e) {
                node = Ext.get(node);
                var review = node.down('div.review', null, true);

                review.setVisibilityMode(Ext.core.Element.DISPLAY);
                if (review.isVisible()) {
                    review.slideOut('t');
                } else {
                    review.slideIn('t');
                }
            }
        }
    });

    Ext.create('Ext.panel.Panel', {
        frame: true,
        title: 'View of Phones',
        layout: 'fit',
        items : dataview,
        height: 555,
        width : 650,
        renderTo: document.body
    });
});