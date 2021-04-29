<?php
/*
Plugin Name: FuseDesk for WordPress
Plugin URI: https://www.FuseDesk.com/?utm_campaign=WordPress-Plugin&utm_source=PluginURI
Description: Integrate your FuseDesk App with your WordPress site to connect up your CRM (like Keap, Infusionsoft, ActiveCampaign, Ontraport, etc) to your FuseDesk help desk, membership site, Memberium, AccessAlly, iMember360, Wishlist, WisP, Gravity Forms, WordPress site and more!
Version: 5.4
Author: Jeremy Shapiro
Author URI: https://www.FuseDesk.com/?utm_campaign=WordPress-Plugin&utm_source=AuthorURI
*/

/*
FuseDesk (WordPress Plugin)
Copyright (C) 2013-2021 Asandia, Corp.
*/

// error_reporting(E_ALL); // Helpful for checking for warnings that are TYPICALLY hidden but may be present on some installs

// Register our shortcodes with WordPress
include plugin_dir_path(__FILE__).'fusedesk-blocks/fusedesk-blocks.php';

add_shortcode('fusedesk_newcase', 'fusedesk_newcase');
add_shortcode('fusedesk_mycases', 'fusedesk_mycases');
add_shortcode('fusedesk_teamcases', 'fusedesk_teamcases');

add_filter( 'plugin_action_links', 'fusedesk_plugin_action_links', 10, 2 );
register_activation_hook(__FILE__,     'activate_fusedesk');
register_deactivation_hook(__FILE__, 'deactivate_fusedesk');
register_uninstall_hook(__FILE__, 'uninstall_fusedesk');


if (is_admin())
{
    add_action('admin_init', 'admin_init_fusedesk');
    add_action('admin_menu', 'admin_menu_fusedesk');

    /**
     * These API endpoints let admins request our cached data via the WordPress API. We can even optionally
     * force a data refresh. Simply call:
     *  `/wp-admin/admin-ajax.php?action=fusedesk_{dataSetName}&refresh={refresh}`
     * where `{dataSetName}` is one of `reps`, `departments`, `casetags`, or `chatwidgets`
     * and `{refresh}` is truthy (i.e. `1`) to refresh the cache.
     *
     * For example, to refresh our reps cache and return an array of reps, call:
     *  `/wp-admin/admin-ajax.php?action=fusedesk_reps&refresh=1`
     */
    add_action('wp_ajax_fusedesk_reps', 'fusedesk_ajax_reps');
    add_action('wp_ajax_fusedesk_departments', 'fusedesk_ajax_departments');
    add_action('wp_ajax_fusedesk_casetags', 'fusedesk_ajax_casetags');
    add_action('wp_ajax_fusedesk_chatwidgets', 'fusedesk_ajax_chatwidgets');
}

function admin_menu_fusedesk()
{
    add_options_page('FuseDesk', 'FuseDesk', 'manage_options', 'fusedesk', 'options_page_fusedesk');

}

function fusedesk_plugin_action_links( $links, $file )
{
    if ( $file == plugin_basename( __DIR__ .'/fusedesk.php' ) ) {
        $links[] = '<a href="options-general.php?page=fusedesk"><b>'.__('Settings').'</b></a>';
        if($appname = fusedesk_guessappname())
        {
            $links[] = '<a href="https://'.$appname.'.fusedesk.com/app/" target="_blank">FuseDesk '.__('Login').'</a>';
        }
    }
    return $links;
}

function options_page_fusedesk()
{
    include __DIR__ .'/options.php';
}
function activate_fusedesk(){

}
function deactivate_fusedesk() {
    # for now, deactivate shouldn't do anything
}

function uninstall_fusedesk() {
    delete_option('fusedesk_appname');
    delete_option('fusedesk_apikey');
    delete_option('fusedesk_defaultrep');
    delete_option('fusedesk_defaultdepartment');
    delete_option('fusedesk_planname');
    delete_option('fusedesk_footerlink');
    delete_option('fusedesk_partnercode');
    delete_option('fusedesk_livechatid');
    delete_option('fusedesk_livechat_setcontact');
    delete_option('fusedesk_cache_reps');
    delete_option('fusedesk_cache_departments');
    delete_option('fusedesk_cache_casetags');
    delete_option('fusedesk_cache_chatwidgets');
}

function admin_init_fusedesk() {
    register_setting('fusedesk', 'fusedesk_appname');
    register_setting('fusedesk', 'fusedesk_apikey');
    register_setting('fusedesk', 'fusedesk_defaultrep');
    register_setting('fusedesk', 'fusedesk_defaultdepartment');
    register_setting('fusedesk', 'fusedesk_planname');
    register_setting('fusedesk', 'fusedesk_footerlink');
    register_setting('fusedesk', 'fusedesk_partnercode');
    register_setting('fusedesk', 'fusedesk_livechatid');
    register_setting('fusedesk', 'fusedesk_livechat_setcontact');
    register_setting('fusedesk', 'fusedesk_cache_reps');
    register_setting('fusedesk', 'fusedesk_cache_departments');
    register_setting('fusedesk', 'fusedesk_cache_casetags');
    register_setting('fusedesk', 'fusedesk_cache_chatwidgets');
}

/*
 * Check to see if a partner install is online, i.e. a membership site
 */
function fusedesk_checkpartner($partner)
{
    switch($partner)
    {
        case 'imember360':
            global $i4w;
            return is_a($i4w, 'infusionWP');
            break;

        case 'wishlist':
            global $WishListMemberInstance;
            return isset($WishListMemberInstance);
            break;

        case 'memberium':
            return (defined('MEMBERIUM_INSTALLED') and MEMBERIUM_INSTALLED) or class_exists('membershipcore');
            break;

        case 'wisp':
            global $sb_wisp;
            return (isset($sb_wisp) and !is_null($sb_wisp));
            break;

        case 'accessally':
            return class_exists('AccessAlly');
            break;

        case 'gravityforms':
            return class_exists('GFForms');
            break;

        default:
            return false;
    }
}

/*
 * FuseDesk Integration Partners
 */

function fusedesk_partners()
{
    return [
        'memberium'  => [
            'name' => 'Memberium',
            'site' => 'https://www.fusedesk.com/memberium',
            'appname' => true,
            'contactid' => true,
            'contact' => true,
            'teamcases' => true,
            'forms' => false,
            'lasttested' => '2016-01-21',
            'knownissues' => [],
        ],
        'accessally' => [
            'name'        => 'AccessAlly',
            'site'        => 'https://www.fusedesk.com/getaccessally',
            'appname'     => true,
            'contactid'   => true,
            'contact'     => true,
            'teamcases'   => true,
            'forms' => false,
            'lasttested'  => '2019-11-06',
            'knownissues' => []
        ],
        'imember360' => [
            'name' => 'iMember360',
            'site' => 'http://iMember360.com/',
            'appname' => true,
            'contactid' => true,
            'contact' => true,
            'teamcases' => true,
            'forms' => false,
            'lasttested' => '2014-09-04',
            'knownissues' => [],
        ],
        'wishlist'   => [
            'name' => 'Wishlist',
            'site' => 'http://member.wishlistproducts.com/',
            'appname' => true,
            'contactid' => true,
            'contact' => true,
            'teamcases' => false,
            'forms' => false,
            'lasttested' => '2014-09-04',
            'knownissues' => [],
        ],
        'wisp'      => [
            'name'  => 'WisP',
            'site' => 'https://www.informationstreet.com/wisp-wordpress-membership-plugin/',
            'appname' => true,
            'contactid' => true,
            'contact' => true,
            'teamcases' => true,
            'forms' => false,
            'lasttested' => '2016-01-12',
            'knownissues' => [
                'Protected content can still be found via search as WisP does not hide pages, but rather just hides the content'
            ]
        ],
        'gravityforms'    => [
            'name'  => 'GravityForms',
            'site' => 'https://www.fusedesk.com/getgravityforms',
            'appname' => false,
            'contactid' => false,
            'contact' => false,
            'teamcases' => false,
            'forms' => true,
            'lasttested' => '2021-03-24',
            'knownissues' => [],
        ]
    ];
}

/*
 * Guess the app name based on installed membership sites
 */
function fusedesk_guessappname()
{
    if($appname = get_option('fusedesk_appname'))
    {
        return $appname;
    }

    if(array_key_exists('appname', $_GET) and $_GET['appname']) {
        return $_GET['appname'];
    }

    foreach(fusedesk_partners() as $partnername => $partner)
    {
        if(fusedesk_checkpartner($partnername))
        {
            $appname = false;

            switch($partnername)
            {
                case 'imember360':
                    global $i4w;
                    $appname = $i4w->API_NAME;
                    break;

                case 'wishlist':
                    global $WishListMemberInstance;
                    $appname = $WishListMemberInstance->GetOption('ismachine');
                    break;

                case 'memberium':
                    # $appname = memb_getAppName();
                    global $i2sdk;
                    return $i2sdk->isdk->getAppName();
                    break;

                case 'wisp':
                    global $sb_wisp;
                    return $sb_wisp->settings->is_app_name;
                    break;

                case 'accessally':
                    if(($api_settings = AccessAllySettingSetup::get_api_settings())
                        and (array_key_exists('app', $api_settings))
                        and ($ifs_appname = $api_settings['app'])
                    ) {
                        return $ifs_appname;
                    }
                    break;

                default:
                    break;
            }

            if($appname)
            {
                return $appname;
            }
        }
    }

    return '';
}

/*
 * Return back the Infusionsoft ContactID for the logged in user (if we have one)
 */
function fusedesk_mycontactid()
{
    foreach(fusedesk_partners() as $partnername => $partner)
    {
        if(fusedesk_checkpartner($partnername))
        {
            switch($partnername)
            {
                case 'imember360':
                    return i4w_get_contact_field('id');
                    break;

                case 'wishlist':
                    // Only Wishlist 2.9+ stores the contactID...
                    global $WishListMemberInstance;
                    if($WishListMemberInstance->Version >= 2.9)
                    {
                        global $current_user;
                        return $WishListMemberInstance->Get_UserMeta($current_user->ID, 'wlminfusionsoft_contactid');
                    }
                    break;

                case 'memberium':
                    return memb_getContactId();
                    break;

                case 'wisp':
                    global $sb_wisp, $current_user;
                    if($is_user = $sb_wisp->get_user($current_user->ID))
                    {
                        return $is_user['Id'];
                    }
                    break;

                case 'accessally':
                    return AccessAllyAPI::get_crm_contact_id();
                    break;

                default:
                    break;
            }
        }
    }

    return false;
}

/*
 * Return back the Email Address for the logged in user (if we have one!)
 */
function fusedesk_myemail()
{
    if(is_user_logged_in()) {
        global $current_user;
        wp_get_current_user();
        return $current_user->user_email;
    }

    return false;
}

/*
 * Return back the logged in user's name
 */
function fusedesk_myname()
{
    if($myinfo = fusedesk_myinfo())
    {
        return $myinfo['fullname'];
    }

    return false;
}

/*
 * Return back an array of info about the currently logged in user
 */
function fusedesk_myinfo()
{
    if(is_user_logged_in()) {
        global $current_user;
        wp_get_current_user();

        $fullName = trim($current_user->user_firstname.' '.$current_user->user_lastname);

        return [
            'firstname' => $current_user->user_firstname,
            'lastname'  => $current_user->user_lastname,
            'fullname'  =>  $fullName ?: $current_user->display_name ?: $current_user->nickname,
            'email'     => $current_user->user_email,
        ];
    }

    return false;
}

/*
 * Verify that we have the right API Permissions
 */
function fusedesk_verifyscope()
{
    $scope = fusedesk_apicall('session/permissions');

    // Make sure that we got a scope back, that it's an array, and that there isn't an error key
    if(!$scope or !is_array($scope) or array_key_exists('error', $scope))
    {
        return false;
    }

    foreach(['reps','departments','cases','cases_create','cases_update'] as $requiredScope)
    {
        if(!in_array($requiredScope, $scope, true))
        {
            return false;
        }
    }

    return true;
}

/*
 * Return back our Powered By FuseDesk link - if we have it enabled
 * Pass in true if you want to sync the setting from the FuseDesk app (we'll only do this when loading app options)
 */
function fusedesk_poweredby($sync = false)
{
    if($sync)
    {
        if(($response = fusedesk_apicall('session/poweredby'))
            && is_object($response)
            && !property_exists($response, 'error'))
        {
            update_option( 'fusedesk_planname', $response->plan);
            update_option( 'fusedesk_footerlink', $response->footerlink);
            update_option( 'fusedesk_partnercode', $response->partnercode);
        }
    }

    // Since we're storing things in the DB as strings, we'll likely be storing "true" and "false" so let's filter back to binary
    if(filter_var(get_option('fusedesk_footerlink'), FILTER_VALIDATE_BOOLEAN))
    {
        $partnerCode = get_option('fusedesk_partnercode');
        $uri = $partnerCode ?: 'app/'.get_option('fusedesk_appname');
        return 'Powered by <a href="http://GetFuseDesk.com/' .$uri. '" target="_blank"><strong>FuseDesk</strong></a>, Your Help Desk and Messaging Platform';
    }

    return '';
}

/*
 * Display a form to create a new case
 */
function fusedesk_newcase($atts, $content)
{
    $atts = shortcode_atts([
        'department' => false,
        'rep'  => false,
        'hideknowndata' => false,
        'showtitle' => false,
        'titletext' => 'Briefly, what is this request about?',
        'titleoptions' => false,
        'buttontext' => 'Create Support Case',
        'nametext' => 'Your Name',
        'emailtext' => 'Your Email Address',
        'messagetext' => 'How can we help you?',
        'creatingtext' => 'Submitting Case...<br/><img src="'.plugins_url( 'ajax-loader-bar.gif' , __FILE__ ).'">',
        'successtext' => 'Thanks! Your case has been created. We will get back to you shortly.',
        'successredirect' => '',
        'suggestionstext' => 'May we suggest one of the following posts?',
        'suggestionlimit' => 10,
        'suggestionplacement' => 'after',
        'suggestioncategories' => '',
        'filetext' => 'Attach a File',
        'fileupload' => false,
        'filerequired' => false,
        'filesmultiple' => true,
        'filetypesallowed' => 'image/*,audio/*,application/pdf',
        'casetagids' => '',
        'class' => false,
        'style' => false,
        'table' => false,
    ], $atts);

    if(!$atts['rep'])
    {
        $atts['rep'] = get_option('fusedesk_defaultrep');
    }

    if(!$atts['department'])
    {
        $atts['department'] = get_option('fusedesk_defaultdepartment');
    }

    $inputstyle = $atts['style'] ? ' style="'.$atts['style'].'"' : '';
    $inputclass= $atts['class'] ? ' ' .$atts['class'].'"' : '';

    $suggestionbox = '<div id="fusedesk-suggestions" style="display: none;" data-limit="'.$atts['suggestionlimit'].'" data-categories="'.$atts['suggestioncategories'].'"><span>'.$atts['suggestionstext'].'</span><ul style="list-style: none;"></ul></div>';

    # This atrocious one-long-line formatting is to prevent dang WP from adding line break after every input! ARG!
    $ret = '<form id="fusedesk-contact" action="#" data-successredirect="'.$atts['successredirect'].'">'.
        '<input type="hidden" name="action" value="fusedesk_newcase">'.
        '<input type="hidden" name="repid" value="'.$atts['rep'].'">'.
        '<input type="hidden" name="depid" value="'.$atts['department'].'">'.
        '<input type="hidden" name="casetags" value="'.$atts['casetagids'].'">'.
        '<input type="hidden" name="opened_from" value="http'.(isset($_SERVER['HTTPS']) ? 's' : '').'://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'].'">';

    $ret .= ($atts['table']) ? '<table id="fusedesk-contact-table">':'';

    if($contactId = fusedesk_mycontactid())
    {
        $ret .= '<input type="hidden" name="contactid" id="fusedesk-contactid" value="'.$contactId.'">';
    }

    if($name = fusedesk_myname() and $atts['hideknowndata'])
    {
        $ret .= '<input type="hidden" name="openedby" id="fusedesk-contact-name" value="'.htmlentities($name).'">';
    } else {
        $ret .= (($atts['table']) ? '<tr><td>':'').
            $atts['nametext'].
            (($atts['table']) ? '</td><td>':': ').
            '<input type="text" name="openedby" id="fusedesk-contact-name" value="'.htmlentities($name).'" class="fusedesk-contactform'.$inputclass.'"'.$inputstyle.'>'.
            (($atts['table']) ? '</td></tr>':'').
            "\n";
    }

    if(($email = fusedesk_myemail()) and $atts['hideknowndata'])
    {
        $ret .= '<input type="hidden" name="email" id="fusedesk-contact-email" value="'.htmlentities($email).'">';
    } else {
        $ret .= (($atts['table']) ? '<tr><td>':'').
            $atts['emailtext'].
            (($atts['table']) ? '</td><td>':': ').
            '<input type="text" name="email" id="fusedesk-contact-email" value="'.htmlentities($email).'" class="fusedesk-contactform'.$inputclass.'"'.$inputstyle.'>'.
            (($atts['table']) ? '</td></tr>':'').
            "\n";
    }

    if($atts['titleoptions']) {
        // Split our title options on optional spaces and a comma
        $titleOptions = preg_split('/\s*,\s*/', $atts['titleoptions']);
        // Make each option into a select entry
        $titleOptionsHtml = implode(' ', array_map( function( $titleOption ){ return '<option value="'.$titleOption.'">'.$titleOption.'</option>'; }, $titleOptions));

        $ret .= (($atts['table']) ? '<tr><td>':'').
            $atts['titletext'].
            (($atts['table']) ? '</td><td>':'').
            '<select name="summary" id="fusedesk-title" class="fusedesk-contactform'.$inputclass.'"'.$inputstyle.'>'.
            $titleOptionsHtml.
            '</select>'.
            (($atts['table']) ? '</td></tr>':'').
            "\n";

    } elseif ($atts['showtitle']) {
        $ret .= (($atts['table']) ? '<tr><td>' : '') .
            $atts['titletext'] .
            (($atts['table']) ? '</td><td>' : ': ') .
            '<input type="text" name="summary" id="fusedesk-title" value="" class="fusedesk-contactform' . $inputclass . '"' . $inputstyle . '>' .
            (($atts['table']) ? '</td></tr>' : '') .
            "\n";
    } elseif (!preg_match('/name=\"summary\"/', $content)) {
        // If we don't have anything in the content with the name of summary, include our hidden field
        $ret .= '<input type="hidden" name="summary" value="Support Request">';
    }

    if($atts['fileupload'])
    {
        $fileMultiple = $atts['filesmultiple'] ? ' multiple':'';
        $fileRequired = $atts['filerequired'] ? ' required':'';
        $ret .= (($atts['table']) ? '<tr><td>':'').
            $atts['filetext'].
            (($atts['table']) ? '</td><td>':': ').
            '<input type="file" name="file_upload'.($atts['filesmultiple'] ? '[]':'').'" accept="'.$atts['filetypesallowed'].'" id="fusedesk-fileupload" class="fusedesk-contactform'.$inputclass.'"'.$inputstyle.$fileMultiple.$fileRequired.'>'.
            (($atts['table']) ? '</td></tr>':'<br/>').
            "\n";
    }

    if($footer = fusedesk_poweredby())
    {
        $footer = "<div><p style=\"font-size: 9pt; margin-top: 10px;\">$footer</p></div>";
    }

    $ret .= $content.
        (($atts['table']) ? '<tr><td colspan="2">':'').
        (($atts['suggestionplacement'] === 'before') ? $suggestionbox : '').
        $atts['messagetext'].
        '<textarea name="details" id="fusedesk-message" class="fusedesk-contactform'.$inputclass.'"'.$inputstyle.'></textarea>'.
        (($atts['suggestionplacement'] === 'after') ? $suggestionbox : '').
        (($atts['table']) ? '</td></tr><tr><td></td><td>':'').
        '<input type="button" id="fusedesk-contactform-submit" value="'.$atts['buttontext'].'">'.
        (($atts['table']) ? '</td></tr></table>':'').
        '</form>'.
        (($atts['suggestionplacement'] === 'end') ? $suggestionbox : '').
        '<div id="fusedesk-caseopened" style="display: none;">'.$atts['successtext'].'</div>'.
        '<div id="fusedesk-casecreating" style="display: none;">'.$atts['creatingtext'].'</div>'.
        $footer;

    return $ret;
}

/*
 * Display the logged in user's cases
 * Content is discarded, so just use [fusedesk_cases /]
 */
function fusedesk_mycases($originalAtts)
{
    $atts = shortcode_atts([
        'errornotloggedin' => 'Please login to view your cases.',
    ], $originalAtts);

    $query = [];
    if($contactid = fusedesk_mycontactid()) {
        $query['contactid'] = $contactid;

    } elseif ($email = fusedesk_myemail()) {
        $query['email'] = $email;

    } else {
        // No way to search!
        return $atts['errornotloggedin'];
    }

    return fusedesk_showcases($query, $originalAtts);
}

/**
 *
 * Display cases for the logged in user's team, if supported by the membership site plugin
 *
 * @param $originalAtts
 */
function fusedesk_teamcases($originalAtts)
{
    $atts = shortcode_atts([
        'errornotloggedin' => 'Please login to view your cases.',
        'errornotsupported' => 'Viewing team cases is not supported by our membership platform.',
        'errornoteam' => 'Your login is not connected to a team.',
    ], $originalAtts);

    // Gotta be logged in to view team cases...
    if(!fusedesk_myemail()) {
        return $atts['errornotloggedin'];
    }

    $query = [];
    $supported = false;

    foreach (fusedesk_partners() as $partnerName => $partner) {
        // Are team cases even supported... ?
        if(!$partner['teamcases']) {
            continue;
        }

        if (fusedesk_checkpartner($partnerName)) {
            // Yes! Team Cases are supported
            $supported = true;

            switch ($partnerName) {
                case 'imember360':
                    if($companyId = i4w_get_contact_field('CompanyID')) {
                        $query['companyid'] = $companyId;
                    }
                    break;

                case 'memberium':
                    if($companyId = memb_getContactField('CompanyID')) {
                        $query['companyid'] = $companyId;
                    }
                    break;

                case 'wisp':
                    global $sb_wisp, $current_user;
                    if(($is_user = $sb_wisp->get_user($current_user->ID)
                        and array_key_exists('CompanyID', $is_user)
                        and ($companyId = $is_user['CompanyID']))
                    ) {
                        $query['companyid'] = $companyId;
                    }
                    break;

                case 'accessally':
                    // wp_get_current_user(); was already called above so this is set
                    global $user_ID;
                    // Goofy dereferencing needed per https://codex.wordpress.org/Function_Reference/get_user_meta
                    $myMeta = array_map( function( $a ){ return $a[0]; }, get_user_meta( $user_ID ));
                    $myTeams = [];
                    $teamCrmIds = [];

                    foreach($myMeta as $metaField => $metaValue) {
                        if(preg_match('/^accessally_team_(.*)_(\d+)$/', $metaField, $matches)) {
                            $teamId = $matches[2];
                            $myTeams[] = $teamId;
                        }
                    }

                    if(!$myTeams) {
                        break;
                    }

                    // Let's build our array of meta keys to find matching users
                    $myTeamKeys = [];
                    foreach($myTeams as $myTeam) {
                        $myTeamKeys[] = 'accessally_team_admin_'.$myTeam;
                        $myTeamKeys[] = 'accessally_team_child_'.$myTeam;
                    }

                    $myTeamKeys = array_unique($myTeamKeys);

                    // Query user_meta table for other children/admins on that team

                    $metaQuery = [
                        'relation' => 'OR'
                    ];

                    foreach($myTeamKeys as $myTeamKey)
                    {
                        $metaQuery[] = [
                            'key'     => $myTeamKey,
                            'compare' => 'EXISTS'
                        ];
                    }
                    $args  = ['meta_query' => $metaQuery];

                    $user_query = new WP_User_Query( $args );

                    // Get the results
                    $teamWpUsers = $user_query->get_results();
                    $teamWpUserIds = [];

                    // Check for results
                    if ( ! empty( $teamWpUsers ) ) {
                        // loop through each user in WP
                        foreach ( $teamWpUsers as $teamWpUser ) {
                            $teamWpUserIds[] = $teamWpUser->ID;
                        }
                    }

                    $teamWpUserIds = array_unique($teamWpUserIds);

                    foreach($teamWpUserIds as $teamWpUserId) {
                        if($crmId = AccessAllyAPI::get_crm_contact_id($teamWpUserId))
                        {
                            $teamCrmIds[] = $crmId;
                        }
                    }

                    // If we have any IDs, let's setup our query at long last
                    if($teamCrmIds) {
                        $query['contactid'] = $teamCrmIds;
                    }
                    break;

            }
        }
    }

    if(!$supported) {
        return $atts['errornotsupported'];
    }

    if(!$query) {
        return $atts['errornoteam'];
    }

    return fusedesk_showcases($query, $originalAtts);
}

function fusedesk_showcases($query, $originalAtts)
{
    $atts = shortcode_atts([
        'columns' => 'casenum,date_updated,status,summary,',
        'casenum_name' => 'Case Number', // An example of how to override a column name
        'status'  => '',
        'userstatuses'  => 'new,active,open,closed', // What case statuses we allow a user to override with query string
        'limit'   => 50,
        'orderby' => 'date_lastresponse, date_updated',
        'errornotloggedin' => 'Please login to view your cases.',
        'dateformat'    => 'M j, Y g:ia',
        'errornocases'  => "Looks like you don't have any support cases!",
        'mockdata' => false,
    ], $originalAtts);

    foreach(['status', 'limit', 'orderby'] as $attribute)
    {
        $query[$attribute] = $atts[$attribute];
    }

    // Check if any dates were provided in the query string, i.e. date_opened_before, date_closed_after, etc...
    foreach($_GET as $attribute => $value) {
        if(preg_match('/^(date_.*)_(before|after)$/', $attribute, $matches)) {
            $dateField = $matches[1];
            $beforeOrAfter = $matches[2];

            $newValue = [];

            if(array_key_exists($dateField, $query)) {
                $newValue = json_decode($query[$dateField], true);
            }

            $newValue[$beforeOrAfter] = $value;

            $query[$dateField] = json_encode($newValue);
        }
    }

    // Let's see if a user set `casestatus` was in the query string and if it's a valid status. If so, set that
    if(array_key_exists('casestatus', $_GET)
        and ($allowedUserCaseStatusList = preg_split('/\s*,\s*/', $atts['userstatuses']))
        and in_array($userSetCaseStatus = $_GET['casestatus'], $allowedUserCaseStatusList, true)
    ) {
        $query['status'] = $userSetCaseStatus;
    }

    if($atts['mockdata']) {
        $cases = [
            (object)[
                'casenum' => 'ABCD1234',
                'date_updated' => date('c'),
                'date_lastupdated' => date('c'),
                'date_closed' => date('c'),
                'status' => 'new',
                'summary' => 'Sample First Case'
            ],
            (object)[
                'casenum' => 'CDEF5678',
                'date_updated' => date('c', strtotime('-3 days, -3 hours')),
                'date_lastupdated' => date('c'),
                'date_closed' => date('c'),
                'status' => 'open',
                'summary' => 'Sample Second Case'
            ],
            (object)[
                'casenum' => 'ACEB2468',
                'date_updated' => date('c', strtotime('-15 days, -8 hours, -9 minutes')),
                'date_lastupdated' => date('c'),
                'date_closed' => date('c'),
                'status' => 'open',
                'summary' => 'Sample Third Case'
            ]
        ];
    } else {
        if(!($cases = fusedesk_apicall('cases', $query))) {
            return $atts['errornocases'];
        }
    }

    if(is_object($cases)
        && property_exists($cases, 'error')
        && $cases->error
    ) {
        # ToDo: allow options for how to report this error
        return $atts['errornocases']. '<!-- FuseDesk Error: ' .$cases->error. ' -->';
    }

    $ret = '';

    $columns = preg_split('/\s*,\s*/' , $atts['columns']);

    $ret .= '<table>';

    $ret .= "\n\t<thead><tr>";
    foreach($columns as $col)
    {
        // Our default Column Title converts underscores to spaces and Title Cases it
        $columnTitle = ucwords(str_replace('_', ' ', $col));

        // If our shortcode overrides the Column Title, though... we use that instead
        // Shortcode attribute would be along the lines of `casenum_name="Case Number"`
        if(array_key_exists($columnNameAtt = $col.'_name', $atts)) {
            $columnTitle = $atts[$columnNameAtt];
        } elseif(array_key_exists($columnNameAtt, $originalAtts)) {
            $columnTitle = $originalAtts[$columnNameAtt];
        }

        $ret .= "\n\t\t<td class=\"fusedesk-cases-columnhead-".$col.'">' .$columnTitle. '</td>';
    }
    $ret .= "\n\t</tr></thead>";

    foreach($cases as $case)
    {
        $ret .= "\n\t<tr>";
        foreach($columns as $col)
        {
            $ret .= "\n\t\t<td>";

            if(strpos($col, 'date_') === 0)
            {
                $ret .= property_exists($case, $col) ? date($atts['dateformat'], strtotime($case->$col)) : '';
            } else {
                $ret .= property_exists($case, $col) ? $case->$col : '';
            }
            $ret .= '</td>';
        }
        $ret .= "\n\t</tr>";
    }

    $ret .= "\n</table>";

    return $ret;
}

/*
 * Process FuseDesk AJAX case creation
 */
function fusedesk_ajax_newcase()
{
    $args = [];

    // We'll want to include the name of the contact in the body of the case - if it's set
    if(array_key_exists('openedby', $_POST)) {
        $_POST['name'] = $_POST['openedby'];
    }

    foreach(['depid', 'repid', 'summary', 'details', 'openedby', 'contactid', 'email', 'casetags'] as $field)
    {
        if(array_key_exists($field, $_POST))
        {
            $args[$field] = $_POST[$field];
            // Let's keep email in the note text in case we can't link it up...
            if($field !== 'email') {
                unset($_POST[$field]);
            }
        }
    }

    unset($_POST['action']);

    // Let's handle any file uploads
    if(!empty($_FILES)) {
        // Loop through our file upload controls...
        foreach($_FILES as $fileInputName => $fileInput) {
            $fileInputName = ucwords(str_replace('_', ' ', $fileInputName));
            $fileLinks = [];

            // If only a single file was uploaded for this control, convert it to an array so we can support
            // both single and multiple file uploads on a control the same way
            if(!is_array($fileInput['name'])) {
                foreach($fileInput as $fileInputField => $fileInputValue) {
                    $fileInput[$fileInputField] = [$fileInputValue];
                }
            }

            // Now process each of our files for this file input
            for($fileIndex = 0, $filesTotal = count($fileInput['name']); $fileIndex < $filesTotal; $fileIndex++) {
                $fileName = $fileInput['name'][$fileIndex];

                // Empty control or file name? Move on.
                if(!$fileName) { continue; }

                // Any upload errors?
                if($fileInput['error'][$fileIndex]) {
                    fusedesk_error($fileName.': '.$fileInput['error'][$fileIndex]);
                }

                // Let's generate a sudo-random file name prefix
                $filenamePrefix = 'fusedesk-'.substr(md5(mt_rand().time()), 0, 8).'-';

                $localFile = wp_upload_bits($filenamePrefix.$fileName, null, file_get_contents($fileInput['tmp_name'][$fileIndex]));

                // Were we able to save our file?
                if($localFile['error']) {
                    fusedesk_error($fileName.': '.$localFile['error']);
                }

                $fileLinks[] = $localFile['url'];
            }
            if($fileLinks) {
                $args['details'] .= "\n$fileInputName:\n * ".implode("\n * ", $fileLinks);
            }
        }
    }

    foreach(array_keys($_POST) as $key)
    {
        $args['details'] .= "\n".ucwords(str_replace('_', ' ', $key)). ': ' .$_POST[$key];
    }

    echo(json_encode(fuseDeskCreateCase($args)));
    die();
}

function fusedesk_ajax_reps() {
    $forceRefresh = (array_key_exists('refresh', $_GET) && $_GET['refresh']);
    echo(json_encode(fusedesk_reps($forceRefresh)));
    die();
}

function fusedesk_ajax_departments() {
    $forceRefresh = (array_key_exists('refresh', $_GET) && $_GET['refresh']);
    echo(json_encode(fusedesk_departments($forceRefresh)));
    die();
}

function fusedesk_ajax_casetags() {
    $forceRefresh = (array_key_exists('refresh', $_GET) && $_GET['refresh']);
    echo(json_encode(fusedesk_casetags($forceRefresh)));
    die();
}

function fusedesk_ajax_chatwidgets() {
    $forceRefresh = (array_key_exists('refresh', $_GET) && $_GET['refresh']);
    echo(json_encode(fusedesk_chatwidgets($forceRefresh)));
    die();
}

function fuseDeskCreateCase($case) {
    return fusedesk_apicall('cases', $case, 'POST');
}

function fusedesk_error($errorString = '') {
    echo(json_encode(['error' => $errorString]));
    die();
}

/*
 * Process FuseDesk AJAX case search
 */
function fusedesk_ajax_search()
{
    if(!array_key_exists('q', $_GET))
    {
        fusedesk_error("Missing required parameter 'q'");
    }

    if (!trim($_GET['q'])) {
        fusedesk_error('Empty search');
    }

    $searchQuery = [
        's' => trim($_GET['q']),
        'post_status' => 'publish'
    ];

    // Are we filtering for only certain categories?
    if(array_key_exists('categories', $_GET) and $_GET['categories']) {
        // Do we need/want to sanitize this or will WP_Query handle that for us?
        $searchQuery['category_name'] = $_GET['categories'];
    }

    $query = new WP_Query($searchQuery);

    $results = [];

    $matches = 0;
    $limit = array_key_exists('limit', $_GET) ? 1*$_GET['limit'] : 10;

    if ( $query->have_posts() ) {
        while ( $query->have_posts() and ($matches++ < $limit)) {
            $query->the_post();
            $results[] = [
                'title' => get_the_title(),
                'url' => get_permalink(),
                'preview' => get_the_excerpt(),
            ];
        }
    }

    echo(json_encode([
        'query' => $searchQuery['s'],
        'count' => 1*$query->found_posts,
        'limit' => $limit,
        'results' => $results,
    ]));
    die();
}

add_action('wp_ajax_fusedesk_newcase', 'fusedesk_ajax_newcase');        // for logged in users
add_action('wp_ajax_fusedesk_search', 'fusedesk_ajax_search');          // for logged in users
add_action('wp_ajax_nopriv_fusedesk_newcase', 'fusedesk_ajax_newcase'); // for non-logged in visitors
add_action('wp_ajax_nopriv_fusedesk_search', 'fusedesk_ajax_search');   // for non-logged in visitors
add_action('wp_head', 'fusedesk_livechatwidget' );                      // For our Live Chat Widget
add_action('wp_footer', 'fusedesk_livechat_setcontact' );               // Set the contact for our logged in users
add_action('gform_loaded', 'gf_fusedesk_load', 5 );                     // Detect and support Gravity Forms
add_action('gform_after_submission', 'gf_fusedesk_createcase', 10, 2 ); // Gravity Forms submission

/*
 * This (and the subsequent add_action) loads up the needed JS to send ajax queries...
 */
function fusedesk_ajax_load_scripts()
{
    // load our javascript (jQuery)
    wp_enqueue_script( 'fusedesk-ajax', plugin_dir_url( __FILE__ ) . 'fusedesk-ajax.js', array( 'jquery' ) );

    // setup the ajaxurl variable for above
    wp_localize_script( 'fusedesk-ajax', 'the_ajax_script', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );
}
add_action('wp_print_scripts', 'fusedesk_ajax_load_scripts');


/*
 * Internal function used to make FuseDesk API Calls
 */
function fusedesk_apicall($uri, $args = [], $type = 'GET', $apiVersion = 1)
{
    if(!get_option('fusedesk_apikey') || !get_option('fusedesk_appname'))
    {
        return false;
    }

    $fullUrl = 'https://'.get_option('fusedesk_appname').'.fusedesk.com/api/v'.$apiVersion.'/'.$uri;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $fullUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['X-FuseDesk-API-Key: '.get_option('fusedesk_apikey')]);

    if($type === 'POST') {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $args);
    } else {
        // If we're making a GET request, append the args to the end of the URL
        curl_setopt($ch, CURLOPT_URL, $fullUrl.'?'.http_build_query($args));
    }
    // Decode our JSON into an object - not an array - since some systems have different defaults
    return json_decode(curl_exec($ch), false);
}

/**
 * This hook is called when Gravity Forms is loaded. This the includes and inits our
 * FuseDesk Add-On for Gravity Forms.
 */
function gf_fusedesk_load() {
    // This should only ever be called by Gravity Forms, but just in case, let's make sure that our class and method exist
    if (!class_exists('GFForms')
        || !method_exists( 'GFForms', 'include_addon_framework')
    ) {
        return;
    }

    require_once( 'fusedesk-gfaddon.php' );

    GFAddOn::register( 'FuseDeskGfAddon' );
}

/**
 *
 * This hook is called when a Gravity Forms form is submitted.
 *
 * We use this to create our FuseDesk case if FuseDesk case creation is enabled for the form
 *
 * @param $submission
 * @param $form
 *
 * @return false|mixed
 */
function gf_fusedesk_createcase( $submission, $form ) {
    // If `fusedesk` isn't configured or `enabled` for this form, bail
    if(!is_array($fuseDeskConfig = rgar($form, 'fusedesk'))
        || !rgar($fuseDeskConfig, 'enabled')
    ) {
        return false;
    }

    $newCase = [
        'details' => '',
        'summary' => rgar($fuseDeskConfig, 'summary', esc_html__( 'Support Request', 'fusedesk')),
        'openedby' => fusedesk_myname() ?: fusedesk_myemail(),
        'depid' => rgar($fuseDeskConfig, 'depid', get_option('fusedesk_defaultdepartment')),
        'repid' => rgar($fuseDeskConfig, 'repid', get_option('fusedesk_defaultrep')),
    ];

    // Set our CRM Contact ID if possible
    if($contactId = fusedesk_mycontactid()) {
        $newCase['contactid'] = $contactId;
    }

    // If certain fields have an admin label matching one of these names then we will use that value for our case
    $fieldWeCanSetWithAdminLabel = ['summary', 'repid', 'depid', 'email', 'casetags'];

    // Go through each of our form fields
    foreach ( $form['fields'] as $field ) {
        if (($field->type === 'email')
            && !empty($submission[$field->id])
            && !array_key_exists('email', $newCase)
        ) {
            // Set our email if it's not set yet and the type of this field is 'email'
            $newCase['email'] = $submission[$field->id];
        } elseif(in_array($fieldNameLowerCase = strtolower($field->adminLabel), $fieldWeCanSetWithAdminLabel)
            && !empty($submission[$field->id])
        ) {
            // Allow certain of our fields to be overridden based on admin label
            $newCase[$fieldNameLowerCase] = $submission[$field->id];
        } elseif(!empty($submission[$field->id])) {
            // Not a special field, so add it to our description
            $newCase['details'] .= $field->label. ': ' .$submission[$field->id]."\n";
        }
    }

    // Append some additional GF fields we care about
    foreach(['IP', 'Source_URL', 'User_Agent', 'ID', 'Form_ID'] as $submissionField) {
        if(!empty($submission[strtolower($submissionField)])) {
            $newCase['details'] .= "\n".str_replace('_', ' ', $submissionField). ': ' .$submission[strtolower($submissionField)];
        }
    }

    // No email address? Try and get it from the current user
    if(!array_key_exists('email', $newCase)) {
        if($contactEmail = fusedesk_myemail()) {
            // Got an email for our logged in user? Use that.
            $newCase['email'] = $contactEmail;
        } else {
            // Couldn't find an email? Bail
            GFCommon::log_debug( 'gf_fusedesk_createcase: No email found. No FuseDesk Case Created');
            return false;
        }
    }

    // print "<h2>Submission</h2><pre>".var_export($submission, true)."</pre><h2>Form</h2><pre>".var_export($form, true)."</pre><h2>New Case</h2><pre>".var_export($newCase, true)."</pre>";

    GFCommon::log_debug( 'gf_fusedesk_createcase: FuseDesk Case => ' . print_r( $newCase, true ) );

    // No response? Not good.
    if(!($fuseDeskCase = fuseDeskCreateCase($newCase))) {
        GFAPI::add_note( $submission['id'], null, 'FuseDesk', esc_html__( 'Unknown error creating case', 'fusedesk'));
        return false;
    }

    // Error? Not good. Log the error
    if(property_exists($fuseDeskCase, 'error')) {
        GFAPI::add_note( $submission['id'], null, 'FuseDesk', esc_html__( 'Error creating case. ', 'fusedesk').$fuseDeskCase->error);
        return false;
    }

    // Case number? Good! Log the case number
    if(property_exists($fuseDeskCase, 'casenum')) {
        GFAPI::add_note( $submission['id'], null, 'FuseDesk', 'FuseDesk Case #'.$fuseDeskCase->casenum.' Created!'."\n".'https://'.get_option('fusedesk_appname').'.fusedesk.com/app/#cases/view/'.$fuseDeskCase->casenum);
        return true;
    }

    // No error or case number? Not good... Log the raw response
    GFAPI::add_note( $submission['id'], null, 'FuseDesk', var_export($fuseDeskCase, true));
    return false;
}

function fusedesk_apicallV2($url, $args = [], $type = 'GET') {
    return fusedesk_apicall($url, $args, $type, 2);
}

/**
 *
 * Return back an array of departments from the FuseDesk API
 *
 * Supports caching
 *
 * @param int $forceRefresh force a refresh, i.e. don't use cached data
 *
 * @return array
 */
function fusedesk_departments($forceRefresh = false) {
    if(!$forceRefresh
        && ($departments = fusedesk_cacheGet('departments'))
    ) {
        return $departments;
    }

    if(($departments = fusedesk_apicallV2('departments'))
        && is_array($departments)
    ) {
        // Clean our departments to just ID/Name
        $departmentsSimple = [];
        foreach($departments as $department) {
            $departmentsSimple[$department->id] = $department->name;
        }

        return fusedesk_cacheSet('departments', $departmentsSimple);
    } else {
        return [];
    }
}

/**
 *
 * Return back an array of reps from the FuseDesk API
 *
 * Supports caching
 *
 * @param int $forceRefresh force a refresh, i.e. don't use cached data
 *
 * @return array
 */
function fusedesk_reps($forceRefresh = false) {
    if(!$forceRefresh
        && ($reps = fusedesk_cacheGet('reps'))
    ) {
        return $reps;
    }

    if(($reps = fusedesk_apicallV2('reps'))
        && is_array($reps)
    ) {
        // Cache only active reps...
        $activeReps = [];
        foreach($reps as $rep) {
            if ($rep->active) {
                $activeReps[$rep->userId] = $rep->firstName.' '.$rep->lastName;
            }
        }
        return fusedesk_cacheSet('reps', $activeReps);
    } else {
        return [];
    }
}


/**
 *
 * Return back an array of case tags from the FuseDesk API
 *
 * Supports caching
 *
 * @param int $forceRefresh force a refresh, i.e. don't use cached data
 *
 * @return array
 */
function fusedesk_casetags($forceRefresh = false) {
    if(!$forceRefresh
        && ($caseTags = fusedesk_cacheGet('casetags'))
    ) {
        return $caseTags;
    }

    if(($caseTags = fusedesk_apicall('casetags'))
        && is_array($caseTags)
    ) {
        // Clean our case tags to just ID/Name
        $tagsSimple = [];
        foreach($caseTags as $caseTag) {
            $tagsSimple[$caseTag->id] = $caseTag->tagname;
        }

        return fusedesk_cacheSet('casetags', $tagsSimple);
    } else {
        return [];
    }
}
/**
 *
 * Return back an array of chat widgets from the FuseDesk API
 *
 * Supports caching
 *
 * @param int $forceRefresh force a refresh, i.e. don't use cached data
 *
 * @return array|object
 */
function fusedesk_chatwidgets($forceRefresh = false) {
    if(!$forceRefresh
        && ($chatWidgets = fusedesk_cacheGet('chatwidgets'))
    ) {
        return $chatWidgets;
    }

    if(($chatWidgets = fusedesk_apicall('integrations'))
    ) {
        // Got an array? Super. Cache it.
        if(is_array($chatWidgets)) {
            // Clean our chat widgets to just ID/name
            $integrationsSimple = [];
            foreach($chatWidgets as $chatWidget) {
                if($chatWidget->platform === 'livechat') {
                    $integrationsSimple[$chatWidget->id] = $chatWidget->name;
                }
            }

            return fusedesk_cacheSet('casetags', $integrationsSimple);
        }

        // Got an object? Not good. Pass the error back
        if(is_object($chatWidgets)
            && property_exists($chatWidgets, 'errorcode')
        ) {
            return $chatWidgets;
        }

    } else {
        return [];
    }
}

/**
 *
 * Get a cached FuseDesk data set. Returns it if not expired yet. Otherwise null
 *
 * @param string $dataset
 *
 * @return null|array
 */
function fusedesk_cacheGet($dataset) {
    if($cachedData = get_option('fusedesk_cache_'.$dataset)) {
        if($cachedData->cacheExpiry > time()) {
            return $cachedData->data;
        }
    }
    return null;
}

/**
 *
 * Cache a FuseDesk data set. Returns the passed data so it can be passed on
 *
 * @param string $dataset
 * @param array $data
 *
 * @return array
 */
function fusedesk_cacheSet($dataset, $data) {
    update_option('fusedesk_cache_'.$dataset, (object)[
        'cacheExpiry' => time() + 60*60*2, // 2 hours
        'data' => $data
    ]);

    return $data;
}

// Return the embed code for the Live Chat Widget (if configured)
function fusedesk_livechatwidget()
{
    if($liveChatIngertationId = get_option('fusedesk_livechatid'))
    {
        // We can't use wp_enqueue_script as we want async
        echo '<script async src="https://chats.fusedesk.com/lc/embed/'.get_option('fusedesk_appname').'/'.$liveChatIngertationId.'.js"></script>'."\n";
    }
}

// Output our contact's info for live chat (if we want to and they're logged in)
function fusedesk_livechat_setcontact()
{
    // If we're not logged in, there's nothing to do here
    if (!is_user_logged_in()) {
        return false;
    }

    // Bail if option is set to `no`
    if (get_option('fusedesk_livechat_setcontact') === 'no') {
        return false;
    }

    // Note: We don't actually care if the chat widget is selected as it can be included outside of the plugin, i.e. in Google Tag Manager

    echo "\n<!--- FuseDesk Live Chat Pre-Fill --->\n<script type=\"text/javascript\">\nif (window.FuseDeskChatNS && window.FuseDeskChatNS.set){ initFuseDeskChat(window.FuseDeskChatNS);}else{window.FuseDeskChatNS = initFuseDeskChat; }\nfunction initFuseDeskChat(FuseDeskChatNS){";

    if($myName = fusedesk_myname()) {
        echo "\n  ".'FuseDeskChatNS.setClientName(\''.preg_replace('/\'/','\\\'', $myName).'\');';
    }

    if($myEmail = fusedesk_myemail()) {
        echo "\n  ".'FuseDeskChatNS.setClientEmail(\''.$myEmail.'\');';
    }

    if($myContactId = fusedesk_mycontactid()) {
        echo "\n  ".'FuseDeskChatNS.setContactId('.$myContactId.');';
    }

    echo "\n}\n</script>\n\n";

    return true;
}

?>