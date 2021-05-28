<?php

function fusedesk_blocks_category($categories, $post)
{
    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'fusedesk',
                'title' => __('FuseDesk Blocks', 'fusedesk'),
            ),
        )
    );
}

//converts object array to strings for multiselect data
function fusedesk_blocks_convert_obj_array_to_str($att)
{
    if (is_array($att)) {
        $strJoin = '';
        foreach ($att as $obj) {
            $strJoin = $strJoin . $obj['id'] . ',';
        }
        return $strJoin;
    } else {
        return $att;
    }
}


//remove empty strings and empty arrays
function fusedesk_blocks_filter_empty($att)
{
    if ( empty($att) || is_array($att) && !count($att) ) {
        return false;
    }

    return true;

}

//convert objects to strings for multiselect data
function fusedesk_blocks_render_newcase($atts, $content = null)
{
    $newatts = array_map('fusedesk_blocks_convert_obj_array_to_str', $atts);
    $filtered = array_filter($newatts,'fusedesk_blocks_filter_empty');
    return fusedesk_newcase($filtered, $content);
}

function fusedesk_blocks_render_mycases($atts, $content)
{
    $newatts = array_map('fusedesk_blocks_convert_obj_array_to_str', $atts);
    $filtered = array_filter($newatts,'fusedesk_blocks_filter_empty');
    return fusedesk_mycases($filtered);
}

function fusedesk_blocks_render_teamcases($atts, $content)
{
    $newatts = array_map('fusedesk_blocks_convert_obj_array_to_str', $atts);
    $filtered = array_filter($newatts,'fusedesk_blocks_filter_empty');
    return fusedesk_teamcases($filtered);
}

function fusedesk_blocks_register_block($block_name, $args = array())
{
    $BLOCKS_DIR = __DIR__ . '/build/blocks';
    $block_editor_script_handle =  fusedesk_blocks_getHandle($block_name, 'editorScript');
    wp_set_script_translations($block_editor_script_handle, 'fusedesk', plugin_dir_path(__FILE__) . 'languages');
    //register_block_type_from_metadata($BLOCKS_DIR . '/' . $block_name, $args);
    return register_block_type_from_metadata($BLOCKS_DIR . '/' . $block_name, $args);
}

function fusedesk_blocks_getHandle($block_name, $field_name)
{
    $namespace = 'fusedesk/';
    return generate_block_asset_handle($namespace . $block_name, $field_name);
}

function fusedesk_blocks_init()
{
    fusedesk_blocks_register_block('new-case', [
        'render_callback' => 'fusedesk_blocks_render_newcase'
    ]);

    fusedesk_blocks_register_block('my-cases', [
        'render_callback' => 'fusedesk_blocks_render_mycases'
    ]);

    fusedesk_blocks_register_block('team-cases', [
        'render_callback' => 'fusedesk_blocks_render_mycases'
    ]);

    $newcase_editor_script_handle =  fusedesk_blocks_getHandle('new-case', 'editorScript');

    wp_localize_script($newcase_editor_script_handle, 'WPURLS', array('siteurl' => get_option('siteurl')));

    //adds fusedesk to categories
    add_filter('block_categories', 'fusedesk_blocks_category', 10, 2);
}

add_action('init', 'fusedesk_blocks_init');
