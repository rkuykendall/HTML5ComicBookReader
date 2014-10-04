package AppCode;


import java.sql.Connection;

import javax.sql.DataSource;

import play.db.*;

public class DbReader {
	
	public void read(){
		DataSource ds = DB.getDataSource();
		Connection connection = DB.getConnection();
		
	}
	
}

