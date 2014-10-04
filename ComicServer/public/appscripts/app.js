window.app = new Backbone.Marionette.Application();

app.addRegions({
    mainRegion: "#main-container",
    sideBarRegion: "#side-bar-container"
})

app.on('initialize:after', function(){
    Backbone.history.start();

})



app.addInitializer(function(options) {
    app.library = options.library;

   // app.showLibrary(options);
    app.showSideBar(options);

        app.addView = new AddView({
    //        collection: app.library
        });
        app.mainRegion.show(app.addView);
})

app.showLibrary = function(options){
    app.libraryView = new LibraryView({
        collection: app.library
    });
    app.mainRegion.show(app.libraryView);
}

app.showSideBar = function(options){
    var sideBarView = new SideBarView({});
    app.sideBarRegion.show(sideBarView);
}

app.showReader = function(id){

    var readerView = new ReaderView({
        model: app.library.get(id)
    });
    app.reader=readerView;
    app.mainRegion.show(readerView);
}

app.showAdd = function(){
    app.addView = new AddView({
//        collection: app.library
    });
    app.mainRegion.show(app.addView);
}

router = new Backbone.Marionette.AppRouter({
    controller: app,
    appRoutes: {
        "reader/:id/" : "showReader",
        "library" : "showLibrary",
        "add" : "showAdd"
    }
});
