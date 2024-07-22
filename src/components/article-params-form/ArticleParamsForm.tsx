import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { FormEvent, useRef, useState } from 'react';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group/RadioGroup';
import { Select } from '../select';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { Separator } from '../separator';
import { Text } from '../text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	article: ArticleStateType;
	setArticle: (p: ArticleStateType) => void;
}

export const ArticleParamsForm = ({article, setArticle} : ArticleParamsFormProps) => {
	const [selectArticleState, setSelectArticleState] = useState<ArticleStateType>(article)
	const rootRef = useRef<HTMLFormElement>(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [state, setState] = useState(article);

	useOutsideClickClose({
		isOpen: isMenuOpen, 
		rootRef: rootRef, 
		onChange: setIsMenuOpen
	})

	const toggleClass = () => {
		setIsMenuOpen(!isMenuOpen)
	}

  
	const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
		setArticle(selectArticleState)
	}

	const resetForm = () => {
		setArticle({
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
			fontFamilyOption: defaultArticleState.fontFamilyOption, 
			fontSizeOption: defaultArticleState.fontSizeOption
		})
	
		setSelectArticleState({
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
			fontFamilyOption: defaultArticleState.fontFamilyOption, 
			fontSizeOption: defaultArticleState.fontSizeOption
		})
	}

	return (
		<>
			<ArrowButton onClick={toggleClass} isOpen={isMenuOpen}/>
			<aside className={clsx(styles.container, isMenuOpen ? styles.container_open : null)}>
			<ArrowButton onClick={toggleClass} isOpen={isMenuOpen}/>
				<form className={styles.form} onSubmit={handleSubmit} ref={rootRef}>
					<Text size={31} weight={800} uppercase>задайте параметры</Text>
					<Select title={'шрифт'} options={fontFamilyOptions} selected={selectArticleState.fontFamilyOption} onChange={(selectElement: OptionType) => (setSelectArticleState(state => ({...state, 'fontFamilyOption': selectElement})))} />
					<RadioGroup name='fontSize' onChange={(selectElement: OptionType) => (setSelectArticleState(state => ({...state, 'fontSizeOption': selectElement})))} options={fontSizeOptions} title={'размер шрифта'} selected={selectArticleState.fontSizeOption}/>
					<Select title={'цвет шрифта'} options={fontColors} selected={selectArticleState.fontColor} onChange={(selectElement: OptionType) => (setSelectArticleState(state => ({...state, 'fontColor': selectElement})))}/>
					<Separator />
					<Select title={'цвет фона'} options={backgroundColors} selected={selectArticleState.backgroundColor} onChange={(selectElement: OptionType) => (setSelectArticleState(state => ({...state, 'backgroundColor': selectElement})))}/>
					<Select title={'ширина контента'} options={contentWidthArr} selected={selectArticleState.contentWidth} onChange={(selectElement: OptionType) => (setSelectArticleState(state => ({...state, 'contentWidth': selectElement})))} />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' onClick={resetForm} type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
