import clsx from 'clsx';
import { useState } from 'react';
import arrow from 'src/images/arrow.svg';
import { ArticleParamsForm } from '../article-params-form';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
	isOpen?: boolean;
	onClick: OnClick;
}

export const ArrowButton = ({onClick, isOpen}: ArrowButtonProps) => {

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, isOpen ? styles.container_open : null)}
			onClick={onClick}>
			<img src={arrow} alt='иконка стрелочки' className={clsx(styles.arrow, isOpen ? styles.arrow_open : null)} />
		</div>
	);
};
