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
import controlsData from './ControlsData';
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
	const settings = ['display','text'];

	//look in controlsData, then look in attributes
	const genShortcodeAtt = (attGroup) => {
		let attNames =  Object.entries(controlsData[attGroup]).map( ([k, v]) => k);

		return attNames.map( attName => {
			let controlObj = controlsData[attGroup][attName];
			let attval = attributes[attName];

			if (controlObj.type == 'multiSelect'){
				attval = attval.map( obj => {
					return obj.value
				}).join();
			}

			if( controlObj.type == 'formTokenField' ){
				attval = attval.map(obj => {
					return obj.id;
				}).join();
			}
			//dont make a attribute if empty string or false
			// return attval || attval !== '' ? `${ attName }="${ attval }" ` : '';
			return attval !== '' ? `${ attName }="${ attval }" ` : '';

		}).join(' ');	;
	}

	const genAllShortcodeAtts = () => settings.map( (v) => genShortcodeAtt(v) ).join(' ');

	return null;
	// return (
	// 	<div { ...useBlockProps.save() }>
	// 		<RawHTML { ...useBlockProps.save() } >
	// 			{ '[fusedesk_mycases ' + genAllShortcodeAtts() + ']' }
	// 		</RawHTML>
	// 		<div>
	// 			{genAllShortcodeAtts()}
	// 		</div>
	// 	</div>
	// );
}
