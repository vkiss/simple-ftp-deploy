const chalk = require( "chalk" );
const { info } = console;

/**
* Runs options validation. Throws error if the config is not valid.
* @param options { Object }
* @returns config { Object }
*/

const validateOptions = ( options ) => {
  const allMandatoryOptions = [
    "host",
    "user",
    "port",
    "remoteRoot",
    "deleteRemote",
    "forcePasv"
  ];

  for ( const mOption of allMandatoryOptions ) {
    if ( options[mOption] === undefined ) {
      info( chalk.red.bold( `> error: "${mOption}" undefined` ) );
      process.exit();
    }
  }

  return options;
};

module.exports = validateOptions;
