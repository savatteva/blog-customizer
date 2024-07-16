import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react';
import { backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import arrowstyle from '../arrow-button/ArrowButton.module.scss'
import { RadioGroup } from '../radio-group/RadioGroup';
import { Select } from '../select';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { Separator } from '../separator';
import { Text } from '../text';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const rootRef = useRef<HTMLFormElement>(null);
	const [isOpen, setOpen] = useState(false);
	const [state, setState] = useState({
		fontColors: defaultArticleState.fontColor,
		backgroundColors: defaultArticleState.backgroundColor,
		contentWidthArr: defaultArticleState.contentWidth,
		fontFamily: defaultArticleState.fontFamilyOption, 
		fontSizeOptions: defaultArticleState.fontSizeOption
	})
	const [fontFamily, setFontFamily] = useState(state.fontFamily);
	const [backgroundColor, setBackgroundColor] = useState(state.backgroundColors);
	const [width, setWidth] = useState(state.contentWidthArr);
	const [fontColor, setFontColor] = useState(state.fontColors);
	const [fontSize, setFontSize] = useState(state.fontSizeOptions);

	useOutsideClickClose({
		isOpen: isOpen, 
		rootRef: rootRef, 
		onChange: setOpen
	})

	const toggleClass = () => {
		setOpen(!isOpen)
	}
 
	const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
		setState({
			fontColors: fontColor,
			backgroundColors: backgroundColor,
			contentWidthArr: width,
			fontFamily: fontFamily, 
			fontSizeOptions: fontSize
		})
		console.log(state)
	}

	// const resetForm = () => {
	// 	setState({
	// 		fontColors: defaultArticleState.fontColor,
	// 		backgroundColors: defaultArticleState.backgroundColor,
	// 		contentWidthArr: defaultArticleState.contentWidth,
	// 		fontFamily: defaultArticleState.fontFamilyOption, 
	// 		fontSizeOptions: defaultArticleState.fontSizeOption
	// 	})
	// }

	return (
		<>
			<ArrowButton onClick={toggleClass}/>
			<aside className={clsx(styles.container, isOpen ? styles.container_open : null)}>
				<form className={styles.form} onSubmit={handleSubmit} ref={rootRef}>
					<Text size={31} weight={800} uppercase>задайте параметры</Text>
					<Select title={'шрифт'} options={fontFamilyOptions} selected={fontFamily} onChange={setFontFamily} />
					<RadioGroup name='fontSize' onChange={setFontSize} options={fontSizeOptions} title={'размер шрифта'} selected={fontSize}/>
					<Select title={'цвет шрифта'} options={fontColors} selected={fontColor} onChange={setFontColor}/>
					<Separator />
					<Select title={'цвет фона'} options={backgroundColors} selected={backgroundColor} onChange={setBackgroundColor}/>
					<Select title={'ширина контента'} options={contentWidthArr} selected={width} onChange={setWidth} />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
