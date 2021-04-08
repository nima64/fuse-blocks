## About ##
These are a set of gutenberg blocks made for the plugin fusedesk.  
The source for all blocks are located in the blocks folder and local dependencies are located in lib.  

The blocks are registered through their block.jsons'.  
The main file fusedesk-blocks.php will search the blocks directory and grab the block's blocks.json and register them. 

## Building Blocks ##
To build the blocks run either  
```
npm run buildall
```  
or  
```
npm run buildblock --block=blockname
```
To watch,  
do the same except with ```startall``` and ```startblock --block=blockname```  

## Building POT files for localization ##  
Scripts need language files in **json**.I use wp cli to compile my pot files to json.
To build with wp cli
Start by installing see https://wp-cli.org/  

wp i18n requires the extension **mbstring** for jsx  
I recommend installing through wsl apt if your on windows.  
```  
sudo apt install php7.4-mbstring  
```  
Or you can install by enabling mbstring your php.ini file.  

Build your pot ``` wp i18n make-pot . languages/fusedesk.pot ```  

Now JSON just run ```wp i18n make-json . languages/fusedesk-yourlang.po --no-purge```

