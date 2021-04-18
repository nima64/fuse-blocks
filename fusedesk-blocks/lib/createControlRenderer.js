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
    // const mutAtt = ( newval, key, attName ) => {
    //     let temp = [{...attributes[ attName ][0]}] ;
    //     temp[0][ key ] = newval;
    //     setAttributes( { [ attName ]: temp } );
    // };

    const mutAtt = ( newval, attName ) => {
        // let temp = [{...attributes[ attName ][0]}] ;
        // temp[0][ key ] = newval;
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
                                let temp = tokens.map( (t) => {
                                    let val = t.value? t.value : t;// if its already a object {value:t}
                                    let id = obj.idmap[val];
                                    return id? {value:val,id:id}: undefined; 
                                }).filter(v => v != undefined);
                                console.log(getAttVal('casetagids'));
                                mutAtt(temp,obj.bind,attAry);
                            }}
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
						value={val} 
						options={obj.options}
						onChange={(newval) => mutAtt(newval,obj.bind,attAry)} />);
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
        }
    }
};