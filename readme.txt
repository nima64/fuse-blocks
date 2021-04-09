=== FuseDesk ===
Contributors: jeremyshapiro
Tags: FuseDesk, Keap, Infusionsoft, ActiveCampaign, Ontraport, iMember360, InfusionWP, Memberium, AccessAlly, WisP, WishList, Infusion, Help Desk, Ticketing, Support, Live Chat, Chat Widget, Chat, Facebook Messenger, Twitter, SMS, Gravity Forms
Requires at least: 2.0.2
Tested up to: 5.7.1
Stable tag: 5.4

Integrate with FuseDesk so your CRM (Keap, Infusionsoft, ActiveCampaign, Ontraport, etc) contacts, membership site members, students, or site visitors can easily open new support cases directly in your FuseDesk help desk application or start a Live Chat right from your website!

== Description ==

Integrate with [FuseDesk](https://www.fusedesk.com/?utm_campaign=WordPress-Plugin&utm_source=WordPress-Plugin-ReadMe "FuseDesk - HelpDesk and Messaging Platform") so your CRM (Keap, Infusionsoft, ActiveCampaign, Ontraport, etc) contacts, membership site members, students, or site visitors can easily open new support cases directly in your FuseDesk help desk application and view their cases. Your website visitors can even start a Live Chat with your support team right from your site! Works great with Membership sites like Memberium, AccessAlly, iMember360, WishList Member, WisP, and more!

== Installation ==

To install, upload fusedesk.zip to your WordPress site. Activate the plugin and click on settings.

1. From here, you'll need to enter you Keap/Infusionsoft/FuseDesk application name, and can then click to get an API Key.
1. Click Save Changes, choose a default department, and then Save Changes again.
1. Now simply use the `[fusedesk_newcase]` or `[fusedesk_mycases]` on a page!

== Frequently Asked Questions ==

= Does this plugin require a CRM like Keap, Infusionsoft, ActiveCampaign, or Ontraport? =

Nope! [FuseDesk](https://www.fusedesk.com/?utm_campaign=WordPress-Plugin&utm_source=WordPress-Plugin-ReadMe "FuseDesk - HelpDesk and Messaging Platform") works beautifully on its own. You can optionally connect FuseDesk to your CRM if you have one. For example, [Keap or Infusionsoft](https://www.fusedesk.com/15130/infusionsoft-connect-fusedesk/), [ActiveCampaign](https://www.fusedesk.com/15121/activecampaign-connect-fusedesk/), [Ontraport](https://www.fusedesk.com/15506/ontraport-connect-fusedesk/), etc.

= Do I need a FuseDesk account? =

Yes! You'll need a FuseDesk account for this plugin to work. Don't have a FuseDesk app yet? No problem. You can [get stated with FuseDesk for free](https://www.fusedesk.com/?utm_campaign=WordPress-Plugin&utm_source=WordPress-Plugin-ReadMe "FuseDesk - HelpDesk and Messaging Platform").

= Do I need my Keap / Infusionsoft / ActiveCampaign / Ontraport / CRM API Key? =

Nope. Use a FuseDesk API Key. After you install the plugin, we'll show you how to get an API Key with a few quick clicks.

= How do I add a form to create a case? =

Simply add the `[fusedesk_newcase /]` shortcode to your page or post and we'll automatically add the form to the page for you!

= Does FuseDesk work with my Membership site? =

Yes! The FuseDesk plugin allows your logged in members to view their cases. Simply add the `[fusedesk_mycases /]` shortcode to a Members Only page. We work great with Membership Site Plugins like AccessAlly, Memberium, iMember360, WishList, and more.

= How can my website visitors start a live chat? =

Simply select which Live Chat Widget you'd like to use on your site from the options page and we'll automatically add your live chat widget to your site for you.

= How do I setup and configure my live chat widget? =

You can easily edit your Live Chat Widget in your FuseDesk app under Chat Settings.

= Do logged in users need to enter their info to start a live chat? =

If a user is logged in, for example to your membership site, we can easily pre-fill their info for Live Chat saving your support team and customers valuable time.

= Can I use Gravity Forms to create a FuseDesk case? =

Yes! FuseDesk works beautifully with Gravity Forms. With both plugins enabled you'll see a new option on your forms to enable creating a case from a form submission.

== Changelog ==

= Version 5.4 =
March 29, 2021: Added support for rep, department, chat widget, and case tag caching along with AJAX API endpoints for Wordpress to load/refresh said data

= Version 5.3 =
Mar 24, 2021: Vanquishing the last of minor PHP warnings for some WordPress installs

= Version 5.2 =
Mar 24, 2021: Minor PHP bug/warnings fixes for some WordPress installs

= Version 5.1 =
Mar 24, 2021: Minor bug fix for some WordPress installs where PHP was not set to decode JSON to an object by default

= Version 5.0 =
Mar 22, 2021: Added support for creating cases from Gravity Forms form submissions

= Version 4.5 =
Feb 17, 2021: Added the ability to have a case title select with the new `titleoptions` attribute or a completely custom title by including an HTML element in the short code content with the name of `summary`

= Version 4.4 =
July 1, 2020: We now use our v2 API endpoints for reps and department queries

= Version 4.3 =
Feb 26, 2020: The contact's name is now part of the new case description and note so it's more clear who opened the case

= Version 4.2 =
Dec 23, 2019: Custom inputs in the [fusedesk_newcase] form with a required attribute are now checked for values before creating a case.

= Version 4.1 =
Nov 13, 2019: Added AccessAlly Team support for [fusedesk_teamcases]!

= Version 4.0 =
Nov 11, 2019: We now support file uploads in the new case form!

= Version 3.4 =
Nov 6, 2019: Added custom filtering options using urlparams to allow user case filtering on a page. Users can filter by case status and date ranges now!
Nov 6, 2019: Added [fusedesk_teamcases] short code to view a team's cases.
Nov 5, 2019: Added column naming options to case list shortcodes for customizing a column's names

= Version 3.3 =
June 14, 2019: Moved Live Chat to async loading for faster page loads

= Version 3.2 =
May 3, 2019: Live Chat can now pre-fill with contact ID and email address, too!

= Version 3.1 =
April 2, 2019: We now happily support AccessAlly for membership sites, LMS, and online courses
March 26, 2019: Live Chat can now pre-fill with known user info if the user is logged in

= Version 3.0 =
March 5, 2019: Added Live Chat Widget selector

= Version 2.7 =
Nov 8, 2018: Updated documentation for fusedesk_mycases
Nov 8, 2018: Added support for status filtering, result limiting, date formatting, and ordering for fusedesk_mycases
January 10, 2018: Documentation fix for Selects
January 10, 2018: Minor bug fix for AJAX calls

= Version 2.6 =
October 13, 2017: Added option to allow redirection to a URL upon case creation

= Version 2.5 =
September 21, 2017: Tested to WordPress 4.8.2
September 21, 2017: Verify that we have the right permissions, i.e. that we're setup correctly with our API Key, both on options page load, as well as when clicking the Test button.
September 21, 2017: Display our Powered by FuseDesk footer (including optional partner code!) on accounts with that enabled.
September 21, 2017: Show FuseDesk plan on the Options page with a direct link to App Options in FuseDesk.

= Version 2.4 =
May 10, 2016: Removed nonces from public pages as they weren't adding any additional security and were invalid when posted form cached pages.
May 10, 2016: FuseDesk Case Tags can be applied to new cases using the new casetagids shortcode parameter
May 10, 2016: Suggested posts can be filtered by category using the new suggestioncategories shortcode parameter

= Version 2.3 =
April 6, 2016: When we search for matching posts, we now only search published posts

= Version 2.2 =
January 25, 2016: Minor bug fix in permissions for add_options_page. Users with the "manage_options" WordPress permission can now manage the plugin options.
April 6, 2016: Removed SSL version forcing on options page which fixed an issue with the SSL handshake failing. Improved error reporting of any connection issues on options page.
April 6, 2016: Tested up to WordPress 4.5 (RC)

= Version 2.1 =
January 22, 2016: Fixed two minor bugs in partner links. Added a link to log into FuseDesk.

= Version 2.0 =
January 21, 2016: Added suggested posts and case title options to new case form. We now include the URL where the request originated in the case. If there are known issues with a partner integration, we now list them if the integration is installed, known, and active.

= Version 1.5 =
January 12, 2016: Added support for Memberium and WisP installs. Tested to WordPress 4.4.1

= Version 1.4 =
September 4, 2014: Improved support for WishList installs. Tested to WordPress 4.0. Only show active reps in the options.

= Version 1.3 =
May 16, 2013: Bug fix. Nonce was broken.

= Version 1.2 =
May 10, 2013: Set the SSL Version to 3 for WP servers that had issues with the SSL handshake

= Version 1.1 =
March 20, 2013: Added on the ability to pass in a class for all input, set input styles, or tabulate the inputs!
March 20, 2013: Patched to die correctly on error, allow AJAX for non-logged in users, and post email as expected

= Version 1.0 =
March 7, 2013: Initial release! Supports creating cases and listing cases.

