import { useAppSelector } from '../../hooks';

import { selectCity } from '../../store/offers-data/selectors';

import styles from './main.module.css';

function MainEmpty(): JSX.Element {
  const currentCity = useAppSelector(selectCity);

  return (
    <div className="cities">
      <div className={`cities__places-container container cities__places-container--empty ${styles.citiesPlacesContainer}`}>
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">We could not find any property available at the moment in {currentCity}</p>
          </div>
        </section>
        <div className="cities__right-section"></div>
      </div>
    </div>
  );
}

export default MainEmpty;
