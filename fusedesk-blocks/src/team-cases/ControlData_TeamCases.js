import { __ } from '@wordpress/i18n';
import ControlsData from '../my-cases/ControlsData';

let teamcases  = {...ControlsData};

//Adds control objects to the text group
teamcases.text['errornotsupported'] = {
    type: 'text',
    label: __("Error, Not Supported",'fusedesk'),
    placeholder: __("Viewing team cases is not supported by our membership platform.",'fusedesk'),
    bind: 'errornotsupported',
    help: __("What message to show users when your membership site platform doesn't support teams.",'fusedesk'),
}

teamcases.text['errornoteam'] = {
    type: 'text',
    label: __("Error, No Team ",'fusedesk'),
    placeholder: __('Your login is not connected to a team.','fusedesk'),
    bind: 'errornoteam',
    help: __("What message to show users who aren't part of a team.",'fusedesk'),
}


export default teamcases;