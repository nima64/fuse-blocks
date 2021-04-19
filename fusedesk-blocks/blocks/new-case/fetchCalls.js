import controlsData from './controlsData';
import apiFetch from '@wordpress/api-fetch';

const WP_BASEURL = WPURLS.siteurl;
const DEPS_ENDPOINT ='/wp-admin/admin-ajax.php?action=fusedesk_departments';
const REPS_ENDPOINT = '/wp-admin/admin-ajax.php?action=fusedesk_reps';
const CASETAGS_ENDPOINT ='/wp-admin/admin-ajax.php?action=fusedesk_casetags';
const CATEGORIES_ENDPOINT = '/wp-json/wp/v2/categories/';

const depOptions = controlsData.caseCreation.department
const repOptions = controlsData.caseCreation.rep
const casetagids = controlsData.caseCreation.casetagids
const categoryOptions = controlsData.suggestedPosts.suggestioncategories;

//Fusedesk api returns object not an array, so a different function is needed to normalize into {label,value}
const normFuseDeskDataToOptions = ( json ) =>
	Object.entries( json ).map( ( [ v, k ] ) => ( {
		label: k,
		value: v,
	} ) );


function updateCasetagIds (controlObj,endpoint){
	let URL = WP_BASEURL + endpoint;

	if (controlObj.bind != 'casetagids'){

		console.log('this is not casetagids');

		return;
	}

	apiFetch( { url: URL } ).then( data => {

		//flip key value pairs and load them into idmap
		controlObj.idmap = Object.keys(data).reduce((obj, key) => (obj[data[key]] = key, obj), {});

		//load suggestions 
		Object.entries( data ).map( ( [ k, v ], i ) => 
			controlObj.suggestions[i] = v
		);

	});
}

function get_categories(controlObj, endpoint){
	let URL = WP_BASEURL + endpoint;

	if (controlObj.bind != 'suggestioncategories'){

		console.log('this is not suggestioncategories');
		return;

	}

	apiFetch( { url: URL } ).then( data => {

		//load suggestions and idmap
		data.map( (obj,i) => {
			controlObj.idmap[obj.name] = obj.id
			controlObj.suggestions[i] = obj.name;
		});
		
	});
}

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
							options[ i +1 ] = v; //don't override first default option
						}else{
							options[ i ] = v;
						}

					});
				}

				const repaintButton = document.body.querySelector( '#fusedesk_repaintMe' );

				if ( repaintButton ){ 
					repaintButton.click(); 
					// console.log('repainted ' + FETCHURL );
				} 

				if(callback){
					callback();
				}
			}
		);
	};
}

export default {
	get_rep_options: () => composeOptionsFetcher( normFuseDeskDataToOptions )(repOptions,REPS_ENDPOINT),
	get_dep_options: (cb) => composeOptionsFetcher( normFuseDeskDataToOptions )(depOptions,DEPS_ENDPOINT, cb),
	get_casetagids: () => updateCasetagIds(casetagids,CASETAGS_ENDPOINT),
	get_categories: () => get_categories(categoryOptions, CATEGORIES_ENDPOINT),
	get_rep_options_refresh: () => composeOptionsFetcher( normFuseDeskDataToOptions, true )(repOptions,REPS_ENDPOINT),
	get_dep_options_refresh: () => composeOptionsFetcher( normFuseDeskDataToOptions, true )(depOptions,DEPS_ENDPOINT),
}