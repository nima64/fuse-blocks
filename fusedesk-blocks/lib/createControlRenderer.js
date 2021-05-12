import {
    CheckboxControl, 
    SelectControl,
    TextControl,
    TextareaControl,
    RangeControl,
    // FormTokenField, 
    BaseControl,
} from '@wordpress/components';
import FormTokenField from './form-token-field/index';

// import MultiSelect from './MultiSelect';

/**
 * Returns a function that renders controls ex: textControl, checkControl, fromTokenField...
 * @param {object} props
 * @returns {function} renderer
*/
export default function createControlRenderer({attributes,setAttributes}){

    //warpper around setAttributes
    const mutAtt = ( newval, attName ) => {
        setAttributes( { [ attName ]: newval } );
    };

    const getAttVal = (attName) => {
        return attributes[attName];
    }

    /**
	 * @param  {object} obj 
	 * @param  {array} attAry Deprecated, no longer does anything.
     * @param {()=>string} customOnChange
	 * @returns {JSX.Element} 
	*/
    const renderer = (obj,attAry,customOnChange=null) => {
        // mutate / change binded attribute
        const mutBinded = (v) => mutAtt(v,obj.bind);
        const onChangeHandle = (newval) => !!customOnChange? mutBinded(customOnChange(newval)) : mutBinded(newval);
        const val = getAttVal(obj.bind);
        switch (obj.type) {
            case 'check' :
                return (
                    <CheckboxControl  
                        label={obj.label}
                        checked={val} 
                        onChange={ onChangeHandle }  
                        help={obj.help}
                        />);	
            case 'text' :
                return (					
                    <TextControl 
                        label={obj.label}
                        value={ val ? val : ''} //not allowed to display boolean, false will display ''
                        placeholder={obj.placeholder}
                        onChange={onChangeHandle} 
                        help={obj.help} 
                        />);
            case 'textArea' :
                return (					
                    <TextareaControl 
                        label={obj.label}
                        value={ val ? val : ''} 
                        placeholder={obj.placeholder}
                        onChange={onChangeHandle} 
                        help={obj.help} 
                        />);

            //see https://developer.wordpress.org/block-editor/reference-guides/components/form-token-field/
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

                                //suggestionmap was made because suggestions don't support objects,
                                //and those suggestions need to be saved as tokens(which are objects).
                                let temp = tokens.map( (t) => {

                                    //transform new tokens into objects{value:v,id:i} if they aren't already 
                                    let val = t.value? t.value : t;
                                    let id = obj.suggestionmap[val];

                                    return id? {value:val,id:id}: undefined; 
                                })
                                //remove items which aren't in suggestions
                                .filter(v => v != undefined);

                                mutAtt(temp,obj.bind,attAry);

                            }}
                            maxSuggestions={obj.maxSuggestions}
                            suggestions={obj.suggestions}
                            // __experimentalExpandOnFocus={true}
                            minimumChars={0}
                            __experimentalShowHowTo={false}
                            __experimentalExpandOnFocus= {obj.expandOnFocus}
                            />
                    </BaseControl>
                    );

            case 'select':
                return (					
                    <SelectControl 
                        label={obj.label}
                        value={val} 
                        options={obj.options}
                        onChange={onChangeHandle} 
                        help={obj.help} 
                        />);
            case 'multiSelect':
                return (					
                    <MultiSelect 
                        label={obj.label}
                        value={val} 
                        options={obj.options}
                        onChange={onChangeHandle} 
                        help={obj.help} 
                        />);
            case 'range' :
                return (
                    <RangeControl 
                        min={obj.min}	
                        max={obj.max}
                        label={obj.label}
                        value={val}
                        onChange={onChangeHandle} 
                        help={obj.help}
                        />
                );
        default:
            throw new Error("Control type doesn't exist in ControlRenderer");

        }
    }
    return renderer;
};