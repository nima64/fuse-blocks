/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	Panel,
	PanelRow,
	PanelBody,
	PanelGroup,
	Placeholder,
	SelectControl,
	CheckboxControl,
	TextControl,
	RangeControl,
} from '@wordpress/components';
import createControlRenderer from '../../lib/createControlRenderer';
import NewCaseInspectorControls from './NewCaseInspectorControls';
import { rotateLeft, Icon, listView } from '@wordpress/icons';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import FDIcon from '../../fdico';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		caseCreation,
		newCaseForm,
		caseTitle,
		formText,
		suggestedPosts,
		fileUploads,
		test,
	} = attributes;

	/**
	 * Change an Attribute Array's key value
	 *
	 * @param  {string} newval
	 * @param  {string} key
	 * @param  {string} attName name of the attribute of type array
	 * @return {void}
	 */
	const mutAryItem = ( newval, key, attName ) => {
		const temp = [ { ...attributes[ attName ][ 0 ] } ];
		temp[ 0 ][ key ] = newval;
		setAttributes( { [ attName ]: temp } );
	};

	const renderControlObj = createControlRenderer( props );

	//for debugging purposes only
	const displayShortCodeAtts = ( [ ary ] ) =>
		Object.entries( ary ).map( ( [ k, v ] ) => (
			<p> { `${ k }: ${ v }` }</p>
		) );

	const displayAllShortCodeAtts = () =>
		Object.entries( attributes ).map(
			( [ k, v ] ) =>
				v.constructor == Array && (
					<>
						<h4>{ k }</h4>
						{ displayShortCodeAtts( v ) }
					</>
				)
		);

	const getRefreshButton = () => (
		<button
			id={ 'refreshme' }
			style={ { opacity: '0', float: 'left', margin: '0', padding: '0' } }
			onClick={ () => {
				console.log( 'refresh me was clicked!' );
				const inc = attributes.refreshme + 1;
				setAttributes( { refreshme: inc } );
			} }
		></button>
	);

	// displayShortCodeAtts(newCaseForm)
	return (
		<div { ...useBlockProps() }>
			<NewCaseInspectorControls {...props} />
			{/* {NewCaseInspectorControls(props) } */}
			<Placeholder
				// icon={<Icon icon={FDIcon} />}
				label={__("FuseDesk New Case",'fusedesk')}
				instructions="Allow your website visitors to create a new case form in FuseDesk."
			>
				<span className="dashicons dashicons-admin-generic"></span>
				&nbsp; Click on the settings icon to start customizing!
			</Placeholder>
			{ getRefreshButton() }

			{ /* {displayAllShortCodeAtts()} */ }
		</div>
	);
}
