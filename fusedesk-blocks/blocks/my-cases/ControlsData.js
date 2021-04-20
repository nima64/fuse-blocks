const statusOptionsShared = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'New', value: 'new' },
    { label: 'Open', value: 'open' },
    { label: 'Closed', value: 'closed' },
];

export default {
    display:{
        columns:{
            type: 'select',
            label: 'Columns',
            options: [
				{ label: 'Case Number', value: 'casenum' },
				{ label: 'Date Updated', value: 'date_updated' },
				{ label: 'Status', value: 'status' },
				{ label: 'Summary', value: 'summary' },
			],
            bind: 'columns',
            help: '',
        },
        status:{
            type: 'select',
            label: 'Case Statuses',
            options: statusOptionsShared,
            bind: 'status',
            help: '',
        },
        userstatuses:{
            type: 'select',
            label: 'User Filterable Statuses',
            options: statusOptionsShared,
            bind: 'userstatuses',
            help: '',
        },
        orderby:{
            type: 'select',
            label: 'Case Order',
            options: [
				{ label: 'Oldest to Newest', value: 'date_updated' },
				{ label: 'Dated Opened', value: 'date_opened' },
            ],
            bind: 'orderby',
            help: '',
        },
        dateformat:{
            type: 'text',
            label: 'Date Format',
            options: [ { label: 'M j, Y g:ia', value: 'M j, Y g:ia' } ],
            bind: 'dateformat',
            help: '',
        },
        limit:{
            type: 'range',
            label: 'How many cases should we display?',
            min: 1,
            max: 80,
            bind: 'limit',
            help: '',
        },
    },
    text:{
        casenum_name: {
            type: 'text',
            label: 'Case Number Column',
            placeholder: 'Case #',
            bind: 'casenum_name',
            help: '',
        },
        status_name: {
            type: 'text',
            label: 'Status Column',
            placeholder: 'rename status col',
            bind: 'status_name',
            help: '',
        },
        date_updated_name: {
            type: 'text',
            label: 'Date Updated Column',
            placeholder: 'rename dateupdated col',
            bind: 'date_updated_name',
            help: '',
        },
        summary_name: {
            type: 'text',
            label: 'Summary Column',
            placeholder: 'rename summary updated',
            bind: 'summary_name',
            help: '',
        },
        errornotloggedin:{
            type: 'text',
            label: 'Error, Not Logged In',
            placeholder: 'Please login to view your cases',
            bind: 'errornotloggedin',
            help: '',
        },
        errornocases:{
            type: 'text',
            label: 'Error, No Cases',
            placeholder: "Looks like you don't have any support cases!",
            bind: 'errornocases',
            help: '',
        },

    }
};
