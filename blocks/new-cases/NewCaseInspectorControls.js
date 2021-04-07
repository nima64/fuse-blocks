import controls from './controlsData';
import createControlRenderer from '../../lib/createControlRenderer';
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

const WP_BASEURL = 'http://localhost/wordpress/';
const REPS_ENDPOINT = '/wp-admin/admin-ajax.php?action=fusedesk_reps&refresh=1';
const DEPTS_ENDPOINT ='/wp-admin/admin-ajax.php?action=fusedesk_departments&refresh=1';
const CASETAGS_ENDPOINT ='/wp-admin/admin-ajax.php?action=fusedesk_casetags&refresh=1';
const CATEGORIES_ENDPOINT = '/wp-json/wp/v2/categories/';

//normalize reps json into {label,value} format for Select Components
const normJsonToOptions = ( repsJson ) =>
	Object.entries( repsJson ).map( ( [ v, k ] ) => ( {
		label: k,
		value: v,
	} ) );

function composeOptionsFetcher( normalizer ) {
	return function ( options, endpoint ) {
		fetch( WP_BASEURL + endpoint, {
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
const normCat = ( jsonData ) => jsonData.map( ( obj ) => ( { label: obj.name, value: obj.id } ) );
const fetchCategories = composeOptionsFetcher( normCat );

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

export default function NewCaseInspectorControls(props){
	const { attributes, setAttributes } = props
	const {
		caseCreation,
		newCaseForm,
		caseTitle,
		formText,
		suggestedPosts,
		fileUploads,
		test,
	} = attributes;

	const mutAryItem = ( newval, key, attName ) => {
		const temp = [ { ...attributes[ attName ][ 0 ] } ];
		temp[ 0 ][ key ] = newval;
		setAttributes( { [ attName ]: temp } );
	};

	const renderControlObj = createControlRenderer( props );

	const getCaseCreationPanel = () => {
		const controlsData = controls.caseCreation;
		return (
			<Panel>
				<PanelBody title="Case Creation">
					{ controlsData.map( ( v ) =>
						renderControlObj( v, 'caseCreation' )
					) }
				</PanelBody>
			</Panel>
		);
	};
	const getNewCaseFormPanel = () => {
		const controlsData = controls.newCaseForm;
		return (
			<Panel>
				<PanelBody title="New Case Form">
					{ controlsData.map( (v) => renderControlObj( v, 'newCaseForm' ) ) }
				</PanelBody>
			</Panel>
		);
	};
	const getCaseTitlePanel = () => {
		const controlsData = controls.caseTitle;
		return (
			<Panel>
				<PanelBody title="Case Title">
						{ renderControlObj( controlsData[0],'caseTitle') }
					{
						///show other options only when showtitle checked
						caseTitle[ 0 ].showtitle && (
							<>
							{ renderControlObj( controlsData[1],'caseTitle')}
							{ renderControlObj( controlsData[2] ,'caseTitle' ) }
							</>
						)
					}
				</PanelBody>
			</Panel>
		);
	};
	const getFormTextPanel = () => {
		const controlsData = controls.formText;
		return (
			<Panel>
				<PanelBody title="Form Text">
					{ controlsData.map( ( v ) =>
						renderControlObj( v, 'formText' )
					) }
				</PanelBody>
			</Panel>
		);
	};
	const getSuggestedPostsPanel = () => {
		const controlsData = controls.suggestedPosts;
		return (
			<Panel>
				<PanelBody title="Suggested Posts">
					{
						//only render/show rest when none is not selected
						suggestedPosts[ 0 ].suggestionplacement != 'none'
							? controlsData.map( ( v ) =>
									renderControlObj( v, 'suggestedPosts' )
							  )
							: renderControlObj(
									controlsData[ 0 ],
									'suggestedPosts'
							  )
					}
				</PanelBody>
			</Panel>
		);
	};
	const getFileUploadsPanel = () => {
		const controlsData = controls.fileUploads;
		return (
			<Panel>
				<PanelBody title="File Uploads">
					{ fileUploads[ 0 ].fileupload? 
						//render all
						controlsData.map( ( v ) => renderControlObj( v, 'fileUploads' ) ) 
						: 
						renderControlObj( controlsData[ 0 ], 'fileUploads' ) }
				</PanelBody>
			</Panel>
		);
	};

	return (
		<InspectorControls>
			<OptionsPuller />
			{ getCaseCreationPanel() }
			{ getNewCaseFormPanel() }
			{ getCaseTitlePanel() }
			{ getFormTextPanel() }
			{ getSuggestedPostsPanel() }
			{ getFileUploadsPanel() }
		</InspectorControls>
	);
}