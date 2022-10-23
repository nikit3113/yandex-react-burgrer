import React, {FC, RefObject, useCallback, useEffect, useState} from "react";
import styles from "./profile-edit.module.css";
import {EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Button} from "../fixed-ya-components-to-react18";
import Loader from "../loader/loader";
import {getUser, updateUser} from "../../services/actions/user";
import {useDispatch, useSelector} from "../../services/hooks";
import {RootState} from "../../services/types";

type TFormState = {
  name: { text: string, disabled: boolean },
  email: { text: string },
  password: { text: string, disabled: boolean },
}

const ProfileEdit: FC<any> = () => {
  const {user, updateUserRequest, updateUserError} = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();

  const [form, setValue] = useState<TFormState>({
    name: {text: '', disabled: true},
    email: {text: ''},
    password: {text: '', disabled: true}
  });

  const isDefault = user && form.name.text.localeCompare(user.name) === 0
    && form.email.text.localeCompare(user.email) === 0
    && !form.password.text || false;

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch])

  useEffect(() => {
    setValue({
      ...form,
      name: {text: user?.name || '', disabled: form.name.disabled},
      email: {text: user?.email || ''},
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


  const onConfirmChange: any = useCallback(
    (e: Event) => {
      e.preventDefault();
      dispatch(updateUser(form.name.text, form.email.text, form.password.text));
    }, [form, dispatch]);

  const onResetChange: any = useCallback(
    (e: Event) => {
      e.preventDefault();
      setValue({
        ...form,
        name: {text: user?.name || '', disabled: form.name.disabled},
        email: {text: user?.email || ''},
        password: {text: '', disabled: form.password.disabled},
      });
    }, [form, user]);
  return (
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
  )
}

export default ProfileEdit;
