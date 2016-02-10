# wpdbclone
Wordpress MySQL DB clone utility

Usage : "shjs wpdbclone.js dev to local"

Alias : in ~/.bash_profile, add alias clone="shjs wpdbclone.js" for simplified command "clone dev to local"

secrets.json

{
	"srdbpath": "~/path/to/srdb.cli.php",
	"servers": {

		"dev": {
			"ftp_host": "",
			"ftp_user": "",
			"ftp_pass": "",
			"db_host" : "",
			"db_name" : "",
			"db_user" : "",
			"db_pass" : "",
			"url"     : "sofeir.crea-rennes2.fr",
			"srdb"	  : true

			},

			"local": {
				"path"    : "",
				"ftp_host": "",
				"ftp_user": "",
				"ftp_pass": "",
				"db_host" : "",
				"db_name" : "",
				"db_user" : "",
				"db_pass" : "",
				"url"     : "",
				"srdb"	  : true
			}
		}
	}