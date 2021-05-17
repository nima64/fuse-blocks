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
import {InspectorControls_NewCase,formTitleOptions} from './InspectorControls_NewCase';
import fetchCalls from './fetchCalls';
import controls from './controlsData';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './css/editor.scss';
import controlsData from './controlsData';


/**
 * IO fetch requests on mount
 */
class OptionsPuller extends React.Component {
	constructor( props ) {
		super( props );
		this.fetchCalls = fetchCalls;
		this.caseTitle = props.attributes.caseTitle;
		this.attributes = props.attributes;
		this.setAttributes = props.setAttributes;
		this.department = props.attributes.department;
	}

	componentDidMount() {
		let dep_options = controlsData.caseCreation.department.options;
		this.fetchCalls.get_rep_options();
		this.fetchCalls.get_dep_options( () => { 
			//don't override existing option
			if(!this.department){
				//set it to the first option after fetch
				this.setAttributes( { ['department']:dep_options[0].value });
			}
		});
		this.fetchCalls.get_casetagids();
		this.fetchCalls.get_categories();
	}

	render() {
		return '';
	}
}

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

	const RepaintButton = () => (
		<button
			id={ 'fusedesk_repaintMe' }
			style={ { opacity: '0', float: 'left', margin: '0', padding: '0' } }
			onClick={ () => {
				setAttributes( { repaintMe: !attributes.repaintMe } );
			} }
		></button>
	);

	/**
	 * @return {JSX.Element} New case form
	 */
	const getForm = () => {
		return(
			<form id="fusedesk-contact" action="#" data-successredirect="">
				<input type="hidden" name="action" value="fusedesk_newcase" />
				<input type="hidden" name="repid" />
				<input type="hidden" name="depid" />
				<input type="hidden" name="casetags" />
				<input type="hidden" name="opened_from" />

				{attributes.nametext || __('Your Name','fusedesk')}
				<input type="text" name="openedby" id="fusedesk-contact-name"  class="fusedesk-contactform"/>

				{attributes.emailtext || __('Your Email','fusedesk')}
				<input type="text" name="email" id="fusedesk-contact-email"  class="fusedesk-contactform"/>
				<input type="hidden" name="summary" value="Support Request"/>


				{ attributes.showtitle &&
					<>
					{attributes.titletext || __('Briefly, what is the request about?','fusedesk')}
					{ 
						//
						attributes.titleoptions?
							<SelectControl options={formTitleOptions.get()}  name="summary" id="fusedesk-title" class="fusedesk-contactform" />
							:
							<input type="text" name="summary" id="fusedesk-title"  class="fusedesk-contactform"></input>
					}
					</>
				}

				{ attributes.fileupload &&
					<>
					{ attributes.filetext || __('Attach a file:','fusedesk') }
					<input type="file" name="file_upload[]" accept="image/*,audio/*,application/pdf" id="fusedesk-fileupload" class="fusedesk-contactform" multiple="" /><br/>
					</>
				}

				<>
				{__("How can we help you?",'fusedesk')}
				<textarea name="details" id="fusedesk-message" class="fusedesk-contactform"></textarea>
				</>

				<div id="fusedesk-suggestions" style={{display:'none'}} data-limit="10" data-categories="">
					<span>May we suggest one of the following posts?</span>
					<ul style={{listStyle:'none'}}></ul>
				</div>

				<input type="button" id="fusedesk-contactform-submit" value={attributes.buttontext || __('create support case','fusedesk')}/>
			</form>
		);	
	}

	return (
		<div { ...useBlockProps() }>
			<OptionsPuller {...props} />
			<InspectorControls_NewCase {...props} />
			{getForm()}
			<RepaintButton />
		</div>
	);
}
