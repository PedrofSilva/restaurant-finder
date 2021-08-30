import React , { useState , useEffect }from "react";
import styled from "styled-components";
import Skeleton from "../Skeleton";

const Card = styled.div`
    display: flex;
    justify-content: center;
    padding: 8px;
    width: 80px;
    height: 80px;
    border-radius: 6px;
    background: url(${(props) => props.photo});
    background-size: cover;
`;

const Title = styled.span`
    font-family: ${(props) => props.theme.fonts.regular};
    color: #fff;
    font-size: 12px;
`;

const ImageCard = ({ photo, title }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    
    useEffect(() => {
        const imageLoader = new Image();
        imageLoader.src = photo;
        imageLoader.onload = () => setImageLoaded(true);
    }, [photo]);
    
    return (
        <>
        {imageLoaded ? (
            <Card photo={photo}>
                <Title>{title}</Title>
            </Card>
        ) : (<Skeleton width="90px" height="90px" />
            )};
        </>
    );
};

export default ImageCard;