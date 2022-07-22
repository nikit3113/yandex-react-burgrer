import styles from './home.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCallback, useState} from "react";
import {Link} from "react-router-dom";

export function LoginPage() {
  const [form, setValue] = useState({email: '', password: ''});

  const onChange = e => {
    setValue({...form, [e.target.name]: e.target.value});
  };

  let login = useCallback(
    e => {
      e.preventDefault();
      //auth.signIn(form);
    },
    [form]
  );

  return (
    <div className={styles.container}>
      <form>
        <h1 className={'text_type_main-large'}>Вход</h1>
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
        <div className={'mt-6'}>
          <Button onClick={login} primary={true}>
            Войти
          </Button>
        </div>
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
