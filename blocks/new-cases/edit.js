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
// import {useState} from '@wordpress/element';
import Select from 'react-select';
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
//normalize reps json into {label,value} form for select
const normRepsToOptions = (repsJson) => Object.entries(repsJson).map(([v,k]) => ({label:k,value:v}) );
const fetchOptions = (options, endpoint) => {
	fetch(WP_BASEURL + endpoint,{
	    method:'GET'
	})
	.then(req => req.json())
	.then(json => {
		normRepsToOptions(json).forEach((v,i) => { options[i] = v }); 
		console.log(options);
		let refreshbtn = document.body.querySelector('#refreshme')
		if(refreshbtn)
			refreshbtn.click();
// 		//REFRESH TEST
// 		// setTimeout(() => {
// 		// 	let refreshbtn = document.body.querySelector('#refreshme');
// 		// 	if (refreshbtn) { 
// 		// 	// 	setAtts({refreshMe:1}); 
// 		// 		refreshbtn.click();
// 		// 	}
// 		// 	console.log(reps, normRepsToOptions(reps))
// 		// },1000);
	});
}

fetchOptions(repOptions,REPS_ENDPOINT);
fetchOptions(deptOptions,DEPTS_ENDPOINT);
fetchOptions(casetagOptions,CASETAGS_ENDPOINT);

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {caseCreation,newCaseForm,caseTitle,formText,suggestedPosts,fileUploads,test} = attributes;

	/**
	 * Change an Attribute Array's key value
	 * @param  {string} newval 
	 * @param  {string} key 
	 * @param  {string} aryName an attribute of type array
	 * @return {void}
	*/
	let mutAryItem = ( newval, key, aryName ) => {
		let temp = [{...attributes[ aryName ][0]}] ;
		temp[0][ key ] = newval;
		setAttributes( { [ aryName ]: temp } );
	};

	const renderControlObj = (obj) => {
		// switch (obj.type) {
		// 	case 'check':
		// 		return (
		// 			<CheckboxControl  
		// 				label={obj.label}
		// 				checked={fileUploads[0][obj.bind]} 
		// 				onChange={(newval) => mutAryItem(newval,obj.bind,'fileUploads')}  />);	
		// 	case 'text' :
		// 		return (					
		// 			<TextControl 
		// 				label={obj.label}
		// 				value={fileUploads[0][obj.bind]} 
		// 				placeholder={obj.placeholder}
		// 				onChange={(newval) => mutAryItem(newval,obj.bind,'fileUploads')} />);
		// }
		return obj.type == 'check'? 
		(<CheckboxControl  
			label={obj.label}
			checked={fileUploads[0][obj.bind]} 
			onChange={(newval) => mutAryItem(newval,obj.bind,'fileUploads')}  />)
		:
		(<TextControl 
			label={obj.label}
			value={fileUploads[0][obj.bind]} 
			placeholder={obj.placeholder}
			onChange={(newval) => mutAryItem(newval,obj.bind,'fileUploads')} />);

	}

	const getCaseCreationPanel = () => {
		const options = {
			department: [ 
				{ label: 'Department', value: 'department' },
				{ label: '324', value: 'fsd' } ,
				{ label: 'fsd', value: '342' } ,
			],
			repAssignment: [
				{ label: 'Assign Randomly', value: 'Assign Randomly' },
			],
			caseTagsToApply: [ { label: 'Tags', value: 'Tags' } ],
		};
		return (
			<Panel>
				<PanelBody title="Case Creation">
					{/* <Select
						// defaultValue = {placementOptions[2]}
						value = {caseCreation[0].department}
						onChange = {(v) => mutAryItem(v,'department','caseCreation')}
						options = {reps}
						// isMulti = {true}
					/> */}
					<SelectControl 
						label="Department" 
						options={deptOptions}
						value = {caseCreation[0].department}
						onChange = { (v) => mutAryItem(v,'department','caseCreation') }
					/>
					<SelectControl 
						label="Rep Assingment" 
						options={repOptions}
						value = {caseCreation[0].rep}
						onChange = { (v) => mutAryItem(v,'rep','caseCreation') }
					/>
					<SelectControl 
						label="Case Tags to Apply" 
						value = {caseCreation[0].casetagids}
						options= {casetagOptions}
						onChange = { (v) => mutAryItem(v,'casetagids','caseCreation') }
					/>
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
			{label:'Name Label',placeholder:'Your Name',bind:'nametext'},
			{label:'Email Label',placeholder:'Your Email Adress',bind:'emailtext'},
			{label:'Button Text',placeholder:'Create Support Case',bind:'buttontext'},
			{label:'Creating Text',placeholder:'Submitting Case...',bind:'creatingtext'},
			{label:'Sucess Text',placeholder:'Thanks! Your case has been created, We will gl...',bind:'successtext'},
		]
		return (
			<Panel>
				<PanelBody title="Form Text">
					{
						textControldata.map( ( {label,placeholder,bind} ) => (
							<TextControl
								label={label}
								value = {formText[0][bind]}
								placeholder = {placeholder}
								onChange = {(v) => mutAryItem(v,bind,'formText')}
							/>
						))
					}
				</PanelBody>
			</Panel>
		);
	};
	const getSuggestedPostsPanel = () => {
		const placementOptions = [
			{label:'before',value:'before'},
			{label:'after',value: 'after'},
			{label:'end',value: 'end'},
			{label:'none',value: 'none'},
		];
		const categoryOptions = [
			{label:'All Categories',value: 'All Categories'},
		];
		return (
			<Panel>
				<PanelBody title="Suggested Posts">
					<SelectControl 
						label="Suggestions Placement"
						value={suggestedPosts[0].suggestionplacement}
						onChange={(v) => mutAryItem(v,'suggestionplacement','suggestedPosts') } 
						options={placementOptions}
					/>
					{
						//only render/show when none is not selected
						suggestedPosts[0].suggestionplacement != 'none' &&
						<>
						<TextControl
							label="Suggestions Label"
							placeholder="May we suggest one of the following posts?"
							value={suggestedPosts[0].suggestionstext}
							onChange={ (v) => mutAryItem(v,'suggestionstext','suggestedPosts') }
						/>
						<RangeControl 
							min={1}	
							max={100}
							value={suggestedPosts[0].suggestionlimit}
							onChange={ (v) => mutAryItem(v,'suggestionlimit','suggestedPosts') }
						/>
						<SelectControl 
							label="Suggestion Category"
							value={suggestedPosts[0].suggestioncategories}
							onChange={(v) => mutAryItem(v,'suggestioncategories','suggestedPosts') } 
							options={categoryOptions}
						/>
						</>
					}
				</PanelBody>
			</Panel>
		);
	};
	const getFileUploadsPanel = () => {
		const inputData = [
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
						inputData.map((v) => renderControlObj(v))
					:
						renderControlObj(inputData[0])
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
			<Placeholder
				label="FuseDesk New Case"
				instructions="Click on the settings gear icon to get started!"
			/>
			{getRefreshButton()}
			{/* {displayAllShortCodeAtts()} */}
		</div>
	);
}
