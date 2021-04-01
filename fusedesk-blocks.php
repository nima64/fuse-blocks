<?php
/**
 * Plugin Name:    	FuseDesk Blocks
 * Description:     Gutenberg block to show your cases from fusedesk
 * Version:         0.1.0
 * Author:          The WordPress Contributors
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     my-cases
 *
 * @package         fusedesk
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */


//throw error if block is not found
function registerBlock($block,$BLOCKS_DIR){
    if(!register_block_type_from_metadata( $BLOCKS_DIR.'/'.$block )){
		// throw new WP_Error('NOT_FOUND','incorrect block '. $block .' entered for register block');
	}
}
function registerAllBlocks($BLOCKS_DIR){
    $blockfolders = scandir($BLOCKS_DIR);
    if ($blockfolders) {
        $blockfolders = array_diff($blockfolders,['..','.']);
        foreach($blockfolders as $block){
            register_block_type_from_metadata( $BLOCKS_DIR.'/'.$block );
        }
    }
}
function fusedesk_blocks_init() {
    $BLOCKS_DIR = __DIR__.'/blocks';
	// registerBlock( 'new-cases',$BLOCKS_DIR );
    registerAllBlocks($BLOCKS_DIR);
    //single block for faster debugging
	// register_block_type_from_metadata( 'new-cases',$BLOCKS_DIR );

}
add_action( 'init', 'fusedesk_blocks_init' );