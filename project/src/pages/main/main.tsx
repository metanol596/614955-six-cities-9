import Header from '../../components/header/header';
import Locations from '../../components/locations/locations';
import MainFull from './main-full';
import MainEmpty from './main-empty';
import Spinner from '../../components/spinner/spinner';

import { useAppSelector } from '../../hooks';

import { selectOffers, selectOffersStatus } from '../../store/offers-data/offers-data';
import { selectAuthorizationStatus } from '../../store/user-process/user-process';

import { isCheckedAuth } from '../../utils';

function Main(): JSX.Element {
  const offers = useAppSelector(selectOffers);
  const isDataLoaded = useAppSelector(selectOffersStatus);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  const isOffers = offers.length === 0;

  if (!isDataLoaded || isCheckedAuth(authorizationStatus)) {
    return <Spinner />;
  }

  return (
    <>
      <Header />
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <Locations />
      </div>
      {isOffers ? <MainEmpty /> : <MainFull offers={offers} />}
    </>
  );
}

export default Main;
