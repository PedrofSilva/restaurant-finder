import  React ,  { useState } from 'react';
import TextField, { Input } from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import { useSelector } from 'react-redux';

import { Container, Carousel, Search, Logo, Wrapper, CarouselTitle, ModalTitle, ModalContent } from './styles';
import logo from '../../assets/logo.svg'
import { Card, RestauranteCard, Modal, Map, Loader, Skeleton } from '../../components';


const Home = () => {
    const [inputValue, setInputValue] = useState('Restaurantes');
    const [query, setQuery] = useState(null);
    const [placeId, setPlaceId] = useState(null);
    const { restaurantes, restauranteSelected } = useSelector((state) => state.restaurantes);
    const [modalOpened, setModalOpened] = useState(false);
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        adaptativeHeight: true
      };

      function handleKeyPress(e){
        if(e.key === 'Enter'){
            setQuery(inputValue);
        }
      }

      function handleOpenModal(placeId) {
          setPlaceId(placeId);
          setModalOpened(true);
      }

    return (
        <Wrapper>
            <Container>
                <Search>
                    <Logo src={logo} alt="Logo Restaurante" />
                    <TextField
                        label='Pesquisar'
                        outlined
                        trailingIcon={<MaterialIcon role="button" icon="search"/>}
                        //onTrailingIconSelect={() => this.setState({value: ''})}
                        //trailingIcon={<MaterialIcon role="button" icon="delete"/>}
                    ><Input
                        
                        value={inputValue}
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setInputValue(e.target.value)}/>
                    </TextField>
                    {restaurantes.length > 0 ?(
                        <>
                        <CarouselTitle>Na sua Área</CarouselTitle>
                            <Carousel {...settings}>
                            {restaurantes.map((restaurante) => 
                                <Card 
                                key={restaurante.place_id}
                                photo={restaurante.photos ? restaurante.photos[0].getUrl() : restaurante} 
                                title={restaurante.name}
                            />
                            )}
                        </Carousel> 
                        </>
                    ) : (
                        <Loader />
                    )}
                </Search>
                {restaurantes.map((restaurante) => 
                <RestauranteCard 
                    onClick={()=> 
                    handleOpenModal(restaurante.place_id)} 
                    restaurante={restaurante} />)}
            </Container>
            <Map query={query} placeId={placeId} />
            <Modal open={modalOpened} onClose={() => setModalOpened(!modalOpened)}>
            {restauranteSelected ? (
                        <>
                        <ModalTitle>{restauranteSelected?.name}</ModalTitle>
                        <ModalContent>{restauranteSelected?.formatted_phone_number}</ModalContent>
                        <ModalContent>{restauranteSelected?.formatted_address}</ModalContent>
                        <ModalContent>
                            {restauranteSelected?.opening_hours?.open_now ? 'Aberto agora :-)' : 'Fechado neste momento :-('}
                        </ModalContent>
                        </>
                    ) : (
                        <>
                        <Skeleton width="10px" height="10px" />
                        <Skeleton width="10px" height="10px" />
                        <Skeleton width="10px" height="10px" />
                        <Skeleton width="10px" height="10px" />
                        </>
                    )}
            </Modal>
        </Wrapper>
    )
}

export default Home;