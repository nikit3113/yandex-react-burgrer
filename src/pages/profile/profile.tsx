import styles from './profile.module.css';
import {NavLink} from "react-router-dom";
import React, {RefObject, useCallback, useEffect, useState} from "react";
import {Input, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {getUser, logout, updateUser} from "../../services/actions/user";
import Loader from "../../components/loader/loader";
import {Button} from "../../components/fixed-ya-components-to-react18";

type TFormState = {
  name: { text: string, disabled: boolean },
  email: { text: string },
  password: { text: string, disabled: boolean },
}

export function ProfilePage() {
  const dispatch = useDispatch();
  const {user, updateUserRequest, updateUserError} = useSelector((store: any) => store.user);

  const [form, setValue] = useState<TFormState>({
    name: {text: '', disabled: true},
    email: {text: ''},
    password: {text: '', disabled: true}
  });

  const isDefault = form.name.text.localeCompare(user.name) === 0
    && form.email.text.localeCompare(user.email) === 0
    && !form.password.text;

  useEffect(() => {
    dispatch<any>(getUser());
  }, [dispatch])

  useEffect(() => {
    setValue({
      ...form,
      name: {text: user?.name, disabled: form.name.disabled},
      email: {text: user?.email},
    });
  }, [user])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...form, [e.target.name]: {
        text: e.target.value,
        disabled: (form as any)[e.target.name].disabled
      }
    });
  };

  const inputRefName: RefObject<HTMLInputElement> = React.useRef(null);
  const inputRefPass: RefObject<HTMLInputElement> = React.useRef(null);

  const onIconClick = (type: string, inputRef: RefObject<any>) => {
    setValue({...form, [type]: {text: (form as any)[type].text, disabled: false}});
    setTimeout(() => inputRef.current.focus(), 0);
  }

  const onBlur = (type: string, inputRef: RefObject<any>) => {
    setValue({...form, [type]: {text: (form as any)[type].text, disabled: true}});
    setTimeout(() => inputRef.current.blur(), 0);
  }

  const onLogout = () => {
    dispatch<any>(logout());
  }

  const onConfirmChange: any = useCallback(
    (e: Event) => {
      e.preventDefault();
      dispatch<any>(updateUser(form.name.text, form.email.text, form.password.text));
    }, [form, dispatch]);

  const onResetChange: any = useCallback(
    (e: Event) => {
      e.preventDefault();
      setValue({
        ...form,
        name: {text: user?.name, disabled: form.name.disabled},
        email: {text: user?.email},
        password: {text: '', disabled: form.password.disabled},
      });
    }, [form, user]);

  return (
    <div className={`${styles.container}`}>
      <nav className={`${styles.links}`}>
        <NavLink
          to={""}
          className={styles.link}
          activeClassName={styles.active_link}>
          <p className={'text text_type_main-medium mt-2 mb-2'}>Профиль</p>
        </NavLink>
        <NavLink
          to={"orders"}
          className={styles.link}
          activeClassName={styles.active_link}>
          <p className={'text text_type_main-medium mt-2 mb-2'}>История заказов</p>
        </NavLink>
        <button className={styles.button + ' text_type_main-medium mt-2'} onClick={onLogout}>Выход</button>
        <div className={`mt-20`}>
          <p className={`text text_type_main-default text_color_inactive`}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
      </nav>
      <form className={`ml-15 ${styles.editor}`} onSubmit={onConfirmChange} onReset={onResetChange}>
        <div>
          <Input
            type={'text'}
            icon={'EditIcon'}
            disabled={form.name.disabled}
            placeholder="Имя"
            value={form.name.text}
            ref={inputRefName}
            onIconClick={() => onIconClick('name', inputRefName)}
            onBlur={() => onBlur('name', inputRefName)}
            name="name"
            onChange={onChange}/>
        </div>
        <div className={'mt-6'}>
          <EmailInput
            value={form.email.text}
            name="email"
            onChange={onChange}/>
        </div>
        <div className={'mt-6'}>
          <Input
            type={'password'}
            icon={'EditIcon'}
            disabled={form.password.disabled}
            placeholder="Пароль"
            value={form.password.text}
            ref={inputRefPass}
            onIconClick={() => onIconClick('password', inputRefPass)}
            onBlur={() => onBlur('password', inputRefPass)}
            name="password"
            onChange={onChange}/>
        </div>
        <div className={styles.buttons + ' mt-6'}>
          <Button disabled={isDefault} type='secondary' htmlType={'reset'}>
            Отмена
          </Button>
          <Button disabled={isDefault} type={'primary'} htmlType={'submit'}>
            Сохранить
          </Button>
          {updateUserRequest && <Loader/>}
        </div>
        {updateUserError && <p className={'text text_type_main-default text_color_error mt-2'}>{updateUserError}</p>}
      </form>
    </div>
  )
}
