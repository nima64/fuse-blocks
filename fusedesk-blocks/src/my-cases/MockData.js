import strtotime from 'locutus/php/datetime/strtotime';

export default class MockData{
	
	constructor(json){
		//clones jsondata with the dates evauluated 
		this.cases = json.map( _case => this.evalDate(_case) );
	}

	//evaluate string as function
	evalDate(_case){

		let caseCopy = Object.assign({},_case);

		//replace date strings with evaulated timestamp
		(['date_updated','date_lastupdated','date_closed'])
		.forEach(
			(att) => {
				//does string contain a "strtotime()"?
				let strtotimeStr = _case[att].match(/strtotime\('([^']*)'/);

				//if strtotime function found call it, else return the current time in seconds
				caseCopy[att] = strtotimeStr ? strtotime(strtotimeStr[1]) : (new Date()).getTime()/1000;
			}
		)
		return caseCopy;
	}

	filterByStatus(status){
		if(status == 'all'){
			return this.cases;
		}	
		let result = this.cases.filter( _case => _case.status === status );
		
		//if there are no matches, then return all cases
		return result.length > 0 ? result : this.cases; 
	}

	orderBy(orders){
		let fobj = orders[0];
		const whichsort = (id) => { 
			let id_s = id.split(" ");

			if (id_s[1] == "asc"){
				//sort smallest to largest
				this.cases.sort( (a,b) => a[ id_s[0] ] - b[ id_s[0] ] );	
			}
			if (id_s[1] == "desc"){
				//sort largest to smallest
				this.cases.sort( (a,b) => b[ id_s[0] ] - a[ id_s[0] ] );	
			}
		};

		if (!fobj){
			return
		}

		whichsort(fobj.id);
	}
}

