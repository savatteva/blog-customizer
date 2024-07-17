import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [article, setArticle] = useState({
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
		fontFamilyOption: defaultArticleState.fontFamilyOption, 
		fontSizeOption: defaultArticleState.fontSizeOption
	});

	return (
		<div
			className={styles.main}
			style={
				{
					'--font-family': article.fontFamilyOption.value,
					'--font-size': article.fontSizeOption.value,
					'--font-color': article.fontColor.value,
					'--container-width': article.contentWidth.value,
					'--bg-color': article.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm article={article} setArticle={setArticle} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
