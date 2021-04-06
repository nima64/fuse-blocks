/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps ,InspectorControls, InspectorAdvancedControls} from "@wordpress/block-editor";
import {Panel,PanelRow,PanelBody,PanelGroup,Placeholder} from "@wordpress/components";
import { TextControl, RangeControl,SelectControl} from "@wordpress/components";
import MultiSelect from '../../lib/MultiSelect';
// import Select from 'react-select';
// import {useState} from 'react';
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
// const [selectedOption, setSelectedOption] = useState(null);

export default function Edit(props) {
	const {attributes,setAttributes} = props;
	const {display,text} = attributes;

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

	const renderControlObj = (obj,attAry) => {
		switch (obj.type) {
			case 'check':
				return (
					<CheckboxControl  
						label={obj.label}
						checked={attributes[attAry][0][obj.bind]} 
						onChange={(newval) => mutAryItem(newval,obj.bind,attAry)}  />);	
			case 'text' :
				return (					
					<TextControl 
						label={obj.label}
						value={attributes[attAry][0][obj.bind]} 
						placeholder={obj.placeholder}
						onChange={(newval) => mutAryItem(newval,obj.bind,attAry)} />);
			case 'select':
				return (					
					<SelectControl 
						label={obj.label}
						value={attributes[attAry][0][obj.bind]} 
						options={obj.options}
						onChange={(newval) => {mutAryItem(newval,obj.bind,attAry); console.log(newval)}} />);

			case 'multiSelect':
				return (					
					<MultiSelect 
						label={obj.label}
						value={attributes[attAry][0][obj.bind]} 
						options={obj.options}
						onChange={(newval) => mutAryItem(newval,obj.bind,attAry)} />);

			case 'range' :
				return (
					<RangeControl 
						min={obj.min}	
						max={obj.max}
						value={attributes[attAry][0][obj.bind]}
						onChange={(newval) => mutAryItem(newval,obj.bind,attAry)} />
				);
		}
	}

	const getDisplayPanel = () => {
		const statusShared = [
			{label: "All",value:"all"},
			{label: "Active",value:"active"},
			{label: "New", value:'new'},
			{label: "Open", value:'open'},
			{label: "Closed", value: 'closed'},
		]

		const options = {
			columns: [
				// {label: "Case Number, Date Updated, Status, Summary", value:"casenum,date_updated,status,summary"}
				{label: "Case Number",value:'casenum'},
				{label: "Date Updated",value:'date_updated'},
				{label: "Status",value:'status'},
				{label: "Summary",value:'summary'},
			],
			status: statusShared,
			userstatus: statusShared,
			orderby: [
				{label: "Oldest to Newest",value:"date_updated"},
				{label: "Dated Opened",value:"date_opened"},
			],
			dateformat: [
				{label: 'M j, Y g:ia'}
			],
		}

		const controlsData = [
			{type:'multiSelect',label:'Columns',options:options.columns,bind:'columns'},
			{type:'select',label:'Case Statuses',options:options.status,bind:'status'},
			{type:'select',label:'User Filterable Statuses',options:options.userstatus,bind:'userstatuses'},
			{type:'select',label:'Case Order',options:options.orderby,bind:'orderby'},
			{type:'text',label:'Date Format',options:options.dateformat,bind:'dateformat'},
			{type:'range',label:'How many cases should we display?',min:1,max:80,bind:'limit'},
		]

		return (
			<Panel>
				<PanelBody title="Display">
					{controlsData.map((v) => renderControlObj(v,'display'))}
				</PanelBody>
			</Panel>
		);
	}

	const getTextPanel = () => {
		// const columnCheck = {type:'text',label:'Case Number Column', placeholder:'Case #',bind:''}
		const columnControls = {
			casenum : {type:'text',label:'Case Number Column', placeholder:'Case #',bind:'casenum_name'},
			date_updated : {type:'text',label:'Date Updated Column', placeholder:'rename dateupdated col',bind:'date_updated_name'},
			status : {type:'text',label:'Status Column', placeholder:'rename status col',bind:'status_name'},
			summary: {type:'text',label:'Summary Column', placeholder:'rename summary updated',bind:'summary_name'},
		}
		
		const errorControls = [
			{type:'text',label:'Error, Not Logged In', placeholder:'Please login to view your cases',bind:'errornotloggedin'},
			{type:'text',label:'Error, No Cases', placeholder:"Looks like you don't have any support cases!",bind:'errornocases'},
		]
		return (
			<Panel>
				<PanelBody title="Text">
					
					{/* display columns text if display.columns contains hash key then reder */}
					{ display[0].columns && display[0].columns.map((v) => renderControlObj( columnControls[v.value] ,'display') ) }
					{errorControls.map((v) => renderControlObj(v,'text'))}
				
				</PanelBody>
			</Panel>
		);
	}
	const getAdvancedControls = () => (
		<InspectorAdvancedControls>
			<TextControl 
				label="Custom Styles"
				value = {attributes.customStyles}
				onChange = { (customStyles) => setAttributes({customStyles}) }
				about="ex: padding:10px; background-color:blue;"
			/>
		</InspectorAdvancedControls>
	);
	const getInspectorControls = () => {
		return(
			<InspectorControls>
				{getDisplayPanel()}
				{getTextPanel()}
				{getAdvancedControls()}
				
			</InspectorControls>
		) 
	} 

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

	return (
		<div { ...useBlockProps() }>
			{getInspectorControls()}
			<Placeholder
				label="FuseDesk My Cases"
				instructions="Placeholder that will display your cases"
			/>
			{/* {displayAllShortCodeAtts()} */}
		</div>
	);
}
