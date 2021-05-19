<?php

/**
 * Registers a Gutenberg block and generates handle in the form blockname_handle
 * Behind the scenes, it also registers all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
class fusedesk_Block {
    public $name;
    public $meta = [];
    public $editor_script_handle;
    public $editor_style_handle;
    public $script_handle;
    public $style_handle;

    function __construct(string $name){
        $this->name = $name;
        $this->editor_script_handle = $name.'-editor-script';
        $this->script_handle = $name.'-script';
        $this->editor_style_handle = $name.'-editor-style';
        $this->style_handle = $name.'-style';
    }

    function register($additionArgs=[]){
        $NAMESPACE = 'fusedesk';
        $name = $this->name;
        $editorStyleHandle = $this->editor_style_handle; 
        $editorScriptHandle = $this->editor_script_handle; 
        $asset_file = include( plugin_dir_path(__FILE__).'src/'.$name.'.asset.php');

        wp_enqueue_style(
            $editorStyleHandle,
            plugins_url('src/'. $name . '.css',__FILE__),
        );

        wp_register_script(
            $editorScriptHandle,
            plugins_url('src/'.$name.'.js',__FILE__),
            $asset_file['dependencies'],
            $asset_file['version']
        );

        //localization / Internationalization
        wp_set_script_translations($editorScriptHandle,'fusedesk',plugin_dir_path(__FILE__) . 'languages');

        $meta = $this->meta;
        $meta['api_version'] = 2;
        $meta['editor_script'] = $editorScriptHandle;
        $meta['editor_style'] = $editorStyleHandle;
        $meta = array_merge($meta,$additionArgs);

        return register_block_type($NAMESPACE.'/'.$name, $meta);

    }
}

function fusedesk_blocks_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'fusedesk',
				'title' => __( 'FuseDesk Blocks', 'fusedesk' ),
			),
		)
	);
}

//convert objects to strings for multiselect data
function fusedesk_blocks_convert_obj_array_to_str($att){
    if ( is_array($att) ){
        $strJoin = '';
        foreach($att as $obj){
            $strJoin = $strJoin . $obj['id'].',';
        }
        return $strJoin;
    }else{
        return $att;
    }
}

function fusedesk_blocks_render_newcase($atts,$content=null){
    $newatts = array_map('fusedesk_blocks_convert_obj_array_to_str', $atts);
    return fusedesk_newcase($newatts, $content);
}

function fusedesk_blocks_render_mycases($atts,$content){
    $newatts = array_map('fusedesk_blocks_convert_obj_array_to_str', $atts);
    return fusedesk_mycases($newatts);
}

function fusedesk_blocks_render_teamcases($atts,$content){
    $newatts = array_map('fusedesk_blocks_convert_obj_array_to_str', $atts);
    return fusedesk_teamcases($newatts);
}

function fusedesk_blocks_init() {

    $newCaseBlock = new fusedesk_Block('new-case');
    $myCasesBlock = new fusedesk_Block('my-cases');
    $teamCasesBlock = new fusedesk_Block('team-cases');

    $newCaseBlock->register([
        'render_callback' => 'fusedesk_blocks_render_newcase'
    ]);

    $myCasesBlock->register([
        'render_callback' => 'fusedesk_blocks_render_mycases'
    ]);

    $teamCasesBlock->register([
        'render_callback' => 'fusedesk_blocks_render_teamcases'
    ]);

    wp_localize_script($newCaseBlock->editor_script_handle, 'WPURLS', array( 'siteurl' => get_option('siteurl') ));

    //adds fusedesk to categories
    add_filter( 'block_categories', 'fusedesk_blocks_category', 10, 2);
}

//NOTE admin_init will disable render_callback! 
add_action( 'init', 'fusedesk_blocks_init' );