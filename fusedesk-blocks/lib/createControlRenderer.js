import {CheckboxControl, SelectControl,TextControl,RangeControl} from '@wordpress/components';
import MultiSelect from './MultiSelect';

    /**
	 * Closure takes attributes from props and returns function that renders controls
	 * @param  {string} props 
	 * @returns {(obj,attAry) => void} function
	*/

export default function ({attributes,setAttributes}){
    // let attributes = attributes; 
    const mutAryItem = ( newval, key, attName ) => {
        let temp = [{...attributes[ attName ][0]}] ;
        temp[0][ key ] = newval;
        setAttributes( { [ attName ]: temp } );
    };
    return function (obj,attAry) {
        const fbind = (newval) => mutAryItem(newval,obj.bind,attAry)
        const val = attributes[attAry][0][obj.bind];
        switch (obj.type) {
            case 'check' :
                return (
                    <CheckboxControl  
                        label={obj.label}
                        checked={attributes[attAry][0][obj.bind]} 
                        onChange={ fbind }  />);	
            case 'text' :
                return (					
                    <TextControl 
                        label={obj.label}
                        value={ val ? val : ''} 
                        placeholder={obj.placeholder}
                        onChange={fbind} />);
			case 'multiSelect':
				return (					
					<MultiSelect 
						label={obj.label}
						value={attributes[attAry][0][obj.bind]} 
						options={obj.options}
						onChange={(newval) => mutAryItem(newval,obj.bind,attAry)} />);
            case 'select':
                return (					
                    <SelectControl 
                        label={obj.label}
                        value={attributes[attAry][0][obj.bind]} 
                        options={obj.options}
                        onChange={fbind} />);
            case 'range' :
                return (
                    <RangeControl 
                        min={obj.min}	
                        max={obj.max}
                        label={obj.label}
                        value={attributes[attAry][0][obj.bind]}
                        onChange={fbind} />
                );
        }
    }
};