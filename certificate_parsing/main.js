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
			lineLength = 80,
			contentLength = 8 * lineLength,
			dropZoneFile,
			decodeResult;

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
		var objCertificate = window.localStorage.getItem('objCertificate'),
		locStorObjCert;

		listButtonAdd.classList.toggle('list__button_activ');
		listButtonCancel.classList.toggle('list__button_activ');
		dropZone.classList.remove('info-drop-activ');
		infoZone.classList.add('info-drop-activ');

		function decode(der) {
			var decodeResult = ASN1.decode(der);
			
			decodeResult.dataFromSortResult = {
				timeCertificateValidity: [],
			};

			decodeResult.sub.__proto__.content = ASN1.prototype.content;
			decodeResult.sub.__proto__.sortResult = function () {
				var obj = this;

				function givValidityPeriod (obj) {
					if (obj.tag === undefined){
						return;
					}

					var content = obj.posContent(),
							len = Math.abs(obj.length);

					switch (obj.tag.tagNumber) {
						case 0x17: // UTCTime
						case 0x18: // GeneralizedTime
							decodeResult.dataFromSortResult.timeCertificateValidity.push(obj.stream.parseTime(content, content + len, (obj.tag.tagNumber == 0x17)));
					}
					return
				}
				givValidityPeriod(obj)

				var processedItem = this.content(contentLength)
				if(processedItem === '(2 elem)'){
					if (decodeResult.dataFromSortResult[this.sub[0].content(contentLength).split('\n', 1)[0]] === undefined) {
						decodeResult.dataFromSortResult[this.sub[0].content(contentLength).split('\n', 1)[0]] = [this.sub[1].content(contentLength)];
					} else {
						decodeResult.dataFromSortResult[this.sub[0].content(contentLength).split('\n', 1)[0]].push(this.sub[1].content(contentLength));
					}
				}

				if (this.sub !== null) {
					for (var i = 0, max = this.sub.length; i < max; ++i){
						this.sub[i].sortResult();
					}
				}
			}
			decodeResult.__proto__.sortResult = decodeResult.sub.__proto__.sortResult;
			decodeResult.sub[0].sortResult()

			function locStorSetItem () {
				var locObj = {
					commonName: ['Common Name:', decodeResult.dataFromSortResult['2.5.4.3'][1]],
					issuerCn: ['Issuer CN:', decodeResult.dataFromSortResult['2.5.4.3'][0]],
					validFrom: ['Valid From:', decodeResult.dataFromSortResult.timeCertificateValidity[0].substring(0,10)],
					validTill: ['Valid Till:', decodeResult.dataFromSortResult.timeCertificateValidity[1].substring(0,10)],
				};

				var listCertificates = givDomElement('.list__certificates'),
				newLi = document.createElement('li');
				newLi.setAttribute('dada-serial', decodeResult.dataFromSortResult['2.5.4.5'][1]);
				newLi.innerHTML = locObj.commonName[1].toLowerCase();
				listCertificates.appendChild(newLi);

				var infiList = givDomElement('.info__list'),
				newLiIfo = document.createElement('li');
				newLiIfo.innerHTML = '<span>'+'Common Name:'+' '+decodeResult.dataFromSortResult['2.5.4.3'][1]+'</span>'+'<span>'+'Issuer CN:'+' '+decodeResult.dataFromSortResult['2.5.4.3'][0]+'</span>'+'<span>'+ 'Valid From:'+' '+decodeResult.dataFromSortResult.timeCertificateValidity[0].substring(0,10)+'</span>'+'<span>'+'Valid Till:'+' '+decodeResult.dataFromSortResult.timeCertificateValidity[1].substring(0,10)+'</span>';
				infiList.appendChild(newLiIfo);
				if (givDomElement('.list__certificat_activ') === null) {
					newLi.className = 'list__certificat_item'+' '+'list__certificat_activ';
					givDomElement('.info__list_activ').classList.remove('info__list_activ');
					newLiIfo.className = 'info__list_item'+' '+'clo'+ decodeResult.dataFromSortResult['2.5.4.5'][1] +' '+'info__list_activ';
				} else {
					givDomElement('.list__certificat_activ').classList.remove('list__certificat_activ');
					givDomElement('.info__list_activ').classList.remove('info__list_activ');
					newLi.className = 'list__certificat_item'+' '+'list__certificat_activ';
					newLiIfo.className = 'info__list_item'+' '+'clo'+ decodeResult.dataFromSortResult['2.5.4.5'][1] +' '+'info__list_activ';
				};

				locObj = JSON.stringify(locObj);
				window.localStorage.setItem(decodeResult.dataFromSortResult['2.5.4.5'][1], locObj);
			};

			if(objCertificate !== null){
				objCertificate = JSON.parse(objCertificate, function (key, value) {
					if (key == 'serialNumber') return new Object (value);
					return value;
				});
				if (objCertificate.serialNumber.indexOf(decodeResult.dataFromSortResult['2.5.4.5'][1]) !== -1) {
					givDomElement('.info__list_activ').classList.remove('info__list_activ');
					givDomElement('.message-been-added').classList.add('info__list_activ');
				} else {
					objCertificate.serialNumber.push(decodeResult.dataFromSortResult['2.5.4.5'][1]);
					locStorObjCert = JSON.stringify(objCertificate);
					window.localStorage.setItem('objCertificate', locStorObjCert);
					locStorSetItem();
				};
			} else {
				objCertificate = {
					serialNumber:[decodeResult.dataFromSortResult['2.5.4.5'][1]]
				};
				locStorObjCert = JSON.stringify(objCertificate);
				window.localStorage.setItem('objCertificate', locStorObjCert);
				locStorSetItem();
			};
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