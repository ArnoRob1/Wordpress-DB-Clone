# WPDBCLONE
wpdbclone.js is a Wordpress MySQL Database clone utility
  - Copy the whole database from one server to another
  - Performs a search and replace for WP site url replacement

wpdbclone.js uses :
* [Search&ReplaceDBMaster] - A database search and replace script in php
* [shelljs] - Portable Unix shell commands for Node.js

### Installation
You need shelljs installed globally:
```sh
$ npm i -g shelljs
```
[Search&ReplaceDBMaster] has to be installed on every server. The path to srdb.cli.php has to be defined in secrets.config. 


### Usage
```sh
$ shjs wpdbclone.js dev to local
```

### Alias
in ~/.bash_profile, add alias clone="shjs wpdbclone.js" for simplified command "clone dev to local"

### Todos
 - Add srdbpath per server in secrets.json
 - enable prefix tables export only (currently the whole DB is exported)


   [shelljs]: <https://www.npmjs.com/package/shelljs>
   [Search&ReplaceDBMaster]: <https://interconnectit.com/products/search-and-replace-for-wordpress-databases/>
   [node.js]: <https://nodejs.org/en/>
