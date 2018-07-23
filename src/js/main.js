import './vendor';

function fillFormAnimate() {
	const $target = $('.info__sheet_item_text span');
	const hold = 1000;

	$.each($target, (index, element) => {
		setTimeout(() => {
			let $element = $(element);
			let lastWidth = $element.css('width');

			$element.css('width', '0');
			$element.css('opacity', '1');
			$element.css({
				width: lastWidth,
				transition: 'width 5s',
			});
		}, index * hold);
	});
}

function checkboxAnimate() {
	const $target = $('.checkbox.chek-it');
	const hold = 500;

	setTimeout(() => {
		$.each($target, (index, element) => {
			setTimeout(() => {
				$(element).addClass('cheked');
			}, index * hold);
		});
	}, 8000);
}

function jsSkillAnimate(totalPercent) {
	const $elementСounter = $('.skillJs__counter');
	const $elementArrow = $('.skillJs__meter_arrow');
	let arrowMin = -30;
	let countMax = 999;
	let delay = 10;
	let count = Number($elementСounter.html());
	let percent = count / countMax * 100;
	let deg = percent * 180 / 100 + arrowMin;

	$elementArrow.attr({
		transform: `rotate(${deg})`,
	});

	if (percent > 0 && percent < 33) {
		$elementСounter.css({
			color: '#ffc814',
		});
	} else if (percent > 33 && percent < 66) {
		$elementСounter.css({
			color: '#a3cd3b',
		});
	} else {
		$elementСounter.css({
			color: '#0093d7',
		});
	}

	$elementСounter.html(count += 1);

	if (percent >= totalPercent) {
		$elementСounter.html(count -= 20);
	}

	if (count <= countMax) {
		setTimeout(jsSkillAnimate, delay, totalPercent);
	}
}

jQuery(document).ready(() => {
	fillFormAnimate();
	checkboxAnimate();
	setTimeout(jsSkillAnimate, 13000, 40);
});
