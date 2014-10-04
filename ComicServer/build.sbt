name := "ComicServer"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  javaJdbc,
  javaEbean,
  cache,
  jdbc,
  anorm,
  cache,
  "mysql" % "mysql-connector-java" % "5.1.18"
)     

play.Project.playJavaSettings
