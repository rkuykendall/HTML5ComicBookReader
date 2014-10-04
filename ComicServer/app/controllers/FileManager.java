package controllers;

import AppCode.ZipFileReader;
import ViewModels.FilesViewModel;
import com.google.gson.Gson;
import play.mvc.Controller;
import views.html.read;
import play.mvc.Result;


/**
 * Created by matt on 10/3/14.
 */
public class FileManager extends Controller {
    public static Result testMethod(){
        return ok("asdljkfhgroiwgf");
    }

    public static Result readPath(String path){
        ZipFileReader f = new ZipFileReader();
        FilesViewModel vm = f.readDirectory(path);
        Gson gson = new Gson();
        String json = gson.toJson(vm);
        return ok(json);
    }
}
