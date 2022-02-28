import Header from '../../components/header/heaer';
//import FavoritesList from '../../components/favorites-list/favorites-list';

import { Offer } from '../../types/offer';

type PropsType = {
  offers: Offer[];
  page: string;
}

function Favorites({offers, page = 'favorites'}: PropsType):JSX.Element {
  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {/*<FavoritesList offers={offers}
              page={page}
            />*/}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Favorites;
