import {__} from '@wordpress/i18n';

export default {
    caseCreation:{
        department:{
            type: 'select',
            label: __('Department','fusedesk'),
            options: [ { label: __('Departments','fusedesk'), value: false } ],
            bind: 'department',
            help: __('Choose a FuseDesk department to assign cases created from this form.','fusedesk')
        },
        rep:{
            type: 'select',
            label: __('Rep Assignment','fusedesk'),
            options: [ { label: __('Assign Randomly','fusedesk'), value: false } ],
            bind: 'rep',
            help: __('Choose an optional FuseDesk rep to assign cases created from this form.','fusedesk')
        },
        casetagids:{
            type: 'formTokenField',
            label: __('Case Tags to Apply','fusedesk'),
            bind: 'casetagids',
            suggestions: [],
            help: __('Optionally apply some FuseDesk case tags to your new case.','fusedesk'),
            idmap: {},//map label to value
        },
    },
    newCaseForm: {
        hideknowndata:{
            type: 'check',
            label: __("Hide Known Data?",'fusedesk'),
            bind: 'hideknowndata',
            help: __('Hide the name and/or email fields if the user is logged in.','fusedesk')
        },
        sucessredirect:{
            type: 'text',
            label: __("Success Redirect URL",'fusedesk'),
            placeholder: __("Don't Redirect",'fusedesk'),
            bind: 'sucessredirect',
            help: __('Optional URL (relative or absolute) to redirect to after a case is created.','fusedesk')
        }
    },
    caseTitle: {
        showtitle:{
            type: 'check',
            label: __("Show a title field?",'fusedesk'),
            bind: 'showtitle',
            help: __('Optionally prompt for a case title.','fusedesk')
        },
        titletext: {
            type: 'text',
            label: __("Case Title Label",'fusedesk'),
            placeholder: __("Briefly, what is the request about?",'fusedesk'),
            bind: 'titletext',
        },
        titleoptions: {
            type: 'textArea',
            label: __("Case Title Options (for a drop down selection)",'fusedesk'),
            placeholder: __("Case Title Options, comma separated, optional",'fusedesk'),
            bind: 'titleoptions',
            help: __('You can optionally provide a dropdown list of case title options to choose from.','fusedesk')
        }
    },
    suggestedPosts : {
        suggestionplacement:{
            type: 'select',
            label: __('Suggestions Placement','fusedesk'),
            options: [
                { label: __('Before','fusedesk'), value: 'before' },
                { label: __('After','fusedesk'), value: 'after' },
                { label: __('End','fusedesk'), value: 'end' },
                { label: __('None','fusedesk'), value: 'none' },
            ]
           ,
            bind: 'suggestionplacement',
            help: __('Choose where to show suggested posts. Choose "None" to not display suggestions.','fusedesk')
        },
        suggestionstext:{
            type: 'text',
            label: __('Suggestions Label','fusedesk'),
            placeholder: __('May we suggest one of the following posts?','fusedesk'),
            bind: 'suggestionstext',
        },
        suggestionlimit:{
            type: 'range',
            min: 1,
            max: 100,
            label: __('How many suggestions should we show?','fusedesk'),
            bind: 'suggestionlimit',
        },
        suggestioncategories:{
            type: 'formTokenField',
            label: __('Suggestions Category','fusedesk'),
            bind: 'suggestioncategories',
            help: __('You can optionally limit suggested posts to certain post categories. By default all post categories will be searched.','fusedesk'),
            suggestions: ['mero cat'],
            idmap: {},//idmap label to value
        },
    },
    formText: {
        nametext:{
            type: 'text',
            label: __('Name Label','fusedesk'),
            placeholder: __('Your Name','fusedesk'),
            bind: 'nametext',
        },
        emailtext:{
            type: 'text',
            label: __('Email Label','fusedesk'),
            placeholder: __('Your Email Address','fusedesk'),
            bind: 'emailtext',
        },
        buttontext:{
            type: 'text',
            label: __('Button Text','fusedesk'),
            placeholder: __('Create Support Case','fusedesk'),
            bind: 'buttontext',
        },
        creatingtext:{
            type: 'text',
            label: __('Creating Text','fusedesk'),
            placeholder: __('Submitting Case...','fusedesk'),
            bind: 'creatingtext',
            help: __('This is the message shown while the case is being created.','fusedesk')
        },
        successtext:{
            type: 'text',
            label: __('Success Text','fusedesk'),
            placeholder: __('Thanks! Your case has been created. We will get back to you shortly.','fusedesk'),
            bind: 'successtext',
            help: __('This is the confirmation message that is displayed after a case is created.','fusedesk')
        },
    },
    fileUploads: {
        fileupload:{
            type: 'check',
            label: __('Allow file uploads?','fusedesk'),
            bind: 'fileupload',
        },
        filerequired:{
            type: 'check',
            label: __('Require a file upload?','fusedesk'),
            bind: 'filerequired',
        },
        filesmultiple:{
            type: 'check',
            label: __('Allow Multiple Files?','fusedesk'),
            bind: 'filesmultiple',
        },
        filetext:{
            type: 'text',
            label: __('File Upload Label','fusedesk'),
            placeholder: __('Attach a file','fusedesk'),
            bind: 'filetext',
        },
        filetypesallowed:{
            type: 'text',
            label: __('Allowed File MIME types','fusedesk'),
            placeholder: __('image/*,audio/*,application/pdf','fusedesk'),
            bind: 'filetypesallowed',
            help: __('By default, file types are limited to images, audio files, and PDFs. Optionally enter in your own list of allowed MIME types, partial MIME types, or file extensions that you want to allow.','fusedesk')
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
}
