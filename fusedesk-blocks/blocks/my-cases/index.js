/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {  Icon } from '@wordpress/icons';
import fusedesk_ico from '../../fusedesk_ico';
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
	icon: <Icon icon={ fusedesk_ico } />,
	category: 'fusedesk',
	title: __('My Cases','fusedesk'),
	description: __('Show your logged in users a list of their FuseDesk cases.','fusedesk'),
	attributes: {

		//display
		columns: {
			type: 'array',
			default: [],
		},
		status:{
			type: 'string',
			default: 'all',
		},
		userstatuses:{
			type: 'string',
			default: 'all',
		},
		orderby:{
			type: 'string',
			default: 'date_opened, date_updated',
		},
		dateformat:{
			type: 'string',
			default: 'M j, Y g:ia',
		},
		limit:{
			type: 'string',
			default: 50,
		},
		casenum_name:{
			type: 'string',
			default:  '',
		},
		status_name:{
			type: 'string',
			default:  '',
		},
		date_updated_name:{
			type: 'string',
			default:  '',
		},
		summary_name:{
			type: 'string',
			default:  '',
		},
		errornotloggedin:{
			type: 'string',
			default:  '',
		},
		errornocases:{
			type: 'string',
			default:  '',
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
