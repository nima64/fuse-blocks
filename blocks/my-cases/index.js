/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';
import {people,Icon} from '@wordpress/icons';

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
registerBlockType( 'fusedesk/my-cases', {
	/**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
	apiVersion: 2,
	attributes: {
		display:{
			type: 'array',
			default: {
				// columns:'',
				// status:'',
				// userstatuses:'',
				// orderby:'',
				// dateformat:'M j, Y g:ia',
				// limit:50,
				// columns:'casenum,date_updated,status,summary',
				columns:'casenum,summary',
				status:'all',
				userstatuses:'all',
				orderby:'date_opened, date_updated',
				dateformat:'M j, Y g:ia',
				limit:50,
			}
		},
		text:{
			type: 'array',
			default: {
				casenum_name:'',
				status_name:'',
				errornotloggedin:'',
				errornocases:'',
			}
		}
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
