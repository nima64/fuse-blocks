import {__} from '@wordpress/i18n';

export default {
    caseCreation:[
        {
            type: 'select',
            label: __('Department','fusedesk'),
            options: [ { label: __('Departments','fusedesk'), value: false } ],
            bind: 'department',
        },
        {
            type: 'select',
            label: __('Rep Assignment','fusedesk'),
            options: [ { label: __('Reps','fusedesk'), value: false } ],
            bind: 'rep',
        },
        {
            type: 'select',
            label: __('Case Tags to Apply','fusedesk'),
            options: [ { label: __('Case Tags','fusedesk'), value: false } ],
            bind: 'casetagids',
        },
    ],
    newCaseForm: [
        {
            type: 'check',
            label: __("Hide Known Data?",'fusedesk'),
            bind: 'hideknowndata',
        },
        {
            type: 'text',
            label: __("Success Redirect URL",'fusedesk'),
            placeholder: __("Don't Redirect",'fusedesk'),
            bind: 'sucessredirect',
        }
    ],
    caseTitle: [
        {
            type: 'check',
            label: __("Show a title field?",'fusedesk'),
            bind: 'showtitle',
        },
        {
            type: 'text',
            label: __("Case Title Label",'fusedesk'),
            placeholder: __("Briefly, what is the request about?",'fusedesk'),
            bind: 'titletext',
        },
        {
            type: 'text',
            label: __("Case Title Options (for a drop down selection)",'fusedesk'),
            placeholder: __("Case Title Options, one per line, optional",'fusedesk'),
            bind: 'titleoptions',
        }
    ],
    suggestedPosts : [
        {
            type: 'select',
            label: __('Suggestions Placement','fusedesk'),
            options: [
                { label: __('before','fusedesk'), value: 'before' },
                { label: __('after','fusedesk'), value: 'after' },
                { label: __('end','fusedesk'), value: 'end' },
                { label: __('none','fusedesk'), value: 'none' },
            ]
           ,
            bind: 'suggestionplacement',
        },
        {
            type: 'text',
            label: __('Suggestions Label','fusedesk'),
            placeholder: __('May we suggest one of the following posts?','fusedesk'),
            bind: 'suggestionstext',
        },
        {
            type: 'range',
            min: 1,
            max: 100,
            label: __('How many suggestions should we show?','fusedesk'),
            bind: 'suggestionlimit',
        },
        {
            type: 'multiSelect',
            label: __('Suggestions Category','fusedesk'),
            options: [ { label: __('Category','fusedesk'), value: false } ],
            bind: 'suggestioncategories',
        },
    ],
    formText : [
        {
            type: 'text',
            label: __('Name Label','fusedesk'),
            placeholder: __('Your Name','fusedesk'),
            bind: 'nametext',
        },
        {
            type: 'text',
            label: __('Email Label','fusedesk'),
            placeholder: __('Your Email Adress','fusedesk'),
            bind: 'emailtext',
        },
        {
            type: 'text',
            label: __('Button Text','fusedesk'),
            placeholder: __('Create Support Case','fusedesk'),
            bind: 'buttontext',
        },
        {
            type: 'text',
            label: __('Creating Text','fusedesk'),
            placeholder: __('Submitting Case...','fusedesk'),
            bind: 'creatingtext',
        },
        {
            type: 'text',
            label: __('Success Text','fusedesk'),
            placeholder: __('Thanks! Your case has been created, We will gl...','fusedesk'),
            bind: 'successtext',
        },
    ],
    fileUploads : [
        { type: 'check', label: __('Allow file uploads?','fusedesk'), bind: 'fileupload' },
        {
            type: 'check',
            label: __('Require a file upload?','fusedesk'),
            bind: 'filerequired',
        },
        {
            type: 'check',
            label: __('Allow Multiple Files?','fusedesk'),
            bind: 'filesmultiple',
        },
        {
            type: 'text',
            label: __('File Upload Label','fusedesk'),
            placeholder: __('Attach a file','fusedesk'),
            bind: 'filetext',
        },
        {
            type: 'text',
            label: __('Allowed File MIME types','fusedesk'),
            placeholder: __('image/*,audio/*,application/pdf','fusedesk'),
            bind: 'filetypesallowed',
        },
    ],
}
