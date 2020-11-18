import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {MdFlightTakeoff} from 'react-icons/md'

import api from '../../services/api';
import './style.css';
import {addReserveRequest} from "../../store/modules/reserve/actions";

export default function Home() {

    const dispatch = useDispatch();

    const [trips, setTrips] = useState([]);

    useEffect(()=>{

        async function loadApi(){
            const response = await api.get('trips');
            setTrips(response.data);
        }

        loadApi();

    }, []);

    /*
    * The execution flow to add a new reserve is:
    * 1. handleAdd() calls the addReserveRequest() to set its TYPE and TRIP/RESERVE INFORMATION
    * 2. dispatch() is executed containing all the information from addReserveRequest(), which is TYPE and ID (INFORMATION), and sagas.js is invoked.
    *   2.1 sagas.js is monitoring any call that contains the TYPE = ADD_RESERVE_REQUEST.
    * 3. sagas.js is executed as addReserveRequest() contains the TYPE = ADD_RESERVE_REQUEST.
    * 4. addToReserve() is executed as the result of intercepting the ADD_RESERVE_REQUEST
    * 5. addToReserve() verifies whether the trip object is a new one or not.
    * 6. addToReserve() calls the REDUCER.
    * */
    function handleAdd(id) {
        dispatch(addReserveRequest(id));
    }    

    return (
        <div>
            <div className="box">
                {trips.map(trip => (
                    <li key={trip.id}>
                        <img src={trip.image} alt={trip.title} />
                        <strong>{trip.title}</strong>
                        <span>Status: {trip.status ? 'Disponivel' : 'Indisponivel'}</span>

                        <button
                            type="button"
                            onClick={()=> handleAdd(trip.id)}
                        >
                            <div>
                                <MdFlightTakeoff size={16} color="#FFF" />
                            </div>
                            <span>SOLICITAR RESERVA</span>
                        </button>
                    </li>
                ))}
            </div>
        </div>
    );
}