import ControlsData from './SharedControlsData';
import {__} from '@wordpress/i18n';
let customControls = {...ControlsData}; 

customControls.text['teamError'] = {
    type: 'text',
    label: __('Error, Team Not Logged In','fusedesk'),
    placeholder: __('Please login to view your cases','fusedesk'),
    bind: 'errornotloggedin',
    help: __("What message to show to customers who aren't logged in (since we won't be able to show cases to anyone who's not logged in). ",'fusedesk'),
};

export default customControls;