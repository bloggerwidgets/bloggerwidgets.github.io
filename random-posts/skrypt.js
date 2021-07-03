var RandomPostsWidgets = localStorage.RandomPostsWidgets ? JSON.parse(localStorage.RandomPostsWidgets) : [];

const generator = document.querySelector('.generator');

let slideUp = (target, duration=500) => {

        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.boxSizing = 'border-box';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout( () => {
              target.style.display = 'none';
              target.style.removeProperty('height');
              target.style.removeProperty('padding-top');
              target.style.removeProperty('padding-bottom');
              target.style.removeProperty('margin-top');
              target.style.removeProperty('margin-bottom');
              target.style.removeProperty('overflow');
              target.style.removeProperty('transition-duration');
              target.style.removeProperty('transition-property');
              //alert("!");
        }, duration);
    }

    /* SLIDE DOWN */
    let slideDown = (target, duration=500) => {

        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;
        if (display === 'none') display = 'block';
        target.style.display = display;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.boxSizing = 'border-box';
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout( () => {
          target.style.removeProperty('height');
          target.style.removeProperty('overflow');
          target.style.removeProperty('transition-duration');
          target.style.removeProperty('transition-property');
        }, duration);
    }

generator.querySelectorAll('[rozwin]').forEach(r => {
	let elem = generator.querySelector('div.zawijka[for="' + r.getAttribute('rozwin') + '"]');
	r.oninput = function() {
		if ((r.value === 'none' || r.value === 'vertical' || r.value == 0) && elem.style.display !== 'none') {
			slideUp(elem, 1000);
		} else if (elem.style.display === 'none') {
			slideDown(elem, 1000);
		}
	}
});

zaawansowane.onclick = function() {
	if (!this.classList.contains('klikniete')) {
		this.classList.add('klikniete');
		function generoz() {
			setTimeout(function() {
				if (generator.scrollTop < generator.scrollHeight - generator.offsetHeight) {
					generator.scrollTop = generator.scrollHeight;
					generoz();
				}
			}, 50);
		}
		let zaw = document.getElementById('zaaw-rozw');
		if (zaw.style.display === 'none') {
			slideDown(zaw, 1000);
			generoz();
		} else {
			slideUp(zaw, 1000);
		}
		setTimeout(function() {
			zaawansowane.classList.remove('klikniete');
		}, 1000);
	}
}

brakObrazka.src = noThumbnail.value;
brakObrazka.onerror = function() {
	this.src = 'https://4.bp.blogspot.com/-Cltm_-kesuw/XIGZZEV2B6I/AAAAAAAAAKo/YnCMKY574EQlJERoZyaqsE9Naq09tqZOQCLcBGAs/s1600/invalid-image-url.png';
}
noThumbnail.oninput = function() {
	brakObrazka.src = this.value;
}

przywrocFoto.onclick = function() {
	noThumbnail.value = domyslne.noThumbnail;
	brakObrazka.src = domyslne.noThumbnail;
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
					noThumbnail.value = pomniejszonyURI;
					brakObrazka.src = pomniejszonyURI;
				} else {
					noThumbnail.value = obraz.src;
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
	if (thumbnail.value === 'center') {
		obStyl += 'margin:0 auto ' + (margen ? '5px' : '0') + ';';
	} else {
		obStyl += 'float:' + thumbnail.value + ';margin:' + (thumbnail.value === 'right' ? '0 0 ' + (margen ? '5px 5px' : '0 0') + ';' : '0 ' + (margen ? '5px 5px' : '0 0') + ' 0;');
	}
	obStyl += 'width:' + thumbnailSize.value + 'px;height:' + thumbnailSize.value + ';padding:0;border:0;border-radius:' + thumbnailRounding.value + '%;';
	let margines = Math.round(textSize.value / 5);
	
	elem.style.border = borderWidth.value + 'px ' + borderStyle.value + ' ' + borderColor.value;
	elem.style.fontSize = textSize.value + 'px';
	elem.style.color = textColor.value;
	elem.style.background = background.value;
	elem.style.padding = '5px';
	elem.style.lineHeight = '1.2';
	elem.style.cursor = 'pointer';
	elem.style.fontFamily = textFont.value;
	elem.style.overflow = 'hidden';
	elem.style.textDecoration = 'none';
	elem.style.borderRadius = rounding.value + 'px';
	if (display.value === 'horizontal') {
		elem.style.display = 'inline-block';
		elem.style.width = width.value + 'px';
	} else {
		elem.style.display = 'block';
	}
	elem.title = post.tytul;
		
	let html = '';
		
	if (thumbnail.value !== 'none') html += '<div style="' + obStyl + '"><img src="' + post.obrazek + '" style="width:' + (thumbnailSize.value > 10 ? thumbnailSize.value - 10 : 0) + 'px;"></div>';
	if (showTitle.value !== 'none') html += '<div style="text-align:' + showTitle.value + ';font-size:' + titleSize.value + 'px;font-weight:bold;color:' + titleColor.value + ';font-family:' + titleFont.value + ';' + ((showInfo.value !== 'none' && (showAuthor.checked || showDate.checked || showComments.checked)) || (showLabels.value !== 'none' && post.tagi.length) || excerptLength.value > 0 ? 'margin-bottom:' + Math.round(titleSize.value / 5) + 'px;' : '') + '">' + post.tytul + '</div>';
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
				html += '<span style="display:inline-flex;align-items:center;background:' + textColor.value + ';color:' + background.value + ';padding:1px 3px;margin:2px ' + (i < post.tagi.length - 1 ? '4px' : '0') + ' 2px ' + (i > 0 ? '4px' : '0') + ';border-radius:4px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height:' + (textSize.value - 2) + 'px;margin-right:3px;"><path fill="currentColor" d="M0 252.118V48C0 21.49 21.49 0 48 0h204.118a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882L293.823 497.941c-18.745 18.745-49.137 18.745-67.882 0L14.059 286.059A48 48 0 0 1 0 252.118zM112 64c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z"></path></svg>' + post.tagi[i] + '</span>';
			}
			
			html += '</div>';
		}
		
		if (excerptLength.value > 0) html += '<div style="text-align:' + excerptAlign.value + '">' + post.wypis.substring(0, excerptLength.value) + '...</div>';
		
	elem.innerHTML = html;
		
	podglad.appendChild(elem);
}

const wartosci = ['widgetsTitle', 'numberOfPosts', 'label', 'display', 'width', 'rounding', 'background', 'borderWidth', 'borderStyle', 'borderColor', 'thumbnail', 'thumbnailSize', 'thumbnailRounding', 'noThumbnail', 'showTitle', 'titleFont', 'titleSize', 'titleColor', 'showInfo', 'showAuthor', 'showComments', 'showDate', 'showLabels', 'numberOfLabels', 'excerptLength', 'excerptAlign', 'textFont', 'textSize', 'textColor', 'hideOnHome', 'hideOnPosts', 'hideOnStatic', 'hideOnLabel', 'hideOnSearch', 'hideOnArchive'];

var domyslne = {};

wartosci.forEach(w => {
	if (w === 'showAuthor' || w === 'showComments' || w === 'showDate' || w === 'hideOnHome' || w === 'hideOnPosts' || w === 'hideOnStatic' || w === 'hideOnLabel' || w === 'hideOnSearch' || w === 'hideOnArchive') {
		domyslne[w] = document.getElementById(w).checked ? true : false;
	} else {
		domyslne[w] = document.getElementById(w).value;
	}
});

function generujKod() {
	let kod = '<script numberOfPosts="' + numberOfPosts.value + '" label="' + (label.value ? encodeURIComponent(label.value) : 'none') + '" display="' + display.value + '"';
	if (display.value === 'horizontal') {
		kod += ' width="' + width.value + '"';
	}
	kod += ' rounding="' + rounding.value + '" background="' + background.value + '" borderWidth="' + borderWidth.value + '"';
	if (borderWidth.value !== '0') {
		kod += ' borderStyle="' + borderStyle.value + '" borderColor="' + borderColor.value + '"';
	}
	kod += ' thumbnail="' + thumbnail.value + '"';
	if (thumbnail.value !== 'none') {
		kod += ' thumbnailSize="' + thumbnailSize.value + '" thumbnailRounding="' + thumbnailRounding.value + '" noThumbnail="' + noThumbnail.value + '"';
	}
	kod += ' showTitle="' + showTitle.value + '"';
	if (showTitle.value !== 'none') {
		kod += ' titleFont="' + titleFont.value + '" titleSize="' + titleSize.value + '" titleColor="' + titleColor.value + '"';
	}
	kod += ' showInfo="' + showInfo.value + '"';
	if (showInfo.value !== 'none') {
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


	if (hideOnHome.checked || hideOnPosts.checked || hideOnStatic.checked || hideOnLabel.checked || hideOnSearch.checked || hideOnArchive.checked) {
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
	kod += ' async src="https://cdn.jsdelivr.net/gh/bloggerwidgets/scripts/randomposts.js"><\/script>';
	return kod;
}

function jebKodem() {
	let kod = generujKod();
	kodWidzetu.value = kod;
	tekstwidzetu.value = kod;
	tytulWidzetu.value = widgetsTitle.value;
}

podgladaj();
jebKodem();

function labelOnInput() {
	if (label.value && post.tagi.indexOf(label.value) < 0) {
		if (post.tagi[0] === 'label1') {
			post.tagi.splice(0, 0, label.value);
		} else {
			post.tagi[0] = label.value;
		}
	} else {
		if (post.tagi[0] !== 'label1') {
			post.tagi.splice(0, 1);
		}
	}
}

label.oninput = labelOnInput;

formularz.oninput = function() {
	podgladaj();
	jebKodem();
}

menu.querySelectorAll('.wysuwany').forEach(op => {
	op.onclick = function(e) {
		if (!this.querySelector('.wysun').contains(e.target)) this.classList.toggle('klik');
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
	RandomPostsWidgets.sort((a, b) => b.data - a.data);
	RandomPostsWidgets.forEach(z => {
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
			document.querySelector('.wysuwany.klik').classList.remove('klik');
		}
		let usun = document.createElement('span');
		zap.appendChild(usun);
		usun.setAttribute('class', 'usunZap');
		usun.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>';
		usun.title = 'Delete this widget';
		usun.onclick = function() {
			if (confirm('Are you sure you want to remove the "' + z.nazwa + '" widget?')) {
				RandomPostsWidgets = RandomPostsWidgets.filter(r => r.nazwa !== z.nazwa);
				localStorage.RandomPostsWidgets = JSON.stringify(RandomPostsWidgets);
				zap.remove();
			}
		}
	})
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

zapiszWidzeta.onclick = function() {
	if (!this.classList.contains('nieaktywny')) {
		let nzw = nazwaDoZapisu.value;
		let licznik = 1;
		while (RandomPostsWidgets.filter(a => a.nazwa === nzw).length > 0) {
			licznik++;
			nzw = nazwaDoZapisu.value + ' (' + licznik + ')';
		}
		let obi = {
			'nazwa' : nzw,
			'data' : Date.now()
		}
		
		wartosci.forEach(w => {
			if (w === 'showAuthor' || w === 'showComments' || w === 'showDate' || w === 'hideOnHome' || w === 'hideOnPosts' || w === 'hideOnStatic' || w === 'hideOnLabel' || w === 'hideOnSearch' || w === 'hideOnArchive') {
				obi[w] = document.getElementById(w).checked ? true : false;
			} else {
				obi[w] = document.getElementById(w).value;
			}
		});
		
		RandomPostsWidgets.push(obi);
		localStorage.RandomPostsWidgets = JSON.stringify(RandomPostsWidgets);
		wyswietlZapisy();
		
		wczytaj.classList.add('podswietl');
		setTimeout(function() {
			wczytaj.classList.remove('podswietl');
		}, 2000);
		
		
		pokInfo('Saved', this);
		
		nazwaDoZapisu.value = '';
		this.classList.add('nieaktywny');
		pobierzWidzeta.classList.add('nieaktywny');
	}
}

function przywrocWidget(obi) {
	wartosci.forEach(w => {
		if (w === 'showAuthor' || w === 'showComments' || w === 'showDate' || w === 'hideOnHome' || w === 'hideOnPosts' || w === 'hideOnStatic' || w === 'hideOnLabel' || w === 'hideOnSearch' || w === 'hideOnArchive') {
			document.getElementById(w).checked = (typeof obi[w] == 'boolean') ? obi[w] : domyslne[w];
		} else {
			document.getElementById(w).value = (typeof obi[w] == 'string' || typeof obi[w] == 'number') ? obi[w] : domyslne[w];
		}
	});
	generator.querySelectorAll('[rozwin]').forEach(r => {
		let elem = generator.querySelector('div.zawijka[for="' + r.getAttribute('rozwin') + '"]');
		if (r.value === 'none' || r.value === 'vertical' || r.value == 0) {
			elem.style.display = 'none';
		} else {
			elem.style.display = 'block';
		}
	});
	if (hideOnHome.checked || hideOnPosts.checked || hideOnStatic.checked || hideOnLabel.checked || hideOnSearch.checked || hideOnArchive.checked) {
		document.getElementById('zaaw-rozw').style.display = 'block';
	} else {
		document.getElementById('zaaw-rozw').style.display = 'none';
	}
	labelOnInput();
	podgladaj();
	jebKodem();
	brakObrazka.src = noThumbnail.value;
}

pobierzWidzeta.onclick = function() {
	if (!this.classList.contains('nieaktywny')) {
		let zapis = {}
		wartosci.forEach(w => {
			if (w === 'showAuthor' || w === 'showComments' || w === 'showDate' || w === 'hideOnHome' || w === 'hideOnPosts' || w === 'hideOnStatic' || w === 'hideOnLabel' || w === 'hideOnSearch' || w === 'hideOnArchive') {
				zapis[w] = document.getElementById(w).checked;
			} else {
				zapis[w] = document.getElementById(w).value;
			}
		});
		let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(zapis));
		let a = document.createElement('a');
		a.setAttribute('href', dataStr);
		a.setAttribute('download', (nazwaDoZapisu.value ? nazwaDoZapisu.value : 'Random_Posts_Widget') + '.json');
		document.body.appendChild(a);
		a.click();
		a.remove();
	}
}

wgrajZDysku.oninput = function(e) {
	let plik = e.target.files[0];
	if (plik.type != 'application/json') {
		alert('This is not a valid Random Posts Widget file...');
		this.value = '';
		document.querySelector('.wysuwany.klik').classList.remove('klik');
		return;
	}
	let reader = new FileReader();
	reader.onload = function() {
		let rezult = this.result;
		try {
			let dane = JSON.parse(rezult);
			przywrocWidget(dane);
		} catch(e) {
			alert('This is not a valid Random Posts Widget file...')
		}
		wgrajZDysku.value = '';
		document.querySelector('.wysuwany.klik').classList.remove('klik');
	}
	reader.onerror = function() {
		alert('Failed to load the widget file ...');
		wgrajZDysku.value = '';
		document.querySelector('.wysuwany.klik').classList.remove('klik');
	}
	reader.readAsText(plik);	
}

zainstaluj.onclick = function() {
	document.querySelector('.bloggerGuzik').click();
}

pobierzKod.onclick = function() {
	let a = document.createElement('a');
	let p = new Blob([kodWidzetu.value], {type: 'text/plain'});
	a.href = URL.createObjectURL(p);
	a.download = (widgetsTitle.value ? widgetsTitle.value : 'Random_Posts_Code') + '.txt';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

przywrocUst.onclick = function() {
	if (confirm('Are you sure you want to restore the default settings of the widget?')) {
		for (let k in domyslne) {
			if (k === 'showAuthor' || k === 'showComments' || k === 'showDate' || k === 'hideOnHome' || k === 'hideOnPosts' || k === 'hideOnStatic' || k === 'hideOnLabel' || k === 'hideOnSearch' || k === 'hideOnArchive') {
				document.getElementById(k).checked = domyslne[k];
			} else {
				document.getElementById(k).value = domyslne[k];
			}
		}
	}
	labelOnInput();
	podgladaj();
	jebKodem();
	brakObrazka.src = noThumbnail.value;
	document.getElementById('zaaw-rozw').style.display = 'none';
	
}

wyswietlZapisy();

tloPodglad.oninput = function() {
	oKurwa.style.background = podglad.style.background = this.value;
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
	'nzw' : 'interest',
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
	'nzw' : 'lacap',
	'link' : 'https://wa.me/?text=' + url
}, {
	'nzw' : 'tumblr',
	'link' : 'https://www.tumblr.com/share?t=' + tytul + '&u=' + url + '&v=3'
}];
	
pedaly.forEach(p => {
	document.querySelector('.' + p.nzw).onclick = function() {
		window.open(p.link, '', 'left=50,top=50,width=560,height=400,menubar=no,toolbar=no,location=no');
	}
});