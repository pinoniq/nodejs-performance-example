# NodeJS Performance enhancing drugs
> Also: let's make this sh!t slow

## General usage of this project
This project is meant to showcase and experiment with different performance metrics in NodeJS.

Most files will include comments with autocannon and/or 0x commands to run. Make sure to install these globally:
* https://www.npmjs.com/package/autocannon
* https://www.npmjs.com/package/0x

And if you are to lazy to think, here is the copy/pasta:
* `yarn global add autocannon 0x`

Optionally you can install pm2 globally, but it is also installed locally in this project.

### Installation
* download or git clone
* `yarn install`

### Run commands

A bunch of scripts to launch our app.

#### Native nodejs
* `yarn run app:start:native`

#### Managed by pm2
* `yarn run app:start:pm2`
* `yarn run app:restart:pm2`
* `yarn run app:stop:pm2`