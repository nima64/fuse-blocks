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
	Placeholder,
	SelectControl,
	CheckboxControl,
	TextControl,
	RangeControl,
} from '@wordpress/components';
import NewCase_InspectorControls from './NewCase_InspectorControls';
import fetchCalls from './fetchCalls';
import controls from './controlsData';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './css/editor.scss';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */



//Singleton that pulls data on mount and updates options
class OptionsPuller extends React.Component {
	constructor( props ) {
		super( props );
		this.fetchCalls = fetchCalls;
	}
	componentDidMount() {
		this.fetchCalls.get_rep_options();
		this.fetchCalls.get_dep_options();
		this.fetchCalls.get_casetag_options();
		this.fetchCalls.get_category_options();
	}

	render() {
		return '';
	}
}

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

	const RepaintButton = () => (
		<button
			id={ 'fusedesk_repaintMe' }
			style={ { opacity: '0', float: 'left', margin: '0', padding: '0' } }
			onClick={ () => {
				console.log( 'repaint me was clicked!' );
				// const inc =  + 1;
				setAttributes( { repaintMe: !attributes.repaintMe } );
			} }
		></button>
	);

	return (
		<div { ...useBlockProps() }>
			<OptionsPuller />
			<NewCase_InspectorControls {...props} />
			<Placeholder
				label={__("FuseDesk New Case",'fusedesk')}
				instructions="Allow your website visitors to create a new case form in FuseDesk."
			>
				<span className="dashicons dashicons-admin-generic"></span>
				&nbsp; Click on the settings icon to start customizing!
			</Placeholder>
			< RepaintButton />

		</div>
	);
}
