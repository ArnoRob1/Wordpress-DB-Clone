/** WPDBCLONE
*
* Version 0.1.0
*
* A script to clone a WordPress Database (MySQL)
*******************************************************************************************************/

var shell   = require( 'shelljs' );

/***************
* CONFIGURATION
****************/

/* Secret Configuration file */
var configs = require( './secrets.json' );

/* Tunels a command through SSH */
function sshy(command, server) {
	return ("ssh " + server.ftp_user + "@" + server.ftp_host + " '" + command + "'");
}

/* Write a red message */
function warn(message) {
	shell.echo("\n\n\033[0;31m" + message + "\n\n\033[0m");
}

var from_arg = process.argv[2];
var to_arg   = process.argv[4];

if(from_arg == undefined || to_arg == undefined) {

	warn("Please specify FROM and TO ARGUMENTS. Usage example : shjs wpdbclone.js dev to local");

} else {

	if(to_arg == 'prod') {

		warn("Deployment to PRODUCTION server is not allowed !!!");

	} else {

		var from_server = configs.servers[from_arg];
		var to_server         = configs.servers[to_arg];

	// Dump and zip a DB
	var dump  = "mysqldump --user=" + from_server.db_user + " --password=" + from_server.db_pass + " --host=" + from_server.db_host + " " + from_server.db_name + " | gzip -9"; 

	// Unzip and load a DB
	var load = "gzip -d | mysql --user=" + to_server.db_user + " --password=" + to_server.db_pass + " --host=" + to_server.db_host + " " + to_server.db_name;

	if(from_server != configs.servers.local) dump = sshy(dump, from_server);
	if(to_server   != configs.servers.local) load = sshy(load, to_server);

	var transfer_db  = dump + " | " + load;

	var searchhost = (to_server.db_host == "localhost") ? "127.0.0.1" : to_server.db_host; // Localhost is not working with Search&Replace DB Master - replace with 127.0.0.1

	var php = (to_server==configs.servers.local)?'php':'php.ORIG.5_3'; // On OVH Mutualised servers, CLI PHP version is 4.9, 5.* required

	var search = php + " " + configs.srdb_path " -h " + searchhost + " -u " + to_server.db_user + " -p " + to_server.db_pass + " -n " + to_server.db_name + " -s '" + from_server.url + "' -r '" + to_server.url + "'";

	if(to_server != configs.servers.local) search = sshy(search, to_server);

	shell.exec(transfer_db, function() {

		shell.echo("\n\nDatabase has been transfered.\n\n");

		if(to_server.srdb) {
			shell.exec(search);
		} else {
			warn("Replacement in database not possible - Please use Search&ReplaceDbMaster...");
		}
		
	});

}
}


