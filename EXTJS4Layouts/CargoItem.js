Ext.define('Ext.CargoItem', {
    extend: 'Ext.form.FieldSet',

    uses: 'Ext.form.*',

//    anchor: '-22',
//    width: 870,

    oneToFourDigits: /^\d{1,4}$/,

//  Do NOT keep upper Containers informed of additions below this level.
//  This is a Field which manages its own value
    bubbleEvents: [],

    isFormField: true,

    initComponent: function() {

        var numberFieldListeners = {
            change: this.onNumberChange,
            scope: this
        };

//        this.maxWidth = 870;

        this.title = 'Package Item'
        this.tools = [{
            id: 'up',
            handler: this.onToggle,
            scope: this
        }, {
            id: 'close',
            handler: this.onClose,
            scope: this
        }]

        this.items = this.inner = new Ext.Container({
            layout: {
                type: 'table',
                columns: 4
            },
            items: [
                this.packageType = new Ext.form.ComboBox({
                    fieldLabel: 'Package type',
                    hiddenName: 'packageType',
                    name: 'packageTypeDesc',
                    itemId: 'packageTypeDesc',
                    id: Ext.id(null, 'packageTypeDesc'),
                    store: ['Box', 'Carton'],
                    mode: 'local',
                    triggerAction: 'all',
                }),
                this.packageDesc = new Ext.form.TextArea({
                    name: 'packageDesc',
                    itemId: 'packageDesc',
                    id: Ext.id(null, 'packageDesc'),
                    allowBlank: false,
                    cellCls: 'text-cell',
                    rowspan: 6,
                    fieldLabel: 'Package Description',
                    style: 'height: 100%'
                }),
                this.marksAndNumbers = new Ext.form.TextArea({
                    name: 'marksAndNumbers',
                    itemId: 'marksAndNumbers',
                    id: Ext.id(null, 'marksAndNumbers'),
                    allowBlank: false,
                    cellCls: 'text-cell',
                    rowspan: 6,
                    colspan: 2,
                    fieldLabel: 'Marks and Numbers',
                    style: 'height: 100%'
                }),
                this.pieces = new Ext.form.NumberField({
                    fieldLabel: 'Total pieces',
                    name: 'pieces',
                    itemId: 'pieces',
                    id: Ext.id(null, 'pieces'),
                    allowDecimals: false,
                    decimalPrecision: 0,
                    allowNegative: false,
                    minValue: 1,
                    maxValue: 32767,
                    value: 0
                }),
                this.grossWeight = new Ext.form.NumberField({
                    fieldLabel: 'Gross Weight (Kg)',
                    name: 'grossWeight',
                    itemId: 'grossWeight',
                    id: Ext.id(null, 'grossWeight'),
                    allowDecimals: true,
                    decimalPrecision: 2,
                    allowNegative: false,
                    minValue: 0.01,
                    maxValue: 100000,
                    value: 0
                }),
                this.nettWeight = new Ext.form.NumberField({
                    fieldLabel: 'Net Weight (Kg)',
                    name: 'netWeight',
                    itemId: 'netWeight',
                    id: Ext.id(null, 'netWeight'),
                    allowDecimals: true,
                    decimalPrecision: 2,
                    allowNegative: false,
                    minValue: 0,
                    maxValue: 100000,
                    value: 0
                }),
                this.volume = new Ext.form.NumberField({
                    fieldLabel: 'Volume (m<sup>3</sup>)',
                    name: 'volume',
                    itemId: 'volume',
                    id: Ext.id(null, 'volume'),
                    allowDecimals: true,
                    decimalPrecision: 3,
                    allowNegative: false,
                    minValue: 0.001,
                    maxValue: 1000,
                    value: 0
                }),
                this.linearMetres = new Ext.form.NumberField({
                    fieldLabel: 'Loading Metres',
                    name: 'linearMetres',
                    itemId: 'linearMetres',
                    id: Ext.id(null, 'linearMetres'),
                    allowDecimals: true,
                    decimalPrecision: 3,
                    allowNegative: false,
                    minValue: 0,
                    maxValue: 100000,
                    value: 0
                }),
                this.unNumber = new Ext.form.TextField({
                    fieldLabel: 'UN Number',
                    name: 'unNumber',
                    itemId: 'unNumber',
                    id: Ext.id(null, 'unNumber'),
                    forceUpperCase: true,
                }),
                this.mainIngredient = new Ext.form.TextField({
                    forceUpperCase: true,
                    fieldLabel: 'Main ingredient',
                    name: 'mainIngredient',
                    id: Ext.id(null, 'mainIngredient'),
                    disabled: true
                }),
                this.ltdQuantity = new Ext.form.ComboBox({
                    triggerAction: 'all',
                    fieldLabel: 'Ltd. Quantity',
                    hiddenName: 'ltdQuantity',
                    id: Ext.id(null, 'ltdQuantity'),
                    store: [[false, 'No'], [true, 'Yes']],
                    disabled: true
                }),
                this.flashpoint = new Ext.form.TextField({
                    fieldLabel: 'Flashpoint',
                    name: 'flashpoint',
                    id: Ext.id(null, 'flashpoint'),
                    disabled: true,
                    value: 0
                })
            ]
        });
        this.callParent(arguments);
    },

    onClose: function() {
        this.ownerCt.remove(this, true);
    }
});