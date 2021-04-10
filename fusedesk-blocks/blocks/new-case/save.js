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
	const blockSettings = ( ( {
		caseCreation,
		newCaseForm,
		caseTitle,
		formText,
		suggestedPosts,
		fileUploads,
		advanced,
	} ) => [
		caseCreation[ 0 ],
		newCaseForm[ 0 ],
		caseTitle[ 0 ],
		formText[ 0 ],
		suggestedPosts[ 0 ],
		fileUploads[ 0 ],
		advanced[ 0 ],
	] )( attributes );
	
	const genShortCodeAtt = ( aryObj ) =>
		Object.entries( aryObj )
			// merge all attributes to one string "k=v, k=v2, k=v..."
			.map( ( [ k, v ] ) => {
				//convert multiSelects to strings
				if (Array.isArray(v))
					v = v.map( ( _v ) => _v.value ).join();
				return !! v ? `${ k }="${ v }" ` : '';
			} )
			.join( ' ' );

	const genAllShortCodeAtts = () =>
		blockSettings.map( ( v ) => genShortCodeAtt( v ) ).join( '' );

	return (
		<div>
			<RawHTML { ...useBlockProps.save() } >
				{ '[fusedesk_newcase ' + genAllShortCodeAtts() + ']' }
			</RawHTML>
			<div>
				{genAllShortCodeAtts()}
			</div>
		</div>
		
	);
}
