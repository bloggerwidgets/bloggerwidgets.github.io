var postWidgety = localStorage.postWidgety ? JSON.parse(localStorage.postWidgety) : [];

const generator = document.querySelector('.generator');
const awans = document.getElementById('zaaw-rozw');

var trzymak = 0;

window.oncontextmenu = function(e) {
	e.preventDefault();
	return false;
}

generator.querySelectorAll('input[type="range"].numeromat').forEach(inp => {
	inp.oninput = function() {
		this.wysw.textContent = this.value;
		if (Number(this.value) <= Number(this.min)) {
			this.minus.classList.add('nieaktywny');
		} else {
			this.minus.classList.remove('nieaktywny');
		}
		
		if (Number(this.value) >= Number(this.max))  {
			this.plus.classList.add('nieaktywny');
		} else {
			this.plus.classList.remove('nieaktywny');
		}
		
		if (this.rozw) {
			if (this.value == '0') {
				this.rozw.style.maxHeight = '0px';
			} else {
				this.rozw.style.maxHeight = this.rozw.wys + 'px';
			}
		}
		let proca = 100 * (this.value - this.min) / (this.max - this.min);
		this.style.background = 'linear-gradient(to right, #808080 0%, #808080 ' + proca + '%, white ' + proca + '%, white 100%)';
		this.pokaz.style.left = 33 - (this.wysw.offsetWidth / 2) + ((this.offsetWidth - 22) * proca / 100) + 'px';
	}
		
		31
		
	function napierdalaj() {
		if (inp.plus.classList.contains('wcisniety') && Number(inp.value) < max) {
			trzymak += 50;
			setTimeout(napierdalaj, 50);
			if (trzymak > 400) {
				inp.value = Number(inp.value) + krok;
				inp.oninput();
				formularz.oninput();
			}
		}
		if (inp.minus.classList.contains('wcisniety') && Number(inp.value) > min) {
			trzymak += 50;
			setTimeout(napierdalaj, 50);
			if (trzymak > 400) {
				inp.value = Number(inp.value) - krok;
				inp.oninput();
				formularz.oninput();
			}
		}
	}
		
	let rod = document.createElement('div');
	rod.setAttribute('class', 'numerod');
	inp.parentNode.insertBefore(rod, inp);
		
	let krok = Number(inp.getAttribute('step'));
	let min = Number(inp.min);
	let max = Number(inp.max);
		
	inp.minus = document.createElement('span');
	rod.appendChild(inp.minus);
	inp.minus.setAttribute('class', 'minus');
	inp.minus.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>';
		
	rod.appendChild(inp);
		
	inp.plus = document.createElement('span');
	rod.appendChild(inp.plus);
	inp.plus.setAttribute('class', 'plus');
	inp.plus.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>';
		
	let dol = document.createElement('div');
	dol.setAttribute('class', 'numedol');
	if (rod.nextSibling) {
		rod.parentNode.insertBefore(dol, rod.nextSibling);
	} else {
		rod.parentNode.appendChild(dol);
	}
		
	inp.pokaz = document.createElement('span');
	dol.appendChild(inp.pokaz);
	inp.pokaz.setAttribute('class', 'inPokaz');
		
	inp.wysw = document.createElement('span');
	inp.pokaz.appendChild(inp.wysw);
	inp.wysw.setAttribute('class', 'wyswietlacz');
	inp.wysw.innerHTML = inp.value;
	inp.pokaz.appendChild(document.createTextNode(inp.getAttribute('jedn')));
		
	inp.minus[window.matchMedia('(pointer:coarse)').matches ? 'ontouchstart' : 'onmousedown'] = function() {
		trzymak = 0;
		this.classList.add('wcisniety');
		if (!this.classList.contains('nieaktywny')) {
			inp.value = Number(inp.value) - krok;
			inp.oninput();
			formularz.oninput();
			setTimeout(napierdalaj, 10);
		}
	}
		
	inp.plus[window.matchMedia("(pointer:coarse)").matches ? 'ontouchstart' : 'onmousedown'] = function() {
		trzymak = 0;
		this.classList.add('wcisniety');
		if (!this.classList.contains('nieaktywny')) {
			inp.value = Number(inp.value) + krok;
			inp.oninput();
			formularz.oninput();
			setTimeout(napierdalaj, 10);
		}
	}	
	inp.oninput();	
});

window.addEventListener(window.matchMedia("(pointer:coarse)").matches ? 'touchend' : 'mouseup', function() {
	let wcisk = generator.querySelector('.wcisniety');
	if (wcisk) wcisk.classList.remove('wcisniety');
});

generator.querySelectorAll('.zawijka').forEach(r => {
	r.wys = r.offsetHeight + (r.offsetHeight / 10);
	if (r.getAttribute('start') === 'schowaj') {
		r.style.maxHeight = '0px';
	} else {
		r.style.maxHeight = r.wys + 'px';
	}
});

generator.querySelectorAll('[rozwin]').forEach(r => {
	r.rozw = generator.querySelector('div.zawijka[for="' + r.getAttribute('rozwin') + '"]');
	if (!r.classList.contains('numeromat')) {
		r.oninput = function() {
			if (r.value === 'none' || r.value === 'vertical') {
				r.rozw.style.maxHeight = '0px';
			} else { 
				r.rozw.style.maxHeight = r.rozw.wys + 'px';
			}
		}
	}
});

zaawansowane.onclick = function() {
	if (awans.style.maxHeight === '0px') {
		function generoz() {
			setTimeout(function() {
				if (generator.scrollTop < generator.scrollHeight - generator.offsetHeight) {
					generator.scrollTop = generator.scrollHeight;
					generoz();
				}
			}, 50);
		}
		awans.style.maxHeight = awans.wys + 'px';
		generoz();
	} else if (!this.classList.contains('klikniete')) {
		awans.style.maxHeight = '0px';
	}
}

awans.querySelectorAll('input').forEach(inp => {
	inp.oninput = function() {
		if (awans.querySelector('input[type="checkbox"]:checked') || blogURL.value) {
			zaawansowane.classList.add('klikniete');
			awans.style.maxHeight = awans.wys + 'px';
		} else {
			zaawansowane.classList.remove('klikniete');
		}
	}
})

brakObrazka.src = noImage.value;
brakObrazka.onerror = function() {
	this.style.display = 'none';
	fotInf.style.display = 'block';
	fotInf.textContent = 'I can\'t load image';
	fotInf.title = 'I can\'t load this image... 😟';
	noImage.disabled = false;
}

noImage.onchange = function() {
	this.disabled = true;
	sprawdzObraz.classList.add('nieaktywny');
	sprawdzObraz.setAttribute('tooltip', '');
	brakObrazka.style.display = 'none';
	fotInf.style.display = 'block';
	fotInf.innerHTML = '<div class="ladowanie" style="margin-top:10px;"></div>';
	fotInf.title = 'loading image...';
	brakObrazka.src = this.value;
}

brakObrazka.onload = function() {
	fotInf.style.display = 'none';
	fotInf.title = '';
	brakObrazka.style.display = 'block';
	noImage.disabled = false;
}

noImage.oninput = function() {
	sprawdzObraz.classList.remove('nieaktywny');
	sprawdzObraz.setAttribute('tooltip', 'Validate the photo URL');
}

przywrocFoto.onclick = function() {
	noImage.value = domyslne.noImage;
	brakObrazka.src = domyslne.noImage;
	jebKodem();
}

wlasnyObr.oninput = function(e) {
	let plik = e.target.files[0];
	if (plik.type.match('image.*')) {
		let reader = new FileReader();
		reader.onload = function() {
			let obraz = new Image();
			obraz.src = this.result;
			obraz.onload = function() {
				if (obraz.naturalWidth > 60 || obraz.naturalHeight > 60) {
					let nowyWidth = obraz.naturalWidth >= obraz.naturalHeight ? 60 : Math.round(obraz.naturalWidth / (obraz.naturalHeight / 60));
					let nowyHeight = obraz.naturalHeight >= obraz.naturalWidth ? 60 : Math.round(obraz.naturalHeight / (obraz.naturalWidth / 60));
					let kanwas = document.createElement('canvas');
					let kontekst = kanwas.getContext('2d');
					kanwas.width = nowyWidth;
					kanwas.height = nowyHeight;
					kontekst.drawImage(obraz, 0, 0, kanwas.width, kanwas.height);
					let pomniejszonyURI = kanwas.toDataURL('image/png');
					noImage.value = pomniejszonyURI;
					brakObrazka.src = pomniejszonyURI;
				} else {
					noImage.value = obraz.src;
					brakObrazka.src = obraz.src;
				}
				wlasnyObr.value = '';
				jebKodem();
			}
		}
		reader.readAsDataURL(plik);
	} else {
		alert('It is not an image...');
	}
}

const dt = new Date();

const post = {
	'tytul' : 'Random Post',
	'obrazek' : 'przykladowe-zdjecie.png',
	'autor' : 'Author',
	'data' : dt.getFullYear() + '-' + ('0' + (dt.getMonth() + 1)).slice(-2) + '-' + ('0' + dt.getDate()).slice(-2),
	'komenty' : 5,
	'tagi' : ['label1', 'label2', 'label3'],
	'wypis' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}

function podgladaj() {
	while (podglad.firstChild) podglad.removeChild(podglad.firstChild);
	let elem = document.createElement('div');
	elem.setAttribute('class', 'xRandomPost');
		
	let obStyl = 'display:inline-flex;align-items:center;justify-content:center;background-image:linear-gradient(to bottom right, #ff9d9d, #c40000);overflow:hidden;';
	let margen;
	if (showTitle.value !== 'none' || (showInfo.value !== 'none' && (showAuthor.checked || showComments.checked || showDate.checked)) || showLabels.value !== 'none' || excerptLength.value > 0) {
		margen = true;
	} else {
		margen = false;
	}
	if (showImage.value === 'center') {
		obStyl += 'margin:0 auto ' + (margen ? '5px' : '0') + ';';
	} else {
		obStyl += 'float:' + showImage.value + ';margin:' + (showImage.value === 'right' ? '0 0 ' + (margen ? '5px 5px' : '0 0') + ';' : '0 ' + (margen ? '5px 5px' : '0 0') + ' 0;');
	}
	obStyl += 'width:' + imageSize.value + 'px;height:' + imageSize.value + 'px;max-width:100%;max-height:' + (display.value === 'horizontal' ? Number(boxWidth.value) - (2 * (Number(boxPadding.value) + Number(borderWidth.value))) : podglad.clientWidth - 14 - (2 * (Number(boxPadding.value) + Number(borderWidth.value)))) + 'px;padding:0;border:0;border-radius:' + imageRounding.value + '%;';
	let margines = Math.round(textSize.value / 5);
		
	elem.style.border = borderWidth.value + 'px ' + borderStyle.value + ' ' + borderColor.value;
	elem.style.fontSize = textSize.value + 'px';
	elem.style.color = textColor.value;
	elem.style.background = kolorTla();
	elem.style.padding = boxPadding.value + 'px';
	elem.style.lineHeight = lineHeight.value;
	elem.style.cursor = 'pointer';
	elem.style.fontFamily = textFont.value;
	elem.style.overflow = 'hidden';
	elem.style.textDecoration = 'none';
	elem.style.borderRadius = boxRounding.value + 'px';
	if (display.value === 'horizontal') {
		elem.style.display = 'inline-block';
		elem.style.width = boxWidth.value + 'px';
	} else {
		elem.style.display = 'block';
	}
	elem.title = post.tytul;
			
	let html = '';
			
	if (showImage.value !== 'none') html += '<div style="' + obStyl + '"><img src="' + post.obrazek + '" style="width:' + (imageSize.value - Math.round(imageSize.value / 7)) + 'px;"></div>';
	if (showTitle.value !== 'none') html += '<div style="text-align:' + showTitle.value + ';font-size:' + titleSize.value + 'px;' + (boldTitle.checked ? 'font-weight:bold;' : '') + 'color:' + titleColor.value + ';font-family:' + titleFont.value + ';' + ((showInfo.value !== 'none' && (showAuthor.checked || showDate.checked || showComments.checked)) || (showLabels.value !== 'none' && post.tagi.length) || excerptLength.value > 0 ? 'margin-bottom:' + Math.round(titleSize.value / 5) + 'px;' : '') + '">' + post.tytul + '</div>';
	if (showInfo.value !== 'none' && (showAuthor.checked || showDate.checked || showComments.checked)) {
		html += '<div style="text-align:' + showInfo.value + ';' + ((showLabels.value !== 'none' && post.tagi.length) || excerptLength.value > 0 ? 'margin-bottom:' + margines + 'px;' : '') + '">';
				
		if (showComments.checked) html += '<span style="display:inline-flex;align-items:center;margin:2px;' + (showAuthor.checked || showDate.checked ? 'margin-right:' + textSize.value + 'px;' : '') + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="height:' + (textSize.value - 2) + 'px;margin-right:3px;"><path fill="currentColor" d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"></path></svg>' + post.komenty + '</span>';
			
		if (showAuthor.checked) html += '<span style="display:inline-flex;align-items:center;margin:2px;' + (showDate.checked ? 'margin-right:' + textSize.value + 'px;' : '') + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="height:' + (textSize.value - 2) + 'px;margin-right:' + (textSize.value / 3) + 'px;"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>' + post.autor + '</span>';
			
		if (showDate.checked) html += '<span style="display:inline-flex;align-items:center;margin:2px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="height:' + (textSize.value - 2) + 'px;margin-right:' + (textSize.value / 3) + 'px;"><path fill="currentColor" d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path></svg>' + post.data + '</span>';
				
		html += '</div>';
	}
			
	if (showLabels.value !== 'none' && post.tagi.length) {
		html += '<div style="text-align:' + showLabels.value + ';' + (excerptLength.value > 0 ? 'margin-bottom:' + margines + 'px;': '') + '">';
			
		for (let i=0; i<post.tagi.length && i<numberOfLabels.value; i++) {
			html += '<span style="display:inline-flex;align-items:center;' + (kolorTla() === 'transparent' ? 'border:1px solid ' + textColor.value + ';color:' + textColor.value + ';' : 'background:' + textColor.value + ';color:' + boxBackground.value + ';') + 'padding:1px 3px;margin:2px ' + (i < post.tagi.length - 1 ? '4px' : '0') + ' 2px ' + (i > 0 ? '4px' : '0') + ';border-radius:4px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height:' + (textSize.value - 2) + 'px;margin-right:3px;"><path fill="currentColor" d="M0 252.118V48C0 21.49 21.49 0 48 0h204.118a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882L293.823 497.941c-18.745 18.745-49.137 18.745-67.882 0L14.059 286.059A48 48 0 0 1 0 252.118zM112 64c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z"></path></svg>' + post.tagi[i] + '</span>';
		}
				
		html += '</div>';
	}
			
	if (excerptLength.value > 0) html += '<div style="text-align:' + excerptAlign.value + '">' + post.wypis.substring(0, excerptLength.value) + '...</div>';
			
	elem.innerHTML = html;
			
	podglad.appendChild(elem);
}

const wartosci = ['widgetsTitle', 'numberOfPosts', 'label', 'display', 'boxWidth', 'boxRounding', 'boxBackground', 'boxPadding', 'lineHeight', 'borderWidth', 'borderStyle', 'borderColor', 'showImage', 'imageSize', 'imageRounding', 'noImage', 'showTitle', 'titleFont', 'titleSize', 'boldTitle', 'titleColor', 'showInfo', 'showAuthor', 'showComments', 'showDate', 'showLabels', 'numberOfLabels', 'excerptLength', 'excerptAlign', 'textFont', 'textSize', 'textColor', 'blogURL', 'hideOnHome', 'hideOnPosts', 'hideOnStatic', 'hideOnLabel', 'hideOnSearch', 'hideOnArchive', 'kp'];

var domyslne = {};

wartosci.forEach(w => {
	if (w === 'boldTitle' || w === 'showAuthor' || w === 'showComments' || w === 'showDate' || w === 'hideOnHome' || w === 'hideOnPosts' || w === 'hideOnStatic' || w === 'hideOnLabel' || w === 'hideOnSearch' || w === 'hideOnArchive') {
		domyslne[w] = document.getElementById(w).checked ? true : false;
	} else if (w === 'boxBackground') {
		domyslne[w] = kolorTla();
	} else {
		domyslne[w] = document.getElementById(w).value;
	}
});

function generujKod() {
	let kod = '<script numberOfPosts="' + numberOfPosts.value + '" label="' + (label.value ? encodeURIComponent(label.value) : 'none') + '" display="' + display.value + '"';
	if (display.value === 'horizontal') {
		kod += ' boxWidth="' + boxWidth.value + '"';
	}
	kod += ' boxRounding="' + boxRounding.value + '" boxBackground="' + kolorTla() + '" boxPadding="' + boxPadding.value + '" lineHeight="' + lineHeight.value + '" borderWidth="' + borderWidth.value + '"';
	if (borderWidth.value !== '0') {
		kod += ' borderStyle="' + borderStyle.value + '" borderColor="' + borderColor.value + '"';
	}
	kod += ' showImage="' + showImage.value + '"';
	if (showImage.value !== 'none') {
		kod += ' imageSize="' + imageSize.value + '" imageRounding="' + imageRounding.value + '" noImage="' + (noImage.value ? encodeURIComponent(noImage.value) : domyslne.noImage) + '"';
	}
	kod += ' showTitle="' + showTitle.value + '"';
	if (showTitle.value !== 'none') {
		kod += ' titleFont="' + titleFont.value + '" titleSize="' + titleSize.value + '" boldTitle="' + (boldTitle.checked ? 'true' : 'false') + '" titleColor="' + titleColor.value + '"';
	}
	let inPok = showInfo.value === 'none' || (!showAuthor.checked && !showComments.checked && !showDate.checked) ? false : true;
	kod += ' showInfo="' + (inPok ? showInfo.value : 'none') + '"';
	if (inPok) {
		kod += ' showAuthor="' + (showAuthor.checked ? 'true' : 'false') + '" showComments="' + (showComments.checked ? 'true' : 'false') + '" showDate="' + (showDate.checked ? 'true' : 'false') + '"';
	}
	kod += ' showLabels="' + showLabels.value + '"';
	if (showLabels.value !== 'none') {
		kod += ' numberOfLabels="' + numberOfLabels.value + '"';
	}
	kod += ' excerptLength="' + excerptLength.value + '"';
	if (excerptLength.value !== '0') {
		kod += ' excerptAlign="' + excerptAlign.value + '"';
	}
	kod += ' textFont="' + textFont.value + '" textSize="' + textSize.value + '" textColor="' + textColor.value + '"';
	
	if (testujURL()) kod += ' blogURL="' + encodeURIComponent(blogURL.value) + '"';

	if (awans.querySelector('input[type="checkbox"]:checked')) {
		let kap = '';
		if (hideOnHome.checked) kap += 'home,';
		if (hideOnPosts.checked) kap += 'post,';
		if (hideOnStatic.checked) kap += 'static,';
		if (hideOnLabel.checked) kap += 'label,';
		if (hideOnSearch.checked) kap += 'search,';
		if (hideOnArchive.checked) kap += 'archive,';
		kap = kap.substring(0, kap.length-1);
		kod += ' hide="' + kap + '"'
	}
	kod += ' async src="https://cdn.jsdelivr.net/gh/bloggerwidgets/scripts@1.1.6/randomposts.js"><\/script>';
	return kod;
}

widgetsTitle.oninput = function() {
	tytulWidzetu.value = this.value;
}

function jebKodem() {
	let kod = generujKod();
	kodWidzetu.value = kod;
	tekstwidzetu.value = kod;
}

podgladaj();
jebKodem();
tytulWidzetu.value = widgetsTitle.value;

label.oninput = function() {
	if (this.value && post.tagi.indexOf(this.value) < 0) {
		if (post.tagi[0] === 'label1') {
			post.tagi.splice(0, 0, label.value);
		} else {
			post.tagi[0] = this.value;
		}
	} else {
		if (post.tagi[0] !== 'label1') {
			post.tagi.splice(0, 1);
		}
	}
}

formularz.oninput = function() {
	podgladaj();
	jebKodem();
}

menu.querySelectorAll('.wysuwany').forEach(op => {
	op.onclick = function(e) {
		if (!this.querySelector('.wysun').contains(e.target)) {
			this.classList.toggle('klik');
			if (this.id === 'zapisz' && this.classList.contains('klik')) {
				nazwaDoZapisu.focus();
			}
		}
	}
	
	let zam = document.createElement('span');
	zam.setAttribute('class', 'zamknij');
	zam.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>';
	zam.title = 'Close';
	zam.onclick = function() {
		op.classList.remove('klik');
	}
	op.querySelector('.wysun').appendChild(zam);
	
});

window.addEventListener('mousedown', function(e) {
	let wysuniety = document.querySelector('.wysuwany.klik');
	if (wysuniety && !wysuniety.contains(e.target)) {
		wysuniety.classList.remove('klik');
	}
});

function pokInfo(txt, elm) {
	let i = document.createElement('span');
	i.setAttribute('class', 'kopInfo');
	i.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>' + txt;
	elm.appendChild(i);
	setTimeout(function() {
		i.classList.add('poka');
	}, 5);
	setTimeout(function() {
		i.classList.remove('poka');
		setTimeout(function() {
			i.remove();
		}, 700);
	}, 3000);
}

skopiuj.onclick = function() {
	kodWidzetu.select();
	document.execCommand('copy');
	pokInfo('Copied', this)
}

kodWidzetu.onclick = function() {
	this.select();
	document.execCommand('copy');
}

skopiujLinka.onclick = function() {
	document.getElementById('adres-strony').select();
	document.execCommand('copy');
	pokInfo('Copied', this)
}

document.getElementById('adres-strony').onclick = function() {
	this.select();
	document.execCommand('copy');
}

function wyswietlZapisy() {
	while (zapisane.firstChild) zapisane.removeChild(zapisane.firstChild);
	if (postWidgety.length) {
		postWidgety.sort((a, b) => b.data - a.data);
		postWidgety.forEach(z => {
			let zap = document.createElement('div');
			zap.setAttribute('class', 'zapisanyWidget');
			zapisane.appendChild(zap);
			let zapTxt = document.createElement('nazwa');
			zapTxt.innerHTML = z.nazwa;
			zap.appendChild(zapTxt);
			let dataWid = new Date(z.data);
			zapTxt.title = '📅' + ('0' + dataWid.getDate()).slice(-2) + '.' + ('0' + (dataWid.getMonth() + 1)).slice(-2) + '.' + dataWid.getFullYear() + ' 🕒' + ('0' + dataWid.getHours()).slice(-2) + ':' + ('0' + dataWid.getMinutes()).slice(-2);
			zapTxt.onclick = function(e) {
				przywrocWidget(z);
				wczytaj.classList.remove('klik');
			}
			let usun = document.createElement('span');
			zap.appendChild(usun);
			usun.setAttribute('class', 'usunZap');
			usun.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>';
			usun.title = 'Delete this widget';
			usun.onclick = function() {
				if (confirm('Are you sure you want to remove the "' + z.nazwa + '" widget?')) {
					postWidgety = postWidgety.filter(r => r.nazwa !== z.nazwa);
					localStorage.postWidgety = JSON.stringify(postWidgety);
					wyswietlZapisy();
				}
			}
		});
	} else {
		zapisane.innerHTML = '<div style="padding:5px;"><svg style="height:50px;float:left;margin:0 10px 5px 0;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 504 512"><g><path fill="#ffff9d" d="M456,160c-44.1,0-80-35.4-80-79,0-4.41.3-14.2,8.1-32.2A246.82,246.82,0,0,0,248,8C111,8,0,119,0,256S111,504,248,504,496,393,496,256a247.08,247.08,0,0,0-20.5-98.61A83.3,83.3,0,0,1,456,160ZM272.2,223.4c3.1-42.09,32-71.4,55.8-71.4s52.7,29.31,56,71.4c.7,8.6-10.8,12-14.9,4.5l-9.5-17c-7.7-13.69-19.2-21.59-31.5-21.59s-23.8,7.9-31.5,21.59l-9.5,17c-4.1,7.43-15.6,4-14.9-4.48Zm-160,0c3.1-42.09,32-71.4,55.8-71.4s52.7,29.31,56,71.4c.7,8.6-10.8,12-14.9,4.5l-9.5-17c-7.7-13.69-19.2-21.59-31.5-21.59s-23.8,7.9-31.5,21.59l-9.5,17c-4.2,7.43-15.6,4-14.9-4.48ZM391.8,338.72C382.5,393.72,308.6,432,248,432s-134.5-38.3-143.8-93.3a16,16,0,0,1,20.7-17.9C155.1,330.51,200,336,248,336s92.9-5.5,123.1-15.19a16.05,16.05,0,0,1,20.7,17.92Z"></path><path fill="#8989ff" d="M462.4,3.2a8,8,0,0,0-11.2-1.6h0a7.58,7.58,0,0,0-1.6,1.6C436.5,20.59,408,61,408,81c0,26,21.5,47,48,47s48-21,48-47C504,61,475.5,20.59,462.4,3.2ZM168,152c-23.8,0-52.7,29.31-55.8,71.4-.7,8.5,10.7,11.91,14.9,4.5l9.5-17c7.7-13.69,19.2-21.59,31.5-21.59s23.8,7.9,31.5,21.59l9.5,17c4.1,7.5,15.6,4.1,14.9-4.5-3.3-42.07-32.2-71.4-56-71.4Zm160,0c-23.8,0-52.7,29.31-55.8,71.4-.7,8.5,10.8,11.91,14.9,4.5l9.5-17c7.7-13.69,19.2-21.59,31.5-21.59s23.8,7.9,31.5,21.59l9.5,17c4.1,7.5,15.6,4.1,14.9-4.5C380.7,181.31,351.8,152,328,152Z"></path></g></svg>You have no saved widgets...</div><div style="clear:both"></div>';
	}
}

nazwaDoZapisu.oninput = function() {
	if (this.value) {
		zapiszWidzeta.classList.remove('nieaktywny');
		pobierzWidzeta.classList.remove('nieaktywny');
	} else {
		zapiszWidzeta.classList.add('nieaktywny');
		pobierzWidzeta.classList.add('nieaktywny');
	}
}

nazwaDoZapisu.onkeypress = function(event) {
	if (event.keyCode == 13 && !zapiszWidzeta.classList.contains('nieaktywny')) {
		zrobZapis();
	}
}

zapiszWidzeta.onclick = function() {
	if (!this.classList.contains('nieaktywny')) {
		zrobZapis();
	}
}

function zrobZapis() {
	let nzw = nazwaDoZapisu.value;
	let licznik = 1;
	while (postWidgety.filter(a => a.nazwa === nzw).length > 0) {
		licznik++;
		nzw = nazwaDoZapisu.value + ' (' + licznik + ')';
	}
	let obi = {
		'nazwa' : nzw,
		'data' : Date.now()
	}
		
	wartosci.forEach(w => {
		if (w === 'boldTitle' || w === 'showAuthor' || w === 'showComments' || w === 'showDate' || w === 'hideOnHome' || w === 'hideOnPosts' || w === 'hideOnStatic' || w === 'hideOnLabel' || w === 'hideOnSearch' || w === 'hideOnArchive') {
			obi[w] = document.getElementById(w).checked ? true : false;
		} else if (w === 'boxBackground') {
			obi[w] = kolorTla();
		} else if (w === 'blogURL') {
			obi.blogURL = testujURL() ? blogURL.value : '';
		} else {
			obi[w] = document.getElementById(w).value;
		}
	});
		
	postWidgety.push(obi);
	localStorage.postWidgety = JSON.stringify(postWidgety);
	wyswietlZapisy();
		
	wczytaj.classList.add('podswietl');
	setTimeout(function() {
		wczytaj.classList.remove('podswietl');
	}, 2400);
	setTimeout(function() {
		zapisz.classList.remove('klik');
	}, 1000);
		
		
	pokInfo('Saved', zapiszWidzeta);
		
	nazwaDoZapisu.value = '';
	nazwaDoZapisu.blur();
	zapiszWidzeta.classList.add('nieaktywny');
	pobierzWidzeta.classList.add('nieaktywny');
}

function przywrocWidget(obi) {
	wartosci.forEach(w => {
		if (w === 'boldTitle' || w === 'showAuthor' || w === 'showComments' || w === 'showDate' || w === 'hideOnHome' || w === 'hideOnPosts' || w === 'hideOnStatic' || w === 'hideOnLabel' || w === 'hideOnSearch' || w === 'hideOnArchive') {
			document.getElementById(w).checked = (typeof obi[w] == 'boolean') ? obi[w] : domyslne[w];
		} else if (w === 'boxBackground') {
			if (obi[w] === 'transparent') {
				boxBackground.value = domyslne.boxBackground;
				document.querySelector('.tloWybor[wartosc="kolor"]').classList.remove('zaznaczony');
				document.querySelector('.tloWybor[wartosc="transparent"]').classList.add('zaznaczony');
			} else {
				boxBackground.value = obi[w];
				document.querySelector('.tloWybor[wartosc="transparent"]').classList.remove('zaznaczony');
				document.querySelector('.tloWybor[wartosc="kolor"]').classList.add('zaznaczony');
			}
		} else if (w === 'label') {
			label.value = obi.label === 'none' ? '' : obi.label;
		} else {
			document.getElementById(w).value = (typeof obi[w] == 'string' || typeof obi[w] == 'number') ? obi[w] : domyslne[w];
		}
	});
	if (!testujURL()) blogURL.value = '';
	blogURL.onchange();
	oKurwa.style.background = podglad.style.background = kp.value;
	generator.querySelectorAll('[rozwin]:not(.numeromat)').forEach(r => {
		if (r.value === 'none' || r.value === 'vertical') {
			r.rozw.style.maxHeight = 0;
		} else {
			r.rozw.style.maxHeight = r.rozw.wys + 'px';
		}
	});
	
	generator.querySelectorAll('input[type="range"].numeromat').forEach(inp => {
		inp.oninput();
	});
	
	if (awans.querySelector('input[type="checkbox"]:checked') || blogURL.value) {
		awans.style.maxHeight = awans.wys + 'px';
		zaawansowane.classList.add('klikniete');
	} else {
		awans.style.maxHeight = '0px';
		zaawansowane.classList.remove('klikniete');
	}
	label.oninput();
	podgladaj();
	jebKodem();
	brakObrazka.src = noImage.value;
}

function skryptNaObiekt(skr) {
	if (skr.split('<script ').length !== 2 || skr.split('</script>').length !== 2) {
		return false;
	} else {
		let ile = 0;
		let obi = {}
		wartosci.forEach(w => {
			if (skr.indexOf(w + '="') >= 8) {
				let wartosc = skr.split(w + '="')[1].split('"')[0];
				if (w === 'label' || w === 'noImage' || w === 'blogURL') wartosc = decodeURIComponent(wartosc);
				if (wartosc === 'true') wartosc = true;
				if (wartosc === 'false') wartosc = false;
				obi[w] = wartosc;
				ile++;
			}
		});
		
		if (skr.indexOf('hide="') >= 8) {
			let hidy = skr.split('hide="')[1].split('"')[0].split(',').map(u => u.trim());

			obi.hideOnHome = hidy.indexOf('home') >= 0 ? true : false;
			obi.hideOnPosts = hidy.indexOf('post') >= 0 ? true : false;
			obi.hideOnStatic = hidy.indexOf('static') >= 0 ? true : false;
			obi.hideOnLabel = hidy.indexOf('label') >= 0 ? true : false;
			obi.hideOnSearch = hidy.indexOf('search') >= 0 ? true : false;
			obi.hideOnArchive = hidy.indexOf('archive') >= 0 ? true : false;
				
			ile++;
		}
		if (skr.indexOf('" tt="') >= 8) {
			obi.widgetsTitle = decodeURIComponent(skr.split(' tt="')[1].split('"')[0]);
		}
		
		if (ile > 0) {
			return obi;
		} else {
			return false;
		}
	}
}

function pobierzWidga(tresc, nazwa) {
	let a = document.createElement('a');
	let p = new Blob([tresc], {type: 'text/plain'});
	a.href = URL.createObjectURL(p);
	a.download = (nazwa) + '.txt';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

pobierzKod.onclick = function() {
	pobierzWidga(kodWidzetu.value, widgetsTitle.value ? widgetsTitle.value : 'Random_Posts_Blogger_Widget');
}

pobierzWidzeta.onclick = function() {
	if (!this.classList.contains('nieaktywny')) {
		let ns = kodWidzetu.value.slice(0, -10) + ' kp="' + kp.value + '" tt="' + encodeURIComponent(widgetsTitle.value) + '"><\/script>';
		pobierzWidga(ns, nazwaDoZapisu.value ? nazwaDoZapisu.value : 'Random_Posts_Blogger_Widget');
	}
}

wgrajZDysku.oninput = function(e) {
	let plik = e.target.files[0];
	if (plik.type != 'text/plain') {
		alert('This is not a valid Blogger Widget file...');
		this.value = '';
		wczytaj.classList.remove('klik');
		return;
	}
	let reader = new FileReader();
	reader.onload = function() {
		let obi = skryptNaObiekt(this.result);
		if (obi) {
			if (typeof obi.widgetsTitle == 'undefined') obi.widgetsTitle = plik.name.indexOf('.txt') === plik.name.length - 4 ? plik.name.slice(0, -4) : plik.name;
			przywrocWidget(obi);
		} else {
			alert('This is not a valid Blogger Widget file...');
		}
		wgrajZDysku.value = '';
		wczytaj.classList.remove('klik');
	}
	reader.onerror = function() {
		alert('Failed to load the widget file ...');
		wgrajZDysku.value = '';
		wczytaj.classList.remove('klik');
	}
	reader.readAsText(plik);	
}

zainstaluj.onclick = function() {
	document.querySelector('.bloggerGuzik').click();
}

przywrocUst.onclick = function() {
	if (confirm('Are you sure you want to restore the default settings of the widget?')) {
		przywrocWidget(domyslne);
	}
}

pokazPomoc.onclick = function() {
	pomoc.style.display = 'flex';
	setTimeout(function() {
		pomocOkno.style.maxHeight = '100vh';
	}, 10);
}

pomocZamknij.onclick = function() {
	pomocOkno.style.maxHeight = '0';
	setTimeout(function() {
		pomoc.style.display = 'none';
	}, 1000);
}

wyswietlZapisy();

(function() {
	let kolor = document.querySelector('.tloWybor[wartosc="kolor"]');
	let przez = document.querySelector('.tloWybor[wartosc="transparent"]');
	kolor.onclick = function() {
		przez.classList.remove('zaznaczony');
		this.classList.add('zaznaczony');
		podgladaj();
		jebKodem();
	}
	przez.onclick = function() {
		kolor.classList.remove('zaznaczony');
		this.classList.add('zaznaczony');
		podgladaj();
		jebKodem();
	}
})();

function kolorTla() {
	let zazn = document.querySelector('.tloWybor.zaznaczony');
	if (zazn.getAttribute('wartosc') === 'kolor') {
		return boxBackground.value;
	} else {
		return 'transparent';
	}
}

kp.oninput = function() {
	oKurwa.style.background = podglad.style.background = this.value;
}

pokazMenu.onclick = function() {
	zaslona.classList.add('pokaz');
	menu.classList.add('pokaz');
	setTimeout(function() {
		menu.classList.add('width100');
		setTimeout(function() {
			menu.classList.add('owerflo');
		}, 1000);
	}, 10);
}

schowajMenu.onclick = zaslona.onclick = function() {
	menu.classList.remove('owerflo');
	menu.classList.remove('width100');
	setTimeout(function() {
		menu.classList.remove('pokaz');
		zaslona.classList.remove('pokaz');
	}, 700);
}

const url = 'https://bloggerwidgets.github.io/random-posts';
const tytul = 'Random Posts Widget For Blogger';
const pedaly = [{
	'nzw' : 'pejsbuk',
	'link' : 'https://www.facebook.com/sharer/sharer.php?u=' + url
}, {
	'nzw' : 'pitol',
	'link' : 'https://twitter.com/intent/tweet?text=' + tytul +': ' + url
}, {
	'nzw' : 'blogger',
	'link' : 'https://www.blogger.com/blog-this.g?n=' + tytul + '&t=&u=' + url
}, {
	'nzw' : 'lynkedyn',
	'link' : 'https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + tytul + '&summary=&source='
}, {
	'nzw' : 'interes',
	'link' : 'https://pinterest.com/pin/create/button/?url=' + url + '&media=&description=' + tytul
}, {
	'nzw' : 'redyt',
	'link' : 'http://www.reddit.com/submit?url=' + url + '&title=' + tytul
}, {
	'nzw' : 'goglebokmar',
	'link' : 'https://www.google.com/bookmarks/mark?op=edit&bkmk=' + url + '&title=' + tytul + '&annotation=' + encodeURIComponent('A cool widget to display random Blogger posts.') + '&labels=' + encodeURIComponent('blogger, widgets, free, random, posts')
}, {
	'nzw' : 'dyg',
	'link' : 'https://digg.com/submit?url=' + url
}, {
	'nzw' : 'tumblr',
	'link' : 'https://www.tumblr.com/share?t=' + tytul + '&u=' + url + '&v=3'
}, {
	'nzw' : 'wordpres',
	'link' : 'http://wordpress.com/wp-admin/press-this.php?u=' + url + '&t=' + tytul + '&s=' + tytul + '&i='
}, {
	'nzw' : 'gmail',
	'link' : 'https://mail.google.com/mail/?view=cm&to=&su=' + tytul + '&body=' + url + '&bcc=&cc='
}, {
	'nzw' : 'meil',
	'link' : 'mailto:mail@example.com?subject=' + tytul + '&body=' + url
}, {
	'nzw' : 'ewernot',
	'link' : 'http://www.evernote.com/clip.action?title=' + tytul + '&url=' + url
}];
	
pedaly.forEach(p => {
	document.querySelector('.' + p.nzw).onclick = function() {
		window.open(p.link, '', 'left=50,top=50,width=560,height=400,menubar=no,toolbar=no,location=no');
	}
});

var wywolany = false;

function kurwaMac(js) {
	if (typeof js == 'object' && js.feed && js.feed.openSearch$totalResults) {
		blogURLinfo.setAttribute('class', 'prawidlo');
		let ilsc = js.feed.openSearch$totalResults.$t;
		let tytBlog =  js.feed.title && js.feed.title.$t ?  js.feed.title.$t : 'This URL is valid';
		blogURLinfo.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>' + (tytBlog ? tytBlog : 'Correct') + ' (' + ilsc + ' post' + (ilsc == '1' ? '' : 's') + ')';
		blogURLinfo.setAttribute('tooltip', '<div style="font-weight:bold;text-decoration:underline;">🌐 ' + tytBlog + '</div>' + (js.feed.subtitle.$t ? '<div style="font-style:italic;font-size:14px;">📖 ' + js.feed.subtitle.$t.substring(0, 140) + (js.feed.subtitle.$t.length > 140 ? '...' : '') + '</div>' : '') + '<div style="border:1px solid #3d3d3d;padding:1px 2px;display:inline-block;">' + '<b>' + ilsc + '</b> post' + (ilsc == '1' ? '' : 's') + ' 📝');
		wywolany = true;
		blogURL.disabled = false;
		let alte = js.feed.link.filter(u => u.rel === 'alternate')[0].href;
		if (alte[alte.length-1] === '/') alte = alte.slice(0, -1);
		if (blogURL.value !== alte) {
			blogURL.value = alte;
			jebKodem();
		}
	} else {
		blogURLinfo.setAttribute('class', 'nieprawidlo');
		blogURLinfo.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="errSVG"><path fill="black" d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm-176 86c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>An error occured';
		blogURLinfo.setAttribute('tooltip', 'There is a problem with the blog\'s post feed. Check in your Blogger dashboard to make sure that you have enabled the availability of the posts feed. Otherwise, the widget may not function properly.');
	}
	blogURL.disabled = false;
	wywolany = true;
}

function testURL(url) {
	wywolany = false;
	let s = document.createElement('script');
	document.head.appendChild(s);
	s.onload = function() {
		setTimeout(function() {
			if (!wywolany) {
				blogURLinfo.setAttribute('class', 'nieprawidlo');
				blogURLinfo.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="errSVG"><path fill="black" d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm-176 86c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>An error occured';
				blogURLinfo.setAttribute('tooltip', 'There is a problem with the blog\'s post feed. Check in your Blogger dashboard to make sure that you have enabled the availability of the posts feed. Otherwise, the widget may not function properly.');
				if (url.split('://')[1].indexOf('/') >= 5) testURL(url.split('://')[0] + '://' + url.split('://')[1].split('/')[0]);
			}
		}, 200);
		blogURL.disabled = false;
	}
	s.onerror = function() {
		blogURLinfo.setAttribute('class', 'nieprawidlo');
		blogURLinfo.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="errSVG"><path fill="black" d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm-176 86c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>An error occured';
		blogURLinfo.setAttribute('tooltip', 'I can\'t find this blog. Make sure that the URL you entered is correct, that it links to the blog\'s home page (not any subpages) and that you have enabled post feed availability in your Blogger settings. Otherwise, the widget may not function properly.');
		blogURL.disabled = false;
		if (url.split('://')[1].indexOf('/') >= 5) testURL(url.split('://')[0] + '://' + url.split('://')[1].split('/')[0]);
	}
	s.src = url + '/feeds/posts/summary?alt=json-in-script&callback=kurwaMac&start-index=1&max-results=1';
}

blogURL.addEventListener('input', function() {
	if (blogURL.value) {
		sprawdz.classList.remove('nieaktywny');
		sprawdz.setAttribute('tooltip', 'Validate the URL');
	} else {
		sprawdz.classList.add('nieaktywny');
		sprawdz.setAttribute('tooltip', '');
	}
});

blogURL.onchange = function() {
	sprawdz.classList.add('nieaktywny');
	sprawdz.setAttribute('tooltip', '');
	blogURLinfocus.style.display = 'none';
	blogURLinfo.style.display = 'block';
	if (testujURL()) {
		blogURL.disabled = true;
		blogURLinfo.innerHTML = '<div class="ladowanie"></div>';
		blogURLinfo.setAttribute('tooltip', 'Loading...');
		if (blogURL.value.indexOf('http://') !== 0 && blogURL.value.indexOf('https://') !== 0) blogURL.value = 'https://' + blogURL.value;
		if (blogURL.value.indexOf('.blogspot.com') >= 2) blogURL.value = blogURL.value.substring(0, blogURL.value.indexOf('.blogspot.com') + 13);
		jebKodem();
		testURL(blogURL.value);
	} else if (blogURL.value) {
		blogURLinfo.setAttribute('class', 'nieprawidlo');
		blogURLinfo.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>Invalid URL';
		blogURLinfo.setAttribute('tooltip', 'This url is not valid...');
	} else {
		blogURLinfo.removeAttribute('class');
		blogURLinfo.innerHTML = 'URL to Blog\'s Home Page';
		blogURLinfo.setAttribute('tooltip', 'Enter the URL to your Blog\'s Home Page');
	}
}

function testujURL() {
	let cip = blogURL.value.indexOf('http://') === 0 || blogURL.value.indexOf('https://') === 0 ? blogURL.value.split('://')[1] : blogURL.value;
	if (cip.length < 5 || cip.indexOf('.') < 1 || cip.indexOf('.') >= cip.length - 2 || (cip.indexOf('.blogspot.com') >= 0 && cip.indexOf('.blogspot.com') < 1)) {
		return false;
	} else {
		return true;
	}
}

blogURL.onfocus = function() {
	blogURLinfo.style.display = 'none';
	blogURLinfocus.style.display = 'block';
}

blogURL.onblur = function() {
	blogURLinfocus.style.display = 'none';
	blogURLinfo.style.display = 'block';
	sprawdz.classList.add('nieaktywny');
	sprawdz.setAttribute('tooltip', '');
}

document.querySelectorAll('[tooltip]').forEach(t => {
	let wsk = document.createElement('div');
	wsk.setAttribute('class', 'tooltip');
	wsk.style.position = 'absolute';
	wsk.style.opacity = '0';
	wsk.style.zIndex = '99';
	let wyrPrawX = 15;
	let wyrLewX = 7;
	let wyrDolY = 12;
	let wyrGorY = 0;
	t.addEventListener('mouseenter', e => {
		if (t.getAttribute('tooltip')) {
			wsk.innerHTML = t.getAttribute('tooltip');
			document.body.appendChild(wsk);
			setTimeout(function() {
				wsk.style.opacity = '1';
			}, 10);
		}
	})
	t.addEventListener('mouseleave', e => {
		wsk.style.opacity = '0';
		if (document.body.contains(wsk)) document.body.removeChild(wsk);
	});
	t.addEventListener('mousemove', e => {
		wsk.style.left = (e.pageX + wyrPrawX + wsk.offsetWidth + 10 > window.scrollX + window.innerWidth ? e.pageX - wyrLewX - wsk.offsetWidth : e.pageX + wyrPrawX) + 'px';
		wsk.style.top = (e.pageY + wyrDolY + wsk.offsetHeight + 10 > window.scrollY + window.innerHeight ? e.pageY - wyrGorY - wsk.offsetHeight : e.pageY + wyrDolY) + 'px';
	});
});

(function() {
	let im = new Image();
	im.style.display = 'none';
	document.body.appendChild(im);
	im.src = 'https://counter5.stat.ovh/private/freecounterstat.php?c=85gk1ad85pzhe1hwdb6qc8pg6hlbfn3t';
})()