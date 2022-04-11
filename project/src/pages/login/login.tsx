import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import Header from '../../components/header/header';

import { CITIES } from '../../const';

import { getRandomArrayElement } from '../../utils';

import { useAppDispatch } from '../../hooks';

import { cityChange } from '../../store/offers-data/offers-data';
import { loginAction } from '../../store/user-process/user-process';

import styles from './login.module.css';

type FieldProps = {
  value: string;
  error: boolean;
  errorText: string;
  regex: RegExp;
}

type FormStateProps = {
  [key: string]: FieldProps;
}

const authFormFields = {
  email: 'E-mail',
  password: 'Password',
};

const randomCity = getRandomArrayElement(CITIES);

const EMAIL_VALID_SYMBOLS = /[-.\w]+@([\w-]+\.)+[\w-]+/g;
const PASSWORD_VALID_SYMBOLS = /([a-z]+[0-9])|([0-9]+[a-z])/gi;

function Login():JSX.Element {
  const dispatch = useAppDispatch();

  const [formState, setFormState] = useState<FormStateProps>({
    email: {
      value: '',
      error: false,
      errorText: 'The email cannot be empty and must contain the @ sign and the domain name',
      regex: EMAIL_VALID_SYMBOLS,
    },
    password: {
      value: '',
      error: false,
      errorText: 'The password cannot be empty and must contain at least one digit and one letter',
      regex: PASSWORD_VALID_SYMBOLS,
    },
  });

  const checkFieldForValidity = (value: string, symbols: RegExp) => value !== '' && (value.match(symbols));

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const authData = {
      email: formState.email.value,
      password: formState.password.value,
    };

    dispatch(loginAction(authData));
  };

  const handleChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;

    const rule = formState[name].regex;
    const validateField = checkFieldForValidity(value, rule);

    setFormState({
      ...formState,
      [name]: {
        ...formState[name],
        error: !validateField,
        value,
      },
    });
  };

  const isError = formState.email.error || formState.password.error;
  const isValue = formState.email.value === '' || formState.password.value === '';

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              {Object.entries(authFormFields).map(([name, label]) => {
                const inputClass = cn('login__input', 'form__input', {
                  [styles.inputError]: formState[name].error,
                });

                return (
                  <div
                    key={name}
                    className='login__input-wrapper form__input-wrapper'
                  >
                    <label className="visually-hidden">
                      {label}
                    </label>
                    <input
                      className={inputClass}
                      type={name}
                      name={name}
                      placeholder={label}
                      required
                      value={formState[name].value}
                      onChange={handleChange}
                    />
                    {
                      formState[name].error &&
                        (
                          <p className={styles.errorMessage}>
                            {formState[name].errorText}
                          </p>
                        )
                    }
                  </div>
                );
              })}
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={isError || isValue}
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                to="/"
                className="locations__item-link"
                onClick={() => {dispatch(cityChange(randomCity));}}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
