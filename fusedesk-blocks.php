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


class Block {
    public $name;
    public $meta = [];
    public $editor_script_handle;
    public $script_handle;
    public $editor_style_handle;
    public $style_handle;

    function __construct(string $name){
        $this->name = $name;
        $this->editor_script_handle = $name.'-editor-script';
        $this->script_handle = $name.'-script';
        $this->editor_style_handle = $name.'-editor-style';
        $this->style_handle = $name.'-style';
    }
}

function registerBlock(Block $block){
    $NAMESPACE = 'fusedesk';
    $name = $block->name;
    $editorStyleH = $block->editor_style_handle; 
    $editorScriptH = $block->editor_script_handle; 
    $asset_file = include( plugin_dir_path(__FILE__).'build/'.$name.'.asset.php');

    wp_enqueue_style(
        $editorStyleH,
        plugins_url('build/'. $name . '.css',__FILE__),
    );

    wp_register_script(
        $editorScriptH,
        plugins_url('build/'.$name.'.js',__FILE__),
        $asset_file['dependencies'],
        $asset_file['version']
    );

    wp_set_script_translations($editorScriptH,'fusedesk',plugin_dir_path(__FILE__) . 'languages');
    $meta = $block->meta;
    $meta['api_version'] = 2;
    $meta['editor_script'] = $editorScriptH;
    $meta['editor_style'] = $editorStyleH;

    return register_block_type($NAMESPACE.'/'.$name,[
        'apiVersion' => 2,
        'editor_script' => $editorScriptH, 
    ]);
}

function fusedesk_block_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'fusedesk',
				'title' => __( 'Fusedesk Blocks', 'fusedesk' ),
			),
		)
	);
}


function fusedesk_blocks_init() {
    $nblock = new Block('new-case');
    registerBlock($nblock);
    $mycaseblock = new Block('my-cases');
    $regb = registerBlock($mycaseblock);
    wp_localize_script($nblock->editor_script_handle, 'WPURLS', array( 'siteurl' => get_option('siteurl') ));
    add_filter( 'block_categories', 'fusedesk_block_category', 10, 2);
}
add_action( 'init', 'fusedesk_blocks_init' );