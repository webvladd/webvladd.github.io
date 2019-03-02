window.onload = function () {
	 var reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/,
			dropZone = document.querySelector('.drop-zone'),
			listCertificat = document.querySelector('.list__certificates'),
			listInfo = document.querySelector('.info__list'),
			tree = dropZone,
			dump;

			document.querySelector('.list__button_cancel').addEventListener('click', function (e) {
				e.stopPropagation();
				e.preventDefault();
				document.querySelector('.list__button_add').classList.toggle('list__button_activ');
				document.querySelector('.list__button_cancel').classList.toggle('list__button_activ');
				document.querySelector('.info__list_activ').classList.remove('info__list_activ');
				listInfo.querySelector('.choose-certificate').classList.add('info__list_activ');
				dropZone.classList.remove('drop-zone_activ');
			})

			document.querySelector('.list__button_add').addEventListener('click', function (e) {
				e.stopPropagation();
				e.preventDefault();
				document.querySelector('.list__button_add').classList.toggle('list__button_activ');
				document.querySelector('.list__button_cancel').classList.toggle('list__button_activ');
				dropZone.classList.toggle('drop-zone_activ');
				if (document.querySelector('.list__certificat_activ') !== null) {
					document.querySelector('.list__certificat_activ').classList.remove('list__certificat_activ');
					document.querySelector('.info__list_activ').classList.remove('info__list_activ');
					listInfo.querySelector('.certificate-adding-field').classList.add('info__list_activ');
				} else{
					listInfo.querySelector('.info__list_activ').classList.remove('info__list_activ');
					listInfo.querySelector('.certificate-adding-field').classList.add('info__list_activ');
				}
			})

			listCertificat.addEventListener('click', function (e) {
				e.stopPropagation();
				e.preventDefault();

				dropZone.classList.remove('drop-zone_activ');
				document.querySelector('.list__button_cancel').classList.remove('list__button_activ');
				document.querySelector('.list__button_add').classList.add('list__button_activ');

				if (this.querySelector('.list__certificat_activ') === null) {
					e.target.classList.add('list__certificat_activ');
					listInfo.querySelector('.info__list_activ').classList.remove('info__list_activ');
					listInfo.querySelector('.clo'+e.target.getAttribute('dada-serial')).classList.add('info__list_activ');
				} else {
					this.querySelector('.list__certificat_activ').classList.remove('list__certificat_activ');
					listInfo.querySelector('.info__list_activ').classList.remove('info__list_activ');
					e.target.classList.add('list__certificat_activ');
					listInfo.querySelector('.clo'+e.target.getAttribute('dada-serial')).classList.add('info__list_activ');
				}
			});

function buildList (){
	
	var objCertificate = window.localStorage.getItem('objCertificate');
	if(objCertificate !== null){
		objCertificate = JSON.parse(objCertificate, function (key, value) {
			if (key == 'serialNumber') return new Object (value);
			return value;
		})

		for (var i = 0; i < objCertificate.serialNumber.length; i++) {
			var listItem = localStorage.getItem(objCertificate.serialNumber[i])
			listItem = JSON.parse(listItem, function (key, value) {
				if (key == 'commonName') return new Object (value);
				return value;
			})

			var listCertificates = document.querySelector('.list__certificates');
			var newLi = document.createElement('li');
				newLi.className = 'list__certificat_item';
				newLi.setAttribute('dada-serial', objCertificate.serialNumber[i]);
				newLi.innerHTML = listItem.commonName[1].toLowerCase();
				listCertificates.appendChild(newLi);

			var infiList = document.querySelector('.info__list');
			var	newLiIfo = document.createElement('li');
					newLiIfo.className = 'info__list_item'+' '+'clo'+ objCertificate.serialNumber[i];
					newLiIfo.innerHTML = '<span>'+ listItem.commonName[0]+ ' ' + listItem.commonName[1]+'</span>' + '<span>'+ listItem.issuerCn[0]+ ' ' + listItem.issuerCn[1]+'</span>' + '<span>'+ listItem.validFrom[0]+ ' ' + listItem.validFrom[1]+'</span>'+ '<span>'+ listItem.validTill[0]+ ' ' + listItem.validTill[1]+'</span>';
					infiList.appendChild(newLiIfo);
		}
	}
}
buildList ();

function decode(der) {
	var asn1 = ASN1.decode(der);
	asn1.getDataArr();
	asn1.toDOM();
}


function text(el, string) {
	if ('textContent' in el){
		el.textContent = string;
	} else {
		el.innerText = string;
	}
}

function decodeBinaryString(str) {
	var der;
	try {
		if (reHex.test(str)){
			der = Hex.decode(str);
		}
		else if (Base64.re.test(str)){
			der = Base64.unarmor(str);
		}
		else{
			der = str;
			decode(der);
		}
	}
	catch (e) {
		text(tree, 'Cannot decode file.');
	}
}

function read(f) {
	var r = new FileReader();
	r.onloadend = function () {
		if (r.error){
			alert("Your browser couldn't read the specified file (error code " + r.error.code + ").");
		} else {
			decodeBinaryString(r.result);
		}
	};
	r.readAsBinaryString(f);
}

function stop(e) {
	e.stopPropagation();
	e.preventDefault();
}

function dragAccept(e) {
	stop(e);
	if (e.dataTransfer.files.length > 0){
		read(e.dataTransfer.files[0]);
	}
}

function load() {
	if (dropZone.files.length === 0){
		alert("Select a file to load first.");
		} else {
			read(dropZone.files[0]);
		}
}

function loadFromHash() {
	if (window.location.hash && window.location.hash != hash) {
		hash = window.location.hash;
		// Firefox is not consistent with other browsers and return an
		// already-decoded hash string so we risk double-decoding here,
		// but since % is not allowed in base64 nor hexadecimal, it's ok
		var val = decodeURIComponent(hash.substr(1));
		decodeText(val);
	}
}

// main
if ('onhashchange' in window){
	window.onhashchange = loadFromHash;
	loadFromHash();
	document.ondragover = stop;
	document.ondragleave = stop;
	}

if ('FileReader' in window) {
	dropZone.onchange = load;
	document.ondrop = dragAccept;
}

}