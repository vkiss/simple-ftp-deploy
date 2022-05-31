#!/usr/bin/env node

/**
 * -----------------------------
 * Requires
 * -----------------------------
 */

const fs = require( "fs" );
const { cosmiconfigSync } = require( "cosmiconfig" );
const chalk = require( "chalk" );

const explorerSync = cosmiconfigSync( "ftp" );
const globalConfig = explorerSync.search();

const simpleFtpDeploy = require( "../lib" );

const { info } = console;

/**
* ----------------------------------------------------------
*/

const getConfig = ( data ) => {
  const { configPath, msgs } = data;
  if ( fs.existsSync( configPath ) ) {
    info( chalk.gray( ">", msgs.sucess.split( " %path% " )[0] ), chalk.gray.bold( configPath ), chalk.gray( msgs.sucess.split( " %path% " )[1] ) );
    return explorerSync.load( configPath ).config;
  } else { // ERROR
    info( chalk.red.bold( `> error: ${msgs.error}` ) );
    info( chalk.red( `> ${msgs.errorSuggestion.replace( "%path%", configPath )}` ) );
    process.exit();
  }
};

const getAuthenticationInfo = () => {
  if ( globalConfig ) {
    const externalConfigFile = globalConfig.config.authFile;

    if ( externalConfigFile ) {
      return getConfig( {
        configPath: externalConfigFile,
        msgs: {
          sucess: "using %path% for authentication",
          error: "missing authentication config",
          errorSuggestion: "create the following path \"%path%\", or declare another path for the authentication file using ftp.authFile in package.json"
        }
      } );
    }
  }

  const defaultAuthFilePath = "./.deploy/auth.json";

  return getConfig( {
    configPath: defaultAuthFilePath,
    msgs: {
      sucess: "using %path% for authentication",
      error: "missing authentication config",
      errorSuggestion: "create the following path \"%path%\", or declare another path for the authentication file using ftp.authFile in package.json"
    }
  } );
};

const getDeployConfig = () => {
  if ( globalConfig ) {
    const externalConfigFile = globalConfig.config.configFile;

    if ( externalConfigFile ) {
      return getConfig( {
        configPath: externalConfigFile,
        msgs: {
          sucess: "using %path% for deploy configuration",
          error: "missing deploy config",
          errorSuggestion: "create the following path \"%path%\", or declare another path for the configuration file using ftp.configFile in package.json"
        }
      } );
    }
  }

  const defaultConfigFilePath = "./.deploy/config.json";

  return getConfig( {
    configPath: defaultConfigFilePath,
    msgs: {
      sucess: "using %path% for deploy configuration",
      error: "missing deploy config",
      errorSuggestion: "create the following path \"%path%\", or declare another path for the configuration file using ftp.configFile in package.json"
    }
  } );
};

const runScript = () => {
  // Script start message
  info( chalk.gray( "> simple-ftp-deploy.js" ) );

  simpleFtpDeploy( {
    ...getAuthenticationInfo(),
    ...getDeployConfig()
  } );
};

runScript();
