import styles from './profile.module.css';
import {NavLink} from "react-router-dom";
import React, {useState} from "react";
import {Input, PasswordInput, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";

export function ProfilePage() {
  const [form, setValue] = useState({
    name: {text: '', disabled: true},
    email: {text: ''},
    password: {text: '', disabled: true}
  });


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
        <NavLink
          to={"logout"}
          className={styles.link}
          activeClassName={styles.active_link}
        >
          <p className={'text text_type_main-medium mt-2 mb-2'}>Выход</p>
        </NavLink>

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
      </div>
    </div>
  )
}
