function getPhoneStore() {    //data to be loaded into the ArrayStore
    var data = [
        [true,  false, 1,  "LG", "LG KS360", 54, "240 x 320 pixels", "2 Megapixel", "Pink", "Slider", 359, 2.400000],
        [true,  true,  2,  "Sony Ericsson", "Sony Ericsson C510a Cyber-shot", 180, "320 x 240 pixels", "3.2 Megapixel", "Future black", "Candy bar", 11, 0.000000],
        [true,  true,  3,  "LG", "LG PRADA KE850", 155, "240 x 400 pixels", "2 Megapixel", "Black", "Candy bar", 113, 0.000000],
        [true,  true,  4,  "Nokia", "Nokia N900 32GB", 499, "800 x 480 pixels", "5 Megapixel", "( the image of the product displayed may be of a different color )", "Slider", 320, 3.500000],
        [true,  false, 5,  "Motorola", "Motorola RAZR V3", 65, "96 x 80 pixels", "0.3 Megapixel", "Silver", "Folder type phone", 5, 2.200000],
        [true,  true,  6,  "LG", "LG KC910 Renoir", 242, "240 x 400 pixels", "8 Megapixel", "Black", "Candy bar", 79, 0.000000],
        [true,  true,  7,  "RIM", "BlackBerry Curve 8520", 299, "320 x 240 pixels", "2 Megapixel", "Frost", "Candy bar", 320, 2.640000],
        [true,  true,  8,  "Sony Ericsson", "Sony Ericsson W580i Walkman", 120, "240 x 320 pixels", "2 Megapixel", "Urban gray", "Slider", 1, 0.000000],
        [true,  true,  9,  "Nokia", "Nokia E63 Smartphone 110 MB", 170, "320 x 240 pixels", "2 Megapixel", "Ultramarine blue", "Candy bar", 319, 2.360000],
        [true,  true,  10, "Sony Ericsson", "Sony Ericsson W705a Walkman", 274, "320 x 240 pixels", "3.2 Megapixel", "Luxury silver", "Slider", 5, 0.000000],
        [false, false, 11, "Nokia", "Nokia 5310 XpressMusic", 140, "320 x 240 pixels", "2 Megapixel", "Blue", "Candy bar", 344, 2.000000],
        [false, true,  12, "Motorola", "Motorola SLVR L6i", 50, "128 x 160 pixels", "", "Black", "Candy bar", 38, 0.000000],
        [false, true,  13, "T-Mobile", "T-Mobile Sidekick 3 64MB", 75, "240 x 160 pixels", "1.3 Megapixel", "", "Sidekick", 115, 0.000000],
        [false, true,  14, "Audiovox", "Audiovox CDM8600", 5, "", "", "", "Folder type phone", 1, 0.000000],
        [false, true,  15, "Nokia", "Nokia N85", 315, "320 x 240 pixels", "5 Megapixel", "Copper", "Dual slider", 143, 2.600000],
        [false, true,  16, "Sony Ericsson", "Sony Ericsson XPERIA X1", 399, "800 x 480 pixels", "3.2 Megapixel", "Solid black", "Slider", 14, 0.000000],
        [false, true,  17, "Motorola", "Motorola W377", 77, "128 x 160 pixels", "0.3 Megapixel", "", "Folder type phone", 35, 0.000000],
        [true,  true,  18, "LG", "LG Xenon GR500", 1, "240 x 400 pixels", "2 Megapixel", "Red", "Slider", 658, 2.800000],
        [true,  false, 19, "RIM", "BlackBerry Curve 8900", 349, "480 x 360 pixels", "3.2 Megapixel", "", "Candy bar", 21, 2.440000],
        [true,  false, 20, "Samsung", "Samsung SGH U600 10.9", 135, "240 x 320 pixels", "3.2 Megapixel", "", "Slider", 169, 2.200000]
    ];

    Ext.define('Mobile', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'hasEmail', type: 'bool'},
            {name: 'hasCamera', type: 'bool'},
            {name: 'id', type: 'int'},
            'brand',
            'name',
            {name: 'price', type: 'int'},
            'screen',
            'camera',
            'color',
            'type',
            {name: 'reviews', type: 'int'},
            {name: 'screen-size', type: 'int'},
            {name: 'image', convert: function(v, record) {
                return '../dataview-and-templates/images/' + record.get('name').replace(/ /g, '-') + '.png';
            }},
            {name: 'review', convert: function() {
                return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam imperdiet, turpis id tempor aliquet, lorem massa feugiat tellus, et euismod sapien nisi sed libero. Nulla luctus mauris quis justo volutpat quis imperdiet odio pharetra. Sed elementum lacinia nisi, ac porttitor odio sodales vitae. Nulla diam mi, volutpat a semper et, lacinia at magna. Donec lacus nibh, adipiscing nec viverra sit amet, tempus sit amet lectus. Ut nibh libero, ornare a faucibus sit amet, dignissim sit amet magna. Nulla in elementum est. Integer arcu nulla, bibendum in sodales ut, elementum ac justo. Cras imperdiet dolor a velit malesuada pellentesque. Quisque elit nunc, sollicitudin non sagittis sed, gravida vitae arcu. Aenean dictum ipsum sed sem convallis volutpat. Integer ut tellus non risus facilisis lacinia vitae in tortor.";
            }}
        ]
    });

    store = Ext.create('Ext.data.ArrayStore', {
        model: 'Mobile',
        data: data
    });
    store.sort('brand', 'ASC');
    return store;
}