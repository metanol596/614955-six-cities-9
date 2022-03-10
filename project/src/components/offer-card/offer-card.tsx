import { Link, generatePath } from 'react-router-dom';
import cn from 'classnames';

import Bookmark from '../bookmark/bookmark';
import Badge from '../badge/badge';

import { AppRoute } from '../../const';

import { Offer } from '../../types/offer';

type PropsType = {
  offer: Offer;
  className: string;
  onOfferCardMouseEnter?: (id: number) => void;
  onOfferCardMouseLeave?: () => void;
  isSmall?: boolean;
}

const MAX_RATE = 5;

function OfferCard({offer, className, onOfferCardMouseEnter, onOfferCardMouseLeave, isSmall}: PropsType): JSX.Element {
  const {previewImage, title, isFavorite, isPremium, rating, type, price, id} = offer;

  const imgWidth = isSmall ? '150' : '260';
  const imgHeight = isSmall ? '110' : '200';

  const PercantageRate = rating * 100 / MAX_RATE;

  return (
    <article
      key={id}
      className={cn('place-card',
        {
          'cities__place-card': className === 'cities',
          'favorites__card': className === 'favorites',
        })}
      onMouseEnter={() => {onOfferCardMouseEnter?.(id);}}
      onMouseLeave={() => {onOfferCardMouseLeave?.();}}
    >
      {isPremium && <Badge text='Premium' className='place-card' />}
      <div className={cn('place-card__image-wrapper',
        {
          'cities__image-wrapper': className === 'cities',
          'favorites__image-wrapper': className === 'favorites',
        })}
      >
        <Link to={generatePath(AppRoute.Offer, {id: `${id}`})}>
          <img
            className="place-card__image"
            src={previewImage}
            width={imgWidth}
            height={imgHeight}
            alt="Place"
          />
        </Link>
      </div>
      <div className={cn('place-card__info',
        {'favorites__card-info': className === 'favorites'})}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark isFavorite={isFavorite} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${PercantageRate}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, {id: `${id}`})}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
