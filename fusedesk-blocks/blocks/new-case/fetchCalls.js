import controlsData from './controlsData';
import apiFetch from '@wordpress/api-fetch';
const WP_BASEURL = WPURLS.siteurl;
// const WP_BASEURL = 'http://localhost/wordpress';
const DEPS_ENDPOINT ='/wp-admin/admin-ajax.php?action=fusedesk_departments';
const REPS_ENDPOINT = '/wp-admin/admin-ajax.php?action=fusedesk_reps';
const CASETAGS_ENDPOINT ='/wp-admin/admin-ajax.php?action=fusedesk_casetags';
const CATEGORIES_ENDPOINT = '/wp-json/wp/v2/categories/';

const depOptions = controlsData.caseCreation.department
const repOptions = controlsData.caseCreation.rep
const casetagids = controlsData.caseCreation.casetagids
const categoryOptions = controlsData.suggestedPosts.suggestioncategories;

//formats data to {label:v,value:v}
//fusedesk data is returned as an object not an array, so a seperate formatter/normalizer is required
const normFuseDeskDataToOptions = ( json ) =>
	Object.entries( json ).map( ( [ v, k ] ) => ( {
		label: k,
		value: v,
	} ) );

const normCatToOptions = ( json ) => json.map( ( obj ) => ( { label: obj.name, value: obj.id } ) );

function updateCasetagIds (controlObj,endpoint){
	let URL = WP_BASEURL + endpoint;
	if (controlObj.bind != 'casetagids'){
		console.log('this is not casetagids');
		return;
	}

	apiFetch( { url: URL } ).then( data => {
		//reverse key value pairs in map
		controlObj.idmap = Object.keys(data).reduce((obj, key) => (obj[data[key]] = key, obj), {});
		
		console.log(controlObj.idmap);

		Object.entries( data ).map( ( [ k, v ], i ) => 
			controlObj.suggestions[i] = v
		);
		console.log(controlObj.suggestions);
	});
}

function get_categories(controlObj, endpoint){
	let URL = WP_BASEURL + endpoint;
	if (controlObj.bind != 'suggestioncategories'){
		console.log('this is not suggestioncategories');
		return;
	}

	apiFetch( { url: URL } ).then( data => {
		data.map( (obj,i) => {
			controlObj.idmap[obj.name] = obj.id
			controlObj.suggestions[i] = obj.name;
		});
	});
}

// withRefresh only applies to FuseDesk api calls
function composeOptionsFetcher( normalizer, withRefresh=false ) {
	return function ( obj, endpoint, callback) {
		let BASEURL = WP_BASEURL + endpoint;
		let FETCHURL = withRefresh? BASEURL + '&refresh=1' : BASEURL;
		apiFetch({ url:FETCHURL })
		.then((json) => {
				if (obj.options){
					let options = obj.options;
					normalizer( json ).forEach( ( v, i ) => {
						if (obj.bind =="rep"){
							options[ i +1 ] = v; //don't override default option
						}else{
							options[ i ] = v;
						}
					});
				}
				const repaintButton = document.body.querySelector( '#fusedesk_repaintMe' );
				if ( repaintButton ){ repaintButton.click();console.log('repainted ' + FETCHURL ) } else { console.log("couldn't repaint on init")}
				if(callback){
					callback();
				}
			}
		);
	};
}

//store the fetched options into obj
export default {
	get_rep_options: () => composeOptionsFetcher( normFuseDeskDataToOptions )(repOptions,REPS_ENDPOINT),
	get_dep_options: (cb) => composeOptionsFetcher( normFuseDeskDataToOptions )(depOptions,DEPS_ENDPOINT, cb),
	get_casetagids: () => updateCasetagIds(casetagids,CASETAGS_ENDPOINT),
	get_categories: () => get_categories(categoryOptions, CATEGORIES_ENDPOINT),
	get_rep_options_refresh: () => composeOptionsFetcher( normFuseDeskDataToOptions, true )(repOptions,REPS_ENDPOINT),
	get_dep_options_refresh: () => composeOptionsFetcher( normFuseDeskDataToOptions, true )(depOptions,DEPS_ENDPOINT),
}