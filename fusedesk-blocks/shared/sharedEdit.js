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
	useBlockProps,
} from '@wordpress/block-editor';
import createInspectorControls from './createInspectorControls';
import customControlsData from './customControlsData';

import editorView from './editorView';

const InspectorControlsView = createInspectorControls(customControlsData);

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param props
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @return {WPElement} Element to render.
 */
function Edit( props  ) {
	
	return (
		<div { ...useBlockProps() }>
			{ InspectorControlsView(props) }
			{ editorView(props) }
		</div>
	);
}

export default function customEdit(ControlsData){
	return Edit;
}