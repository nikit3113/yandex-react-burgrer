import styles from './home.module.css';
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {FormEvent, useCallback} from "react";
import {Link, useHistory} from "react-router-dom";
import {passwordReset} from "../api/api";
import {useForm} from "../hooks/useForm";
import {Button} from "../components/fixed-ya-components-to-react18";

export function ResetPasswordPage() {
  const {values, handleChange} = useForm({newPassword: '', secretCode: ''});

  const history = useHistory();

  const onConfirm = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      await passwordReset(values.newPassword, values.secretCode)
        .then(() => {
          history.replace({pathname: '/login'});
        })
        .catch((er) => console.error(er))
    }, [history, values.newPassword, values.secretCode]);

  return (
    <div className={styles.container}>
      <form onSubmit={onConfirm}>
        <h1 className={'text_type_main-large'}>Восстановление пароля</h1>
        <div className={'mt-6 ' + styles.input}>
          <Input
            type={"password"}
            placeholder="Введите новый пароль"
            value={values.newPassword}
            name="newPassword"
            onChange={handleChange}/>
        </div>
        <div className={'mt-6 ' + styles.input}>
          <Input
            placeholder="Введите код из письма"
            value={values.secretCode}
            name="secretCode"
            onChange={handleChange}/>
        </div>
        <div className={'mt-6'}>
          <Button htmlType={"submit"}>
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
