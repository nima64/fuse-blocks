import {CheckboxControl, SelectControl,TextControl,TextareaControl,RangeControl} from '@wordpress/components';
import MultiSelect from './MultiSelect';

    /**
	 * Closure takes attributes from props and returns function that renders controls
	 * @param  {Object} props 
	*/

export default function ({attributes,setAttributes}){
    // let attributes = attributes; 
    const mutAryItem = ( newval, key, attName ) => {
        let temp = [{...attributes[ attName ][0]}] ;
        temp[0][ key ] = newval;
        setAttributes( { [ attName ]: temp } );
    };

    /**
	 * @param  {String} boj
	 * @param  {Object} attAry
     * @param {()=>String} customOnChange
	 * @returns {JSX.Element} function
	*/

    return function (obj,attAry,customOnChange=null) {
        const bindedMut = (v) => mutAryItem(v,obj.bind,attAry);
        const fbind = (newval) => !!customOnChange? bindedMut(customOnChange(newval)) : bindedMut(newval);
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
                        value={ val ? val : ''} //not allowed to have boolean, if boolean then don't show anything 
                        placeholder={obj.placeholder}
                        onChange={fbind} 
                        help={obj.help} />);
            case 'textArea' :
                return (					
                    <TextareaControl 
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