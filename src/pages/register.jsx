import styles from './home.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCallback, useState} from "react";
import {Link} from "react-router-dom";

export function RegisterPage() {
  const [form, setValue] = useState({name: '', email: '', password: ''});

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
        <div className={'mt-6'}>
          <Button onClick={login} primary={true}>
            Зарегистрироваться
          </Button>
        </div>
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
