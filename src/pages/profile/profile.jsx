import styles from './profile.module.css';
import {NavLink} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Input, EmailInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {getUser, logout, updateUser} from "../../services/actions/user";
import Loader from "../../components/loader/loader";

export function ProfilePage() {
  const dispatch = useDispatch();
  const {user, updateUserRequest, updateUserError} = useSelector(store => store.user);

  const [form, setValue] = useState({
    name: {text: '', disabled: true},
    email: {text: ''},
    password: {text: '', disabled: true}
  });

  const isDefault = form.name.text.localeCompare(user.name) == 0 && form.email.text.localeCompare(user.email) == '0' && !form.password.text

  useEffect(() => {
    dispatch(getUser());
  }, [])

  useEffect(() => {
    setValue({
      ...form,
      name: {text: user?.name, disabled: form.name.disabled},
      email: {text: user?.email, disabled: form.email.disabled},
    });
  }, [user])

  const onChange = e => {
    setValue({...form, [e.target.name]: {text: e.target.value, disabled: form[e.target.name].disabled}});
  };

  const inputRefName = React.useRef(null);
  const inputRefPass = React.useRef(null);

  const onIconClick = (type, inputRef) => {
    setValue({...form, [type]: {text: form[type].text, disabled: false}});
    setTimeout(() => inputRef.current.focus(), 0);
  }

  const onBlur = (type, inputRef) => {
    setValue({...form, [type]: {text: form[type].text, disabled: true}});
    setTimeout(() => inputRef.current.blur(), 0);
  }

  const onLogout = () => {
    dispatch(logout());
  }

  const onConfirmChange = () => {
    dispatch(updateUser(form.name.text, form.email.text, form.password.text));
  }

  const onResetChange = () => {
    setValue({
      ...form,
      name: {text: user?.name, disabled: form.name.disabled},
      email: {text: user?.email, disabled: form.email.disabled},
    });
  }

  return (
    <div className={`${styles.container}`}>
      <nav className={`${styles.links}`}>
        <NavLink
          to={""}
          className={styles.link}
          activeClassName={styles.active_link}
        >
          <p className={'text text_type_main-medium mt-2 mb-2'}>Профиль</p>
        </NavLink>
        <NavLink
          to={"orders"}
          className={styles.link}
          activeClassName={styles.active_link}
        >
          <p className={'text text_type_main-medium mt-2 mb-2'}>История заказов</p>
        </NavLink>
        <button className={styles.button + ' text_type_main-medium mt-2'} onClick={onLogout}>Выход</button>
        <div className={`mt-20`}>
          <p className={`text text_type_main-default text_color_inactive`}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
      </nav>
      <div className={`ml-15 ${styles.editor}`}>
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
            placeholder="Логин"
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
          <Button disabled={isDefault} onClick={onResetChange} type='secondary' htmlType={'reset'}>
            Отмена
          </Button>
          <Button disabled={isDefault} onClick={onConfirmChange} type={'primary'} htmlType={'submit'}>
            Сохранить
          </Button>
          {updateUserRequest && <Loader/>}
        </div>
        {updateUserError && <p className={'text text_type_main-default text_color_error mt-2'}>{updateUserError}</p>}
      </div>
    </div>
  )
}
