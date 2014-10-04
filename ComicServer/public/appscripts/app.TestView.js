app.module('app.Views', function(Views, App, Backbone, Marionette, $) {
    Views.TestView = Marionette.ItemView.extend({
        initialize: function(){
            alert('initiallize test view');
        }
    });
});