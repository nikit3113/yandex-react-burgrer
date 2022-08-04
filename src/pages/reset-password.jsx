import styles from './home.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCallback, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {passwordReset} from "../api/api";

export function ResetPasswordPage() {
  const [form, setValue] = useState({newPassword: '', secretCode: ''});
  const history = useHistory();

  const onChange = e => {
    setValue({...form, [e.target.name]: e.target.value});
  };

  const onConfirm = useCallback(
    async e => {
      e.preventDefault();
      await passwordReset(form.newPassword, form.secretCode)
        .then(() => {
          history.replace({pathname: '/login'});
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
            type={"password"}
            placeholder="Введите новый пароль"
            value={form.newPassword}
            name="newPassword"
            onChange={onChange}/>
        </div>
        <div className={'mt-6 ' + styles.input}>
          <Input
            placeholder="Введите код из письма"
            value={form.secretCode}
            name="secretCode"
            onChange={onChange}/>
        </div>
        <div className={'mt-6'}>
          <Button onClick={onConfirm} primary={true}>
            Сохранить
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
