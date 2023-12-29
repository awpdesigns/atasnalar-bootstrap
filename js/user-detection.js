function ANDetection() {
    // Detect Visitor Browser & OS
    let browser = $('[data-browser]'); // tag attribute data-browser
    let os = $('[data-os]'); // tag attribute data-os
    let device = $('[data-device]'); // tag attribute data-device
    let ip = $('[data-ip]'); // tag attribute data-ip
    let country = $('[data-country]'); // tag attribute data-country
    let state = $('[data-state]'); // tag attribute data-state
    let city = $('[data-city]'); // tag attribute data-city
    let district = $('[data-district]'); // tag attribute data-district
    let timezone = $('[data-timezone]'); // tag attribute data-timezone
    let currency = $('[data-currency]'); // tag attribute data-currency
    let language = $('[data-language]'); // tag attribute data-language
    let latitude = $('[data-latitude]'); // tag attribute data-latitude
    let longitude = $('[data-longitude]'); // tag attribute data-longtitude
    let org = $('[data-org]'); // tag attribute data-org
    let asn = $('[data-asn]'); // tag attribute data-asn

    // Browser List
    var browserList = [
        { name: "Firefox", value: "Firefox" },
        { name: "Opera", value: "OPR" },
        { name: "Edge", value: "Edg" },
        { name: "Chrome", value: "Chrome" },
        { name: "Safari", value: "Safari" },
        { name: "IE", value: "MSIE" },
    ];
    // Browser Check
    let browserCheck = () => {
        if (browser.length > 0) {
            let userAgent = navigator.userAgent;
            for (let i = 0; i < browserList.length; i++) {
                if (userAgent.indexOf(browserList[i].value) > -1) {
                    browser.text(browserList[i].name);
                    browser.attr('data-browser', browserList[i].name);
                    break;
                }
            }
        }
    }
    browserCheck();
    // OS Check
    let osCheck = () => {
        if (os.length > 0) {
            let userAgent = navigator.userAgent;
            if (userAgent.indexOf("Windows") > -1) {
                os.text("Windows");
                os.attr('data-os', "Windows");
            } else if (userAgent.indexOf("Mac") > -1) {
                os.text("Mac");
                os.attr('data-os', "Mac");
            } else if (userAgent.indexOf("X11") > -1) {
                os.text("UNIX");
                os.attr('data-os', "UNIX");
            } else if (userAgent.indexOf("Linux") > -1) {
                os.text("Linux");
                os.attr('data-os', "Linux");
            } else if (userAgent.indexOf("Android") > -1) {
                os.text("Android");
                os.attr('data-os', "Android");
            } else if (userAgent.indexOf("iPhone") > -1) {
                os.text("iPhone");
                os.attr('data-os', "iPhone");
            } else if (userAgent.indexOf("iPad") > -1) {
                os.text("iPad");
                os.attr('data-os', "iPad");
            } else if (userAgent.indexOf("iPod") > -1) {
                os.text("iPod");
                os.attr('data-os', "iPod");
            } else if (userAgent.indexOf("BlackBerry") > -1) {
                os.text("BlackBerry");
                os.attr('data-os', "BlackBerry");
            } else if (userAgent.indexOf("Windows Phone") > -1) {
                os.text("Windows Phone");
                os.attr('data-os', "Windows Phone");
            } else if (userAgent.indexOf("Symbian") > -1) {
                os.text("Symbian");
                os.attr('data-os', "Symbian");
            } else if (userAgent.indexOf("Nokia") > -1) {
                os.text("Nokia");
                os.attr('data-os', "Nokia");
            } else if (userAgent.indexOf("webOS") > -1) {
                os.text("webOS");
                os.attr('data-os', "webOS");
            } else if (userAgent.indexOf("Bada") > -1) {
                os.text("Bada");
                os.attr('data-os', "Bada");
            } else if (userAgent.indexOf("Tizen") > -1) {
                os.text("Tizen");
                os.attr('data-os', "Tizen");
            }
        }
    }
    osCheck();
    // Device Check
    let deviceCheck = () => {
        if (device.length > 0) {
            let userAgent = navigator.userAgent;
            if (userAgent.indexOf("Mobile") > -1) {
                device.text("Mobile");
                device.attr('data-device', "Mobile");
            } else if (userAgent.indexOf("Tablet") > -1) {
                device.text("Tablet");
                device.attr('data-device', "Tablet");
            } else {
                device.text("Desktop");
                device.attr('data-device', "Desktop");
            }
        }
    }
    deviceCheck();
    // Location Check
    let locationCheck = () => {
        $.getJSON('https://ipapi.co/json/', function (data) {
            // IP Check
            if (ip.length > 0) {
                if (ip.attr('data-input') == 'true') {
                    ip.val(data.ip);
                } else {
                    ip.text(data.ip);
                    ip.attr('data-ip', data.ip);
                }
            }
            // Country Check
            if (country.length > 0) {
                if (country.attr('data-input') == 'true') {
                    // Country Code
                    country.val(data.country);
                } else {
                    country.text(data.country_name);
                    country.attr('data-country', data.country_name);
                    country.attr('data-country-code', data.country);
                    country.attr('data-country-code-iso', data.country_code_iso3);
                    country.attr('data-country-capital', data.country_capital);
                    country.attr('data-country-tld', data.country_tld);
                    country.attr('data-country-call', data.country_calling_code);
                }
            }
            // State Check
            if (state.length > 0) {
                // Localize State From Country
                if (data.country == 'ID') {
                    // Convert to Local State
                    if (data.region_code == 'AC') {
                        data.region = 'Aceh';
                    }
                    if (data.region_code == 'SU') {
                        data.region = 'Sumatera Utara';
                    }
                    if (data.region_code == 'SB') {
                        data.region = 'Sumatera Barat';
                    }
                    if (data.region_code == 'RI') {
                        data.region = 'Riau';
                    }
                    if (data.region_code == 'KR') {
                        data.region = 'Kepulauan Riau';
                    }
                    if (data.region_code == 'JA') {
                        data.region = 'Jambi';
                    }
                    if (data.region_code == 'SS') {
                        data.region = 'Sumatera Selatan';
                    }
                    if (data.region_code == 'BB') {
                        data.region = 'Bangka Belitung';
                    }
                    if (data.region_code == 'BE') {
                        data.region = 'Bengkulu';
                    }
                    if (data.region_code == 'LA') {
                        data.region = 'Lampung';
                    }
                    if (data.region_code == 'JK') {
                        data.region = 'DKI Jakarta';
                    }
                    if (data.region_code == 'JB') {
                        data.region = 'Jawa Barat';
                    }
                    if (data.region_code == 'BT') {
                        data.region = 'Banten';
                    }
                    if (data.region_code == 'JT') {
                        data.region = 'Jawa Tengah';
                    }
                    if (data.region_code == 'JI') {
                        data.region = 'Jawa Timur';
                    }
                    if (data.region_code == 'YO') {
                        data.region = 'Daerah Istimewa Yogyakarta';
                    }
                    if (data.region_code == 'BA') {
                        data.region = 'Bali';
                    }
                    if (data.region_code == 'NB') {
                        data.region = 'Nusa Tenggara Barat';
                    }
                    if (data.region_code == 'NT') {
                        data.region = 'Nusa Tenggara Timur';
                    }
                    if (data.region_code == 'KB') {
                        data.region = 'Kalimantan Barat';
                    }
                    if (data.region_code == 'KT') {
                        data.region = 'Kalimantan Tengah';
                    }
                    if (data.region_code == 'KI') {
                        data.region = 'Kalimantan Timur';
                    }
                    if (data.region_code == 'KS') {
                        data.region = 'Kalimantan Selatan';
                    }
                    if (data.region_code == 'KU') {
                        data.region = 'Kalimantan Utara';
                    }
                    if (data.region_code == 'SA') {
                        data.region = 'Sulawesi Utara';
                    }
                    if (data.region_code == 'ST') {
                        data.region = 'Sulawesi Tengah';
                    }
                    if (data.region_code == 'SG') {
                        data.region = 'Sulawesi Tenggara';
                    }
                    if (data.region_code == 'SR') {
                        data.region = 'Sulawesi Barat';
                    }
                    if (data.region_code == 'SN') {
                        data.region = 'Sulawesi Selatan';
                    }
                    if (data.region_code == 'GO') {
                        data.region = 'Gorontalo';
                    }
                    if (data.region_code == 'MA') {
                        data.region = 'Maluku';
                    }
                    if (data.region_code == 'MU') {
                        data.region = 'Maluku Utara';
                    }
                    if (data.region_code == 'PA') {
                        data.region = 'Papua';
                    }
                    if (data.region_code == 'PB') {
                        data.region = 'Papua Barat';
                    }
                }
                // Start Check
                if (state.attr('data-input') == 'true') {
                    state.val(data.region_code);
                } else {
                    state.text(data.region);
                    state.attr('data-state', data.region);
                    state.attr('data-state-id', data.region_code);
                }
            }
            var data_state = data.region_code;
            var data_city = data.city;
            var data_city_name = '';
            var data_city_id = '';
            // City Check
            if (city.length > 0) {
                $.getJSON("https://raw.githubusercontent.com/awpdesigns/data-lokasi/main/kota.json", function (data) {
                    $.each(data, function (key, val) {
                        if (val.state == data_state) {
                            if (val.value.indexOf(data_city) >= 0) {
                                data_city_name = val.value;
                                data_city_id = val.id;
                                return false;
                            }
                        }
                    });
                    // Start Check
                    if (city.attr('data-input') == 'true') {
                        //city.val(data.city);
                        // Set City Value
                        city.val(data_city_name);
                        city.attr('data-city-id', data_city_id);
                    } else {
                        city.text(data_city_name);
                        city.attr('data-city', data_city_name);
                        city.attr('data-city-id', data_city_id);
                    }
                });
            }

            var data_district = '';
            var data_district_id = '';
            // District Check
            if (district.length > 0) {

                $.getJSON("https://raw.githubusercontent.com/awpdesigns/data-lokasi/main/kecamatan.json", function (data) {
                    $.each(data, function (key, val) {
                        if (val.state == data_state) {
                            if (val.city_id == data_city_id) {
                                data_district = val.value;
                                data_district_id = val.id;
                                return false;
                            }
                        }
                    });
                    // Set District Value
                    if (district.attr('data-input') == 'true') {
                        district.val(data_district);
                        district.attr('data-district-id', data_district_id);
                    } else {
                        district.text(data_district);
                        district.attr('data-district', data_district);
                        district.attr('data-district-id', data_district_id);
                    }
                });
            }

            // Timezone Check
            if (timezone.length > 0) {
                if (timezone.attr('data-input') == 'true') {
                    timezone.val(data.timezone);
                } else {
                    timezone.text(data.timezone);
                    timezone.attr('data-timezone', data.timezone);
                }
            }
            // Currency Check
            if (currency.length > 0) {
                if (currency.attr('data-input') == 'true') {
                    currency.val(data.currency);
                } else {
                    currency.text(data.currency);
                    currency.attr('data-currency', data.currency);
                    currency.attr('data-currency-name', data.currency_name);
                }
            }
            // Language Check
            if (language.length > 0) {
                // Get Primary Language
                let primaryLanguage = data.languages.split(',')[0];
                // Get Language Code
                let languageCode = primaryLanguage.split('-')[0];
                if (language.attr('data-input') == 'true') {
                    language.val(languageCode);
                    language.attr('data-language', data.languages);
                } else {
                    language.text(primaryLanguage.toUpperCase());
                    language.attr('data-language', languageCode);
                    language.attr('data-language-set', data.languages);
                }
            }
            // Latitude Check
            if (latitude.length > 0) {
                if (latitude.attr('data-input') == 'true') {
                    latitude.val(data.latitude);
                } else {
                    latitude.text(data.latitude);
                    latitude.attr('data-latitude', data.latitude);
                }
            }
            // Longitude Check
            if (longitude.length > 0) {
                if (longitude.attr('data-input') == 'true') {
                    longitude.val(data.longitude);
                } else {
                    longitude.text(data.longitude);
                    longitude.attr('data-longitude', data.longitude);
                }
            }
            // Organization Check
            if (org.length > 0) {
                if (org.attr('data-input') == 'true') {
                    org.val(data.org);
                } else {
                    org.text(data.org);
                    org.attr('data-organization', data.org);
                }
            }
            // ASN Check
            if (asn.length > 0) {
                if (asn.attr('data-input') == 'true') {
                    asn.val(data.asn);
                } else {
                    asn.text(data.asn);
                    asn.attr('data-asn', data.asn);
                }
            }
        });
    }
    locationCheck();
}
ANDetection();
