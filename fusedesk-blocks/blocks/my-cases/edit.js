/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
	InspectorAdvancedControls,
	storeConfig,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	TextControl,
	RangeControl,
	SelectControl,
	Placeholder,
} from '@wordpress/components';
import {InspectorControls_MyCases} from './InspectorControls_MyCases';
import mockDataJson from './mockData.json';
import date from 'locutus/php/datetime/date';
import strtotime from 'locutus/php/datetime/strtotime';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

class MockData{
	
	constructor(json){
		//clones jsondata with the dates evauluated 
		this.cases = json.map( _case => this.evalDate(_case) );
	}

	evalDate(_case){
		//shallow copy the case
		let caseCopy = Object.assign({},_case);

		//replace date strings with evaulated timestamp
		(['date_updated','date_lastupdated','date_closed'])
		.forEach(
			(att) => {
				let strtotimeStr = _case[att].match(/strtotime\('([^']*)'/);
				caseCopy[att] = strtotimeStr ? strtotime(strtotimeStr[1]) : (new Date()).getTime()/1000;
			}
		)
		return caseCopy;
	}

	filterByStatus(status){
		if(status == 'all'){
			return this.cases;
		}	
		return this.cases.filter( _case => _case.status === status );
	}

	orderBy(order){
		switch (order) {
			case 'date_updated':
				this.cases.sort( (a,b) => a['date_updated'] - b['date_updated'] );	
				break;
			default:
				break;
		}	
	}
}

let mockData = new MockData(mockDataJson);

function formatTimeStamp(timestamp, format='c'){
	return date( format, timestamp );
}
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param props
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	let attCols = (attributes.columns).map( obj => obj.id);
	let columns = (attributes.columns.length != 0) ? attCols : ['casenum', 'date_updated', 'status', 'summary'];
	
	/**
	 *returns default column name if it isn't declared 
	 * @param {*} col 
	 */
	const getDefaultColName = (col) => {
		const defaults = {
			'casenum' : 'Case Number',
			'date_updated' : 'Date Updated',
			'status' : 'Status',
			'summary' : 'Summary',
		}
		const colName = attributes[col+'_name'];
		return ( colName != '') ? colName : defaults[col]; 
	};

	mockData.orderBy(attributes.orderby);


	const renderTable = (columns, getDefaultColName, cases) =>{
		return(
			<table >
				<thead>
					<tr>
						{columns.map(column => (
							<td class={`fusedesk-cases-columnhead-${column}`}>{ getDefaultColName(column) }</td>
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
										col == "date_updated" ?
											formatTimeStamp(_case[col], attributes.dateformat)	
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

	return (
		<div { ...useBlockProps() }>
			{InspectorControls_MyCases(props,mockData.cases) }
			{ renderTable(columns, getDefaultColName, mockData.cases) }
		</div>
	);
}
