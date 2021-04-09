<?php
    $isApiKeyValid = fusedesk_verifyscope();

    if(get_option('fusedesk_appname') and get_option('fusedesk_apikey') and !$isApiKeyValid)
    {
            ?><div id="message" class="error"><p>
                There was an error connecting to your FuseDesk App. Please check that your FuseDesk API Key is setup correctly and has the right permissions.
            </p></div>
    <?php } ?>

<div class="wrap" xmlns="http://www.w3.org/1999/html">
    <div id="icon-tools" class="icon32"></div>
    <h2>FuseDesk Options</h2>

    <form method="post" action="options.php">
        <?php wp_nonce_field('update-options'); ?>
        <?php settings_fields('fusedesk'); ?>

        <p>
            Please enter your FuseDesk application name and your <a href="#apikey">FuseDesk API Key</a> below.
        </p>

        <?php
        if(!get_option('fusedesk_apikey') && (array_key_exists('apikey', $_GET)))
        {
            echo('<div id="message" class="updated"><p>Your FuseDesk API Key has been auto-filled into the form below. Make sure to click the <b>'.translate('Save Changes').'</b> button below.</p></div>');
        }
        ?>

        <table class="form-table">

            <tr valign="top">
                <th scope="row">App Name:</th>
                <td><code>https://<input type="text" name="fusedesk_appname" id="fusedesk_appname" value="<?php echo(fusedesk_guessappname()); ?>" />.FuseDesk.com</code>
                <?php if(!get_option('fusedesk_apikey')) { ?>
                    <input type="button" id="fusedesk_getkey" value="Get FuseDesk API Key" class="button-secondary"></td>
                <?php } ?>
            </tr>

            <tr valign="top">
                <th scope="row"><a href="#apikey">FuseDesk API Key</a>:</th>
                <td><input type="text" name="fusedesk_apikey" id="fusedesk_apikey" value="<?php echo(
                    get_option('fusedesk_apikey') ? get_option('fusedesk_apikey') :
                        (array_key_exists('apikey', $_GET) ? $_GET['apikey'] : '')
                    ); ?>" size="32" />
                    <input type="button" id="fusedesk_testbutton" value="Test" class="button-secondary">
                </td>
            </tr>
        </table>

        <?php if($isApiKeyValid) { ?>

        <h2>Departments</h2>

        <p>
            Which department would you like to assign cases to by default?
        </p>

            <?php

            if($departments =  fusedesk_departments())
            {
                echo('<select name="fusedesk_defaultdepartment" id="fusedesk_defaultdepartment">');

                foreach($departments as $departmentId => $departmentName)
                {
                    echo('<option value="'.$departmentId.
                        '" '.selected(get_option('fusedesk_defaultdepartment'), $departmentId, false).
                        '> '.$departmentName.' ('.$departmentId.')').'</option>';
                }

                echo('</select>');
                echo('<button class="button-secondary" id="fusedesk_departments_refresh">Refresh</button>');
                echo('<p>Want to assign cases to a different department on a new case form? Note down the ID of the department from the list above!</p>');
            } else {
                echo('No departments found?');
            }
            ?>


        <h2>Support Reps</h2>

        <p>
            Which rep would you like to assign cases to by default?
        </p>

        <?php
            if($reps = fusedesk_reps())
            {
                echo('<select name="fusedesk_defaultrep" id="fusedesk_defaultrep">');
                echo('<option value="" '.selected(get_option('fusedesk_defaultrep'), '', false).'>Assign Randomly</option>');
                foreach($reps as $repUserId => $repName)
                {
	                echo('<option value="'.$repUserId.
	                     '" '.selected(get_option('fusedesk_defaultrep'), $repUserId, false).
	                     '> '.$repName.' ('.$repUserId.')'.
	                     '</option>');
                }
                echo('</select>');
	            echo('<button class="button-secondary" id="fusedesk_reps_refresh">Refresh</button>');

                echo('<p>Want to assign cases to a different rep on a new case form? Note down the ID of the rep from the list above!</p>');
            } else {
                echo('No reps found?');
            }
        ?>

        <h2>Live Chat Widget</h2>
            <?php
            if(($integrations = fusedesk_chatwidgets())
               && is_array($integrations)
            ) {
                ?>
                <p>
                    Which Live Chat Widget would you like to use on this site?
                </p>
                <select name="fusedesk_livechatid" id="fusedesk_defaultchatwidget">
                <?php
                echo('<option value="" '.selected(get_option('fusedesk_livechatid'), '', false).'>[Live Chat Disabled]</option>');

                foreach($integrations as $integrationId => $integrationName)
                {
                    echo('<option value="'.$integrationId.
                        '"'.selected(get_option('fusedesk_livechatid'), $integrationId, false).
                        '> '.$integrationName.'</option>');
                }
                ?>
                </select>
                <button class="button-secondary" id="fusedesk_chatwidgets_refresh">Refresh</button>

                <p>
                    If a website visitor is logged in, should we pre-fill their contact info in Live Chat? This will allow your support team to more easily
                    see who they're helping right in FuseDesk
                </p>

                <select name="fusedesk_livechat_setcontact">
                    <option value="yes" <?php echo(selected(get_option('fusedesk_livechat_setcontact'), 'yes', false)); ?>>Yes! (Recommended)</option>
                    <option value="no"  <?php echo(selected(get_option('fusedesk_livechat_setcontact'), 'no', false));  ?>>No thank you</option>
                </select>

                <p>
                    <a href="https://<?php echo(get_option('fusedesk_appname')) ?>.fusedesk.com/app/#chatsettings" target="_blank">Configure Live Chat in FuseDesk...</a>
                </p>
                <?php
            } elseif (is_object($integrations)
                      && property_exists($integrations, 'errorcode')
                      && ($integrations->errorcode === 'api_error_noscope')
            ) {
            ?>
                <p>
                    Uh oh! This FuseDesk API Key does not have access to your live chat integrations. Edit this API Key in FuseDesk and
                    check the box for the <b>View and Search Integrations</b>.
                </p>
                <p>
                    <a href="" class="button">Check Again</a>
                    <a href="https://<?php echo(get_option('fusedesk_appname')) ?>.fusedesk.com/app/#apikeys"
                       class="button-primary" target="_blank">Grant Permission to Integrations...</a>
                </p>
                <?php
            } elseif (is_object($integrations)
                      && property_exists($integrations, 'errorcode')
            ) {
                echo('<p>API Error ('.$integrations->errorcode.'): '.$integrations->error);
            } else {
                ?>

                <p>
                    It looks like you don't have Live Chat setup yet! FuseDesk's Live Chat allows you to chat with your website visitors right from inside of FuseDesk!
                </p>
                <p>
                    <a href="" class="button">Check Again</a>
                    <a href="https://<?php echo(get_option('fusedesk_appname')) ?>.fusedesk.com/app/#chatsettings" class="button" target="_blank">Setup Live Chat...</a>
                </p>

                <?php
            }
            ?>

        <h2>Powered by FuseDesk</h2>

        <p>
            <?php fusedesk_poweredby(true); // Sync up our account status on page load... ?>
            You currently have a FuseDesk <?php echo(get_option('fusedesk_planname')); ?> account with the Powered by FuseDesk footer
            <?php if(filter_var(get_option('fusedesk_footerlink'), FILTER_VALIDATE_BOOLEAN)) { ?>
                enabled
            <?php } else { ?>
                disabled
        <?php } ?>
            in your app.
            You can adjust this in your <a href="https://<?php echo(get_option('fusedesk_appname')); ?>.fusedesk.com/app/#options" target="_blank">App Options</a>.
        </p>

        <?php
    } else {
        if(!array_key_exists('apikey', $_GET))
        {
?>

        <h2>Don't Have FuseDesk?</h2>

        <p>
            No problem! Grab your totally free, no credit card required, no time limit, fully functionally
            <a href="https://www.fusedesk.com/?utm_campaign=WordPress-Plugin&utm_source=WordPress-Plugin-Link">FuseDesk App</a>
            today to handle all of your customer support and messaging needs!
        </p>

            <p>
                <a href="https://www.fusedesk.com/?utm_campaign=WordPress-Plugin&utm_source=WordPress-Plugin-Button" class="button">Activate My Free FuseDesk App</a>
            </p>

<?php } } ?>

        <input type="hidden" name="action" value="update" />

        <p class="submit">
            <input type="submit" class="button-primary" value="<?php _e('Save Changes') ?>" />
        </p>

    </form>


    <h2>Third-Party Integrations</h2>

    <p>
        FuseDesk plays very nicely with a number of great plugins. Simply install these for increased functionality.
    </p>

    <table>
        <thead>
        <tr>
            <td>Plugin</td>
            <td>Installed?</td>
            <td>Functionality</td>
        </tr>
        </thead>
        <?php $teamsSupported = false; foreach(fusedesk_partners() as $partnername => $partner) { ?>
    <tr>
        <td><a href="<?php echo($partner['site']); ?>" target="_blank"><?php echo($partner['name']); ?></a></td>
        <td><?php echo(fusedesk_checkpartner($partnername) ? '<span style="color:green"><strong>Installed!</strong></span>' : 'Not Installed'); ?></td>
        <td>
            <?php
            if($partner['appname']) { echo('Pre-filled App Name. '); }
            if($partner['contactid']) { echo('Instant new case link. '); }
            if($partner['contact']) { echo('Pre-filled contact info. '); }
            if($partner['teamcases']) { echo('Show team cases. '); if(fusedesk_checkpartner($partnername)) { $teamsSupported = true; }}
            if($partner['forms']) { echo('Form submissions can create cases. '); }
            ?>
            </td>
    </tr>
        <?php } ?>
    </table>

    <?php foreach(fusedesk_partners() as $partnername => $partner) {
        if(fusedesk_checkpartner($partnername) and $partner['knownissues']) { ?>
            <p><b>Known Issues for <?php echo($partner['name']); ?></b><ol>
                    <?php foreach($partner['knownissues'] as $issue) { ?>
                        <li><?php echo($issue); ?></li>
    <?php } ?>
                    </ol>
    <?php }} ?>

<?php if($isApiKeyValid) { ?>
    <h2>Getting Started</h2>

    <p>
        Let customers open new cases! Add <code>[fusedesk_newcase /]</code> to your Contact Us page!
    </p>

    <p>
        Let customers see their cases! Add <code>[fusedesk_mycases /]</code> to a new page for logged in users only!
    </p>

    <p>
        Let members see their team's cases! Add <code>[fusedesk_teamcases /]</code> to a new page for logged in users only!
    </p>

    <h2>Advanced Usage</h2>

    <h3>New Case Form</h3>

    <p>
        To allow folks to open a new support case, use the <code>[fusedesk_newcase]</code> shortcode on a page. This will
        display a form.
    </p>

    <p>
        <code>[fusedesk_newcase]</code> works perfectly by itself, but also supports the following optional parameters:
    </p>

    <ul class="ul-disc">
        <li>department: The ID of the department to assign the case to. Defaults to your default department above.</li>
        <li>rep: The ID of the rep to assign the case to. Defaults to your default rep above.</li>
        <li>casetagids: Comma separated list of FuseDesk Case Tag IDs that you want to apply to new cases. Defaults to not applying any case tags.</li>
        <li>hideknowndata: Hide the name and/or email fields if we know who the user is (i.e. they're logged in.)
            Defaults to showing the fields pre-filled in</li>
        <li>nametext: The label for the name field. Defaults to "Your Name"</li>
        <li>emailtext: The label for the email field. Defaults to "Your Email Address"</li>
        <li>messagetext: The label for the message box. Defaults to 'How can we help you?</li>
        <li>buttontext: What to show on the button to create the case. Defaults to "Create Support Case"</li>
        <li>creatingtext: What to show while a case is being submitted. Defaults to 'Submitting Case..."</li>
        <li>successtext: What to show after the case is created. Defaults to "Thanks! Your case has been created. We will get back to you shortly."</li>
        <li>successredirect: URL (relative or absolute) to redirect to after a case is created. Default is not to redirect</li>
        <li>class: What CSS class to apply to our inputs</li>
        <li>style: What CSS style to apply to our inputs</li>
        <li>table: Display the inputs in a table instead of breaking with newlines. Note that if you include any
            additional content (see below) and you turn table output on, you'll need to put your additional content in
            table rows and cells with <code>&lt;tr&gt;</code> and <code>&lt;td&gt;</code> tags</li>
        <li>showtitle: Prompt for a case title. Defaults to false (i.e. don't ask for a case title)</li>
        <li>titleoptions: Optional CSV options for a case title dropdown. If this attribute is set, title will also be shown.</li>
        <li>titletext: The prompt for the case title/subject. Defaults to "Briefly, what is this request about?"</li>
        <li>File Upload Support:<ul class="ul-disc">
            <li>fileupload: Prompt for optional file upload. Set to anything to allow file uploads.
                Note that files will be uploaded and stored on your WordPress install and a link to the files will be included in the FuseDesk case.
                You should likely not enable this on public facing forms and you should be mindful of asking for any sensitive data.
                Defaults to not allowed.</li>
            <li>filetext: What text to show next to the file upload control. Defaults to "Attach a File"</li>
            <li>filerequired: If file uploads are allowed, if they should be required. Set to anything to require a file. Defaults to not required.</li>
            <li>filesmultiple: If file uploads are allowed, allow multiple files to be uploaded. Set to <code>0</code> to disable. Defaults to allowed.</li>
            <li>filetypesallowed: If file uploads are allowed, comma separated list of what <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers" target="_blank">file types</a> are supported. These can be file extensions, partial MIME types, and more. Defaults to <code>image/*,audio/*,application/pdf</code></li>
        </ul></li>
        <li>Suggested Posts<ul class="ul-disc">
            <li>suggestionstext: The label for suggested posts. Defaults to "May we suggest one of the following posts?"</li>
            <li>suggestionlimit: How many posts to suggest. Defaults to 10.</li>
            <li>suggestioncategories: Comma separated list of category names/slugs you want to restrict suggestions to. Defaults to all categories.</li>
            <li>suggestionplacement: Where to place the suggested posts. Can be set to <code>before</code> (default), <code>after</code>, <code>end</code>, or <code>none</code> (to disable)</li>
            </ul></li>
    </ul>

    <p>
        Again, all of these parameters are optional but they allow you to override any of the defaults.
    </p>

    <p>
        An example to not show the name or email if present, changing the new case button text and change the name text:<br/>
        <code>[fusedesk_newcase hideknowndata="true" nametext="Primary Contact" buttontext="Get Help!" /]</code>
    </p>

    <p>
        Whatever content you put between <code>[fusedesk_newcase]</code> and <code>[/fusedesk_newcase]</code> tags will
        be added into the case details.
    </p>

    <p>
        For example, if you wanted to include some hidden data about the customer, you could put a hidden input inside,
        like <br/>
        <code>[fusedesk_newcase]&lt;input type="hidden" name="website" value="http://members.mysite.com/"&gt;[/fusedesk_newcase]</code>
    </p>

    <p>
        You could also add some additional options and fields, for example: <br/><code>[fusedesk_newcase]Order #:
        &lt;input type="text" name="order_number"&gt;[/fusedesk_newcase]</code>
    </p>

    <p>
        You could even go all out and add in a drop down, like:<br/>
        <code>[fusedesk_newcase]&lt;select name="cruise_type"&gt;
        &lt;option value="Bahamas"&gt;Bahamas&lt;/option&gt;<br/>
        &lt;option value="Alaska"&gt;Alaska&lt;/option&gt;<br/>
        &lt;option value="Mediterranean"&gt;Mediterranean&lt;/option&gt;<br/>
        &lt;/select&gt;[/fusedesk_newcase]</code>
    </p>

    <p>
        If you name your additional fields with underscores, like cruise_type, operating_system, favorite_place_to_hike,
        etc..., we'll automatically translate those to title case, i.e. "Cruise Type", and include them all in the case details.
    </p>

    <p>
        You can include an input with <code>name="summary"</code> in your content to handle the case title/summary in your own
        custom way and we won't include the default case title.
    </p>

    <p>
        <b>Note:</b> The examples above are using HTML input fields. These need to be added by editing your page in HTML mode.
    </p>

    <p>
        <b>Second Note:</b> If you include any additional content above and you turn table output on, you'll need to
        put your additional content in table rows and cells with <code>&lt;tr&gt;</code> and <code>&lt;td&gt;</code> tags
    </p>

    <p>
        To <b>style your form</b> and form elements, either pass in the <code>style</code> parameter or <code>class</code>
        parameter or add entries for each of our elements into your style sheet. Pre-set IDs and classes include:
    </p>
    <ul class="ul-disc">
        <li>.fusedesk-contactform: all form elements have this class</li>
        <li>#fusedesk-contact: the actual form</li>
        <li>#fusedesk-contact-table: the form table, if enabled</li>
        <li>#fusedesk-contact-email: the email address input field</li>
        <li>#fusedesk-contact-name: the name input field</li>
        <li>#fusedesk-title: the title input field</li>
        <li>#fusedesk-message: the textarea for the case details</li>
        <li>#fusedesk-contactform-submit: the submit button</li>
        <li>#fusedesk-suggestions: the div that holds the suggestions list</li>
    </ul>

    <h3>Displaying a Customer's Cases</h3>

    <p>
        To display a list of cases for the logged in user, use the <code>[fusedesk_mycases]</code> shortcode on a page.
        This will display a table listing all of their cases.
    </p>

    <p>
        <code>[fusedesk_mycases]</code> works wonders by itself, but also supports the following optional parameters:
    </p>

    <ul class="ul-disc">
        <li>columns: A comma delimited list of which columns to show. Choose from casenum, date_updated, date_opened,
            date_closed, status, summary, details. Defaults to "<code>casenum,date_updated,status,summary</code>"</li>
        <li>status: Filter for which case statuses to show. Options are <code>new</code>, <code>active</code>, <code>open</code>, and <code>closed</code>. If blank, defaults to All Cases.</li>
        <li>userstatuses: Filter for which case statuses you allow a user to set with the <code>casestatus</code> query paramater. Expects a CSV with none to any of <code>new</code>, <code>active</code>, <code>open</code>, and <code>closed</code>. If not set, defaults to any valid status. Setting this restriction allows you to prevent users from viewing certain cases statuses like closed cases, for example.</li>
        <li>limit: How many cases (max) to display. Defaults to <code>50</code></li>
        <li>orderby: How to sort your cases. Expects a CSV of date and order pairs, i.e. <code>date_lastresponse desc</code>, or <code>date_opened asc</code> Defaults to <code>date_lastresponse asc, date_updated asc</code></li>
        <li>dateformat: How to format your dates. Accepts PHP's <a href="http://php.net/manual/en/function.date.php" target="_blank">date</a> formatting. Defaults to <code>M j, Y g:ia</code></li>
        <li>errornotloggedin: What message to show to customers who aren't logged in (since we won't be able to show
            cases to anyone who's not logged in. Defaults to "<code>Please login to view your cases.</code>" It is highly recommended
            that you add only put this code on pages visible to logged in users only.</li>
        <li>errornocases: What message to show to customers where they don't have any cases. Defaults to "<code>Looks like
                you don't have any support cases!</code>"</li>
        <li>{columnName}_name: What to title a given column (see <code>columns</code> above). For example, to change the column name for <code>casenum</code> to <code>Request #</code>, use <code>casenum_name="Request #"</code>.</li>
    </ul>

    <p>
        For example, to use many of the above options, try: <code>
            [fusedesk_mycases columns="casenum, status, date_opened" status="active" limit="10" orderby="date_lastresponse desc, date_opened asc" dateformat="M d" errornocases="Hooray, you don't have any active requests!" casenum_name="Request #" date_opened_name="Start Date" /]
        </code>
    </p>

    <h4>Filtering with Query Params</h4>
    <p>
        You can allow members to filter cases using a query param of <code>casestatus</code>. For example, link to your My Cases page with <code>casestatus=new</code> in the query string to filter just for new cases. The case status must be one of the allowed statuses from <code>userstatuses</code> above.
    </p>
    <p>
        You can allow members to filter cases by dates, too. We'll check for any of the following in the query string and expect a valid <a href="https://www.php.net/manual/en/function.strtotime.php" target="_blank">parsable PHP date</a>, which includes relative dates like "-30 days":
        <code>date_opened_before</code>,
        <code>date_opened_after</code>,
        <code>date_closed_before</code>,
        <code>date_closed_after</code>,
        <code>date_updated_before</code>.
        <code>date_updated_after</code>.
    </p>

    <p>
        For example, to search for cases opened in the last 30 days, put <code>date_opened_after=-30 days</code> in your query string.
    </p>

    <h3>Displaying a Team's Cases</h3>

    <p>
        Some CRMs and Membership Sites support parent / child logins or linked users / teams.
    </p>

    <?php if(!$teamsSupported) { ?>
        <p>
            <b>Important: You do NOT have a Membership Site that supports Team Cases!</b>
        </p>
    <?php } ?>

    <p>
        To display a list of cases for the logged in user's team, use the <code>[fusedesk_teamcases]</code> shortcode on a page.
        All of the options are the same as for <code>[fusedesk_mycases]</code> above with two additional error codes.
    </p>

    <ul class="ul-disc">
        <li>errornotsupported: What message to show users when your membership site platform doesn't support teams.</li>
        <li>errornoteam: What message to show users who aren't part of a team.</li>
    </ul>

<?php } ?>

<?php if(fusedesk_checkpartner('gravityforms')) { ?>

    <h3>Gravity Forms</h3>

    <p>
        FuseDesk works beautifully with <a href="?page=gf_edit_forms">Gravity Forms</a> to create a new FuseDesk case when a form is submitted.
    </p>

    <p>
        To enable this, simply click the FuseDesk option under settings for your form and check the box to create a case. Then, choose your department, optional rep, and optional case title.
    </p>

    <p>
        If you want to get really advanced with your case creation, you can set a form field's <a href="https://www.gravityforms.com/gravity-forms-feature-highlight-admin-labels/" target="_blank">Admin Label</a> to one of the following and FuseDesk will use the value of that field when creating the case:
    </p>

    <ul class="ul-disc">
        <li><code>summary</code>: The summary/title for your FuseDesk Case</li>
        <li><code>depid</code>: The FuseDesk department ID to assign the case to</li>
        <li><code>repid</code>: The FuseDesk rep User ID to assign the case to</li>
        <li><code>email</code>: The email address to link the case to</li>
        <li><code>casetags</code>: A CSV of case tag IDs or names to assign to the case</li>
    </ul>

<?php } ?>

    <a name="apikey"></a><h2>Finding your FuseDesk API Key</h2>

    <?php if(!get_option('fusedesk_apikey')) { ?>
    <p>
        Getting your FuseDesk API Key couldn't be easier! Simply enter your App Name above, then click on the
        <b>Get API Key</b> button and follow the instructions.
    </p>
    <?php } else { ?>
    <p>
        To setup a FuseDesk API Key, you'll need to:
    </p>
    <ol>
        <?php if(get_option('fusedesk_appname')) { ?>
            <li><a href="https://<?php echo(get_option('fusedesk_appname')); ?>.fusedesk.com/app/#apikeys" target="_blank">Log into your FuseDesk App</a> as an admin</li>
        <?php } else { ?>
            <li><a href="https://www.fusedesk.com/login/" target="_blank">Log into your FuseDesk App</a> as an admin</li>
        <?php } ?>
        <li>Click on Settings</li>
        <li>Click on API Keys</li>
        <li>Use an existing API Key or create a new one</li>
        <li>Copy the Key to your clipboard and paste it above.</li>
    </ol>
    <?php } ?>

</div>


<script type="text/javascript">
    jQuery(function() {
        jQuery('#fusedesk_testbutton').click(function() {

            if(!jQuery('#fusedesk_appname').val())
            {
                alert("Please enter your FuseDesk application name.");
                jQuery('#fusedesk_appname').focus();
                return false;
            } else if (!jQuery('#fusedesk_apikey').val()) {
                alert("Please enter your FuseDesk API Key");
                return false;
            }

            jQuery.get("https://" + jQuery('#fusedesk_appname').val() + ".fusedesk.com/api/v1/session/permissions", {apikey: jQuery('#fusedesk_apikey').val()}, function(response) {
                if(response.error)
                {
                    alert("Uh oh, looks like that FuseDesk API Key isn't valid: " + response.error);
                } else {
                    // Let's make sure we have our required scopes
                    var requiredScopes = ['reps','departments','cases','cases_create','cases_update','integrations'];
                    for (var i = 0; i < requiredScopes.length; i++) {
                        var requiredScope = requiredScopes[i];
                        if(response.indexOf(requiredScope) < 0)
                        {
                            alert("Your FuseDesk API Key and App name are valid, BUT your FuseDesk API key doesn't have all of the required permissions. Missing \"" + requiredScope + "\"");
                            return;
                        }
                    }

                    alert("FuseDesk API Key and App name are good! Click <?php _e('Save Changes') ?> to save your changes!");
                }
            }).fail(function(response, textStatus, errorThrown) {
                alert("Uh oh. Looks like that FuseDesk API Key isn't valid...");
            });
        });

        jQuery('#fusedesk_appname').blur(function() {
            jQuery('#fusedesk_appname').val(
                jQuery('#fusedesk_appname').val().
                replace(/^.*\/\//,'').
                replace(/\.(fusedesk|infusionsoft).*/ ,''));
            return true;
        });

        jQuery('#fusedesk_getkey').click(function() {
            if(jQuery('#fusedesk_appname').val()) {
                window.location = "https://" + jQuery('#fusedesk_appname').val() + ".fusedesk.com/app/#apikeys?newkey=<?php
                echo(urlencode(get_bloginfo('name'))); ?>&scopes=reps|departments|cases|cases_create|cases_update|integrations&returnurl=<?php
                echo(urlencode(get_bloginfo('wpurl').'/wp-admin/options-general.php?page=fusedesk')); ?>";
            } else {
                alert("Please enter your application name.");
                jQuery('#fusedesk_appname').focus();
                return false;
            }
        });

        jQuery('#fusedesk_reps_refresh').click(function() {
            jQuery('#fusedesk_reps_refresh').attr('disabled', 'disabled');
            // the_ajax_script.ajaxurl is a variable that will contain the url to the ajax processing file
            jQuery.get({
                url: the_ajax_script.ajaxurl,
                data: {action: 'fusedesk_reps', refresh: true},
                dataType: 'json'
            }).done(function(reps) {
                var repSelect = jQuery('#fusedesk_defaultrep');
                var existingDefaultRep = repSelect.val();

                if(reps) {
                    // Remove all of our options
                    jQuery("#fusedesk_defaultrep option").remove();

                    repSelect.append(new Option('Assign Randomly', '', existingDefaultRep === ''));

                    // Re-add all of our options
                    Object.keys(reps).forEach(function(repUserId) {
                        var repName = reps[repUserId];
                        repSelect.append(new Option(repName + ' (' + repUserId + ')', repUserId, false, existingDefaultRep == repUserId));
                    });
                }
                jQuery('#fusedesk_reps_refresh').removeAttr('disabled');
            });
        });
        
        jQuery('#fusedesk_departments_refresh').click(function() {
            jQuery('#fusedesk_departments_refresh').attr('disabled', 'disabled');
            // the_ajax_script.ajaxurl is a variable that will contain the url to the ajax processing file
            jQuery.get({
                url: the_ajax_script.ajaxurl,
                data: {action: 'fusedesk_departments', refresh: true},
                dataType: 'json'
            }).done(function(departments) {
                var departmentSelect = jQuery('#fusedesk_defaultdepartment');
                var existingDefaultdepartment = departmentSelect.val();

                if(departments) {
                    // Remove all of our options
                    jQuery("#fusedesk_defaultdepartment option").remove();

                    departmentSelect.append(new Option('Assign Randomly', '', existingDefaultdepartment === ''));

                    // Re-add all of our options
                    Object.keys(departments).forEach(function(departmentId) {
                        var departmentName = departments[departmentId];
                        departmentSelect.append(new Option(departmentName + ' (' + departmentId + ')', departmentId, false, existingDefaultdepartment == departmentId));
                    });
                }
                jQuery('#fusedesk_departments_refresh').removeAttr('disabled');
            });
        });
        
        jQuery('#fusedesk_chatwidgets_refresh').click(function() {
            jQuery('#fusedesk_chatwidgets_refresh').attr('disabled', 'disabled');
            // the_ajax_script.ajaxurl is a variable that will contain the url to the ajax processing file
            jQuery.get({
                url: the_ajax_script.ajaxurl,
                data: {action: 'fusedesk_chatwidgets', refresh: true},
                dataType: 'json'
            }).done(function(chatWidgets) {
                var chatWidgetSelect = jQuery('#fusedesk_defaultchatwidget');
                var existingDefaultChatWidget = chatWidgetSelect.val();

                if(chatWidgets) {
                    // Remove all of our options
                    jQuery("#fusedesk_defaultchatwidget option").remove();

                    chatWidgetSelect.append(new Option('[Live Chat Disabled]', '', existingDefaultChatWidget === ''));

                    // Re-add all of our options
                    Object.keys(chatWidgets).forEach(function(chatWidgetId) {
                        var chatWidgetName = chatWidgets[chatWidgetId];
                        chatWidgetSelect.append(new Option(chatWidgetName, chatWidgetId, false, existingDefaultChatWidget == chatWidgetId));
                    });
                }
                jQuery('#fusedesk_chatwidgets_refresh').removeAttr('disabled');
            });
        });

    });


</script>