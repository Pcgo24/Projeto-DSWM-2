import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './home.css'; 

// Importando os vídeos e imagens
import Vid1 from '../../assets/vid1.mp4';
import Vid2 from '../../assets/vid2.mp4';
import Vid3 from '../../assets/vid3.mp4';

import Img1 from '../../assets/img1.png';
import Img2 from '../../assets/img2.png';
import Img3 from '../../assets/img3.png';

const Home = () => {
  const navigate = useNavigate();

  const redirectToFeedback = () => {
    navigate('/feedback');
  };
  

  return (
    <div className="home-container">
      <h1 className="home-title">Bem-vindo ao Salão de Beleza Dondokas</h1>
      
      <p className="home-description">
        <strong>Salão Dondokas: a beleza que realça a sua essência.</strong>
      </p>
      
      <p className="home-description">
        Descubra uma experiência transformadora no Salão Dondokas, onde cuidamos de cada detalhe para que sua visita seja muito mais do que apenas estética — é um momento de cuidado e renovação.
      </p>

      <p className="home-description">
        Com uma ampla variedade de serviços especializados, oferecemos cortes de cabelo, coloração, tratamentos capilares avançados, manicure, pedicure e cuidados com a pele, sempre utilizando os melhores produtos do mercado e técnicas modernas. Nossos profissionais são cuidadosamente treinados para entregar um atendimento de excelência, personalizado e dedicado a ressaltar sua beleza única.
      </p>

      <p className="home-description">
        Em um ambiente aconchegante e sofisticado, criamos o espaço ideal para relaxar e deixar-se levar por um atendimento de primeira classe. Quer você esteja em busca de uma mudança completa ou apenas de um cuidado regular, nossa equipe estará pronta para trazer à tona o que há de melhor em você.
      </p>

      <p className="home-description">
        <strong>Visite-nos no Salão Dondokas e permita-se viver uma experiência de beleza como nunca antes.</strong>
      </p>

      <p className="home-address">
        Endereço: Av. São João, 933 - sala 9 - Centro, Prudentópolis - PR,
      </p>

      <p className="home-hours">
        Horário de funcionamento: Segunda a Sexta, das 9h às 18h.
      </p>

      
      <div className="home-images">
        <img src={Img1} alt="Imagem 1" />
        <img src={Img2} alt="Imagem 2" />
        <img src={Img3} alt="Imagem 3" />
      </div>

      <div className="home-videos">
        <video src={Vid1} controls />
        <video src={Vid2} controls />
        <video src={Vid3} controls />
      </div>



      <button onClick={redirectToFeedback} className="home-button">
        Deixe seu Feedback
      </button>

    </div>
  );

};

export default Home;