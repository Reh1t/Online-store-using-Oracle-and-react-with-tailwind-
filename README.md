These are the instructions to start and run this project.


First of all, download oracle 11g from below link or you can download it on your own.
https://www.oracle.com/database/technologies/xe-prior-release-downloads.html

After downloading, install it and remember the username and password.

now, run the oracle g11.

After it launches, click on Application express.
It will ask for username and password that you entered at installation time.

Now create new DataBase.
Enter required fields and press create workspace.

Remember this database username and database password too as it will be used now.
open window search bar (window + S) and search for "Run sql command line".

write these commands in it now:
1- conn
--- it will ask for username and password
--- Enter the username and password that you entered at installation.

2- CREATE DIRECTORY my_exports AS 'C:\Users\Noob\Desktop\Coding Experiments\Te';
--- Enter path where you want to make this directory

Now close this application.
Now open Command line by search bar (win + S) or Run (win + R)

Enter this command -->
impdp Your_username/Your_Password@localhost:1521/xe directory=my_exports dumpfile=export_file.dmp logfile=import_log.log remap_schema=DATABASE:Your_DataBase_Name
---

change Your_username,Your_Password and Your_DataBase_Name accordingly.






