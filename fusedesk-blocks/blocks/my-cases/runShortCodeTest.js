// import controlsData from 'ControlsData';
import {__} from '@wordpress/i18n';
import controlsData from './ControlsData.js';

let attributes =  {
    //display
    columns: {
        type: 'array',
        default: [],
    },
    status:{
        type: 'string',
        default: 'all',
    },
    userstatuses:{
        type: 'string',
        default: 'all',
    },
    orderby:{
        type: 'string',
        default: 'date_opened, date_updated',
    },
    dateformat:{
        type: 'string',
        default: 'M j, Y g:ia',
    },
    limit:{
        type: 'string',
        default: 50,
    },

    //text
    casenum_name:{
        type: 'string',
        default:  '',
    },
    status_name:{
        type: 'string',
        default:  '',
    },
    date_updated_name:{
        type: 'string',
        default:  '',
    },
    summary_name:{
        type: 'string',
        default:  '',
    },
    errornotloggedin:{
        type: 'string',
        default:  '',
    },
    errornocases:{
        type: 'string',
        default:  '',
    },

    //advanced
    anchor:{
        type:'string',
        default: '',
    },
    style:{
        type:'string',
        default: false,
    },
}

let settings = ['display'];

function test(){
    //look in controlsData, then look in attributes
    const genShortcodeAtt = (attGroup) => {
        let attNames =  Object.entries(controlsData[attGroup]).map( ([k, v]) => k);
        return attNames.map( attName => {
            let controlObj = controlsData[attGroup][attName];
            let attval = attributes[attName];

            // if (controlObj.type == 'multiSelect'){
            //     attval = attval.map( obj => {
            //         return obj.value
            //     }).join();
            // }

            if( controlObj.type == 'formTokenField' ){
                attval = attval.map(obj => {
                    return obj.id;
                }).join();
            }

            return !! attval ? `${ attName }="${ attval }" ` : '';

        }).join(' ');	;
    }

    const genAllShortcodeAtts = () => settings.map( (v) => genShortcodeAtt(v) ).join(' ');

    console.log(genAllShortcodeAtts());
}
test();