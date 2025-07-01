function ANDetection() {
    // Helper functions
    function qs(selector) {
        return document.querySelector(`[data-${selector}]`);
    }
    function setValue(el, value, attrName, extraAttrs = {}) {
        if (!el) return;
        if (el.getAttribute('data-input') === 'true') {
            el.value = value;
        } else {
            el.textContent = value;
        }
        if (attrName) el.setAttribute(`data-${attrName}`, value);
        for (const [k, v] of Object.entries(extraAttrs)) {
            el.setAttribute(k, v);
        }
    }

    // Browser detection
    const browserList = [
        { name: "Firefox", value: "Firefox" },
        { name: "Opera", value: "OPR" },
        { name: "Edge", value: "Edg" },
        { name: "Chrome", value: "Chrome" },
        { name: "Safari", value: "Safari" },
        { name: "IE", value: "MSIE" },
    ];
    const browserEl = qs('browser');
    if (browserEl) {
        const userAgent = navigator.userAgent;
        for (let i = 0; i < browserList.length; i++) {
            if (userAgent.indexOf(browserList[i].value) > -1) {
                setValue(browserEl, browserList[i].name, 'browser');
                break;
            }
        }
    }

    // OS detection
    const osEl = qs('os');
    if (osEl) {
        const userAgent = navigator.userAgent;
        let osName = '';
        if (userAgent.indexOf("Windows") > -1) osName = "Windows";
        else if (userAgent.indexOf("Mac") > -1) osName = "Mac";
        else if (userAgent.indexOf("X11") > -1) osName = "UNIX";
        else if (userAgent.indexOf("Linux") > -1) osName = "Linux";
        else if (userAgent.indexOf("Android") > -1) osName = "Android";
        else if (userAgent.indexOf("iPhone") > -1) osName = "iPhone";
        else if (userAgent.indexOf("iPad") > -1) osName = "iPad";
        else if (userAgent.indexOf("iPod") > -1) osName = "iPod";
        else if (userAgent.indexOf("BlackBerry") > -1) osName = "BlackBerry";
        else if (userAgent.indexOf("Windows Phone") > -1) osName = "Windows Phone";
        else if (userAgent.indexOf("Symbian") > -1) osName = "Symbian";
        else if (userAgent.indexOf("Nokia") > -1) osName = "Nokia";
        else if (userAgent.indexOf("webOS") > -1) osName = "webOS";
        else if (userAgent.indexOf("Bada") > -1) osName = "Bada";
        else if (userAgent.indexOf("Tizen") > -1) osName = "Tizen";
        if (osName) setValue(osEl, osName, 'os');
    }

    // Device detection
    const deviceEl = qs('device');
    if (deviceEl) {
        const userAgent = navigator.userAgent;
        let deviceType = "Desktop";
        if (/Mobile|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
            deviceType = "Mobile";
        } else if (/Tablet|iPad/i.test(userAgent)) {
            deviceType = "Tablet";
        }
        setValue(deviceEl, deviceType, 'device');
    }

    // Location detection
    fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
            // IP
            setValue(qs('ip'), data.ip, 'ip');

            // Country
            setValue(qs('country'), data.country_name, 'country', {
                'data-country-code': data.country,
                'data-country-code-iso': data.country_code_iso3 || '',
                'data-country-capital': data.country_capital || '',
                'data-country-tld': data.country_tld || '',
                'data-country-call': data.country_calling_code || ''
            });

            // State (localize for Indonesia)
            let region = data.region;
            if (data.country === 'ID') {
                const idStates = {
                    AC: 'Aceh', SU: 'Sumatera Utara', SB: 'Sumatera Barat', RI: 'Riau', KR: 'Kepulauan Riau',
                    JA: 'Jambi', SS: 'Sumatera Selatan', BB: 'Bangka Belitung', BE: 'Bengkulu', LA: 'Lampung',
                    JK: 'DKI Jakarta', JB: 'Jawa Barat', BT: 'Banten', JT: 'Jawa Tengah', JI: 'Jawa Timur',
                    YO: 'Daerah Istimewa Yogyakarta', BA: 'Bali', NB: 'Nusa Tenggara Barat', NT: 'Nusa Tenggara Timur',
                    KB: 'Kalimantan Barat', KT: 'Kalimantan Tengah', KI: 'Kalimantan Timur', KS: 'Kalimantan Selatan',
                    KU: 'Kalimantan Utara', SA: 'Sulawesi Utara', ST: 'Sulawesi Tengah', SG: 'Sulawesi Tenggara',
                    SR: 'Sulawesi Barat', SN: 'Sulawesi Selatan', GO: 'Gorontalo', MA: 'Maluku', MU: 'Maluku Utara',
                    PA: 'Papua', PB: 'Papua Barat'
                };
                region = idStates[data.region_code] || data.region;
            }
            setValue(qs('state'), region, 'state', {
                'data-state-id': data.region_code
            });

            // City
            const cityEl = qs('city');
            if (cityEl) {
                fetch("https://raw.githubusercontent.com/awpdesigns/data-lokasi/main/kota.json")
                    .then(res => res.json())
                    .then(cityData => {
                        let cityName = '', cityId = '';
                        for (const val of cityData) {
                            if (val.state === data.region_code && val.value.indexOf(data.city) >= 0) {
                                cityName = val.value;
                                cityId = val.id;
                                break;
                            }
                        }
                        setValue(cityEl, cityName, 'city', { 'data-city-id': cityId });
                        // District
                        const districtEl = qs('district');
                        if (districtEl) {
                            fetch("https://raw.githubusercontent.com/awpdesigns/data-lokasi/main/kecamatan.json")
                                .then(res => res.json())
                                .then(districtData => {
                                    let districtName = '', districtId = '';
                                    for (const val of districtData) {
                                        if (val.state === data.region_code && val.city_id === cityId) {
                                            districtName = val.value;
                                            districtId = val.id;
                                            break;
                                        }
                                    }
                                    setValue(districtEl, districtName, 'district', { 'data-district-id': districtId });
                                });
                        }
                    });
            }

            // Timezone
            setValue(qs('timezone'), data.timezone, 'timezone');

            // Currency
            setValue(qs('currency'), data.currency, 'currency', {
                'data-currency-name': data.currency_name || ''
            });

            // Language
            const langEl = qs('language');
            if (langEl && data.languages) {
                let primaryLanguage = data.languages.split(',')[0];
                let languageCode = primaryLanguage.split('-')[0];
                setValue(langEl, primaryLanguage.toUpperCase(), 'language', {
                    'data-language-set': data.languages
                });
            }

            // Latitude
            setValue(qs('latitude'), data.latitude, 'latitude');

            // Longitude
            setValue(qs('longitude'), data.longitude, 'longitude');

            // Organization
            setValue(qs('org'), data.org, 'organization');

            // ASN
            setValue(qs('asn'), data.asn, 'asn');
        });
}
ANDetection();
