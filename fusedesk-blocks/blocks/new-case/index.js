/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import {__} from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Icon } from '@wordpress/icons';
import fusedesk_ico from '../../fusedesk_ico';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './css/style.scss';

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
	icon: <Icon icon={ fusedesk_ico } />,
	title: __('New Case'),
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
					showtitle: false,
					titletext: '',
					titleoptions: false,
				},
			],
		},
		formText: {
			type: 'array',
			default: [
				{
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
					filetext: '',
					filetypesallowed: '',
				},
			],
		},
		advanced:{
			type:'array',
			default:[
				{
					anchor:'',
					style:false,
				}
			]
		},
		repaintMe: {
			type: 'boolean',
			default: false,
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
