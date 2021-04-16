import {
    CheckboxControl, 
    SelectControl,
    TextControl,
    TextareaControl,
    RangeControl,
    FormTokenField,
    BaseControl,
    } from '@wordpress/components';
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
                        onChange={ fbind }  
                        help={obj.help}
                        />);	
            case 'text' :
                return (					
                    <TextControl 
                        label={obj.label}
                        value={ val ? val : ''} //not allowed to display boolean, false will display ''
                        placeholder={obj.placeholder}
                        onChange={fbind} 
                        help={obj.help} 
                        />);
            case 'textArea' :
                return (					
                    <TextareaControl 
                        label={obj.label}
                        value={ val ? val : ''} 
                        placeholder={obj.placeholder}
                        onChange={fbind} 
                        help={obj.help} 
                        />);
            case 'formTokenField':
                return (					
                    <BaseControl
                        help ={obj.help}
                    >
                        <FormTokenField 
                            label={obj.label}
                            value={ val ? val : ''} 
                            placeholder={obj.placeholder}
                            onChange={fbind} 
                            suggestions={obj.suggestions}
                            __experimentalShowHowTo={false} //Doesn't work see https://developer.wordpress.org/block-editor/reference-guides/components/form-token-field/
                            // help={obj.help}
                            />
                    </BaseControl>
                    );

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
                        onChange={fbind} 
                        help={obj.help} 
                        />);
            case 'range' :
                return (
                    <RangeControl 
                        min={obj.min}	
                        max={obj.max}
                        label={obj.label}
                        value={attributes[attAry][0][obj.bind]}
                        onChange={fbind} 
                        help={obj.help}
                        />
                );
        }
    }
};