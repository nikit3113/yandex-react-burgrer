import styles from './home.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCallback} from "react";
import {Link, useHistory} from "react-router-dom";
import {passwordForgot} from "../api/api";
import {useForm} from "../hooks/useForm";

export function ForgotPasswordPage() {
  const {values, handleChange} = useForm({email: ''});

  const history = useHistory();

  const onConfirm = useCallback(
    async e => {
      e.preventDefault();
      await passwordForgot(values.email)
        .then(() => {
          history.replace({pathname: '/reset-password'});
        })
        .catch((er) => console.error(er))
    }, [values]);

  return (
    <div className={styles.container}>
      <form onSubmit={onConfirm}>
        <h1 className={'text_type_main-large'}>Восстановление пароля</h1>
        <div className={'mt-6 ' + styles.input}>
          <Input
            placeholder="Укажите e-mail"
            value={values.email}
            name="email"
            onChange={handleChange}/>
        </div>
        <div className={'mt-6'}>
          <Button primary={true} htmlType={"submit"}>
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
