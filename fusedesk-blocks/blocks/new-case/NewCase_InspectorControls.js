import controls from './controlsData';
import createControlRenderer from '../../lib/createControlRenderer';
import fetchCalls from './fetchCalls';
import { 
	useBlockProps,
	InspectorControls,
	InspectorAdvancedControls,
} from '@wordpress/block-editor';
import { Icon } from '@wordpress/icons';
import {
	Panel,
	PanelBody,
} from '@wordpress/components';

const refreshIcon = <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" style={{height:'20px',width:'20px'}}><path d="M35.3 12.7c-2.89-2.9-6.88-4.7-11.3-4.7-8.84 0-15.98 7.16-15.98 16s7.14 16 15.98 16c7.45 0 13.69-5.1 15.46-12h-4.16c-1.65 4.66-6.07 8-11.3 8-6.63 0-12-5.37-12-12s5.37-12 12-12c3.31 0 6.28 1.38 8.45 3.55l-6.45 6.45h14v-14l-4.7 4.7z"></path> </svg>;
const getStringToOptions = (s) => s.split(',').map((v) => ({label:v,value:v}));

//singleton that holds the options data for form's case title dropdown
//only affects form title options view
class FormTitleOptions{
	constructor(){
		this.options = [{label:'emtpy',value:''}];
	}
	update(str){
		if (str){
			this.options.length = 0;
			this.options = getStringToOptions(str);
		}
	}
	get(){
		return this.options;
	}
}

let formTitleOptions = new FormTitleOptions();

function NewCase_InspectorControls(props){
	const { attributes, setAttributes } = props

	const renderControlObj = createControlRenderer( props ); //renders control data

	const getCaseCreationPanel = () => {
		const controlsData = controls.caseCreation;
		const inpFlex = 10;
		const buttonStyle = {flex:1,height:'30px',marginBottom: '35px',marginLeft: '10px'};
		const RefreshButton = (props) => <button onClick={props.onClick} style={{...buttonStyle}}><Icon icon={refreshIcon}></Icon></button>
		const XRefreshButton = (props) => <button onClick={props.onClick} style={{...buttonStyle,marginBottom:'0'}}><Icon icon={refreshIcon}></Icon></button>
		const ControlsTemplate = (props) => (
			<div style={{display:'flex',alignItems:'center'}}>
				<span style={{margin:0,flex:inpFlex}}>
				{renderControlObj(controlsData[props.id] , 'caseCreation' )}
				</span >
				{props.children}
			</div>
		);

		return (
			<Panel>
				<PanelBody title="Case Creation">
					<ControlsTemplate id="rep" >
					</ ControlsTemplate>
					<ControlsTemplate id="department" >
					</ ControlsTemplate>
					{ControlsTemplate({id:'casetagids'})}
					{/* <ControlsTemplate id="casetagids" > </ControlsTemplate> */}
				</PanelBody>
			</Panel>
		);
	};
	const getNewCaseFormPanel = () => {
		const controlsData = controls.newCaseForm;
		return (
			<Panel>
				<PanelBody title="New Case Form">
					{ Object.entries(controlsData).map( ( [ k,v ] ) => renderControlObj( v, 'newCaseForm' ) ) }
				</PanelBody>
			</Panel>
		);
	};
	const getCaseTitlePanel = () => {
		const controlsData = controls.caseTitle;
		return (
			<Panel>
				<PanelBody title="Case Title">
					{ renderControlObj( controlsData.showtitle,'caseTitle') }
					{
						///show other options only when showtitle checked
						attributes.showtitle && (
							<>
							{ renderControlObj( controlsData.titletext,'caseTitle')}
							{ renderControlObj( controlsData.titleoptions ,'caseTitle',(v) =>{
								formTitleOptions.update(v);
								return v;
							})} 
							
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
					{ Object.entries(controlsData).map( ( [ k,v ] ) =>
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
						attributes.suggestionplacement != 'none'
							?  Object.entries(controlsData).map( ( [ k,v ]  ) =>
									renderControlObj( v, 'suggestedPosts' )
							  )
							: renderControlObj(
									controlsData.suggestionplacement,
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
					{ attributes.fileupload? 
						//render all
						Object.entries(controlsData).map( ( [k,v] ) => renderControlObj( v, 'fileUploads' ) ) 
						: 
						renderControlObj( controlsData.fileupload , 'fileUploads' ) }
				</PanelBody>
			</Panel>
		);
	};
	const getAdvancedPanel = () => {
		const controlsData = controls.advanced;
		return (
			<>
				{ renderControlObj(controlsData.anchor ,'advanced',(v) => v.slice(-1) == ' '? v.slice(0,-1) + '-' : v ) }
				{ renderControlObj(controlsData.style ,'advanced') }
			</>
		);
	}

	return (
		<>
		<InspectorControls>
			{getCaseCreationPanel()}
			{ getNewCaseFormPanel() }
			{ getCaseTitlePanel() }
			{ getFormTextPanel() }
			{ getSuggestedPostsPanel() }
			{ getFileUploadsPanel() }
		</InspectorControls>
		<InspectorAdvancedControls>
			{getAdvancedPanel()}
		</InspectorAdvancedControls>
		</>
	);
}
export {formTitleOptions,NewCase_InspectorControls};