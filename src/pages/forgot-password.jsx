import styles from './home.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCallback, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {passwordForgot} from "../api/api";

export function ForgotPasswordPage() {
  const [form, setValue] = useState({email: ''});
  const history = useHistory();

  const onChange = e => {
    setValue({...form, [e.target.name]: e.target.value});
  };

  const onConfirm = useCallback(
    async e => {
      e.preventDefault();
      await passwordForgot(form.email)
        .then(() => {
          history.replace({pathname: '/reset-password'});
        })
        .catch((er) => console.error(er))
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
          <Button onClick={onConfirm} primary={true}>
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
