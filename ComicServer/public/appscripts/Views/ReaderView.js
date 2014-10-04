ReaderView = Backbone.Marionette.CompositeView.extend({
    id: 'ReaderView',
    className: 'ReaderView',
    template: '#ReaderTemplate',
    itemView: PageView,
    currentPage: 1,

    initialize: function(){
                var self = this;
                this.model;
                var models = []
                this.collection = new PageCollection();
                for(var i=1; i<=this.model.attributes.numPages; i++){
                    models.push(new PageModel({
                        id: i,
                        comicBookId: this.model.id,
                        hide: self.currentPage==i?false:true
                    }));
                }
                this.collection.add(models);


        $(document).bind('keydown', 'left', function(){self.prevPanel(self);});
        $(document).bind('keydown', 'right', function(){self.nextPanel(self);});
        $(document).bind('keydown', 'v', function(){self.fitVertical();});
        $(document).bind('keydown', 'h', function(){self.fitHorizontal();});
        $(document).bind('keydown', 'b', function(){self.fitBoth();});
    },

    appendHtml: function(collectionView, itemView){
        collectionView.$("#comicImages").append(itemView.el);
    },

    nextPanel: function(self){
        if(self.currentPage<self.model.attributes.numPages){
            self.drawPanel(++self.currentPage);
        }
    },

    prevPanel: function(self){
        if(self.currentPage>1){
            self.drawPanel(--self.currentPage);
        }
    },

    drawPanel: function(id){
        this.currentPage=id;
        for(var i=0;i<this.model.attributes.numPages;i++){
            $('#page-'+i).hide();
        }
        $('#page-'+id).show();
    },

    fitHorizontal: function() {
      $("#comicImages img").removeClass();
      $("#comicImages img").addClass('fitHorizontal');
    },

    fitVertical: function() {
      $("#comicImages img").removeClass();
      $("#comicImages img").addClass('fitVertical');
    },

    fitBoth: function() {
      $("#comicImages img").removeClass();
      $("#comicImages img").addClass('fitBoth');
    },




    loadPages : function(){
    	if(model.numPages>0){
    		for(var i = 1; i<= comicJson.numPages; i++){
    		    images.push({loaded:true, path: "/page/"+comicJson.id+"/"+i+"/"});
    		}
    	}
    }
});