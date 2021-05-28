import date from 'locutus/php/datetime/date';
import MockData from './MockData';
import mockDataJson from './mockdata.json';

//wrapper around date that defaults to format 'c'
function formatTimeStamp(timestamp, format = 'c') {
    return date(format, timestamp);
}

/**
 *returns default attribute value if it isn't defined 
* @param {String} att 
*/
function getDefaultAttribute(att, attributes) {
    const defaults = {
        'casenum_name': 'Case Number',
        'date_updated_name': 'Date Updated',
        'date_opened_name': 'Date Opened',
        'date_closed_name': 'Date Closed',
        'status_name': 'Status',
        'summary_name': 'Summary',
        'details_name': 'Details',
        'dateformat': 'M j, Y g:ia',
    }

    const attval = attributes[att];
    if (attval == undefined)
        console.log(`attribute ${att} doesn't exist, please create one.`);

    //if string is empty return defaults
    return (attval != '') ? attval : defaults[att];
};

let mockData = new MockData(mockDataJson);

export default function RenderTable(props) {

    let { attributes } = props;

    //get column names from list of column objects
	let attCols = (attributes.columns).map(obj => obj.id);

    //if there are no columns, use a default set
	let columns = (attributes.columns.length != 0) ? attCols : ['casenum', 'date_updated', 'status', 'summary'];

    //sort the mockdata by orderby
	mockData.orderBy(attributes.orderby);

    return (
        <table >
            <thead>
                <tr>
                    {columns.map(column => (
                        <td class={`fusedesk-cases-columnhead-${column}`}>{getDefaultAttribute(column + '_name', attributes)}</td>
                    ))}
                    <td class="fusedesk-cases-columnhead-"></td>
                </tr>
            </thead>
            <tbody>
                {
                    //filter cases by status, and limit number of cases by limit
                    mockData.filterByStatus(attributes.status)
                        .slice(0, attributes.limit).map(
                            _case => (
                                <tr>
                                    {columns.map(col =>
                                        <td>
                                            {
                                                //eval date if columns have date in them
                                                col.substr(0, 4) == "date" ?
                                                    formatTimeStamp(_case[col], getDefaultAttribute('dateformat', attributes))
                                                    :
                                                    _case[col]
                                            }
                                        </td>
                                    )}
                                    <td></td>
                                </tr>
                            )
                        )
                }
            </tbody>
        </table>
    );
}