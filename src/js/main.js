import './vendor';

/**
 * Анимация заполнения бланка
 */
function fillFormAnimate() {
	const $target = $('.info__sheet_item_text span');
	const hold = 1000;

	$.each($target, (index, element) => {
		setTimeout(() => {
			let $element = $(element);
			let lastWidth = $element.css('width');

			$element.css('width', '0');
			$element.css('opacity', '1');
			$element.animate({
				width: lastWidth,
			}, hold, 'linear');
		}, index * hold);
	});
}

/**
 * Анимация отметки умений
 */
function checkboxAnimate() {
	const $target = $('.checkbox.chek-it');
	const hold = 500;

	$.each($target, (index, element) => {
		setTimeout(() => {
			$(element).addClass('cheked');
		}, index * hold);
	});
}

/**
 * Анимация для секции "Мой уровень владения JavaScript"
 * @param {number} totalPercent  Уровень владения JS в процентах, целое число от 0 до 100
 * @param {boolean} offScale     Эффект зашкаливания значений, логический тип
 */
function jsSkillAnimate(totalPercent, offScale = false) {
	const $elementСounter = $('.skillJs__counter');
	const $elementArrow = $('.skillJs__meter_arrow');
	const color = ['#ffc814', '#a3cd3b', '#0093d7'];
	let countMin = 0;
	let countMax = 999;
	let count = Number($elementСounter.html());
	let percent = count / countMax * 100;
	let degMin = -30;
	let degMax = 160;
	let deg = percent * 180 / 100 + degMin;
	let delay = 10;

	// Эффект зашкаливания
	if (offScale && percent >= totalPercent) {
		$elementСounter.html(count -= 20);
		if (percent > 80) {
			$('.skillJs__warning').html('Слишком большое ЧСВ!!!');
		}
	} else {
		$('.skillJs__warning').html('');
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
	$elementСounter.html(count += 1);
	$elementArrow.attr({
		transform: `rotate(${deg}, 130, 124)`,
	});

	// Установка цвета для счетчика баллов
	if (percent > 0 && percent < 33) {
		$elementСounter.css({
			color: color[0],
		});
	} else if (percent > 33 && percent < 66) {
		$elementСounter.css({
			color: color[1],
		});
	} else {
		$elementСounter.css({
			color: color[2],
		});
	}

	// Рекурсия
	if (percent - 1 <= totalPercent && percent >= 0 && percent <= 100) {
		setTimeout(jsSkillAnimate, delay, totalPercent, offScale);
	}
}

jQuery(document).ready(() => {
	setTimeout(fillFormAnimate, 500);
	setTimeout(checkboxAnimate, 7000);
	setTimeout(jsSkillAnimate, 13000, 100, true);
});
