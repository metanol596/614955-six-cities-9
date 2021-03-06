import OfferCard from '../offer-card/offer-card';

import { Offer } from '../../types/offer';

type PropsType = {
  className: string;
  favoritesOffers: Offer[];
}

const transformOffers = (offers: Offer[]) => offers.reduce<{[key: string]: Offer[]}>((acc: {[p: string]: Offer[]}, offer) => {
  if (!acc[offer.city.name]) {
    acc[offer.city.name] = [];
  }

  acc[offer.city.name].push(offer);
  return acc;
}, {});

function FavoritesList({className, favoritesOffers}: PropsType): JSX.Element {
  const favoriteOffers = favoritesOffers.filter((offer) => offer.isFavorite);
  const groupedOffers = transformOffers(favoriteOffers);

  return (
    <ul className="favorites__list">
      {
        Object.entries(groupedOffers).map(([city, cityOffers]) => (
          <li key={city} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="/#">
                  <span>{city}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {
                cityOffers.map((cityOffer) => (
                  <OfferCard
                    key={cityOffer.id}
                    offer={cityOffer}
                    className={className}
                    isSmall
                  />
                ))
              }
            </div>
          </li>
        ))
      }
    </ul>
  );
}

export default FavoritesList;
