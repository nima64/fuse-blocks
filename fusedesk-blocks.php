<?php
/**
 * Plugin Name:    	FuseDesk Blocks
 * Description:     Gutenberg block to show your cases from fusedesk
 * Version:         0.1.0
 * Author:          The WordPress Contributors
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     fusedesk
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


function registerAllBlocks($BLOCKS_DIR){
}

function fusedesk_blocks_init() {
    $BLOCKS_DIR = __DIR__.'/blocks';
    $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/new-cases.asset.php');

    wp_register_script(
        'new-cases-scripts',
        plugins_url( 'build/new-cases.js', __FILE__ ),
        $asset_file['dependencies'],
        $asset_file['version']
    );
 
    register_block_type( 'fusedesk/new-case', array(
        'apiVersion' => 2,
        'editor_script' => 'new-cases-scripts',
    ) );

    if (!wp_set_script_translations('new-cases-scripts','fusedesk',plugin_dir_path(__FILE__).'languages')){
        echo 'failed to load trnaslations'; 
    }

}
add_action( 'init', 'fusedesk_blocks_init' );