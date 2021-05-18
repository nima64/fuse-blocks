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
import controlsData from './ControlData_TeamCases';
import { createShortCodeAttFromGroup } from '../../lib/shortcode';


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param props
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 * @return {WPElement} Element to render.
 */
export default function save(props) {
	const { attributes, setAttributes } = props;
	const groups = Object.entries(controlsData).map(([k,v]) => k);

	const genShortCodeAtts = () => groups.map((group) => createShortCodeAttFromGroup(group, controlsData, attributes)).join(' ');

	return (
		<div {...useBlockProps.save()}>
			<RawHTML {...useBlockProps.save()} >
				{'[fusedesk_teamcases ' + genShortCodeAtts() + ']'}
			</RawHTML>
			{/* <div>
				{genShortCodeAtts()}
			</div> */}
		</div>
	);
}
