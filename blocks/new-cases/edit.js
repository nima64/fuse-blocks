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
} from '@wordpress/components';
import {
	SelectControl,
	CheckboxControl,
	TextControl,
	RangeControl,
} from '@wordpress/components';
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

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {newCaseForm,caseTitle,formText,suggestedPosts} = attributes;
	let mutAryItem = ( newval, i, aryName ) => {
		let temp = { ...attributes[ aryName ] };
		temp[ i ] = newval;
		setAttributes( { [ aryName ]: temp } );
	};
	const getCaseCreationPanel = () => {
		const options = {
			department: [ 
				{ label: 'Department', value: 'department' } 
			],
			repAssignment: [
				{ label: 'Assign Randomly', value: 'Assign Randomly' },
			],
			caseTagsToApply: [ { label: 'Tags', value: 'Tags' } ],
		};
		return (
			<Panel>
				<PanelBody title="Case Creationg">
					<SelectControl 
						label="Department" 
						options={options.department}
					/>
					<SelectControl 
						label="Rep Assingment" 
						options ={options.repAssignment}
					/>
					<SelectControl 
						label="Case Tags to Apply" 
						options= {options.caseTagsToApply}
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
						checked={newCaseForm.hideknowndata}
						onChange= {()=> {mutAryItem(!newCaseForm.hideknowndata,'hideknowndata','newCaseForm')} }
					/>
					<TextControl
						label="Sucess Redirect URL"
						placeholder="Don't Redirect"
						value = {newCaseForm.sucessredirect}
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
						checked = {caseTitle.showtitle}
						onChange = {() => mutAryItem(!caseTitle.showtitle,'showtitle','caseTitle')}
					/>
					<TextControl
						label="Case Title Label"
						placeholder="Briefly, what is the request about?"
						value = {caseTitle.titletext}
						onChange = {(v) => mutAryItem(v,'titletext','caseTitle')}
					/>
					<TextControl
						label="Case Title Options (for a drop down selection)"
						placeholder="Case Title Options, oner per line, optional"
						value = {caseTitle.titleoptions}
						onChange = {(v) => mutAryItem(v,'titleoptions','caseTitle')}
					/>
				</PanelBody>
			</Panel>
		);
	};
	const getFormTextPanel = () => {
		return (
			<Panel>
				<PanelBody title="Form Text"></PanelBody>
			</Panel>
		);
	};
	const getSuggestedPostsPanel = () => {
		return (
			<Panel>
				<PanelBody title="Suggested Posts"></PanelBody>
			</Panel>
		);
	};
	const getFileUploadsPanel = () => {
		return (
			<Panel>
				<PanelBody title="File Uploads"></PanelBody>
			</Panel>
		);
	};
	const getInspectorControls = () => {
		return (
			<InspectorControls>
				{getCaseCreationPanel()}
				{getNewCaseFormPanel()}
				{getCaseTitlePanel()}
				{getSuggestedPostsPanel()}
				{getFormTextPanel()}
				{getFileUploadsPanel()}
			</InspectorControls>
		)
	};

	//for debugging purposes only
	const displayShortCodeAtts = (ary) =>
		Object.entries( ary ).map( ( [ k, v ] ) => (
			<p> { `${ k }: ${ v }` }</p>
		) );

	// displayShortCodeAtts(newCaseForm)
	return (
		<div { ...useBlockProps() }>
			{ getInspectorControls() }
			<Placeholder
				label="FuseDesk New Cases"
				instructions="Placeholder that will display a form to allow your customers to create a new case"
			/>
			{
			Object.entries( attributes ).map( ([k,v]) => (
				<>
				<h4>{k}</h4>
				{displayShortCodeAtts(v)}
				</>
			)) 
			 }
		</div>
	);
}
