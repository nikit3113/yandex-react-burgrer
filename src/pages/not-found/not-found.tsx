import React from 'react';
import {Link} from 'react-router-dom';

import styles from './not-found.module.css';
import bender404 from '../../images/404-bender.png'

export function NotFound404() {
  return (
    <div className={styles.container}>
      <h1 className={'text_type_main-large'}>Маршрут не найден - 404</h1>
      <p className={'text_type_main-default mt-5'}>Упппс.... Кажется ты попал не в тот мультик!</p>
      <img src={bender404} className={styles.image} alt={'Здесь был бендер'}/>
      <p className={'text_type_main-default mt-5'}>Проверь адрес, либо <Link to='/' className={styles.link}>поцелуй мой блестящий зад! </Link></p>
    </div>
  );
}
