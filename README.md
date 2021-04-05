## About ##
These are a set of gutenberg blocks made for the plugin fusedesk.  
All blocks are located in the blocks folder and local dependencies are located in lib.  

The blocks are registered through their block.jsons'.  
The main file fusedesk-blocks.php will search the blocks directory and grab the block's blocks.json and register them. 

## Buiding ##
To build the blocks run either  
```
npm run buildall
```  
or  
```
npm run buildblock --block=blockname
```
To watch, do the same except with ```startall``` and ```startblock --block=blockname```
