import { useState } from 'react';
import arrow from 'src/images/arrow.svg';
import { ArticleParamsForm } from '../article-params-form';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
	isOpen?: boolean;
	onClick: OnClick;
	className?: string;
}

export const ArrowButton = ({onClick}: ArrowButtonProps) => {

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={styles.container}
			onClick={onClick}>
			<img src={arrow} alt='иконка стрелочки' className={styles.arrow} />
		</div>
	);
};
