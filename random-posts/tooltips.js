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
		wsk.innerHTML = t.getAttribute('tooltip');
		document.body.appendChild(wsk);
		setTimeout(function() {
			wsk.style.opacity = '1';
		}, 10);
	})
	t.addEventListener('mouseleave', e => {
		wsk.style.opacity = '0';
		document.body.removeChild(wsk);
	});
	t.addEventListener('mousemove', e => {
		wsk.style.left = (e.pageX + wyrPrawX + wsk.offsetWidth + 10 > window.scrollX + window.innerWidth ? e.pageX - wyrLewX - wsk.offsetWidth : e.pageX + wyrPrawX) + 'px';
		wsk.style.top = (e.pageY + wyrDolY + wsk.offsetHeight + 10 > window.scrollY + window.innerHeight ? e.pageY - wyrGorY - wsk.offsetHeight : e.pageY + wyrDolY) + 'px';
	});
});