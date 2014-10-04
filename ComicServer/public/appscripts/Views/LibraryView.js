LibraryView = Backbone.Marionette.CompositeView.extend({
    tagName: 'div',
    id: 'LibraryView',
    className: 'LibraryView',
    template: '#LibraryTemplate',
    itemView: ComicView,

    appendHtml: function(collectionView, itemView){
        collectionView.$("#LibraryView").append(itemView.el);
    }

});