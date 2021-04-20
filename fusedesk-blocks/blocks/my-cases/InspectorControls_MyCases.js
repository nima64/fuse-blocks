import { 
    Panel,
    PanelBody,
} from '@wordpress/components';
import {InspectorControls} from '@wordpress/block-editor';
import ControlsData from './ControlsData';
import createControlRenderer from '../../lib/createControlRenderer';

export function InspectorControls_MyCases(props){

	const renderControlObj = createControlRenderer( props );

    const getDisplayPlanel = () => {

        const DisplayGroup = ControlsData.display;

        return (
            <Panel>
                <PanelBody title="Display">
                    { Object.entries(DisplayGroup).map( ([name,obj]) => 
                        renderControlObj(obj) )
                    }
                </PanelBody>
            </Panel>
        );
    };

    const getTextPanel = () => {
        const TextGroup = ControlsData.text;
        return (
            <Panel>
                <PanelBody>
                    { Object.entries(TextGroup).map( ([name,obj]) => 
                        renderControlObj(obj) )
                    }
                </PanelBody>
            </Panel>
        );
    };

    return (
        <InspectorControls>
            { getDisplayPlanel() }
            { getTextPanel() }
        </InspectorControls>
    );
}
