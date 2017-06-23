## MariaDB Database Schema

#### #1 `1-structure-create_table-schools.sql`
This SQL dump represents the current structure of our `schools` table in our database.  \
 The `schools` table contains the metadata of over 7000 schools.

#### #2 `2-structure-create_table-programs.sql`
This SQL dump represents the current structure of our `programs` table in our database. \
 This `programs` table contains a list of 38 programs as classified by the US Department of Education.

##### #3 `3-data-import-lookup_table-columns.php`
This PHP file exports 1 associative array with values that are also associate arrays. \
The outer array's key references the specific column from the yearly CSV obtained from the US:DoE. The value is an associative array.\
 The inner array's key:value pairs are: \  
  - name: `database column name`  
  - type: `data type` (deprecated -- was used early on when the db schema wasnt initially created)
  - table: `table to insert into` (more or less deprecated -- was used when the database had 5 tables, before we optimized it down to 3)

##### #4 `4-data-import-populate_tables.php`
This PHP script populates both tables (`programs` and `schools`)with data, specified in the lookup table. \ 
 It loops through the entire CSV one row at a time and loops through each specified column to add to the INSERT query. \
 It then queries the database and inserts that school into database.  Upon errors, they are printed to the document. \
 
 *This code is no longer plug and play -- the schema has changed in #1 and #2 and no longer matches the script.  \
 Furthermore, the CSV for the future 2017 data dump may have columns moved around.  \
 Once a valid schema is present, a quick refactor of table and column names are all thats needed to run this script.* 

#### #5 `5-structure-create_table-programs_to_schools.sql`
This SQL dump creates the structure for the third and final table in our database, `programs_to_schools`. \
 The `programs_to_schools` table is a pivot of the metadata table.

#### #6 `6-data-populate_table-programs_to_schools.php`
This PHP script populates the `programs_to_schools` by pivoting the `schools` table. \
 An INSERT clause is performed on the results of a SELECT clause.

#### #7 `7-structure-create_column-vocational.sql`
This SQL dump adds one column `vocational` to the structure of the `programs` table. \
 It also adds data to the column via an UPDATE query.
