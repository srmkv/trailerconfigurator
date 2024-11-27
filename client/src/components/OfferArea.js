import React from 'react';
import './OfferArea.css'; // Предполагается, что стили находятся в этом файле
import AboutSlider1 from './AboutSlider1';
import AboutSlider2 from './AboutSlider2';
import AboutSlider3 from './AboutSlider3';
const OfferArea = () => {
  return (
    <section id="about" className="offer-area-home-1">
      <img
        src="assets/images/shep/bg-blur-shep-1.png"
        alt="VRE"
        className="offer-area-1-shep-1 blur-1"
      />
      <div className="container">
        <div className="title">
          <div className="sub-title">
            <p>VOYAGE</p>
          </div>
          <div className="main-title">
            <h3 className="split-collab">
              Универсальные прицепы <br /> для легковых автомобилей
            </h3>
          </div>
        </div>

        <div className="offer-wrapper">
  <div className="row   justify-content-center">
    {/* Первый блок: текст слева, картинки справа */}
    <div className="col-12 col-md-10 about">
      <div className="row align-items-center">
        <div className="col-md-6">
         <div className="container">
          <h3>Отдых</h3>
          <p className="about-p">
           Откройте для себя новый формат доступного семейного отдыха, охоты, рыбалки и дружеских встреч. Проводите больше время на свежем воздухе. 
Не забудьте поместить в свой VOYAGE Classic мототехнику, туристическое снаряжение, спортивный инвентарь для отличного и полезного времяпровождения. 
Конструкция прицепа предусматривает установку туристических опций (навес, столик, канистра с водой и др.). 
Прицеп легко трансформируется в помещение для временного укрытия и отдыха.
          </p>
           </div>
        </div>
        <div className="col-md-6">
         <AboutSlider1 />
        </div>
      </div>
    </div>

    {/* Второй блок: картинки слева, текст справа */}
    <div className="col-12 col-md-10 about mt-4">
      <div className="row   align-items-center flex-md-row-reverse">
        <div className="col-md-6">
         <div className="container">
        <h3>Путешествия</h3>
          <p className="about-p">
           Взгляните на автотуризм по-новому. 
Путешествия круглый год с Voyage Classic позволят вам брать с собой весь необходимый багаж и инвентарь, включая мототехнику, освободить салон автомобиля для комфорта ваших любимых пассажиров и сохранить багажник от повреждений. 
Самое время проводить выходные и отпуск познавая нашу необъятную страну.</p>
        </div>
      </div>
        <div className="col-md-6">
          <AboutSlider2 />
        </div>
      </div>
    </div>

    {/* Третий блок: текст слева, картинки справа */}
    <div className="col-12 col-md-10 about mt-4">
      <div className="row   align-items-center">
        <div className="col-md-6">
         <div className="container">
        <h3>Грузоперевозки</h3>
          <p className="about-p">
           Прицеп проработан до мелочей для безопасной и удобной перевозки грузов и техники различного назначения. 
Оптимальная ширина кузова и высота бортов обеспечивают эффективную загрузку стройматериалов. 
Voyage Classic готов трудиться зимой и летом для экономии вашего времени и средств на доставку.
В кузове предусмотрены элементы для удобного крепления грузов разных габаритов. 
</p>
        </div>
      </div>
        <div className="col-md-6">
         <AboutSlider3 />
        </div>
      </div>
    </div>
  </div>
</div>

      </div>
    </section>
  );
};

export default OfferArea;
