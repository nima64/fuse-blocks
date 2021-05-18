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
	title: __('FuseDesk New Case', 'fusedesk'),
	category: 'fusedesk',
	description: __('Allow your website visitors to create a new case in FuseDesk','fusedesk'),
	attributes: {

		//caseCreation
		department:{
			type: 'string',
			default: false,
		},
		rep:{
			type: 'string',
			default: false,
		},
		casetagids:{
			type:'array',
			default:[],
		},

		//newCaseForm
		hideknowndata:{
			type: 'boolean',
			default: false,
		},
		sucessredirect:{
			type: 'string',
			default: '',
		},

		//caseTitle
		showtitle:{
			type: 'boolean',
			default: false,
		},
		titletext:{
			type: 'string',
			default: '',
		},
		titleoptions:{
			type: 'string',
			default: '',
		},

		//formText
		nametext:{
			type: 'string',
			default: '',
		},
		emailtext:{
			type: 'string',
			default: '',
		},
		buttontext:{
			type: 'string',
			default: '',
		},
		creatingtext:{
			type: 'string',
			default: '',
		},
		successtext:{
			type: 'string',
			default: '',
		},

		//suggestedPosts
		suggestionplacement:{
			type: 'string',
			default: 'after',
		},
		suggestionstext:{
			type: 'string',
			default: '',
		},
		suggestionlimit:{
			type: 'int',
			default: 10,
		},
		suggestioncategories:{
			type: 'array',
			default: [],
		},

		//fileUploads
		fileupload:{
			type: 'boolean',
			default: false,
		},
		filerequired:{
			type: 'boolean',
			default: false,
		},
		filesmultiple:{
			type: 'boolean',
			default: false,
		},
		filetext:{
			type: 'string',
			default: '',
		},
		filetypesallowed:{
			type: 'string',
			default: '',
		},

		//advanced
		anchor:{
			type:'string',
			default: '',
		},
		style:{
			type:'string',
			default: false,
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
