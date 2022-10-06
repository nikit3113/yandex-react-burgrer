import styles from './home.module.css';
import {Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {FormEvent, useCallback} from "react";
import {Link} from "react-router-dom";
import {registerUser} from "../services/actions/user";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/loader/loader";
import {useForm} from "../hooks/useForm";
import {Button} from "../components/fixed-ya-components-to-react18";

export function RegisterPage() {
  const {values, handleChange} = useForm({name: '', email: '', password: ''});

  const dispatch = useDispatch();
  const {registerUserRequest, registerUserError} = useSelector((store: any) => store.user);

  const onRegister = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch<any>(registerUser(values.email, values.password, values.name));
    }, [values, dispatch]);

  return (
    <div className={styles.container}>
      <form onSubmit={onRegister}>
        <h1 className={'text_type_main-large'}>Регистрация</h1>
        <div className={'mt-6'}>
          <Input
            placeholder="Имя"
            value={values.name}
            name="name"
            onChange={handleChange}/>
        </div>
        <div className={'mt-6'}>
          <Input
            placeholder="E-mail"
            value={values.email}
            name="email"
            onChange={handleChange}/>
        </div>
        <div className={'mt-6'}>
          <PasswordInput
            value={values.password}
            name="password"
            onChange={handleChange}/>
        </div>
        <div className={styles.button_container + ' mt-6'}>
          <Button disabled={registerUserRequest} htmlType={"submit"}>
            Зарегистрироваться
          </Button>
          {registerUserRequest && <Loader/>}
        </div>
        {registerUserError &&
          <p className={'text text_type_main-default text_color_error mt-2'}>{registerUserError}</p>}
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
