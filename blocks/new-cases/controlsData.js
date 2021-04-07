import {__} from '@wordpress/i18n';
export default {
    caseCreation:[
        {
            type: 'select',
            label: __('Department'),
            options: [ { label: __('Departments'), value: false } ],
            bind: 'department',
        },
        {
            type: 'select',
            label: __('Rep Assignment'),
            options: [ { label: __('Reps'), value: false } ],
            bind: 'rep',
        },
        {
            type: 'select',
            label: __('Case Tags to Apply'),
            options: [ { label: __('Case Tags'), value: false } ],
            bind: 'casetagids',
        },
    ],
    newCaseForm: [
        {
            type: 'check',
            label: __("Hide Known Data?"),
            bind: 'hideknowndata',
        },
        {
            type: 'text',
            label: __("Sucess Redirect URL"),
            placeholder: __("Don't Redirect"),
            bind: 'sucessredirect',
        }
    ],
    caseTitle: [
        {
            type: 'check',
            label: __("Show a title field?"),
            bind: 'showtitle',
        },
        {
            type: 'text',
            label: __("Case Title Label"),
            // placeholder: "Don't Redirect",
            placeholder: __("Briefly, what is the request about?"),
            bind: 'titletext',
        },
        {
            type: 'text',
            label: __("Case Title Options (for a drop down selection)"),
            placeholder: __("Case Title Options, oner per line, optional"),
            // placeholder: __("Don't Redirect"),
            bind: 'titleoptions',
        }
    ],
    suggestedPosts : [
        {
            type: 'select',
            label: __('Suggestions Placement'),
            options: [
                { label: __('before'), value: 'before' },
                { label: __('after'), value: 'after' },
                { label: __('end'), value: 'end' },
                { label: __('none'), value: 'none' },
            ]
           ,
            bind: 'suggestionplacement',
        },
        {
            type: 'text',
            label: __('Suggestions Label'),
            placeholder: __('May we suggest one of the following posts?'),
            bind: 'suggestionstext',
        },
        {
            type: 'range',
            min: 1,
            max: 100,
            label: __('How many suggestions should we show?'),
            bind: 'suggestionlimit',
        },
        {
            type: 'multiSelect',
            label: __('Suggestions Category'),
            options: [ { label: __('Category'), value: false } ],
            bind: 'suggestioncategories',
        },
    ],
    formText : [
        {
            type: 'text',
            label: __('Name Label'),
            placeholder: __('Your Name'),
            bind: 'nametext',
        },
        {
            type: 'text',
            label: __('Email Label'),
            placeholder: __('Your Email Adress'),
            bind: 'emailtext',
        },
        {
            type: 'text',
            label: __('Button Text'),
            placeholder: __('Create Support Case'),
            bind: 'buttontext',
        },
        {
            type: 'text',
            label: __('Creating Text'),
            placeholder: __('Submitting Case...'),
            bind: 'creatingtext',
        },
        {
            type: 'text',
            label: __('Sucess Text'),
            placeholder:
                'Thanks! Your case has been created, We will gl...',
            bind: 'successtext',
        },
    ],
    fileUploads : [
        { type: 'check', label: __('Allow file uploads?'), bind: 'fileupload' },
        {
            type: 'check',
            label: __('Require a file upload?'),
            bind: 'filerequired',
        },
        {
            type: 'check',
            label: __('Allow Multiple Files?'),
            bind: 'filesmultiple',
        },
        {
            type: 'text',
            label: __('File Upload Label'),
            placeholder: __('Attach a file'),
            bind: 'filetext',
        },
        {
            type: 'text',
            label: __('Allowed File MIME types'),
            placeholder: __('image/*,audio/*,application/pdf'),
            bind: 'filetypesallowed',
        },
    ],
}
