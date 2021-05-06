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
                __('Summary','fusedesk'),
            ],
            bind: 'columns',
            placeholder: __('casenum,date_updated,status,summary','fusedesk'),
            help: __( `Which columns to show. Choose from casenum, date_updated, date_opened,date_closed, status, summary, details.`,'fusedesk'),
          
        },
        status:{
            type: 'select',
            label: __('Case Statuses','fusedesk'),
            options: statusOptionsShared,
            bind: 'status',
            help: __( "Filter for which case statuses to show.",'fusedesk'),
        },
        userstatuses:{
            type: 'formTokenField',
            label: __('User Filterable Statuses','fusedesk'),
            options: statusOptionsShared,
            bind: 'userstatuses',
            placeholder: __('new,active,open,closed','fusedesk'),
            suggestionmap:{
				[ __('New','fusedesk') ]: 'new' ,
				[ __('Active','fusedesk') ]: 'active' ,
				[ __('Open','fusedesk') ]: 'open',
				[ __('Closed','fusedesk') ]: 'closed',
            },
            suggestions:[
				__('New','fusedesk'),
				__('Active','fusedesk'),
				__('Open','fusedesk'),
				__('Closed','fusedesk'),
            ],
            help: __("Filter for which case statuses you allow a user to set with the casestatus query paramater. Setting this restriction allows you to prevent users from viewing certain cases statuses like closed cases, for example.",'fusedesk'),
        },
        orderby:{
            type: 'formTokenField',
            label: __('Case Order','fusedesk'),
            // placeholder: __('date_lastresponse asc, date_updated asc','fusedesk'),
            placeholder: __('Date Last Response Oldest to Newest, Date Updated Oldest to Newest','fusedesk'),
            suggestionmap:{
                // status, caseid, contactid, date_opened, date_assigned, date_firstresponse, date_lastresponse, date_updated, date_created, date_closed
                //ascending oldest to newest, descending newest to oldest
                [ __('Status, Oldest to Newest','fusedesk') ]: "status asc", 
                [ __('Status, Newest to Oldest','fusedesk') ]: "status desc",

                [ __('Case ID, Oldest to Newest','fusedesk') ]: "caseid asc", 
                [ __('Case ID, Newest to Oldest','fusedesk') ]: "caseid desc",

                [ __('Contact ID, Oldest to Newest','fusedesk') ]: "contactid asc", 
                [ __('Contact ID, Newest to Oldest','fusedesk') ]: "contactid desc",

                [ __('Date Opened, Oldest to Newest','fusedesk') ]: "date_opened asc", 
                [ __('Date Opened, Newest to Oldest','fusedesk') ]: "date_opened desc",

                [ __('Date Assigned, Oldest to Newest','fusedesk') ]: "date_assigned asc", 
                [ __('Date Assigned, Newest to Oldest','fusedesk') ]: "date_assigned desc",

                [ __('Date First Response, Oldest to Newest','fusedesk') ]: "date_firstresponse asc", 
                [ __('Date First Response, Newest to Oldest','fusedesk') ]: "date_firstresponse desc", 

                [ __('Date Last Response, Oldest to Newest','fusedesk') ]: "date_lastresponse asc", 
                [ __('Date Last Response, Newest to Oldest','fusedesk') ]: "date_lastresponse desc", 

                [ __('Date Updated, Oldest to Newest','fusedesk') ]: "date_updated asc", 
                [ __('Date Updated, Newest to Oldest','fusedesk') ]: "date_updated desc",

                [ __('Date Created, Oldest to Newest','fusedesk') ]: "date_created asc", 
                [ __('Date Created, Newest to Oldest','fusedesk') ]: "date_created asc", 

                [ __('Date Closed, Oldest to Newest','fusedesk') ]: "date_closed desc", 
                [ __('Date Closed, Newest to Oldest','fusedesk') ]: "date_closed desc", 

                //template
                // [ __(', Oldest to Newest','fusedesk') ]: "date_updated asc", 
                // [ __(', Newest to Oldest','fusedesk') ]: "date_updated desc",
            },
            suggestions: [
                __('Status, Oldest to Newest','fusedesk'),
                __('Status, Newest to Oldest','fusedesk'),

                __('Case ID, Oldest to Newest','fusedesk'),
                __('Case ID, Newest to Oldest','fusedesk'),

                __('Date Opened, Oldest to Newest','fusedesk'),
                __('Date Opened, Newest to Oldest','fusedesk'),

                __('Date Assigned, Oldest to Newest','fusedesk'),
                __('Date Assigned, Newest to Oldest','fusedesk'),

                __('Date First Response, Oldest to Newest','fusedesk'),
                __('Date First Response, Newest to Oldest','fusedesk'),

                __('Date Last Response, Oldest to Newest','fusedesk'),
                __('Date Last Response, Newest to Oldest','fusedesk'),

                __('Date Updated, Oldest to Newest','fusedesk'),
                __('Date Updated, Newest to Oldest','fusedesk'),

                __('Date Created, Oldest to Newest','fusedesk'),
                __('Date Created, Newest to Oldest','fusedesk'),

                __('Date Closed, Oldest to Newest','fusedesk'),
                __('Date Closed, Newest to Oldest','fusedesk'),
            ],
            bind: 'orderby',
            help: __("How to sort your cases.",'fusedesk'),
            // help: __("How to sort your cases. Defaults to date_lastresponse asc, date_updated asc",'fusedesk'),
        },
        dateformat:{
            type: 'text',
            label: __('Date Format','fusedesk'),
            options: [ { label: __('M j, Y g:ia','fusedesk'), value: 'M j, Y g:ia' } ],
            bind: 'dateformat',
            placeholder: __('M j, Y g:ia','fusedesk'),
            help: __(<span>How to format your dates. Accepts PHP's <a href="http://php.net/manual/en/function.date.php" target="_blank">date</a> formatting.</span>,'fusedesk'),
        },
        limit:{
            type: 'range',
            label: __('How many cases should we display?','fusedesk'),
            min: 1,
            max: 80,
            bind: 'limit',
        },
    },
    text:{
        casenum_name: {
            type: 'text',
            label: __('Case Number Column','fusedesk'),
            placeholder: __('Case Number','fusedesk'),
            bind: 'casenum_name',
            help: __('Case Number Column Label','fusedesk'),
        },
        status_name: {
            type: 'text',
            label: __('Status Column','fusedesk'),
            placeholder: __('Status','fusedesk'),
            bind: 'status_name',
            help: __('Status Column Label','fusedesk'),
        },
        date_updated_name: {
            type: 'text',
            label: __('Date Updated Column','fusedesk'),
            placeholder: __('Date Updated','fusedesk'),
            bind: 'date_updated_name',
            help: __('Date Updated Column Label','fusedesk'),
        },
        summary_name: {
            type: 'text',
            label: __('Summary Column','fusedesk'),
            placeholder: __('Summary','fusedesk'),
            bind: 'summary_name',
            help: __('Summary Column Label','fusedesk'),
        },
        errornotloggedin:{
            type: 'text',
            label: __('Error, Not Logged In','fusedesk'),
            placeholder: __('Please login to view your cases','fusedesk'),
            bind: 'errornotloggedin',
            help: __("What message to show to customers who aren't logged in (since we won't be able to show cases to anyone who's not logged in). ",'fusedesk'),
        },
        errornocases:{
            type: 'text',
            label: __('Error, No Cases','fusedesk'),
            placeholder: __("Looks like you don't have any support cases!",'fusedesk'),
            bind: 'errornocases',
            help: __("What message to show to customers where they don't have any cases.",'fusedesk'),
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
            help: __('What CSS style to apply to our inputs','fusedesk'),
        }
    }
};
