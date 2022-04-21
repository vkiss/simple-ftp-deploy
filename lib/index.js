import FtpDeploy from "ftp-deploy";
import chalk from "chalk";
import validateOptions from "./validateOptions.js";

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

export default simpleFtpDeploy;
