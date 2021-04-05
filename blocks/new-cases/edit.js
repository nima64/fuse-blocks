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
import {rotateLeft,Icon} from '@wordpress/icons';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

const WP_BASEURL = 'http://localhost/wordpress/'
const REPS_ENDPOINT = '/wp-admin/admin-ajax.php?action=fusedesk_reps&refresh=1';
const DEPTS_ENDPOINT = '/wp-admin/admin-ajax.php?action=fusedesk_departments&refresh=1';
const CASETAGS_ENDPOINT = '/wp-admin/admin-ajax.php?action=fusedesk_casetags&refresh=1';

let repOptions = [{label:'please Refresh', value:false}];
let deptOptions = [{label:'please Refresh', value:false}];
let casetagOptions = [{label:'please Refresh', value:false}];

//normalize reps json into {label,value} format for Select Components
const normRepsToOptions = (repsJson) => Object.entries(repsJson).map(([v,k]) => ({label:k,value:v}) );

const fetchOptions = (options, endpoint) => {
	fetch(WP_BASEURL + endpoint,{
	    method:'GET'
	})
	.then(req => req.json())
	.then(json => {
		normRepsToOptions(json).forEach((v,i) => { options[i] = v }); //takes normalized options and inserts them into options
		console.log(options, json);
		console.log('executed fetch from new-case');
		let refreshbtn = document.body.querySelector('#refreshme');
		if(refreshbtn)
			refreshbtn.click();
	});
}

//Singleton that pulls data on mount and updates options
class OptionsPuller extends React.Component{
	constructor (props){
		super(props);
	}
	componentDidMount(){
		fetchOptions(repOptions,REPS_ENDPOINT);
		fetchOptions(deptOptions,DEPTS_ENDPOINT);
		fetchOptions(casetagOptions,CASETAGS_ENDPOINT);
	}
	render(){
		return '';
	}
}
export default function Edit( props ) {
	
	const { attributes, setAttributes } = props;
	const {caseCreation,newCaseForm,caseTitle,formText,suggestedPosts,fileUploads,test} = attributes;

	/**
	 * Change an Attribute Array's key value
	 * @param  {string} newval 
	 * @param  {string} key 
	 * @param  {string} attName name of the attribute of type array
	 * @returns {void}
	*/
	const mutAryItem = ( newval, key, attName ) => {
		let temp = [{...attributes[ attName ][0]}] ;
		temp[0][ key ] = newval;
		setAttributes( { [ attName ]: temp } );
	};

	const renderControlObj = createControlRenderer(props);

	const getCaseCreationPanel = () => {
		const controlsData = [
			{type:'select',label:'Department',options:repOptions,bind:'department'},
			{type:'select',label:'Rep Assignment',options:deptOptions,bind:'rep'},
			{type:'select',label:'Case Tags to Apply',options:casetagOptions,bind:'casetagids'},
		]
		return (
			<Panel>
				<PanelBody title="Case Creation">
					{controlsData.map((v) => renderControlObj(v,'caseCreation'))}
				</PanelBody>
			</Panel>
		);
	};
	const getNewCaseFormPanel = () => {
		return (
			<Panel>
				<PanelBody title="New Case Form">
					<CheckboxControl 
						label="Hide Known Data?"
						checked={ newCaseForm[0].hideknowndata }
						onChange= {()=> {mutAryItem(!newCaseForm[0].hideknowndata,'hideknowndata','newCaseForm')} }
					/>
					<TextControl
						label="Sucess Redirect URL"
						placeholder="Don't Redirect"
						value = { newCaseForm[0].sucessredirect}
						onChange= { (v) => mutAryItem(v,'sucessredirect','newCaseForm') }
					/>
				</PanelBody>
			</Panel>
		);
	};
	const getCaseTitlePanel = () => {

		return (
			<Panel>
				<PanelBody title="Case Title">
					<CheckboxControl 
						label="Show a title field?"
						checked = { caseTitle[0].showtitle }
						onChange = {(v) => mutAryItem(v,'showtitle','caseTitle')}
					/>
					{ 
						///show other options only when showtitle checked
						caseTitle[0].showtitle &&
						<>
						<TextControl
							label="Case Title Label"
							placeholder="Briefly, what is the request about?"
							value = { caseTitle[0].titletext }
							onChange = {(v) => mutAryItem(v,'titletext','caseTitle')}
						/>
						<TextControl
							label="Case Title Options (for a drop down selection)"
							placeholder="Case Title Options, oner per line, optional"
							value = { caseTitle[0].titleoptions }
							onChange = {(v) => mutAryItem(v,'titleoptions','caseTitle')}
						/>
						</>
					}
				</PanelBody>
			</Panel>
		);
	};
	const getFormTextPanel = () => {
		const textControldata = [
			{type:'text', label:'Name Label',placeholder:'Your Name',bind:'nametext'},
			{type:'text', label:'Email Label',placeholder:'Your Email Adress',bind:'emailtext'},
			{type:'text', label:'Button Text',placeholder:'Create Support Case',bind:'buttontext'},
			{type:'text', label:'Creating Text',placeholder:'Submitting Case...',bind:'creatingtext'},
			{type:'text', label:'Sucess Text',placeholder:'Thanks! Your case has been created, We will gl...',bind:'successtext'},
		]
		return (
			<Panel>
				<PanelBody title="Form Text">
					{ textControldata.map((v) => renderControlObj(v,'formText')) }
				</PanelBody>
			</Panel>
		);
	};
	const getSuggestedPostsPanel = () => {
		const options = {
			placement:[
				{label:'before',value:'before'},
				{label:'after',value: 'after'},
				{label:'end',value: 'end'},
				{label:'none',value: 'none'},	
			],
			category:[
				{label:'All Categories',value: 'All Categories'},
			]
		}
		const controlsData = [
			{type:'select',label:'Suggestions Placement',options:options.placement,bind:'suggestionplacement'},
			{type:'text',label:'Suggestions Label',placeholder:"May we suggest one of the following posts?",bind:'suggestionstext'},
			{type:'range', min:1,max:100,label:'Suggestions Limit', bind:'suggestionlimit'},
			{type:'select',label:'Suggestions Category',options:options.category,bind:'suggestioncategories'},
		]
		return (
			<Panel>
				<PanelBody title="Suggested Posts">
					{
						//only render/show rest when none is not selected
						suggestedPosts[0].suggestionplacement != 'none' ?
							controlsData.map((v) => renderControlObj(v,'suggestedPosts'))
							:
							renderControlObj(controlsData[0],'suggestedPosts')
					}
				</PanelBody>
			</Panel>
		);
	};
	const getFileUploadsPanel = () => {
		const controlsData = [
			{type:'check',label:'Allow file uploads?',bind:'fileupload'},
			{type:'check',label:'Require a file upload?',bind:'filerequired'},
			{type:'check',label:'Allow Multiple Files?',bind:'filesmultiple'},
			{type:'text',label:'File Upload Label',placeholder:'Attach a file',bind:'filetext'},
			{type:'text',label:'Allowed File MIME types',placeholder:'image/*,audio/*,application/pdf',bind:'filetypesallowed'},
		]
		return (
			<Panel>
				<PanelBody title="File Uploads">
				{
					fileUploads[0].fileupload?
						controlsData.map((v) => renderControlObj(v,'fileUploads')) //render all
					:
						renderControlObj(controlsData[0],'fileUploads')
				}
				</PanelBody>
			</Panel>
		);
	};

	// all block settings created in Inspector Controls
	const getInspectorControls = () => {
		return (
			<InspectorControls>
				{getCaseCreationPanel()}
				{getNewCaseFormPanel()}
				{getCaseTitlePanel()}
				{getFormTextPanel()}
				{getSuggestedPostsPanel()}
				{getFileUploadsPanel()}
			</InspectorControls>
		)
	};

	//for debugging purposes only
	const displayShortCodeAtts = ([ary]) =>(
		Object.entries( ary ).map( ( [ k, v ] ) => (
			<p> { `${ k }: ${ v }` }</p>
		))
	);

	const displayAllShortCodeAtts = () =>(
		Object.entries( attributes ).map( ([k,v]) => (
			v.constructor == Array &&
			<>
				<h4>{k}</h4>
				{displayShortCodeAtts(v)}
			</>
		)) 
	);
	
	const getRefreshButton = () => (
		<button id={'refreshme'}  
			style={{opacity:'0',float:'left',margin:'0',padding:'0'}}
			onClick={()=> {
				console.log('refresh me was clicked!');
				let inc = attributes.refreshme + 1;
				setAttributes({refreshme: inc});
			}}
		></button>
	);

	// displayShortCodeAtts(newCaseForm)
	return (
		<div { ...useBlockProps() }>
			{ getInspectorControls() }
			<OptionsPuller />
			<Placeholder
				label="FuseDesk New Case"
				instructions="Click on the settings gear icon to get started!"
			/>
			{getRefreshButton()}
			{/* {displayAllShortCodeAtts()} */}
		</div>
	);
}
