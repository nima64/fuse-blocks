export default {

    //display
    columns: {
        type: 'array',
        default: [],
    },
    status: {
        type: 'string',
        default: 'all',
    },
    userstatuses: {
        type: 'array',
        default: [],
    },
    orderby: {
        type: 'array',
        // default: 'date_opened, date_updated',
        default: [],
    },
    dateformat: {
        type: 'string',
        default: 'M j, Y g:ia',
    },
    limit: {
        type: 'integer',
        default: 50,
    },

    //text
    casenum_name: {
        type: 'string',
        default: '',
    },
    status_name: {
        type: 'string',
        default: '',
    },
    date_updated_name: {
        type: 'string',
        default: '',
    },
    date_opened_name: {
        type: 'string',
        default: '',
    },
    date_closed_name: {
        type: 'string',
        default: '',
    },
    summary_name: {
        type: 'string',
        default: '',
    },
    details_name: {
        type: 'string',
        default: '',
    },
    errornotloggedin: {
        type: 'string',
        default: '',
    },
    errornocases: {
        type: 'string',
        default: '',
    },

    //advanced
    anchor: {
        type: 'string',
        default: '',
    },
    style: {
        type: 'string',
        default: false,
    },
}