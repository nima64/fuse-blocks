import { 
    Panel,
    PanelBody,
} from '@wordpress/components';
import {
    InspectorControls,
    InspectorAdvancedControls
} from '@wordpress/block-editor';
import ControlsData from './ControlsData';
import createControlRenderer from '../../lib/createControlRenderer';

export function InspectorControls_MyCases(props){

	const renderControlObj = createControlRenderer( props );

    //create all display panel controls
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

    //create all text panel controls
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

    const getAdvancedPanel = () => {
        const AdvancedGroup = ControlsData.advanced;
        return (
			<>
				{ renderControlObj(AdvancedGroup.anchor ,'advanced',(v) => v.slice(-1) == ' '? v.slice(0,-1) + '-' : v ) }
				{ renderControlObj(AdvancedGroup.style ,'advanced') }
			</>
        );
    };

    return (
        <>
        <InspectorControls>
            { getDisplayPlanel() }
            { getTextPanel() }
        </InspectorControls>
        <InspectorAdvancedControls>
            { getAdvancedPanel() }
        </InspectorAdvancedControls>
        </>
    );
}
