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
import { useBlockProps } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';
import controlsData from './controlsData';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param props
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 * @return {WPElement} Element to render.
 */
export default function save( props ) {
	const { attributes, setAttributes } = props;

	//grab settings related attributes and store them into an array
	let settings = ['caseCreation','newCaseForm','caseTitle','formText','suggestedPosts','fileUploads','advanced'];
	
	const genShortcodeAtt = (attGroup) => {
		let atts = attributes[attGroup][0];

		return Object.entries(atts).map( ([ attName,att ] ) => {
			let attval = att;
			let controlObj = controlsData[attGroup][attName];

			if( controlObj.type == 'formTokenField' ){
				const ids = controlObj.idmap;
				//turn names into ids
				attval = attval.map(( v ) => ids[v]).join();
			}
			return !! attval ? `${ attName }="${ attval }" ` : '';
		} ).join(' ');	
	}

	const genAllShortcodeAtts = () => settings.map( (v) => genShortcodeAtt(v) ).join(' ');

	return (
		<div>
			<RawHTML { ...useBlockProps.save() } >
				{ '[fusedesk_newcase ' + genAllShortcodeAtts() + ']' }
			</RawHTML>
			{/* <div>
				{genAllShortcodeAtts()}
			</div> */}
		</div>
		
	);
}
