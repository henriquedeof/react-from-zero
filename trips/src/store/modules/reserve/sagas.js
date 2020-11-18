import {all, call, put, select, takeLatest} from 'redux-saga/effects';
import api from '../../../services/api';
import {addReserveSuccess, updateAmountSuccess} from "./actions";
import history from '../../../services/history';

//The '*' known as generator, makes a function "to have" async/await behavior.
//The function below will wait a request responding to jump to the next instruction
function* addToReserve({id}) {
    const tripExists = yield select(
        state => state.reserve.find(trip => trip.id === id)
    );

    const myStock = yield call(api.get, `/stock/${id}`);
    const stockAmount = myStock.data.amount;
    const currentStock = tripExists ? tripExists.amount : 0;
    const amount = currentStock + 1;

    if(amount > stockAmount){
        alert('Quantidade maxima atingida.');
        return;
    }

    if(tripExists){
        //put() function calls the action
        yield put(updateAmountSuccess(id, amount));

    } else {
        //yield instruction works like the await
        const response = yield call(api.get, `trips/${id}` );

        //first trip being inserted
        const data = {
            ...response.data,
            amount: 1,
        };

        //trigger action
        yield put(addReserveSuccess(data));

        history.push('/reservas');
    }
}

function* updateAmount({ id, amount }){
    if(amount <= 0) return;

    const myStock = yield call(api.get, `/stock/${id}`);

    const stockAmount = myStock.data.amount;

    if(amount > stockAmount){
        alert('Quantidade maxima atingida.');
        return;
    }

    yield put(updateAmountSuccess(id, amount));
}

//listener
export default all([
    //takeLatest: If an user clicks many times on a button, and the function has not finished its execution, only the last click will be processed.
    takeLatest('ADD_RESERVE_REQUEST', addToReserve),
    takeLatest('UPDATE_RESERVE_REQUEST', updateAmount)
]);