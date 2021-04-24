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

/**
 * @param props
 * @returns InspectorControls and IspectorAdvancedControls
 */
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

    const getAdvancedPanel = () => {
        const AdvancedGroup = ControlsData.advanced;
        return (
			<>
                {/* function passed replaces spaces with dashes */}
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
