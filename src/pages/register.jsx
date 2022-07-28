import styles from './home.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCallback, useState} from "react";
import {Link} from "react-router-dom";
import {registerUser} from "../services/actions/user";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/loader/loader";

export function RegisterPage() {
  const [form, setValue] = useState({name: '', email: '', password: ''});
  const dispatch = useDispatch();
  const {user, registerUserRequest, registerUserError} = useSelector(store => store.user);

  const onChange = e => {
    setValue({...form, [e.target.name]: e.target.value});
  };

  let onRegister = useCallback(
    e => {
      e.preventDefault();
      dispatch(registerUser(form.email, form.password, form.name));
    },
    [form]
  );

  return (
    <div className={styles.container}>
      <form>
        <h1 className={'text_type_main-large'}>Регистрация</h1>
        <div className={'mt-6'}>
          <Input
            placeholder="Имя"
            value={form.name}
            name="name"
            onChange={onChange}/>
        </div>
        <div className={'mt-6'}>
          <Input
            placeholder="E-mail"
            value={form.email}
            name="email"
            onChange={onChange}/>
        </div>
        <div className={'mt-6'}>
          <PasswordInput
            placeholder="Пароль"
            value={form.password}
            name="password"
            onChange={onChange}/>
        </div>
        <div className={styles.button_container + ' mt-6'}>
          <Button disabled={registerUserRequest} onClick={onRegister} primary={true}>
            Зарегистрироваться
          </Button>
          {registerUserRequest && <Loader/>}
        </div>
        {registerUserError && <p className={'text text_type_main-default text_color_error mt-2'}>{registerUserError}</p>}
      </form>
      <p className={`text text_type_main-default text_color_inactive mt-20`}>
        Уже зарегистрированы?{" "}
        <Link className={`text_type_main-default text_color_accent`} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
}
