export const Types = {
    SET_RESTAURANTES: 'restaurantes/SET_RESTAURANTES',
    SET_RESTAURANTE:  'restaurantes/SET_RESTAURANTE'
};



const initialState = {
    restaurantes: [],
    restauranteSelected: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.SET_RESTAURANTES:
            return{ ...state, restaurantes: action.payload }
        
        case Types.SET_RESTAURANTE:
            return{ ...state, restauranteSelected: action.payload }

        default: 
            return state;
    }
};

export function setRestaurantes(restaurantes){
    return {
        type: Types.SET_RESTAURANTES,
        payload: restaurantes
    };  
};


export function setRestaurante(restaurante){
    return {
        type: Types.SET_RESTAURANTE,
        payload: restaurante
    };  
};