package AppCode;

import ViewModels.FilesViewModel;

import java.awt.Image;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.FileVisitOption;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipException;
import java.util.zip.ZipFile;

import javax.imageio.ImageIO;



public class ZipFileReader{
	
	private ArrayList<String> zips = new ArrayList<String>();
	private String comicDir = "/home/matt/comics/";
	
	public ZipFileReader(){
		//zips.add("/home/matt/comics/Amazing Spider-Man v1 #222.cbz");
		zips = readDirectoryForZips(comicDir);
		
	}

    public FilesViewModel readDirectory(String dir){
        FilesViewModel viewModel = new FilesViewModel();
        viewModel.directory = dir;
        Path parent = Paths.get(dir).getParent();
        if(parent!=null) {
            viewModel.parent = parent.toString();
        }
        try{
            Files.list(Paths.get(dir)).forEach(filePath -> {
                if (Files.isDirectory(filePath)) {
                    viewModel.directories.add(filePath.getFileName().toString());
                } else if (Files.isRegularFile(filePath)) {
                    viewModel.files.add(filePath.getFileName().toString());
                }
            });

        }
        catch (IOException e){

        }
        Collections.sort(viewModel.directories);
        Collections.sort(viewModel.files);
        return viewModel;
    }

	private ArrayList<String> readDirectoryForZips(String dir){
		ArrayList<String> files = new ArrayList<String>();
		try{
			Files.walk(Paths.get(dir)).forEach(filePath -> {
				if( Files.isRegularFile(filePath)){
					String filename = filePath.toString();
					if(filename.contains(".cbz") || filename.contains(".cbr")){
						files.add(filename);
					}
				}
			});
		} catch(IOException e){
			
		}
		Collections.sort(files);
		return files;
	}
	
	private String lastSplit(String s){
		String[] a = s.split("\\/");
		return a[a.length-1];
	}
	
	public InputStream GetPage(int zipId, int pageId){
		File file = null;
		Image image = null;
		InputStream is = null;
		
		if(zips.size()<=zipId){
			return null;	//throw new Exception("Invalid Zip Id");
		}
		
		try {
			File f = new File(zips.get(zipId));
			if(zips.get(zipId).contains(".cbz")){
				ZipFile zip = new ZipFile(f);
				ZipEntry entry = null;
				
				for (Enumeration<? extends ZipEntry> e = zip.entries(); e.hasMoreElements() && pageId >= 0; pageId--){
					entry = (ZipEntry) e.nextElement();
					String entryName = entry.getName();	
				}
				image = ImageIO.read(zip.getInputStream(entry));
				is = zip.getInputStream(entry);
			}

		} catch (ZipException e){
			
		} catch (IOException e){
			
		}
		
		return is;	
	}

    public InputStream GetPage(String path, String fileName, int pageId){
        InputStream is = null;

        try {
            File f = new File(path+"/"+fileName);
            if(fileName.contains(".cbz")){
                ZipFile zip = new ZipFile(f);
                ZipEntry entry = null;

                for (Enumeration<? extends ZipEntry> e = zip.entries(); e.hasMoreElements() && pageId >= 0; pageId--){
                    entry =  e.nextElement();
                }
                is = zip.getInputStream(entry);
            }

        } catch (ZipException e){

        } catch (IOException e){

        }

        return is;
    }

	
    public int NumPages(String path, String fileName){
        int filesRead = 0;
        String fullName = path +"/"+fileName;
        try {
            File f = new File(fullName);
            ZipFile zip = new ZipFile(f);
            for (Enumeration<? extends ZipEntry> e = zip.entries(); e.hasMoreElements(); ){
                ZipEntry entry = e.nextElement();
                if(!entry.isDirectory()){
                    String entryName = lastSplit(entry.getName());
                    filesRead++;
                }
            }
        } catch (ZipException e){

        } catch (IOException e){

        }
        return filesRead;
    }

}