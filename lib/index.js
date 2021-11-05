/**
 * -----------------------------
 * Requires
 * -----------------------------
 */

const FtpDeploy = require( "ftp-deploy" );
const chalk = require( "chalk" );
const validateOptions = require( "./validateOptions" );

const { info } = console;

/**
  * ----------------------------------------------------------
  */

const simpleFtpDeploy = ( options = null ) => {
  const ftpDeploy = new FtpDeploy();

  ftpDeploy
    .deploy( validateOptions( options ) )
    .then( res => {
      info( chalk.green( "> ftp deploy concluded" ) );
    } )
    .catch( err => {
      info( chalk.red.bold( "> ftp-deploy error" ) );
      info( chalk.red.bold( `> (${err.code}):` ), chalk.red( err.message ) );
    } );
};

module.exports = simpleFtpDeploy;
