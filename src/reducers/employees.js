
export default function(state = [], action){

	switch(action.type){
		case 'ADD_DATA_EMPLOYEES': return [...state, action.payload];
		case 'GET_ALL_DATA_EMPLOYEES': return [...action.payload];
		default: return state;
	}

}