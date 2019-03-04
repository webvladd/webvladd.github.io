window.onload = function () {
	var maxLength = 10240,
			reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/,
			hash = null,
			givDomElement = function (elem) {return document.querySelector(elem);},
			dropZone = givDomElement('.drop-zone'),
			infoZone = givDomElement('.info-zone'),
			listCertificat = givDomElement('.list__certificates'),
			listInfo = givDomElement('.info__list'),
			listButtonAdd = givDomElement('.list__button_add'),
			listButtonCancel = givDomElement('.list__button_cancel'),
			dropZoneFile;

	function evtResetDefault(evt) {
		if (evt.preventDefault) evt.preventDefault();
		if (evt.stopPropagation) evt.stopPropagation();
		return false;
	};

	listButtonCancel.addEventListener('click', function (evt) {
		evtResetDefault(evt);

		listButtonAdd.classList.toggle('list__button_activ');
		listButtonCancel.classList.toggle('list__button_activ');
		dropZone.classList.remove('info-drop-activ');
		infoZone.classList.add('info-drop-activ');
	});

	listButtonAdd.addEventListener('click', function (evt) {
		evtResetDefault(evt);

		listButtonAdd.classList.toggle('list__button_activ');
		listButtonCancel.classList.toggle('list__button_activ');
		infoZone.classList.remove('info-drop-activ');
		dropZone.classList.add('info-drop-activ');
	});

	listCertificat.addEventListener('click', function (evt) {
		evtResetDefault(evt);

		dropZone.classList.remove('info-drop-activ');
		infoZone.classList.add('info-drop-activ');
		listButtonCancel.classList.remove('list__button_activ');
		listButtonAdd.classList.add('list__button_activ');

		if (this.querySelector('.list__certificat_activ') === null) {
			evt.target.classList.add('list__certificat_activ');
			listInfo.querySelector('.info__list_activ').classList.remove('info__list_activ');
			listInfo.querySelector('.clo'+evt.target.getAttribute('dada-serial')).classList.add('info__list_activ');
		} else {
			this.querySelector('.list__certificat_activ').classList.remove('list__certificat_activ');
			listInfo.querySelector('.info__list_activ').classList.remove('info__list_activ');
			evt.target.classList.add('list__certificat_activ');
			listInfo.querySelector('.clo'+evt.target.getAttribute('dada-serial')).classList.add('info__list_activ');
		};
	});

	function buildList (){
		var objCertificate = window.localStorage.getItem('objCertificate');
		if(objCertificate !== null){
			objCertificate = JSON.parse(objCertificate, function (key, value) {
				if (key == 'serialNumber') return new Object (value);
				return value;
			});

			for (var i = 0; i < objCertificate.serialNumber.length; i++) {
				var listItem = localStorage.getItem(objCertificate.serialNumber[i])
				listItem = JSON.parse(listItem, function (key, value) {
					if (key == 'commonName') return new Object (value);
					return value;
				});

				var listCertificates = givDomElement('.list__certificates');
				var newLi = document.createElement('li');
				newLi.className = 'list__certificat_item';
				newLi.setAttribute('dada-serial', objCertificate.serialNumber[i]);
				newLi.innerHTML = listItem.commonName[1].toLowerCase();
				listCertificates.appendChild(newLi);

				var infiList = givDomElement('.info__list');
				var	newLiIfo = document.createElement('li');
				newLiIfo.className = 'info__list_item'+' '+'clo'+ objCertificate.serialNumber[i];
				newLiIfo.innerHTML = '<span>'+ listItem.commonName[0]+ ' ' + listItem.commonName[1]+'</span>' + '<span>'+ listItem.issuerCn[0]+ ' ' + listItem.issuerCn[1]+'</span>' + '<span>'+ listItem.validFrom[0]+ ' ' + listItem.validFrom[1]+'</span>'+ '<span>'+ listItem.validTill[0]+ ' ' + listItem.validTill[1]+'</span>';
				infiList.appendChild(newLiIfo);
			};
		};
	};
	buildList();

	dropZone.addEventListener("dragenter", function (evt) {
		evtResetDefault(evt);
	}, false);

	dropZone.addEventListener("dragover", function (evt) {
		evtResetDefault(evt);
	}, false);

	dropZone.addEventListener("drop", function (evt) {
		evtResetDefault(evt);
		dropZoneFile = evt.dataTransfer.files[0];
		var sertificateName = dropZoneFile.name.replace(/.crt/g, ''),
		objCertificate = window.localStorage.getItem('objCertificate'),
		locStorObjCert;

		listButtonAdd.classList.toggle('list__button_activ');
		listButtonCancel.classList.toggle('list__button_activ');
		dropZone.classList.remove('info-drop-activ');
		infoZone.classList.add('info-drop-activ');

		function decode(der) {
			var asn1 = ASN1.decode(der),
					decodeResult=[];
			asn1.toDOM();

			function identifierSearch (obj, value) {
				for (var i = 0; i < obj.sub.length; i++) {
					if (obj.sub[i].sub !== null) {
						identifierSearch(obj.sub[i], value);
					} else {
						if (obj.sub[i].head.innerText.indexOf(value) !== -1) {
							decodeResult.push(obj.sub[i].head.innerText, obj.sub[1].head.innerText);
						};
					};
				};
			};

			function resultSorting() {
				identifierSearch(asn1.sub[0], '2.5.4.3');
				identifierSearch(asn1.sub[0], 'UTCTime');

				function locStorSetItem () {
					var locObj = {
						commonName: ['Common Name:', decodeResult[3].substring(21)],
						issuerCn: ['Issuer CN:', decodeResult[1].substring(21)],
						validFrom: ['Valid From:', decodeResult[4].substring(14).substring(0,10)],
						validTill: ['Valid Till:', decodeResult[5].substring(14).substring(0,10)],
					};

					var listCertificates = givDomElement('.list__certificates'),
					newLi = document.createElement('li');
					newLi.setAttribute('dada-serial', sertificateName);
					newLi.innerHTML = locObj.commonName[1].toLowerCase();
					listCertificates.appendChild(newLi);

					var infiList = givDomElement('.info__list'),
					newLiIfo = document.createElement('li');
					newLiIfo.innerHTML = '<span>'+'Common Name:'+' '+decodeResult[3].substring(21)+'</span>'+'<span>'+'Issuer CN:'+' '+decodeResult[1].substring(21)+'</span>'+'<span>'+ 'Valid From:'+' '+decodeResult[4].substring(14).substring(0,10)+'</span>'+'<span>'+'Valid Till:'+' '+decodeResult[5].substring(14).substring(0,10)+'</span>';
					infiList.appendChild(newLiIfo);
					if (givDomElement('.list__certificat_activ') === null) {
						newLi.className = 'list__certificat_item'+' '+'list__certificat_activ';
						givDomElement('.info__list_activ').classList.remove('info__list_activ');
						newLiIfo.className = 'info__list_item'+' '+'clo'+ sertificateName+' '+'info__list_activ';
					} else {
						givDomElement('.list__certificat_activ').classList.remove('list__certificat_activ');
						givDomElement('.info__list_activ').classList.remove('info__list_activ');
						newLi.className = 'list__certificat_item'+' '+'list__certificat_activ';
						newLiIfo.className = 'info__list_item'+' '+'clo'+ sertificateName+' '+'info__list_activ';
					};

					locObj = JSON.stringify(locObj);
					window.localStorage.setItem(sertificateName, locObj);
				};

				if(objCertificate !== null){
					objCertificate = JSON.parse(objCertificate, function (key, value) {
						if (key == 'serialNumber') return new Object (value);
						return value;
					});
					if (objCertificate.serialNumber.indexOf(sertificateName) !== -1) {
						givDomElement('.info__list_activ').classList.remove('info__list_activ');
						givDomElement('.message-been-added').classList.add('info__list_activ');
					} else {
						objCertificate.serialNumber.push(sertificateName);
						locStorObjCert = JSON.stringify(objCertificate);
						window.localStorage.setItem('objCertificate', locStorObjCert);
						locStorSetItem();
					};
				} else {
					objCertificate = {
						serialNumber:[sertificateName]
					};
					locStorObjCert = JSON.stringify(objCertificate);
					window.localStorage.setItem('objCertificate', locStorObjCert);
					locStorSetItem();
				};
			};
			resultSorting();
		};

		function decodeBinaryString(str) {
			var der;
				try {
					if (reHex.test(str))
						der = Hex.decode(str);
					else if (Base64.re.test(str))
						der = Base64.unarmor(str);
					else
						der = str;
					decode(der);
				} catch (e) {
						text(tree, 'Cannot decode file.');
						dump.innerHTML = '';
				};
		};

		function read(f) {
			var r = new FileReader();
			r.onloadend = function () {
				if (r.error)
					alert("Your browser couldn't read the specified file (error code " + r.error.code + ").");
				else
					decodeBinaryString(r.result);
			};
			r.readAsBinaryString(f);
		};

		function dragAccept(evt) {
			if (evt.dataTransfer.files.length > 0)
				read(evt.dataTransfer.files[0]);
		};

		dragAccept(evt);
		dropZoneFile = undefined;
	}, false);
};