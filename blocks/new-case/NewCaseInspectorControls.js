import controls from './controlsData';
import createControlRenderer from '../../lib/createControlRenderer';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Icon } from '@wordpress/icons';
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
const refreshIcon = <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48"><path d="M35.3 12.7c-2.89-2.9-6.88-4.7-11.3-4.7-8.84 0-15.98 7.16-15.98 16s7.14 16 15.98 16c7.45 0 13.69-5.1 15.46-12h-4.16c-1.65 4.66-6.07 8-11.3 8-6.63 0-12-5.37-12-12s5.37-12 12-12c3.31 0 6.28 1.38 8.45 3.55l-6.45 6.45h14v-14l-4.7 4.7z"></path> </svg>;
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
const repOptions = controls.caseCreation[0].options
const deptOptions = controls.caseCreation[1].options
const casetagOptions = controls.caseCreation[2].options
const categoryOptions = controls.suggestedPosts[3].options

//Singleton that pulls data on mount and updates options
class OptionsPuller extends React.Component {
	// constructor( props ) {
	// 	super( props );
	// }

	componentDidMount() {
		fetchOptions( repOptions, REPS_ENDPOINT );
		fetchOptions( deptOptions, DEPTS_ENDPOINT );
		fetchOptions( casetagOptions, CASETAGS_ENDPOINT );
		fetchCategories( categoryOptions, CATEGORIES_ENDPOINT );
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
		const inpFlex = 10;
		const RefreshButton = (props) => <button onClick={props.onClick} style={{flex:1,height:'30px',marginBottom: '8px',marginLeft: '10px'}}><Icon icon={refreshIcon}></Icon></button>
		return (
			<Panel>
				<PanelBody title="Case Creation">
					<div style={{display:'flex',alignItems:'flex-end'}}>
						<span style={{margin:0,flex:inpFlex}}>
						{renderControlObj(controlsData[0] , 'caseCreation' )}
						</span >
						<RefreshButton onClick={()=>refreshOptions( repOptions, REPS_ENDPOINT )}/>
					</div>

					<div style={{display:'flex',alignItems:'flex-end'}}>
						<span style={{margin:0,flex:inpFlex}}>
						{renderControlObj(controlsData[1] , 'caseCreation' )}
						</span >
						<RefreshButton onClick={()=>refreshOptions( deptOptions, DEPTS_ENDPOINT )}/>
					</div>

					<div style={{display:'flex',alignItems:'flex-end'}}>
						<span style={{margin:0,flex:inpFlex}}>
						{renderControlObj(controlsData[2] , 'caseCreation' )}
						</span >
						<RefreshButton onClick={()=>refreshOptions( casetagOptions, CASETAGS_ENDPOINT )}/>
						{/* <button style={{flex:1,height:'30px',marginBottom: '8px',marginLeft: '10px'}}>refresh</button> */}
					</div>
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