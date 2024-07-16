import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { FormEvent, useRef, useState } from 'react';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';
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
	const rootRef = useRef<HTMLFormElement>(null);
	const [isOpen, setOpen] = useState(false);
	const [state, setState] = useState(article)
	const [fontFamily, setFontFamily] = useState(state.fontFamilyOption);
	const [backgroundColor, setBackgroundColor] = useState(state.backgroundColor);
	const [width, setWidth] = useState(state.contentWidth);
	const [fontColor, setFontColor] = useState(state.fontColor);
	const [fontSize, setFontSize] = useState(state.fontSizeOption);

	useOutsideClickClose({
		isOpen: isOpen, 
		rootRef: rootRef, 
		onChange: setOpen
	})

	const toggleClass = () => {
		setOpen(!isOpen)
	}
 
	const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
		setArticle({
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: width,
			fontFamilyOption: fontFamily, 
			fontSizeOption: fontSize
		})
	}

	const resetForm = () => {
		setArticle({
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
			fontFamilyOption: defaultArticleState.fontFamilyOption, 
			fontSizeOption: defaultArticleState.fontSizeOption
		})

		setFontFamily(defaultArticleState.fontFamilyOption);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setFontSize(defaultArticleState.fontSizeOption);
		setWidth(defaultArticleState.contentWidth);
		setFontColor(defaultArticleState.fontColor)
	}

	return (
		<>
			<ArrowButton onClick={toggleClass} isOpen={isOpen}/>
			<aside className={clsx(styles.container, isOpen ? styles.container_open : null)}>
			<ArrowButton onClick={toggleClass} isOpen={isOpen}/>
				<form className={styles.form} onSubmit={handleSubmit} ref={rootRef}>
					<Text size={31} weight={800} uppercase>задайте параметры</Text>
					<Select title={'шрифт'} options={fontFamilyOptions} selected={fontFamily} onChange={setFontFamily} />
					<RadioGroup name='fontSize' onChange={setFontSize} options={fontSizeOptions} title={'размер шрифта'} selected={fontSize}/>
					<Select title={'цвет шрифта'} options={fontColors} selected={fontColor} onChange={setFontColor}/>
					<Separator />
					<Select title={'цвет фона'} options={backgroundColors} selected={backgroundColor} onChange={setBackgroundColor}/>
					<Select title={'ширина контента'} options={contentWidthArr} selected={width} onChange={setWidth} />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' onClick={resetForm} type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
