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
import {
	InspectorAdvancedControls,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	TextControl,
	RangeControl,
	SelectControl,
	Placeholder,
} from '@wordpress/components';
import {InspectorControls_MyCases} from './InspectorControls_MyCases';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param props
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @return {WPElement} Element to render.
 */
// const [selectedOption, setSelectedOption] = useState(null);

export default function Edit( props ) {
	const { attributes, setAttributes } = props;

	return (
		<div { ...useBlockProps() }>
			<InspectorControls_MyCases {...props} />
			<Placeholder
				label="FuseDesk My Cases"
				instructions="Placeholder that will display your cases"
			/>
		</div>
	);
}
