import styles from './home.module.css';
import {Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {FormEvent, useCallback} from "react";
import {Link} from "react-router-dom";
import {loginUser} from "../services/actions/user";
import Loader from "../components/loader/loader";
import {useForm} from "../hooks/useForm";
import {Button} from "../components/fixed-ya-components-to-react18";
import {useDispatch, useSelector} from "../services/hooks";
import {RootState} from "../services/types";

export function LoginPage() {
  const {values, handleChange} = useForm({email: '', password: ''});

  const dispatch = useDispatch();
  const {loginUserRequest, loginUserError} = useSelector((store: RootState) => store.user);

  const onLogin = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(loginUser(values.email, values.password));
    }, [values, dispatch]);

  return (
    <div className={styles.container}>
      <form onSubmit={onLogin}>
        <h1 className={'text_type_main-large'}>Вход</h1>
        <div className={'mt-6 ' + styles.input}>
          <Input
            placeholder="E-mail"
            value={values.email}
            name="email"
            onChange={handleChange}/>
        </div>
        <div className={'mt-6 ' + styles.input}>
          <PasswordInput
            value={values.password}
            name="password"
            onChange={handleChange}/>
        </div>
        <div className={styles.button_container + ' mt-6'}>
          <Button disabled={loginUserRequest} htmlType={"submit"}>
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
