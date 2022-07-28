import styles from './home.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCallback, useState} from "react";
import {Link} from "react-router-dom";
import {loginUser} from "../services/actions/user";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/loader/loader";

export function LoginPage() {
  const [form, setValue] = useState({email: '', password: ''});

  const dispatch = useDispatch();
  const {user, loginUserRequest, loginUserError} = useSelector(store => store.user);

  const onChange = e => {
    setValue({...form, [e.target.name]: e.target.value});
  };

  let login = useCallback(
    e => {
      e.preventDefault();
      dispatch(loginUser(form.email, form.password));
    },
    [form]
  );

  return (
    <div className={styles.container}>
      <form>
        <h1 className={'text_type_main-large'}>Вход</h1>
        <div className={'mt-6 ' + styles.input}>
          <Input
            placeholder="E-mail"
            value={form.email}
            name="email"
            onChange={onChange}/>
        </div>
        <div className={'mt-6 ' + styles.input}>
          <PasswordInput
            placeholder="Пароль"
            value={form.password}
            name="password"
            onChange={onChange}/>
        </div>
        <div className={styles.button_container + ' mt-6'}>
          <Button disabled={loginUserRequest} onClick={login} primary={true}>
            Войти
          </Button>
          {loginUserRequest && <Loader/>}
        </div>
        {loginUserError && <p className={'text text_type_main-default text_color_error mt-2'}>{loginUserError}</p>}
      </form>
      <p className={`text text_type_main-default text_color_inactive mt-20`}>
        Вы - новый пользователь?{" "}
        <Link className={`text_type_main-default text_color_accent`} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p className={`text text_type_main-default text_color_inactive mt-4`}>
        Забыли пароль?{" "}
        <Link className={`text_type_main-default text_color_accent`} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
}
