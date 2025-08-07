import { Button } from 'src/ui/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	fontFamilyOptions,
	defaultArticleState,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { useState, forwardRef } from 'react';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator/Separator';

interface Props {
	isOpen: boolean;
	onApply: (state: typeof defaultArticleState) => void;
	onClose: () => void;
	initialArticleState?: typeof defaultArticleState;
}

export const ArticleParamsForm = forwardRef<HTMLDivElement, Props>(
	function ArticleParamsForm(
		{ isOpen, onApply, onClose, initialArticleState = defaultArticleState },
		ref
	) {
		const [selectedFontFamily, setSelectedFontFamily] = useState(
			initialArticleState.fontFamilyOption
		);
		const [selectedFontSize, setSelectedFontSize] = useState(
			initialArticleState.fontSizeOption
		);
		const [selectedFontColor, setSelectedFontColor] = useState(
			initialArticleState.fontColor
		);
		const [selectedBackgroundColors, setSelectedBackgroundColors] = useState(
			initialArticleState.backgroundColor
		);
		const [selectedContentWidthArr, setSelectedContentWidthArr] = useState(
			initialArticleState.contentWidth
		);

		const handleSubmit = (e: React.FormEvent) => {
			e.preventDefault();
			onApply({
				fontFamilyOption: selectedFontFamily,
				fontSizeOption: selectedFontSize,
				fontColor: selectedFontColor,
				backgroundColor: selectedBackgroundColors,
				contentWidth: selectedContentWidthArr,
			});
			onClose();
		};

		const handleReset = () => {
			setSelectedFontFamily(initialArticleState.fontFamilyOption);
			setSelectedFontSize(initialArticleState.fontSizeOption);
			setSelectedFontColor(initialArticleState.fontColor);
			setSelectedBackgroundColors(initialArticleState.backgroundColor);
			setSelectedContentWidthArr(initialArticleState.contentWidth);
			onApply(initialArticleState);
		};

		return (
			<aside
				ref={ref}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div style={{ marginBottom: 50 }}>
						<Text size={31} weight={800}>
							Задайте параметры
						</Text>
					</div>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={selectedFontFamily}
						onChange={setSelectedFontFamily}
					/>
					<div className={styles.fontSizeBlock}>
						<RadioGroup
							title='Размер шрифта'
							name='fontSize'
							options={fontSizeOptions}
							selected={selectedFontSize}
							onChange={setSelectedFontSize}
						/>
					</div>
					<div className={styles.fontColorBlock}>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={selectedFontColor}
							onChange={setSelectedFontColor}
						/>
					</div>
					<Separator />
					<div className={styles.backgroundColors}>
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={selectedBackgroundColors}
							onChange={setSelectedBackgroundColors}
						/>
					</div>
					<div className={styles.contentWidthArr}>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={selectedContentWidthArr}
							onChange={setSelectedContentWidthArr}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' onClick={handleReset} type='clear' />
						<Button title='Применить' type='apply' htmlType='submit' />
					</div>
				</form>
			</aside>
		);
	}
);
