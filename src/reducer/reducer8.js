import {firebasethree} from '../firebaseconnectio';
const initState = {
	Nhangiatriapimoi: 'ae09e31509b6444381556e772689eb09',
};

const reducer8 = (state = initState, action) => {
	switch (action.type) {
		case  "ADD_API" :
		console.log(JSON.stringify(state.Nhangiatriapimoi));
		firebasethree.push(action.getdata);
		return{...state,Nhangiatriapimoi:action.getdata}
		default:
			return state;
	}
};

export default reducer8;
