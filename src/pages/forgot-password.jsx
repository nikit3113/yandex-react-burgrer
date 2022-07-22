import styles from './home.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCallback, useState} from "react";
import {Link} from "react-router-dom";

export function ForgotPasswordPage() {
  const [form, setValue] = useState({email: ''});

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
        <h1 className={'text_type_main-large'}>Восстановление пароля</h1>
        <div className={'mt-6 ' + styles.input}>
          <Input
            placeholder="Укажите e-mail"
            value={form.email}
            name="email"
            onChange={onChange}/>
        </div>
        <div className={'mt-6'}>
          <Button onClick={login} primary={true}>
            Восстановить
          </Button>
        </div>
      </form>
      <p className={`text text_type_main-default text_color_inactive mt-20`}>
        Вспомнили пароль?{" "}
        <Link className={`text_type_main-default text_color_accent`} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
}
