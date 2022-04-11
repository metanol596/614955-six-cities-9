import cn from 'classnames';

import OfferCard from '../../components/offer-card/offer-card';
import { SortList } from '../../const';

import { useAppSelector } from '../../hooks';

import { selectSortType } from '../../store/offers-process/selectors';

import { Offer } from '../../types/offer';

import { sortOffers } from '../../utils';

type PropsType = {
  offers: Offer[];
  className: string;
  isSmall?: boolean;
  onListCardHover?: (id: number | undefined) => void;
}

function OffersList({offers, className, isSmall, onListCardHover}: PropsType):JSX.Element {
  const handleOfferCardMouseEnter = (id: number) => {
    onListCardHover?.(id);
  };

  const handleOfferCardMouseLeave = (id: number | undefined) => {
    onListCardHover?.(id);
  };

  const sortType = useAppSelector(selectSortType);

  const offersForSort = [...offers];

  const sortedOffers = sortOffers(offersForSort, SortList, sortType);

  return (
    <div className={cn('places__list', {
      'cities__places-list tabs__content': className === 'cities',
      'near-places__list': className === 'near',
    })}
    >
      {
        sortedOffers.map((offer) => (
          <OfferCard key={offer.id}
            offer={offer}
            onOfferCardMouseEnter={handleOfferCardMouseEnter}
            onOfferCardMouseLeave={handleOfferCardMouseLeave}
            className={className}
            isSmall={isSmall}
          />
        ))
      }
    </div>
  );
}

export default OffersList;
