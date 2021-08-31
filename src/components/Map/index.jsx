import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react'

import { setRestaurantes, setRestaurante } from '../../redux/modules/restaurantes';


export const MapContainer = (props) => {
    const dispatch = useDispatch();
    const { restaurantes } = useSelector((state) => state.restaurantes);
    const [map, setMap] = useState(null);
    const { google , query, placeId } = props;
    
    useEffect(()=> {
        if(query) {
            searchByQuery(query);
        }
    }, [query]);

    useEffect(() =>{
        if(placeId) {
            getRestaurantById(placeId);
        }
    }, [placeId]);
    
    
        
      

    
    function getRestaurantById(placeId){
        const service = new google.maps.places.PlacesService(map);
        dispatch(setRestaurante(null));

        const request = {
            placeId,
            fields: ["name", "opening_hours", "formatted_address","formatted_phone_number"],
        };

        service.getDetails(request, (place, status) =>{
            if(status === google.maps.places.PlacesServiceStatus.OK){
                dispatch(setRestaurante(place));
            }
        });
    }
    
    function searchByQuery(query){
        const service = new google.maps.places.PlacesService(map);
        dispatch(setRestaurantes([]));

        const request = {
            location: map.center,
            radius: '200',
            type: ['restaurant'],
            query, 
        };

        service.textSearch(request, (results, status) =>{
            if(status === google.maps.places.PlacesServiceStatus.OK){
                dispatch(setRestaurantes(results));
            }
        });
    }

    function searchNearby(map, center){
        const service = new google.maps.places.PlacesService(map);
        dispatch(setRestaurantes([]));

        const request = {
            location: center,
            radius: '20000',
            type: ['restaurant'],
        };

        service.nearbySearch(request, (results, status) =>{
            if(status === google.maps.places.PlacesServiceStatus.OK && results){
                dispatch(setRestaurantes(results));
            }
        });
    }

    function onMapReady(_, map){
        setMap(map)
        searchNearby(map, map.center);
    }
    
    return (
        
        <Map google={google} 
        centerAroundCurrentLocation 
        onReady={onMapReady} 
        onReCenter={onMapReady}
        {...props}>
            {restaurantes.map((restaurante) =>(
                <Marker 
                    key={restaurante.place_id}
                    name={restaurante.name} 
                    position={{
                        lat: restaurante.geometry.location.lat(),
                        lng: restaurante.geometry.location.lng(),
                    }}
                />  
            ))}      
        </ Map>

    );
    
};

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    language: 'pt-BR',
})(MapContainer);