export const getAllEmployees = (data)=>{
	return{
		type: 'GET_ALL_DATA_EMPLOYEES',
		payload: data
	}
}

export const addEmployees = (data)=>{
	return{
		type: 'ADD_DATA_EMPLOYEES',
		payload: data
	}
}
