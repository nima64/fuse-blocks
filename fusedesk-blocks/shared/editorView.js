import MockData from './MockData';
import date from 'locutus/php/datetime/date';
import strtotime from 'locutus/php/datetime/strtotime';

let mockData = new MockData(mockDataJson);

function formatTimeStamp(timestamp, format='c'){
	return date( format, timestamp );
}

/**
 *returns default attribute value if it isn't defined 
	* @param {String} att 
	*/
const getDefaultAttribute = (att) => {
	const defaults = {
		'casenum_name' : 'Case Number',
		'date_updated_name' : 'Date Updated',
		'date_opened_name' : 'Date Opened',
		'date_closed_name' : 'Date Closed',
		'status_name' : 'Status',
		'summary_name' : 'Summary',
		'details_name' : 'Details',
		'dateformat': 'M j, Y g:ia',
	}

	const attval = attributes[att];
	if(attval == undefined)
		console.log(`attribute ${att} doesn't exist, please create one.`);

	//if string is empty return defaults
	return ( attval != '' ) ? attval : defaults[att]; 
};

const renderTable = (columns,mockData, attributes) =>{
	return(
		<table >
			<thead>
				<tr>
					{columns.map(column => (
						<td class={`fusedesk-cases-columnhead-${column}`}>{ getDefaultAttribute(column+'_name') }</td>
						// <td class={`fusedesk-cases-columnhead-${column}`}>{ getDefaultColName(column) }</td>
					))}
					<td class="fusedesk-cases-columnhead-"></td>
				</tr>
			</thead>
			<tbody>
				{
				mockData.filterByStatus(attributes.status)
				.slice(0,attributes.limit).map(
					_case =>(
						<tr>
							{columns.map(col => 
								<td>
								{
									//eval date if columns have date in them
									col.substr(0,4) == "date" ?
										formatTimeStamp(_case[col], getDefaultAttribute('dateformat'))	
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

export default function editorView(props){
	const { attributes, setAttributes } = props;
	let attCols = (attributes.columns).map( obj => obj.id);
	let columns = (attributes.columns.length != 0) ? attCols : ['casenum', 'date_updated', 'status', 'summary'];
	
	mockData.orderBy(attributes.orderby);

	return renderTable(columns, mockData, attributes);
	
}