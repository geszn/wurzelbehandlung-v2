/* Array.includes Polyfill */
if (!Array.prototype.includes) {
	Object.defineProperty(Array.prototype, 'includes', {
		value: function (searchElement, fromIndex) {

			if (this == null) {
				throw new TypeError('"this" is null or not defined');
			}

			// 1. Let O be ? ToObject(this value).
			var o = Object(this);

			// 2. Let len be ? ToLength(? Get(O, "length")).
			var len = o.length >>> 0;

			// 3. If len is 0, return false.
			if (len === 0) {
				return false;
			}

			// 4. Let n be ? ToInteger(fromIndex).
			//    (If fromIndex is undefined, this step produces the value 0.)
			var n = fromIndex | 0;

			// 5. If n ≥ 0, then
			//  a. Let k be n.
			// 6. Else n < 0,
			//  a. Let k be len + n.
			//  b. If k < 0, let k be 0.
			var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

			function sameValueZero(x, y) {
				return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
			}

			// 7. Repeat, while k < len
			while (k < len) {
				// a. Let elementK be the result of ? Get(O, ! ToString(k)).
				// b. If SameValueZero(searchElement, elementK) is true, return true.
				if (sameValueZero(o[k], searchElement)) {
					return true;
				}
				// c. Increase k by 1.
				k++;
			}

			// 8. Return false
			return false;
		}
	});
}

window.staude = window.staude || {};

staude.wurzelbehandlung = staude.wurzelbehandlung || {
	timeDelayAnimationPart: 0.5,
};

var timeDelayAnimationPart = staude.wurzelbehandlung.timeDelayAnimationPart;

var classes = [
	'behandlung',
	'problem'
];

var descriptions = {
	'behandlung': {
		title: 'Wurzelbehandlung',
		subtitle: 'Traditionelle Behandlung',
		desc: '<p>Die engen Zahninnenräume werden mit zahnärztlichen Instrumenten geöffnet, mechanisch gereinigt und gespült, um Krankheitskeime und abgestorbenes Gewebe zu beseitigen.</p><p>Eine perfekte Sterilisation des Zahninnenraumes und der dauerhafte Verschluss gelingt auch bei großer Sorgfalt oft nicht.</p>',
		/*img: 'img/wurzelbehandlung.jpg'	*/
	},
	'problem': {
		title: 'Wurzelbehandlung',
		subtitle: 'Das Problem',
		desc: '<p>Ihre Zähne bestehen aus den sichtbaren Zahnkronen und den Zahnwurzeln. Innerhalb der Zähne befinden sich die Wurzelkanäle. Das sind enge Hohlräume im Innern der Wurzel. Sie werden von der Pulpa (Zahnnerv) ausgefüllt, die aus Bindegewebe, Nervenfasern, Blut- und Lymphgefäßen besteht.</p><p>Eine Wurzelkanalbehandlung muss eingeleitet werden, wenn eine Entzündung oder Infektion des Zahnnervs (Pulpa) vorliegt: Zum Beispiel nach tiefer Karies, wiederholten Behandlungen oder einem Riss des Zahnes oder der Wurzel.<br>Wird nicht behandelt, führt das zu Schmerzen und zum Absterben des Zahnnervs. Danach vermehren sich Bakterien im Zahninnenraum. Es kommt zu schmerzhaften Vereiterungen und später zur Zerstörung der umliegenden Kieferknochen.</p>',
		/*img: 'img/problem.jpg'*/
	}
};

function genericOn(cls) {
	var part = document.querySelectorAll('.' + cls);

	for (var i = 0; i < part.length; i++) {
		part[i].classList.remove('off');
		part[i].classList.add('on', 'active');
	}

	document.getElementById('title').textContent = descriptions[cls].title || '';
	document.getElementById('subtitle').textContent = descriptions[cls].subtitle || '';
	document.getElementById('description').innerHTML = descriptions[cls].desc || '';

	if ( cls === 'problem') {
		//document.getElementById('image').src = descriptions[cls].img || '';
		document.getElementById('fadeIn').style.display = "none";
		document.getElementById('containerImage').style.display = "block";
	} else {
		//document.getElementById('image').src = 'img/behandlung-2.jpg' || '';
		document.getElementById('fadeIn').style.display = "block";
		document.getElementById('containerImage').style.display = "none";
	}


	//Setting slide in mobile version
	setSlide(cls);
}

function mkListenerOn(cls) {
	return function (e) {
		allOff();
		genericOn(cls);
	}
}

function allOff() {
	classes.forEach( part => {
		elems = document.querySelectorAll('.' + part);
		elems.forEach(e => {
			e.classList.remove('on', 'active');
			e.classList.add('off');
		});
	});
}

var currentlySelectedPart;
function mkListenerOnByClick(cls) {
	return function (e) {
		allOff();
		currentlySelectedPart = cls;
		genericOn(cls);
	}
}

/* Mobile Navigation */
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
	showSlides(slideIndex += n);
}

function currentSlide(n) {
	showSlides(slideIndex = n);
}

function setSlide(cls) {
	var slides = document.getElementsByClassName("nav-item");
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	var pos = classes.indexOf(cls);
	slides[pos].style.display = "block";
}

function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("nav-item");

	if (n > slides.length) { slideIndex = 1 }
	if (n < 1) { slideIndex = slides.length }

	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
		var classPartOff = classes[i];
		allOff();
	}

	slides[slideIndex - 1].style.display = "block";
	var children = slides[slideIndex - 1].getElementsByTagName('button');
	children[0].click();
	var classPartOn = classes[slideIndex - 1];
	mkListenerOnByClick(classPartOn);
}

/*
function initial_load() {
	document.getElementById('wurzelbehandlung').style.zIndex = "1";
}
*/

function wurzelbehandlung_init_events() {
	for (var j = 0; j < classes.length; j++) {
		var elems = document.querySelectorAll('.' + classes[j] + ', .' + classes[j] + '-text, .' + classes[j] + '-timeline');
		for (var i = 0; i < elems.length; i++) {
			elems[i].addEventListener('mouseleave', allOff());
			elems[i].addEventListener('click', mkListenerOnByClick(classes[j]));
		}
	}
	genericOn('behandlung');
	// initial_load();
}
