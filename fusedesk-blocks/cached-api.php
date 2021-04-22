<?php
function fusedesk_showcases_render($cases,$atts,$originalAtts){
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


function fusedesk_showcases_inject_defaults($atts){
    $tempatts = $atts;
    $defaults = [
        'columns' => 'casenum,date_updated,status,summary,',
        'casenum_name' => 'Case Number', // An example of how to override a column name
        'status'  => '',
        'userstatuses'  => 'new,active,open,closed', // What case statuses we allow a user to override with query string
        'limit'   => 50,
        'orderby' => 'date_lastresponse, date_updated',
        'errornotloggedin' => 'Please login to view your cases.',
        'dateformat'    => 'M j, Y g:ia',
        'errornocases'  => "Looks like you don't have any support cases!"
    ];
    return shortcode_atts($defaults, $tempatts);
}

//caches the query and data 
function fusedesk_mycases_cached( $atts ) 
{
    $prevQuery = fusedesk_cacheGet('mycases_query');
    $cases = [];
    $originalAtts = $atts;
    $atts = fusedesk_showcases_inject_defaults($atts);

    //does a query exist and is it already cached?
    if ( $prevQuery && $prevQuery == $atts ){
        $cases = fusedesk_cacheGet('mycases');
    }else{
        $cases = fusedesk_apicall('cases',$atts);
        fusedesk_cacheSet('mycases',$cases);
        fusedesk_cacheSet('mycases_query',$atts);
    }
    if ( empty($atts)){
        return 'No cases';
    }

    return fusedesk_showcases_render($cases,$atts,$originalAtts);
}
?>