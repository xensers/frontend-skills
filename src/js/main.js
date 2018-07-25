import './vendor';

/**
 * Анимация заполнения бланка
 */
function fillFormAnimate() {
	const elements = document.querySelectorAll('.info__sheet_item_text span');
	const hold = 1000;

	for (let index = elements.length - 1; index >= 0; index--) {
		let element = elements[index];
		let lastWidth = element.offsetWidth;

		element.style.width = '0';
		element.style.opacity = '1';
		element.style.transition = `width ${hold}ms linear`;

		setTimeout(() => {
			element.style.width = `${lastWidth}px`;
		}, index * hold);
	}
}

/**
 * Анимация отметки умений
 */
function checkboxAnimate() {
	const elements = document.querySelectorAll('.checkbox.chek-it');
	const hold = 500;

	for (let index = elements.length - 1; index >= 0; index--) {
		let element = elements[index];

		setTimeout(() => {
			element.classList.add('cheked');
		}, index * hold);
	}
}

/**
 * Анимация для секции "Мой уровень владения JavaScript"
 * @param {number} totalPercent  Уровень владения JS в процентах, целое число от 0 до 100
 * @param {boolean} offScale     Эффект зашкаливания значений, логический тип
 */
function jsSkillAnimate(totalPercent, offScale = false) {
	const elementСounter = document.querySelector('.skillJs__counter');
	const elementArrow = document.querySelector('.skillJs__meter_arrow');
	const elementWarning = document.querySelector('.skillJs__warning');
	const [colorYellow, colorGreen, colorBlue] = ['#ffc814', '#a3cd3b', '#0093d7'];
	let countMin = 0;
	let countMax = 999;
	let count = Number(elementСounter.innerHTML);
	let percent = count / countMax * 100;
	let degMin = -30;
	let degMax = 160;
	let deg = percent * 180 / 100 + degMin;
	let delay = 10;

	// Эффект зашкаливания
	if (offScale && percent >= totalPercent) {
		count -= 20;
		elementСounter.innerHTML = count;
		if (percent > 80) {
			elementWarning.innerHTML = 'Слишком большое ЧСВ!!!';
		}
	} else {
		elementWarning.innerHTML = '';
	}

	// Не допускаем выхода за допустимые пределы
	if (count < countMin) {
		count = countMin - 1;
	} else if (count > countMax) {
		count = countMax;
	}

	if (deg < degMin) {
		deg = degMin;
	} else if (deg > degMax) {
		deg = degMax;
	}

	// Обновление значений счетчика баллов и отклонения стрелки
	count++;
	elementСounter.innerHTML = count;
	elementArrow.setAttribute('transform', `rotate(${deg}, 130, 124)`);

	// Установка цвета для счетчика баллов
	if (percent > 0 && percent < 33) {
		elementСounter.style.color = colorYellow;
	} else if (percent > 33 && percent < 66) {
		elementСounter.style.color = colorGreen;
	} else {
		elementСounter.style.color = colorBlue;
	}

	// Рекурсия
	if (percent - 1 <= totalPercent && percent >= 0 && percent <= 100) {
		setTimeout(jsSkillAnimate, delay, totalPercent, offScale);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	setTimeout(fillFormAnimate, 1000);
	setTimeout(checkboxAnimate, 7000);
	setTimeout(jsSkillAnimate, 13000, 100, true);
});
