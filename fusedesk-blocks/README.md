## About ##
These are a set of gutenberg blocks made for the FuseDesk plugin.

The source for all blocks are located in the `blocks` folder and local dependencies are located in lib.  

The blocks are registered through their block.jsons.  

The main file `fusedesk-blocks.php` will search the blocks directory and grab the block's blocks.json and register them. 

## Building Blocks ##
To build the blocks, run either  
```
npm run buildall
```  
or  
```
npm run buildblock --block=blockname
```
To watch, do the same except with ```startall``` or ```startblock --block=blockname```  

## Building pot and json files for localization ##  

To pass localized strings to javascript we need to send them as JSON.

We use wp cli's i18n to compile po files to JSON. (See https://wp-cli.org/)  

wp i18n requires the extension **mbstring** for jsx. You can install this through wsl apt if you're on Windows:  
```  
sudo apt install php7.4-mbstring  
```  
Or you can install by enabling mbstring in your php.ini file.  

Build your pot ``` wp i18n make-pot . languages/fusedesk.pot ```  

After making a `.po` file from your pot file run ```wp i18n make-json languages --no-purge```
