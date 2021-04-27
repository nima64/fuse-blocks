import {__} from '@wordpress/i18n';

const statusOptionsShared = [
    { label: __('All','fusedesk'), value: 'all' },
    { label: __('Active','fusedesk'), value: 'active' },
    { label: __('New','fusedesk'), value: 'new' },
    { label: __('Open','fusedesk'), value: 'open' },
    { label: __('Closed','fusedesk'), value: 'closed' },
];

export default {
    display:{
        columns:{
            type: 'formTokenField',
            label: __('Columns','fusedesk'),
            suggestionmap: {
				[ __('Case Number','fusedesk') ]: 'casenum' ,
				[ __('Date Updated','fusedesk') ]: 'date_updated' ,
				[ __('Status','fusedesk') ]: 'status',
				[ __('Summary','fusedesk') ]: 'summary',
			},
            suggestions: [
                __('Case Number','fusedesk'),
                __('Date Updated','fusedesk'),
                __('Status','fusedesk'),
                __('Summary','fusedesk')
            ],
            bind: 'columns',
            placeholder: 'ex: Case Number, Date Updated...',
            help: __( `Choose from casenum, date_updated, date_opened,date_closed, status, summary, details. Defaults to casenum,date_updated,status,summary`,'fusedesk'),
          
        },
        status:{
            type: 'select',
            label: __('Case Statuses','fusedesk'),
            options: statusOptionsShared,
            bind: 'status',
            help: __( "Filter for which case statuses to show. Options are new, active, open, and closed. If blank, defaults to All Cases.",'fusedesk'),
        },
        userstatuses:{
            type: 'select',
            label: __('User Filterable Statuses','fusedesk'),
            options: statusOptionsShared,
            bind: 'userstatuses',
            help: __("Filter for which case statuses you allow a user to set with the casestatus query paramater. Expects a CSV with none to any of new, active, open, and closed. If not set, defaults to any valid status. Setting this restriction allows you to prevent users from viewing certain cases statuses like closed cases, for example.",'fusedesk'),
        },
        orderby:{
            type: 'select',
            label: __('Case Order','fusedesk'),
            options: [
				{ label: __('Oldest to Newest','fusedesk'), value: 'date_updated' },
				{ label: __('Dated Opened','fusedesk'), value: 'date_opened' },
            ],
            bind: 'orderby',
            help: __("orderby: How to sort your cases. Expects a CSV of date and order pairs, i.e. date_lastresponse desc, or date_opened asc Defaults to date_lastresponse asc, date_updated asc",'fusedesk'),
        },
        dateformat:{
            type: 'text',
            label: __('Date Format','fusedesk'),
            options: [ { label: __('M j, Y g:ia','fusedesk'), value: 'M j, Y g:ia' } ],
            bind: 'dateformat',
            help: __(<span>How to format your dates. Accepts PHP's <a href="http://php.net/manual/en/function.date.php" target="_blank">date</a> formatting. Defaults to M j, Y g:ia</span>,'fusedesk'),
        },
        limit:{
            type: 'range',
            label: __('How many cases should we display?','fusedesk'),
            min: 1,
            max: 80,
            bind: 'limit',
            help: __("How many cases (max) to display. Defaults to 50",'fusedesk'),
        },
    },
    text:{
        casenum_name: {
            type: 'text',
            label: __('Case Number Column','fusedesk'),
            placeholder: __('Case #','fusedesk'),
            bind: 'casenum_name',
            help: __('','fusedesk'),
        },
        status_name: {
            type: 'text',
            label: __('Status Column','fusedesk'),
            placeholder: __('rename status col','fusedesk'),
            bind: 'status_name',
            help: __('','fusedesk'),
        },
        date_updated_name: {
            type: 'text',
            label: __('Date Updated Column','fusedesk'),
            placeholder: __('rename dateupdated col','fusedesk'),
            bind: 'date_updated_name',
            help: __('','fusedesk'),
        },
        summary_name: {
            type: 'text',
            label: __('Summary Column','fusedesk'),
            placeholder: __('rename summary updated','fusedesk'),
            bind: 'summary_name',
            help: __('The summary/title for your FuseDesk Case','fusedesk'),
        },
        errornotloggedin:{
            type: 'text',
            label: __('Error, Not Logged In','fusedesk'),
            placeholder: __('Please login to view your cases','fusedesk'),
            bind: 'errornotloggedin',
            help: __("What message to show to customers who aren't logged in (since we won't be able to show cases to anyone who's not logged in. ",'fusedesk'),
        },
        errornocases:{
            type: 'text',
            label: __('Error, No Cases','fusedesk'),
            placeholder: __("Looks like you don't have any support cases!",'fusedesk'),
            bind: 'errornocases',
            help: __("What message to show to customers where they don't have any cases. Defaults to Looks like you don't have any support cases!",'fusedesk'),
        },

    },
    advanced: {
        anchor:{
            type: 'text',
            label: __('HTML anchor','fusedesk'),
            bind: 'anchor',         
            help: __('Enter a word or two — without spaces — to make a unique web address just for this block, called an "anchor."','fusedesk'),
        },
        style:{
            type: 'text',
            label: __('Additional CSS styles(s) for the fields','fusedesk'),
            bind: 'style',         
            help: __('style: What CSS style to apply to our inputs','fusedesk'),
        }
    }
};
