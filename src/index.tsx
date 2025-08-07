import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const initialArticleState = useRef(defaultArticleState);
	const [articleState, setArticleState] = useState(defaultArticleState);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);

	const handleReset = () => {
		setArticleState(initialArticleState.current);
	};

	useEffect(() => {
		if (!isFormOpen) return;
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsFormOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isFormOpen]);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => setIsFormOpen(!isFormOpen)}
			/>
			<ArticleParamsForm
				ref={sidebarRef}
				isOpen={isFormOpen}
				articleState={articleState}
				onApply={setArticleState}
				initialArticleState={initialArticleState.current}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
