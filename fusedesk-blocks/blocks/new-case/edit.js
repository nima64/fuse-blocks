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
import {NewCase_InspectorControls,getTitleOptionsAry,loadTitleOptionsAry} from './NewCase_InspectorControls';
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
		this.caseTitle = props.attributes.caseTitle;
	}
	componentDidMount() {
		this.fetchCalls.get_rep_options();
		this.fetchCalls.get_dep_options();
		this.fetchCalls.get_casetag_options();
		this.fetchCalls.get_category_options();
		loadTitleOptionsAry(this.caseTitle[0].titleoptions);
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
				setAttributes( { repaintMe: !attributes.repaintMe } );
			} }
		></button>
	);

	const getForm = () => {
		const gradientClip = {WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'};
		const linearGradientA = {background:'linear-gradient(#33c6ff, #0669bd)',...gradientClip};
		const linearGradientB = {background:'linear-gradient(#7a6bff, #382ba2)',...gradientClip};
		const openSettings = () => { 
			document.querySelector('.wp-block-fusedesk-new-case').click();
			document.querySelector('.interface-pinned-items button[aria-label="Settings"]').click() 
		}
		return(
			<div style={{padding:'2em',backgroundColor:'white',border:'1px solid black'}}>

				{/* HEADER */}
				<div style={{display:'flex',justifyContent:'space-between'}}>
					<h2 style={{fontStyle:'italic',fontSize:'2.7rem',margin:0,fontWeight:'bold'}}>
						<span style={{...linearGradientA}}>New</span>
						<span style={{...linearGradientB}}>Case</span>
					</h2>
					<a  onClick={openSettings} style={{color:'inherit',fontSize:'1.7rem'}}className="dashicons dashicons-admin-generic"></a>
				</div>
				<p style={{fontStyle:'italic'}}>Allow your website visitors to create a new case form in FuseDesk.</p>

				{/* FORM BODY/INPUTS HERE */}
				<div class="fusedesk-form" style={{display: 'grid',gridTemplateColumns:'auto',rowGap:'20px'}}>
					{/* <div style={{display:'flex',marginBottom:'20px'}}> */}
					<div style={{display:'flex'}}>
						<div style={{flex:1}}>
							<div ><label>{formText[0].nametext || 'Your Name'}</label></div>
							<input type='text' style={{width:'90%'}}></input>
						</div>
						<div style={{flex:1}}>
							<div ><label>{formText[0].emailtext || 'Your Email'}</label></div>
							<input type='text' style={{width:'90%'}}></input>
						</div>
					</div>
					{ caseTitle[0].showtitle &&
						<div style={{display:'flex'}}>
							<label style={{marginRight:'20px'}}>{caseTitle[0].titletext || 'Briefly, what is the request about?'}</label> 
							{ caseTitle[0].titleoptions?
							<SelectControl  options={getTitleOptionsAry()} style={{height:'34px'}} />
							:
							<input type='text' ></input>
							}
						</div>
					}
					{ fileUploads[0].fileupload &&
						<div style={{display:'flex',alignItems:'flex-end',marginBottom:'20px'}}>
							<label style={{marginRight:'20px'}}>{fileUploads[0].filetext || 'Attach a file:'}</label> 
							<input type='file' ></input>
						</div>
					}
					<div>
						<div style={{marginBottom:'8px'}}><label>How can we help you?</label></div>
						<textarea rows="6" style={{width:'98%'}}></textarea>
					</div>
					{/* <button onClick={(v) => console.log(stringToOptions(caseTitle[0].titleoptions))}>{formText[0].buttontext || 'create support case'}</button> */}
					<div>
						<button >{formText[0].buttontext || 'create support case'}</button> 
					</div>
				</div>
			</div>
		)	
	}

	return (
		<div { ...useBlockProps() }>
			<OptionsPuller {...props} />
			<NewCase_InspectorControls {...props} />
			{getForm()}
			<RepaintButton />
		</div>
	);
}
