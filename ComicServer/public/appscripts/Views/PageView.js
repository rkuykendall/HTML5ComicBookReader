PageView = Backbone.Marionette.ItemView.extend({
    attributes:{},

    initialize : function(){
        this.attributes.id= 'PageView-'+this.model.attributes.id;
        this.tabName = 'div';
        this.template= '#PageTemplate';
    },


    onRender : function(){
        if(this.model.attributes.hide){
            this.$el.children('img').hide();
        }
        return this;
    }
})