import {__} from '@wordpress/i18n';

export default {
    display:{
        columns:{
            type: 'formTokenField',
            expandOnFocus: true,
            label: __('Columns','fusedesk'),
            suggestionmap: {
				[ __('Case Number','fusedesk') ]: 'casenum' ,
				[ __('Date Updated','fusedesk') ]: 'date_updated' ,
				[ __('Date Opened','fusedesk') ]: 'date_opened' ,
				[ __('Date Closed','fusedesk') ]: 'date_closed' ,
				[ __('Status','fusedesk') ]: 'status',
				[ __('Summary','fusedesk') ]: 'summary',
				[ __('Details','fusedesk') ]: 'details',
			},
            suggestions: [
                __('Case Number','fusedesk'),
                __('Date Updated','fusedesk'),
                __('Date Opened','fusedesk'),
                __('Date Closed','fusedesk'),
                __('Status','fusedesk'),
                __('Summary','fusedesk'),
                __('Details','fusedesk'),
            ],
            bind: 'columns',
            placeholder: __('casenum,date_updated,status,summary','fusedesk'),
            help: __( `Which columns to show.`,'fusedesk'),
          
        },
        status:{
            type: 'select',
            label: __('Case Statuses','fusedesk'),
            options:[
                { label: __('All','fusedesk'), value: 'all' },
                { label: __('Active','fusedesk'), value: 'active' },
                { label: __('New','fusedesk'), value: 'new' },
                { label: __('Open','fusedesk'), value: 'open' },
                { label: __('Closed','fusedesk'), value: 'closed' },
            ],
            bind: 'status',
            help: __( "Filter for which case statuses to show.",'fusedesk'),
        },
        userstatuses:{
            type: 'formTokenField',
            expandOnFocus: true,
            label: __('User Filterable Statuses','fusedesk'),
            bind: 'userstatuses',
            placeholder: __('new,open,closed','fusedesk'),
            suggestionmap:{
				[ __('New','fusedesk') ]: 'new' ,
				[ __('Open','fusedesk') ]: 'open',
				[ __('Closed','fusedesk') ]: 'closed',
            },
            suggestions:[
				__('New','fusedesk'),
				__('Open','fusedesk'),
				__('Closed','fusedesk'),
            ],
            help: __("Filter for which case statuses you allow a user to set with the casestatus query paramater. Setting this restriction allows you to prevent users from viewing certain cases statuses like closed cases, for example.",'fusedesk'),
        },
        orderby:{
            type: 'formTokenField',
            expandOnFocus: true,
            label: __('Case Order','fusedesk'),
            placeholder: __('Date Last Response Oldest to Newest, Date Updated Oldest to Newest','fusedesk'),
            suggestionmap:{
                // caseid, contactid, date_opened, date_assigned, date_firstresponse, date_lastresponse, date_updated, date_created, date_closed
                //ascending oldest to newest, descending newest to oldest

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

                [ __('Status','fusedesk') ]: 'status',
                [ __('Contact','fusedesk') ]: 'contactid',

                //template
                // [ __(', Oldest to Newest','fusedesk') ]: "date_updated asc", 
                // [ __(', Newest to Oldest','fusedesk') ]: "date_updated desc",
            },
            suggestions: [
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

                __('Status','fusedesk'),
                __('Contact','fusedesk'),
            ],
            bind: 'orderby',
            help: __("How to sort your cases.",'fusedesk'),
        },
        dateformat:{
            type: 'text',
            label: __('Date Format','fusedesk'),
            options: [ 
                { label: __('M j, Y g:ia','fusedesk'), value: 'M j, Y g:ia' } 
            ],
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
    text_column_label:{
        casenum_name: {
            type: 'text',
            label: __('Case Number Column','fusedesk'),
            placeholder: __('Case Number','fusedesk'),
            bind: 'casenum_name',
        },
        status_name: {
            type: 'text',
            label: __('Status Column','fusedesk'),
            placeholder: __('Status','fusedesk'),
            bind: 'status_name',
        },
        date_updated_name: {
            type: 'text',
            label: __('Date Updated Column','fusedesk'),
            placeholder: __('Date Updated','fusedesk'),
            bind: 'date_updated_name',
        },
        summary_name: {
            type: 'text',
            label: __('Summary Column','fusedesk'),
            placeholder: __('Summary','fusedesk'),
            bind: 'summary_name',
        },
    },
    text:{
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
