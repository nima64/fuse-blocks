const WP_BASEURL = WPURLS.siteurl;
// const WP_BASEURL = 'http://localhost/wordpress';
const REPS_ENDPOINT = '/wp-admin/admin-ajax.php?action=fusedesk_reps';
const DEPTS_ENDPOINT ='/wp-admin/admin-ajax.php?action=fusedesk_departments';
const CASETAGS_ENDPOINT ='/wp-admin/admin-ajax.php?action=fusedesk_casetags';
const CATEGORIES_ENDPOINT = '/wp-json/wp/v2/categories/';


//normalize reps json into {label,value} format for Select Components
const normJsonToOptions = ( repsJson ) =>
	Object.entries( repsJson ).map( ( [ v, k ] ) => ( {
		label: k,
		value: v,
	} ) );

const normCatToOptions = ( jsonData ) => jsonData.map( ( obj ) => ( { label: obj.name, value: obj.id } ) );
//withRefresh only applies to fusedesk api calls
function composeOptionsFetcher( normalizer, withRefresh=false ) {
	return function ( options, endpoint ) {
		let BASEURL = WP_BASEURL + endpoint;
		let FETCHURL = withRefresh? BASEURL + '&refresh=1' : BASEURL;
		fetch( FETCHURL, {
			method: 'GET',
		} )
			.then( ( req ) => req.json() )
			.then( ( json ) => {
				//inserts into options
				normalizer( json ).forEach( ( v, i ) => {
					options[ i ] = v;
				} );
				console.log( options, json );
				console.log( 'executed fetch from new-case' );
				const refreshbtn = document.body.querySelector( '#refreshme' );
				if ( refreshbtn ) refreshbtn.click();
			} );
	};
}

// const refreshOptions = composeOptionsFetcher( normJsonToOptions,true );
// const fetchCategories = composeOptionsFetcher( normCat );

//takes ary and store the fetched options into them
export default {
	get_rep_options: (ary) => composeOptionsFetcher( normJsonToOptions )(ary,REPS_ENDPOINT),
	get_dept_options: (ary) => composeOptionsFetcher( normJsonToOptions )(ary,DEPTS_ENDPOINT),
	get_casetag_options: (ary) => composeOptionsFetcher( normJsonToOptions )(ary,CASETAGS_ENDPOINT),
	get_rep_options_refresh: (ary) => composeOptionsFetcher( normJsonToOptions, true )(ary,REPS_ENDPOINT),
	get_dept_options_refresh: (ary) => composeOptionsFetcher( normJsonToOptions, true )(ary,DEPTS_ENDPOINT),
	get_casetag_options_refresh: (ary) => composeOptionsFetcher( normJsonToOptions, true )(ary,CASETAGS_ENDPOINT),
	get_category_options: (ary) => composeOptionsFetcher( normCatToOptions )(ary,CATEGORIES_ENDPOINT),
}