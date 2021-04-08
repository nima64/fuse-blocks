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
import controls from './controlsData';
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


const WP_BASEURL = WPURLS.siteurl;
// const WP_BASEURL = 'http://localhost/wordpress';
const REPS_ENDPOINT = '/wp-admin/admin-ajax.php?action=fusedesk_reps';
const DEPTS_ENDPOINT ='/wp-admin/admin-ajax.php?action=fusedesk_departments';
const CASETAGS_ENDPOINT ='/wp-admin/admin-ajax.php?action=fusedesk_casetags';
const CATEGORIES_ENDPOINT = '/wp-json/wp/v2/categories/';


//normalize reps json into {label,value} format for Select Components
const normJsonToOptions = ( repsJson ) =>
	Object.entries( repsJson ).map( ( [ v, k ] ) => ( {
		label: k,
		value: v,
	} ) );

function composeOptionsFetcher( normalizer, withRefresh=false ) {
	return function ( options, endpoint ) {
		let BASEURL = WP_BASEURL + endpoint;
		let FETCHURL = withRefresh? BASEURL + '&refresh=1' : BASEURL;
		fetch( FETCHURL, {
			method: 'GET',
		} )
			.then( ( req ) => req.json() )
			.then( ( json ) => {
				normalizer( json ).forEach( ( v, i ) => {
					options[ i ] = v;
				} ); //inserts into options
				console.log( options, json );
				console.log( 'executed fetch from new-case' );
				const refreshbtn = document.body.querySelector( '#refreshme' );
				if ( refreshbtn ) refreshbtn.click();
			} );
	};
}

const fetchOptions = composeOptionsFetcher( normJsonToOptions );
const refreshOptions = composeOptionsFetcher( normJsonToOptions,true );
const normCat = ( jsonData ) => jsonData.map( ( obj ) => ( { label: obj.name, value: obj.id } ) );
const fetchCategories = composeOptionsFetcher( normCat );
// const repOptions = controls.caseCreation[0].options
// const deptOptions = controls.caseCreation[1].options
// const casetagOptions = controls.caseCreation[2].options
// const categoryOptions = controls.suggestedPosts[3].options

//Singleton that pulls data on mount and updates options
class OptionsPuller extends React.Component {
	constructor( props ) {
		super( props );
		this.repOptions = controls.caseCreation[0].options
		this.deptOptions = controls.caseCreation[1].options
		this.casetagOptions = controls.caseCreation[2].options
		this.categoryOptions = controls.suggestedPosts[3].options
	}

	componentDidMount() {
		fetchOptions( this.repOptions, REPS_ENDPOINT );
		fetchOptions( this.deptOptions, DEPTS_ENDPOINT );
		fetchOptions( this.casetagOptions, CASETAGS_ENDPOINT );
		fetchCategories( this.categoryOptions, CATEGORIES_ENDPOINT );
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
	const getRefreshOptionsButton = (option) => (
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
			<OptionsPuller />
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
			{/* { getRefreshButton() } */}

			{ /* {displayAllShortCodeAtts()} */ }
		</div>
	);
}
