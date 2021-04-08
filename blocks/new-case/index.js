/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import {__} from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Icon } from '@wordpress/icons';
import fdico from '../../fdico';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'fusedesk/new-case', {
	/**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
	apiVersion: 2,
	icon: <Icon icon={ fdico } />,
	title: 'new case',
	category: 'fusedesk',
	description: __('Allow your website visitors to create a new case in FuseDesk','fusedesk'),
	attributes: {
		caseCreation: {
			type: 'array',
			default: [
				{
					department: false,
					rep: false,
					casetagids: false,
				},
			],
		},
		newCaseForm: {
			type: 'array',
			default: [
				{
					hideknowndata: false,
					sucessredirect: '',
				},
			],
		},
		caseTitle: {
			type: 'array',
			default: [
				{
					showtitle: false, //show title field
					// titletext: 'Briefly, what is this request about?', //
					titletext: '', //
					// titletext: '', //
					titleoptions: false,
				},
			],
		},
		formText: {
			type: 'array',
			default: [
				{
					// nametext: 'Your name',
					// emailtext: 'Your email',
					// buttontext: 'Create Support Case',
					// creatingtext: 'Submitting Case...',
					// successtext: 'Thanks! Your case has been created. We will get back to you shortly',
					nametext: '',
					emailtext: '',
					buttontext: '',
					creatingtext: '',
					successtext: '',
				},
			],
		},
		suggestedPosts: {
			type: 'array',
			default: [
				{
					suggestionplacement: 'after',
					// suggestionstext: 'May we suggest one of the following posts?',
					suggestionstext: '',
					suggestionlimit: 10,
					suggestioncategories: [],
				},
			],
		},
		fileUploads: {
			type: 'array',
			default: [
				{
					fileupload: false,
					filerequired: false,
					filesmultiple: true,
					// filetext: 'Attach a File',
					// filetypesallowed: 'image/*,audio/*,application/pdf',
					filetext: '',
					filetypesallowed: '',
				},
			],
		},
		refreshMe: {
			type: 'int',
			default: 0,
		},
	},

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
