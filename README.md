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
---
--- it will ask for username and password
--- Enter the username and password that you entered at installation.

2- CREATE DIRECTORY my_exports AS 'C:\Users\user\Desktop\Specific Folder\Test';
---
--- Enter path where you want to make this directory
------- This path should contain EXPORT_FILE.DMP & export_log.log

Now close this application.
Now open Command line by search bar (win + S) or Run (win + R)

Enter this command -->
impdp Your_username/Your_Password@localhost:1521/xe directory=my_exports dumpfile=export_file.dmp logfile=import_log.log remap_schema=DATABASE:Your_DataBase_Name
---

change Your_username,Your_Password and Your_DataBase_Name accordingly.


now open the project in vscode.
open server.js.

find this code:
---
app.post('/query', async (req, res) => {
  try {
    const { query } = req.body;

    console.log('Executing query:', query);

    const conn = await oracledb.getConnection({
      user: 'STORE',
      password: 'nahibtana',
      connectionString: 'xe'
    });

change user and password this user and password of database that you entered later while creating database

now node.js should be installed in your computer if its not, google it and install it.

Now open the terminal and run
npm start
---
open another terminal and run
node server.js
---

This should run your project.
If you want to see username and password used in web-app, you can find it in your database of oracle g11 now.

