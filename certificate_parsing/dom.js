// ASN.1 JavaScript decoder
// Copyright (c) 2008-2018 Lapo Luchini <lapo@lapo.it>

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
// 
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

(function (undefined) {
"use strict";

var ASN1 = (typeof module !== 'undefined') ? require('./asn1.js') : window.ASN1,
    oids = (typeof module !== 'undefined') ? require('./oids.js') : window.oids,
    lineLength = 80,
    contentLength = 8 * lineLength,
    resultGetDataArr = [],
    DOM = {
        ellipsis: "\u2026",
        tag: function (tagName, className) {
            var t = document.createElement(tagName);
            t.className = className;
            return t;
        },
        text: function (str) {
            return document.createTextNode(str);
        },
        space: function () {
            var t = document.createElement('span');
            t.className = 'spaces';
            t.innerHTML = ' ';
            return t;
        },
        breakLines: function (str, length) {
            var lines = str.split(/\r?\n/),
                o = '';
            for (var i = 0; i < lines.length; ++i) {
                var line = lines[i];
                if (i > 0) o += "\n";
                while (line.length > length) {
                    o += line.substring(0, length);
                    o += "\n";
                    line = line.substring(length);
                }
                o += line;
            }
            return o;
        }
    };

ASN1.prototype.getDataArr = function (spaces) {
   resultGetDataArr.push(this.content(contentLength))
    if (this.sub !== null) {
        for (var i = 0, max = this.sub.length; i < max; ++i)
            this.sub[i].getDataArr(spaces);
    }
}


ASN1.prototype.toDOM = function (spaces) {
     var certificatSerial;
     var objCertificate = window.localStorage.getItem('objCertificate');
     var locStorObjCert;

    for (var i = 0; i < resultGetDataArr.length; i++) {
         
        if (resultGetDataArr[i].indexOf('2.5.4.5') !== -1) {
            certificatSerial = resultGetDataArr[i+1];
        }
    }

    if(objCertificate !== null){
        objCertificate = JSON.parse(objCertificate, function (key, value) {
            if (key == 'serialNumber') return new Object (value);
            return value;
        })
        if (objCertificate.serialNumber.indexOf(certificatSerial) !== -1) {
            document.querySelector('.info__list_activ').classList.remove('info__list_activ');
            document.querySelector('.message-been-added').classList.add('info__list_activ');
        } else {
                objCertificate.serialNumber.push(certificatSerial)
                locStorObjCert = JSON.stringify(objCertificate);
                window.localStorage.setItem('objCertificate', locStorObjCert);
                locStorSetItem();
        }
    } else {
        objCertificate = {
            serialNumber:[certificatSerial]
        };
        locStorObjCert = JSON.stringify(objCertificate);
        window.localStorage.setItem('objCertificate', locStorObjCert);
        locStorSetItem();
    };

    function locStorSetItem() {
        var locObj = {
            commonName: ['Common Name:', resultGetDataArr[39]],
            issuerCn: ['Issuer CN:', resultGetDataArr[11]],
            validFrom: ['Valid From:', resultGetDataArr[33].substring(0,10)],
            validTill: ['Valid Till:', resultGetDataArr[34].substring(0,10)]
        }

        var listCertificates = document.querySelector('.list__certificates'),
            newLi = document.createElement('li');
            newLi.setAttribute('dada-serial', certificatSerial);
            newLi.innerHTML = resultGetDataArr[39].toLowerCase();
            listCertificates.appendChild(newLi);

        var infiList = document.querySelector('.info__list'),
            newLiIfo = document.createElement('li');
            newLiIfo.innerHTML = '<span>'+'Common Name:'+' '+resultGetDataArr[39]+'</span>'+'<span>'+'Issuer CN:'+' '+resultGetDataArr[11]+'</span>'+'<span>'+ 'Valid From:'+' '+resultGetDataArr[33].substring(0,10)+'</span>'+'<span>'+'Valid Till:'+' '+resultGetDataArr[34].substring(0,10)+'</span>';
            infiList.appendChild(newLiIfo);
            if (document.querySelector('.list__certificat_activ') === null) {
                newLi.className = 'list__certificat_item'+' '+'list__certificat_activ';
                document.querySelector('.info__list_activ').classList.remove('info__list_activ');
                newLiIfo.className = 'info__list_item'+' '+'clo'+ certificatSerial+' '+'info__list_activ';
            } else {
                document.querySelector('.list__certificat_activ').classList.remove('list__certificat_activ');
                document.querySelector('.info__list_activ').classList.remove('info__list_activ');
                newLi.className = 'list__certificat_item'+' '+'list__certificat_activ';
                newLiIfo.className = 'info__list_item'+' '+'clo'+ certificatSerial+' '+'info__list_activ';
            }
        locObj = JSON.stringify(locObj);
        window.localStorage.setItem(certificatSerial, locObj);
    }

    resultGetDataArr = [];
};
ASN1.prototype.fakeHover = function (current) {
    this.node.className += " hover";
    if (current)
        this.head.className += " hover";
};
ASN1.prototype.fakeOut = function (current) {
    var re = / ?hover/;
    this.node.className = this.node.className.replace(re, "");
    if (current)
        this.head.className = this.head.className.replace(re, "");
};
ASN1.prototype.toHexDOM_sub = function (node, className, stream, start, end) {
    if (start >= end)
        return;
    var sub = DOM.tag("span", className);
    sub.appendChild(DOM.text(
        stream.hexDump(start, end)));
    node.appendChild(sub);
};
ASN1.prototype.toHexDOM = function (root) {
    var node = DOM.tag("span", "hex");
    if (root === undefined) root = node;
    this.head.hexNode = node;
    this.head.onmouseover = function () { this.hexNode.className = "hexCurrent"; };
    this.head.onmouseout  = function () { this.hexNode.className = "hex"; };
    node.asn1 = this;
    node.onmouseover = function () {
        var current = !root.selected;
        if (current) {
            root.selected = this.asn1;
            this.className = "hexCurrent";
        }
        this.asn1.fakeHover(current);
    };
    node.onmouseout  = function () {
        var current = (root.selected == this.asn1);
        this.asn1.fakeOut(current);
        if (current) {
            root.selected = null;
            this.className = "hex";
        }
    };
    this.toHexDOM_sub(node, "tag", this.stream, this.posStart(), this.posStart() + 1);
    this.toHexDOM_sub(node, (this.length >= 0) ? "dlen" : "ulen", this.stream, this.posStart() + 1, this.posContent());
    if (this.sub === null) {
        var start = this.posContent();
        var end = this.posEnd();
        if (end - start < 10 * 16)
            node.appendChild(DOM.text(
                this.stream.hexDump(start, end)));
        else {
            var end1 = start + 5 * 16 - (start & 0xF);
            var start2 = end - 16 - (end & 0xF);
            node.appendChild(DOM.text(
                this.stream.hexDump(start, end1)));
            var sub = DOM.tag("span", "skip");
            sub.appendChild(DOM.text("\u2026 skipping " + (start2 - end1) + " bytes \u2026\n"));
            node.appendChild(sub);
            node.appendChild(DOM.text(
                this.stream.hexDump(start2, end)));
        }
    } else if (this.sub.length > 0) {
        var first = this.sub[0];
        var last = this.sub[this.sub.length - 1];
        this.toHexDOM_sub(node, "intro", this.stream, this.posContent(), first.posStart());
        for (var i = 0, max = this.sub.length; i < max; ++i)
            node.appendChild(this.sub[i].toHexDOM(root));
        this.toHexDOM_sub(node, "outro", this.stream, last.posEnd(), this.posEnd());
    } else
        this.toHexDOM_sub(node, "outro", this.stream, this.posContent(), this.posEnd());
    return node;
};

})();