# simple-ftp-deploy
[![npm version](https://badge.fury.io/js/simple-ftp-deploy.svg)](https://badge.fury.io/js/simple-ftp-deploy)

A node library that simplifies the usage of [ftp-deploy](https://www.npmjs.com/package/ftp-deploy)

## Instalation

```sh
npm i simple-ftp-deploy --save-dev
```

## Repository configuration

### Create the auth file

```json
# .deploy/auth.json
{
  "host": "ftp.someserver.com",
  "user": "user",
  "password": "password",
  "port": 21
}
```

If you wish to place this file on another path, point the new auth config path into your package.json:

```json
# package.json
{
  "ftp": {
    "authFile": "./new-path/auth.json"
  }
}
```

> **Recommendation:** Do NOT commit the file containing your FTP credentials. Put it on .gitignore, or somewhere outside your project's repository

### Create the deploy config file

```json
# .deploy/config.json
{
  "localRoot": "/local-folder",
  "remoteRoot": "/public_html/remote-folder/",
  "include": ["*.php", "dist/*", ".*"],
  "exclude": ["dist/**/*.map", "node_modules/**", "node_modules/**/.*", ".git/**"],
  "deleteRemote": false,
  "forcePasv": true,
  "sftp": false
}
```

To see all config options, check [ftp-deploy](https://www.npmjs.com/package/ftp-deploy)

If you wish to place this file on another path, point the new auth config path into your package.json:

```json
# package.json
{
  "ftp": {
    "configFile": "./new-path/config.json"
  }
}
```

### Script Command

After creating all config files, include a new script on your package.json

```json
# package.json
{
  "scripts": {
    "deploy": "simple-ftp-deploy"
  }
}
```
