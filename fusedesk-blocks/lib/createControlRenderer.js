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

    const mutAtt = ( newval, attName ) => {
        setAttributes( { [ attName ]: newval } );
    };

    const getAttVal = (attName) => {
        return attributes[attName];
    }

    /**
	 * @param  {String} boj
	 * @param  {Object} attAry
     * @param {()=>String} customOnChange
	 * @returns {JSX.Element} function
	*/

    return function (obj,attAry,customOnChange=null) {
        const bindedMut = (v) => mutAtt(v,obj.bind);
        const fbind = (newval) => !!customOnChange? bindedMut(customOnChange(newval)) : bindedMut(newval);
        const val = getAttVal(obj.bind);
        switch (obj.type) {
            case 'check' :
                return (
                    <CheckboxControl  
                        label={obj.label}
                        checked={val} 
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
                            onChange = {(tokens) => {

                                //transform new tokens into objects {value:v,id:i}
                                let temp = tokens.map( (t) => {

                                    let val = t.value? t.value : t;
                                    let id = obj.idmap[val];
                                    return id? {value:val,id:id}: undefined; 

                                }).filter(v => v != undefined);

                                // console.log(getAttVal('casetagids'));
                                mutAtt(temp,obj.bind,attAry);

                            }}
                            suggestions={obj.suggestions}
                            __experimentalExpandOnFocus={true}
                            __experimentalShowHowTo={false} //Doesn't work see https://developer.wordpress.org/block-editor/reference-guides/components/form-token-field/
                            />
                    </BaseControl>
                    );

            case 'select':
                return (					
                    <SelectControl 
                        label={obj.label}
                        value={val} 
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
                        value={val}
                        onChange={fbind} 
                        help={obj.help}
                        />
                );
        default:
            throw new Error("Control type doesn't exist in ControlRenderer");

        }
    }
};