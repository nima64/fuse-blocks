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
            type: 'multiSelect',
            label: __('Columns','fusedesk'),
            options: [
				{ label: __('Case Number','fusedesk'), value: 'casenum' },
				{ label: __('Date Updated','fusedesk'), value: 'date_updated' },
				{ label: __('Status','fusedesk'), value: 'status' },
				{ label: __('Summary','fusedesk'), value: 'summary' },
			],
            bind: 'columns',
            help: __('','fusedesk'),
        },
        status:{
            type: 'select',
            label: __('Case Statuses','fusedesk'),
            options: statusOptionsShared,
            bind: 'status',
            help: __('','fusedesk'),
        },
        userstatuses:{
            type: 'select',
            label: __('User Filterable Statuses','fusedesk'),
            options: statusOptionsShared,
            bind: 'userstatuses',
            help: __('','fusedesk'),
        },
        orderby:{
            type: 'select',
            label: __('Case Order','fusedesk'),
            options: [
				{ label: __('Oldest to Newest','fusedesk'), value: 'date_updated' },
				{ label: __('Dated Opened','fusedesk'), value: 'date_opened' },
            ],
            bind: 'orderby',
            help: __('','fusedesk'),
        },
        dateformat:{
            type: 'text',
            label: __('Date Format','fusedesk'),
            options: [ { label: __('M j, Y g:ia','fusedesk'), value: 'M j, Y g:ia' } ],
            bind: 'dateformat',
            help: __('','fusedesk'),
        },
        limit:{
            type: 'range',
            label: __('How many cases should we display?','fusedesk'),
            min: 1,
            max: 80,
            bind: 'limit',
            help: __('','fusedesk'),
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
            help: __('','fusedesk'),
        },
        errornotloggedin:{
            type: 'text',
            label: __('Error, Not Logged In','fusedesk'),
            placeholder: __('Please login to view your cases','fusedesk'),
            bind: 'errornotloggedin',
            help: __('','fusedesk'),
        },
        errornocases:{
            type: 'text',
            label: __('Error, No Cases','fusedesk'),
            placeholder: __("Looks like you don't have any support cases!",'fusedesk'),
            bind: 'errornocases',
            help: __('','fusedesk'),
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
