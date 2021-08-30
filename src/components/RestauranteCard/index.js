import React, { useState } from "react";
import { Restaurante, RestauranteInfo, Title, Address, RestaurantePhoto } from './styles';
import ReactStars from "react-rating-stars-component";
import Skeleton from "../Skeleton";

const RestauranteCard = ({ restaurante, onClick }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
    <Restaurante onClick={onClick}>
        <RestauranteInfo>
            <Title>{restaurante.name}</Title>
            <ReactStars count={5} isHalf value={restaurante.rating} edit={false} activeColor="#e7711c"/>
            <Address>{restaurante.vicinity || restaurante.formatted_address}</Address>
        </RestauranteInfo>
        <RestaurantePhoto 
        imageLoaded={imageLoaded}
        src={restaurante.photos ? restaurante.photos[0].getUrl() : restaurante} 
        onLoad={() => setImageLoaded(true)}
        alt="Foto do Restaurante"
        />
        {!imageLoaded && <Skeleton width="100px" height="100px" />}
    </Restaurante>
    );
};
export default RestauranteCard;