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
            '<h1>{[values.length]} matching phones</h1>',

            // Begin iteration through record data
            '<tpl for=".">',

                // This method ends the group (returns a summary line) if the brand name has changed
                '{[this.endGroup(xindex, values)]}',

                // This method begins a new group (returns a header line) if the brand name has changed
                '{[this.startGroup(xindex, values)]}',

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

            // End the current group. Display summary line for current brand
            '{[this.endGroup(1000, {})]}', {

            // Upon change of brand output a header.
            // Total up the price and group size so we can calculate the average price.
            startGroup: function(index, values) {
                if (values.brand !== this.currentBrand) {
                    this.currentBrand = values.brand;
                    this.groupCount = 1;
                    this.totalPrice = values.price;
                    return '<h2>' + values.brand + ' phones</h2>';
                }
                this.groupCount += 1;
                this.totalPrice += values.price;
            },

            // If the brand in the values is not the current brand, but we're NOT on the first record
            // Then output a summary line of the brand we just reached the end of.
            endGroup: function(index, values) {
                if ((index !== 1) && (values.brand !== this.currentBrand)) {
                    return '<h3>' + this.currentBrand + ' average price: ' + Ext.util.Format.currency(this.totalPrice / this.groupCount) + '</h3>';
                    this.currentBrand = values.brand;
                }
            }
        }),

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