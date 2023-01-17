/**
 *
 * chatGPT-intl
 *
 * See https://github.com/asirihewage/chatGPT-intl
 */
import got from 'got';
import Configstore from 'configstore';

const config = new Configstore('google-translate-api');

/* eslint-disable */
let yr;

const wr = function (a) {
    return function () {
        return a
    }
};
const xr = function (a, b) {
for (let c = 0; c < b.length - 2; c += 3) {
    let d = b.charAt(c + 2)
    ;d = "a" <= d ? d.charCodeAt(0) - 87 : Number(d);
    d = "+" === b.charAt(c + 1) ? a >>> d : a << d;
    a = "+" === b.charAt(c) ? a + d & 4294967295 : a ^ d
}
return a
};

const window = {
    TKK: config.get('TKK') || '422854.923862967'
};

// BEGIN

function sM(a) {
    let e = [];
    let f;
    let g = 0;
    let c;
    let b;
    if (null !== yr)
        b = yr;
    else {
        b = wr(String.fromCharCode(84));
        c = wr(String.fromCharCode(75));
        b = [b(), b()];
        b[1] = c();
        b = (yr = window[b.join(c())] || "") || ""
    }
    let d = wr(String.fromCharCode(116));c = wr(String.fromCharCode(107));
    d = [d(), d()];
    d[1] = c();
    c = "&" + d.join("") + "=";
    d = b.split(".");
    b = Number(d[0]) || 0;
    for (; g < a.length; g++) {
        let l = a.charCodeAt(g);
        128 > l ? e[f++] = l : (2048 > l ? e[f++] = l >> 6 | 192 : (55296 === (l & 64512) && g + 1 < a.length && 56320 === (a.charCodeAt(g + 1) & 64512) ? (l = 65536 + ((l & 1023) << 10) + (a.charCodeAt(++g) & 1023),
            e[f++] = l >> 18 | 240,
            e[f++] = l >> 12 & 63 | 128) : e[f++] = l >> 12 | 224,
            e[f++] = l >> 6 & 63 | 128),
            e[f++] = l & 63 | 128)
    }
    a = b;
    for (f = 0; f < e.length; f++)
        a += e[f],
            a = xr(a, "+-a^+6");
    a = xr(a, "+-3^+b+-f");
    a ^= Number(d[1]) || 0;
    0 > a && (a = (a & 2147483647) + 2147483648);
    a %= 1E6;
    return c + (a.toString() + "." + (a ^ b))
}

yr = null;

// END
/* eslint-enable */


function updateTKK(opts) {
    opts = opts || {tld: 'com', proxy: {}, headers: {}};
    return new Promise(function (resolve, reject) {
        const now = Math.floor(Date.now() / 3600000);

        if (Number(window.TKK.split('.')[0]) === now) {
            resolve();
        } else {
            got('https://translate.google.' + opts.tld, {...opts.proxy, headers: opts.headers, timeout: 2000, retry: 0}).then(function (res) {
                const code = res.body.match(/TKK='.*?';/g);

                if (code) {
                    eval(code[0]);
                    /* eslint-disable no-undef */
                    if (typeof TKK !== 'undefined') {
                        window.TKK = TKK;
                        config.set('TKK', TKK);
                    }
                    /* eslint-enable no-undef */
                }

                /**
                 * Note: If the regex or the eval fail, there is no need to worry. The server will accept
                 * relatively old seeds.
                 */

                resolve();
            }).catch(function () {
                reject();
            });
        }
    });
}

function get(text, opts) {
    return updateTKK(opts).then(function () {
        let tk = sM(text);
        tk = tk.replace('&tk=', '');
        return {name: 'tk', value: tk};
    }).catch(function () {
        return null;
    });
}

export default get;