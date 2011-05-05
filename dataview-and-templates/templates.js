Ext.require(['*']);

Ext.onReady(function() {
    var code = Ext.getBody().query('pre.code'),
        cards = [],
        markup;
    for (var i = 0; i < code.length; i++) {
        var p = code[i].innerText||code[i].textContent;

        cards.push(Ext.panel.Panel({
            title: code[i].getAttribute('data-title') || 'Code test',
            width: 800,
            bodyStyle: 'padding:5px',
            code: p,
            contentEl: code[i],
            autoScroll: true,
            bbar: [{
                text: 'Execute',
                handler: function(b) {
                    p = b.up('panel');
                    markup = eval(p.code);
                    p.body.dom.innerHTML += "<pre>" + Ext.htmlEncode(markup) + "</pre>";
                    Ext.create('Ext.window.Window', {
                        cls: 'xtemplate-results',
                        title: 'XTemplate results',
                        html: markup,
                        height: 400,
                        width: 600,
                        modal: true
                    }).show();
                }
            }]
        }));
    }
    Ext.create('Ext.Viewport', {
        layout: 'fit',
        padding: 5,
        items: {
            xtype: 'tabpanel',
            dockedItems: {
                xtype: 'component',
                dock: 'top',
                id: 'header',
                weight: -1,
                height: 30,
                autoEl: {
                    tag: 'h1',
                    html: 'XTemplate Demonstration app'
                }
            },
            items: cards
        }
    });
});