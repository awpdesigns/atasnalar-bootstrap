/*
    AN Form - Form Validation & Input Validation with Regex (Email, Phone, Password, etc) & Password Strength Meter & Toggle Password Button & Disable Space on Input & Disable Copy Paste Space on Input & Disable Autocomplete & Disable Spellcheck
    Author: Atas Nalar
    Version: 1.0
*/
var prefix = document.querySelector('html').getAttribute('data-prefix') || '';
function ANForm() {
    // Form Validation (on Submit, Input on Keyup)
    document.querySelectorAll('form').forEach(function(formElem) {
        var form = formElem;
        var inputs = formElem.querySelectorAll('input, textarea, select');
        var buttonSubmit = formElem.querySelector('button[type="submit"], input[type="submit"]');

        // State color
        var defaultBg = '#626970';
        var successBg = window.getComputedStyle(document.body).getPropertyValue('--' + prefix + 'success') || '#13ae6d';
        var successText = successBg;
        var dangerBg = window.getComputedStyle(document.body).getPropertyValue('--' + prefix + 'danger') || '#f94e4e';
        var dangerText = dangerBg;
        var warningBg = window.getComputedStyle(document.body).getPropertyValue('--' + prefix + 'warning') || '#ffa800';
        // Badge css
        var badgeCss = {
            'font-size': '0.75rem',
            'font-weight': 'normal',
            padding: '0 .25rem',
            'border-radius': '.25rem',
            'line-height': '1.5',
            'text-align': 'center',
            'vertical-align': 'baseline',
            'white-space': 'nowrap',
            display: 'inline-block',
            color: '#fff',
            'background-color': defaultBg,
        };

        // Check if form doesn't have class .an-form
        if (!form.classList.contains('an-form')) {
            // Stop here
            return;
        }

        // Feedback Class Type
        var floatingValidation = form.getAttribute('data-floating-validation');
        var invalidType = 'invalid-feedback';
        var validType = 'valid-feedback';
        if (floatingValidation === 'true') {
            invalidType = 'invalid-tooltip';
            validType = 'valid-tooltip';

            // Replace class .invalid-feedback with .invalid-tooltip
            form.querySelectorAll('[class^="invalid-"]').forEach(function (el) {
                var className = el.className;
                var newClassName = className.replace('invalid-feedback', 'invalid-tooltip');
                el.className = newClassName;
            });
            // Replace class .valid-feedback with .valid-tooltip
            form.querySelectorAll('[class^="valid-"]').forEach(function (el) {
                var className = el.className;
                var newClassName = className.replace('valid-feedback', 'valid-tooltip');
                el.className = newClassName;
            });

            // Set absolute position to badge
            badgeCss['position'] = 'absolute';
            badgeCss['z-index'] = '5';
            badgeCss['bottom'] = '100%';
            badgeCss['margin-bottom'] = '.1rem';
        }

        // Get form id
        var formID = formElem.getAttribute('id');
        // Check if form id is not empty
        if (!formID) {
            // Generate random id max 4 digits
            formID = 'an-form-' + Math.floor(Math.random() * 9999);
            // Add id to form
            formElem.setAttribute('id', formID);
        }
        // Check alert ".alert-an-form" is exist or not
        var parent = formElem.parentNode;
        var alertElem = parent.querySelector('.alert-an-form');
        if (!alertElem) {
            // Add alert ".alert-an-form" before form
            var div = document.createElement('div');
            div.id = 'alert-' + formID;
            div.className = 'alert-an-form';
            div.setAttribute('role', 'alert');
            div.setAttribute('aria-label', 'Form Alert');
            div.setAttribute('hidden', true);
            parent.insertBefore(div, formElem);
        } else {
            // Check if alert ".alert-an-form" has id or not
            if (!alertElem.id) {
                alertElem.id = 'alert-' + formID;
            } else {
                // Check if alert ".alert-an-form" has id but not same with form id
                if (alertElem.id !== 'alert-' + formID) {
                    alertElem.id = 'alert-' + formID;
                }
            }
            // Check if alert ".alert-an-form" has role or not
            if (!alertElem.hasAttribute('role') || !alertElem.getAttribute('role')) {
                alertElem.setAttribute('role', 'alert');
            }
            // Check if alert ".alert-an-form" has hidden attribute or not
            if (!alertElem.hasAttribute('hidden')) {
                alertElem.setAttribute('hidden', true);
            }
            // Check if alert ".alert-an-form" has class .d-none or not
            if (alertElem.classList.contains('d-none')) {
                alertElem.classList.remove('d-none');
            }
            // Check if alert ".alert-an-form" has aria-label or not
            if (!alertElem.hasAttribute('aria-label') || !alertElem.getAttribute('aria-label')) {
                alertElem.setAttribute('aria-label', 'Form Alert');
            }
        }

        // Turn off autocomplete and spellcheck for the form
        formElem.setAttribute('autocomplete', 'off');
        formElem.setAttribute('spellcheck', 'false');

        // Turn off autocomplete and spellcheck for all inputs
        inputs.forEach(function(input) {
            input.setAttribute('autocomplete', 'off');
            input.setAttribute('spellcheck', 'false');
        });

        // Add BOT Protection if not exist
        if (!formElem.querySelector('#bot')) {
            var botInput = document.createElement('input');
            botInput.type = 'text';
            botInput.name = 'bot';
            botInput.id = 'bot';
            botInput.className = 'noview';
            formElem.insertBefore(botInput, formElem.firstChild);
        }

        // Check if there is input type file exist
        if (formElem.querySelector('input[type="file"]')) {
            // Check if this has attribute enctype
            if (!formElem.hasAttribute('enctype') || formElem.getAttribute('enctype') === '') {
                // Set enctype attribute
                formElem.setAttribute('enctype', 'multipart/form-data');
            }
        }

        function checkRequired() {
            // Check if all fields (input/textarea/select) required are filled or if field is not required but has parents .form-check-required and this field not checked
            var allValid = true;
            form.querySelectorAll('input, select, textarea').forEach(function (el) {
                var required = el.required;
                var parentCheckRequired = el.closest('.form-check-required');
                if (!required && parentCheckRequired) {
                    // Check if this field is checkbox or radio
                    if (el.type === 'checkbox' || el.type === 'radio') {
                        var checked = parentCheckRequired.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked');
                        if (checked.length === 0) {
                            allValid = false;
                        }
                    }
                } else {
                    if (required && (el.value === '' || el.classList.contains('is-invalid'))) {
                        allValid = false;
                    }
                }
            });
            if (allValid) {
                buttonSubmit && buttonSubmit.removeAttribute('disabled');
            } else {
                buttonSubmit && buttonSubmit.setAttribute('disabled', true);
            }
        }
        function checkRequiredInValidation() {
            // Check if all fields (input/textarea/select) required are filled or if field is not required but has parent .form-check-required and this field not checked
            var allValid = true;
            form.querySelectorAll('input, select, textarea').forEach(function(el) {
                var required = el.required;
            var parentCheckRequired = el.closest('.form-check-required');
                if (!required && parentCheckRequired) {
                    // Check if this field is checkbox or radio
                    if (el.type === 'checkbox' || el.type === 'radio') {
                        var checked = parentCheckRequired.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked');
                        if (checked.length === 0) {
                            allValid = false;
                        }
                    }
                } else {
                    if (required && (el.value === '' || el.classList.contains('is-invalid'))) {
                        allValid = false;
                    }
                }
            });
            if (allValid && buttonSubmit) {
                buttonSubmit.removeAttribute('disabled');
            }
        }

        // Input Validation
        inputs.forEach(function (inputElem) {
            var input = inputElem;
            var inputName = input.getAttribute('name');
            var formGroup = input.closest('.form-group, .an-group');

            // Add Validation to input that has attribute [required] on keyup
            if (input.hasAttribute('required')) {
                // Find label for input and add asterisk
                var labels = form.querySelectorAll('label[for="' + inputName + '"]');
                labels.forEach(function (label) {
                    if (!label.querySelector('sup')) {
                        // Check if label has parent .form-floating
                        var isFloating = false;
                        var parent = label.parentElement;
                        while (parent) {
                            if (parent.classList && parent.classList.contains('form-floating')) {
                                isFloating = true;
                                break;
                            }
                            parent = parent.parentElement;
                        }
                        var sup = document.createElement('sup');
                        sup.style.color = 'red';
                        sup.textContent = '*';
                        if (isFloating) {
                            label.insertBefore(sup, label.firstChild);
                        } else {
                            label.appendChild(sup);
                        }
                    }
                });
                // On keyup & change for input or textarea
                input.addEventListener('keyup', function () {
                    if (input.value.length > 0 && input.checkValidity()) {
                        input.classList.remove('is-invalid');
                        input.classList.add('is-valid');
                    } else {
                        input.classList.add('is-invalid');
                        input.classList.remove('is-valid');
                    }
                    checkRequired();
                });
                input.addEventListener('change', function () {
                    if (input.value.length > 0 && input.checkValidity()) {
                        input.classList.remove('is-invalid');
                        input.classList.add('is-valid');
                    } else {
                        input.classList.add('is-invalid');
                        input.classList.remove('is-valid');
                    }
                    checkRequired();
                });
            } else {
                input.addEventListener('keyup', function () {
                    if (input.value.length > 0) {
                        input.classList.add('is-valid');
                    } else {
                        input.classList.remove('is-valid');
                    }
                });
            }

            // Disable space on input [data-whitespace="false"] and from copy paste whitespace/space
            if (input.getAttribute('data-whitespace') == 'false') {
                // Check if label exists
                let label = formGroup ? formGroup.querySelector('label') : null;
                let whitespace_validation;
                if (label) {
                    // Check if label parent has class .input-group, .form-floating
                    let parent = label.parentElement;
                    if (parent && (parent.classList.contains('input-group') || parent.classList.contains('form-floating'))) {
                        // Add Whitespace Validation Element on first child of .form-group or .an-group
                        let small = document.createElement('small');
                        small.className = 'an-whitespace-validation';
                        if (formGroup) formGroup.insertBefore(small, formGroup.firstChild);
                        whitespace_validation = small;
                    } else {
                        // Add Whitespace Validation Element after label
                        let small = document.createElement('small');
                        small.className = 'an-whitespace-validation';
                        label.insertAdjacentElement('afterend', small);
                        whitespace_validation = small;
                    }
                } else if (formGroup) {
                    // Add Whitespace Validation Element on first child of .form-group or .an-group
                    let small = document.createElement('small');
                    small.className = 'an-whitespace-validation';
                    formGroup.insertBefore(small, formGroup.firstChild);
                    whitespace_validation = small;
                }
                if (whitespace_validation) {
                    whitespace_validation.textContent = 'Space not allowed';
                    Object.assign(whitespace_validation.style, badgeCss, { backgroundColor: dangerBg, display: 'none' });
                }

                input.addEventListener('keypress', function (e) {
                    if (e.which === 32 || e.keyCode === 32) {
                        if (whitespace_validation) {
                            whitespace_validation.style.display = 'inline-block';
                            setTimeout(function () {
                                whitespace_validation.style.display = 'none';
                            }, 1500);
                        }
                        e.preventDefault();
                        return false;
                    }
                });

                input.addEventListener('paste', function (e) {
                    let text = (e.clipboardData || window.clipboardData).getData('text');
                    if (/\s/g.test(text)) {
                        if (whitespace_validation) {
                            whitespace_validation.style.display = 'inline-block';
                            setTimeout(function () {
                                whitespace_validation.style.display = 'none';
                            }, 1500);
                        }
                        e.preventDefault();
                    }
                });
            }

            // Only allow number on input [data-number="true"] and from copy paste number
            if (input.getAttribute('data-number') == 'true') {
                // Check if label exists
                let label = formGroup ? formGroup.querySelector('label') : null;
                let number_validation;
                if (label) {
                    // Check if label parent has class .input-group, .form-floating
                    let parent = label.parentElement;
                    if (parent && (parent.classList.contains('input-group') || parent.classList.contains('form-floating'))) {
                        // Add Number Validation Element on first child of .form-group or .an-group
                        let small = document.createElement('small');
                        small.className = 'an-number-validation';
                        if (formGroup) formGroup.insertBefore(small, formGroup.firstChild);
                        number_validation = small;
                    } else {
                        // Add Number Validation Element after label
                        let small = document.createElement('small');
                        small.className = 'an-number-validation';
                        label.insertAdjacentElement('afterend', small);
                        number_validation = small;
                    }
                } else if (formGroup) {
                    // Add Number Validation Element on first child of .form-group or .an-group
                    let small = document.createElement('small');
                    small.className = 'an-number-validation';
                    formGroup.insertBefore(small, formGroup.firstChild);
                    number_validation = small;
                }
                if (number_validation) {
                    number_validation.textContent = 'Only number allowed';
                    Object.assign(number_validation.style, badgeCss, { backgroundColor: dangerBg, display: 'none' });
                }

                input.addEventListener('keydown', function (e) {
                    let charCode = e.which || e.keyCode;
                    // Allow: backspace, delete, tab, escape, enter, arrows, home, end
                    if (
                        charCode === 8 || charCode === 9 || charCode === 13 || charCode === 27 ||
                        (charCode >= 35 && charCode <= 40)
                    ) {
                        return;
                    }
                    // Allow: Ctrl/cmd+A, Ctrl/cmd+C, Ctrl/cmd+V, Ctrl/cmd+X
                    if (
                        (e.ctrlKey || e.metaKey) &&
                        (charCode === 65 || charCode === 67 || charCode === 86 || charCode === 88)
                    ) {
                        return;
                    }
                    if (charCode >= 48 && charCode <= 57) {
                        if (number_validation) number_validation.style.display = 'none';
                    } else {
                        if (number_validation) {
                            number_validation.style.display = 'inline-block';
                            setTimeout(function () {
                                number_validation.style.display = 'none';
                            }, 1500);
                        }
                        e.preventDefault();
                        return false;
                    }
                });

                input.addEventListener('paste', function (e) {
                    let text = (e.clipboardData || window.clipboardData).getData('text');
                    if (!/^\d+$/.test(text)) {
                        if (number_validation) {
                            number_validation.style.display = 'inline-block';
                            setTimeout(function () {
                                number_validation.style.display = 'none';
                            }, 1500);
                        }
                        e.preventDefault();
                    }
                });
            }

            // Add Email Validation to input[type=email] that has a [data-email-validation=true]
            if (input.type === 'email' && input.getAttribute('data-email-validation') === 'true') {
                // Get custom domain from data-email-domain attribute
                var emailDomain = input.getAttribute('data-email-domain');
                var emailRegexp;
                if (!emailDomain) {
                    // Any domain allowed
                    emailRegexp = new RegExp('^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@([a-z0-9-]+\\.)+[a-z]{2,}$', 'im');
                } else {
                    emailDomain = emailDomain.replace(/\s/g, '').replace(/@/g, '');
                    if (emailDomain.indexOf(',') > -1) {
                        var emailDomainSplit = emailDomain.split(',');
                        var emailDomainJoin = emailDomainSplit.map(function (x) {
                            return '(' + x + ')';
                        }).join('|');
                        emailRegexp = new RegExp('^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@(' + emailDomainJoin + ')$', 'im');
                    } else {
                        emailRegexp = new RegExp('^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@(' + emailDomain + ')$', 'im');
                    }
                }

                // Find or create email validation element
                let email_validation;
                let label = formGroup ? formGroup.querySelector('label') : null;
                if (label) {
                    let parent = label.parentElement;
                    if (parent && (parent.classList.contains('input-group') || parent.classList.contains('form-floating'))) {
                        email_validation = formGroup ? formGroup.querySelector('.an-email-validation') : null;
                        if (!email_validation) {
                            email_validation = document.createElement('small');
                            email_validation.className = 'an-email-validation';
                            formGroup && formGroup.insertBefore(email_validation, formGroup.firstChild);
                        }
                    } else {
                        email_validation = formGroup ? formGroup.querySelector('.an-email-validation') : null;
                        if (!email_validation) {
                            email_validation = document.createElement('small');
                            email_validation.className = 'an-email-validation';
                            label.insertAdjacentElement('afterend', email_validation);
                        }
                    }
                } else if (formGroup) {
                    email_validation = formGroup.querySelector('.an-email-validation');
                    if (!email_validation) {
                        email_validation = document.createElement('small');
                        email_validation.className = 'an-email-validation';
                        formGroup.insertBefore(email_validation, formGroup.firstChild);
                    }
                }
                if (email_validation) {
                    Object.assign(email_validation.style, badgeCss);
                    email_validation.style.display = 'none';
                }

                function validateEmail() {
                    if (input.value.length > 0) {
                        if (emailRegexp.test(input.value)) {
                            input.classList.remove('is-invalid');
                            input.classList.add('is-valid');
                            if (email_validation) {
                                email_validation.style.backgroundColor = successBg;
                                email_validation.textContent = 'Email valid';
                                email_validation.style.display = 'inline-block';
                                setTimeout(function () {
                                    email_validation.style.display = 'none';
                                }, 1500);
                            }
                            if (!input.required) {
                                checkRequiredInValidation();
                            }
                        } else {
                            input.classList.remove('is-valid');
                            input.classList.add('is-invalid');
                            if (email_validation) {
                                email_validation.style.backgroundColor = dangerBg;
                                email_validation.textContent = 'Email not valid';
                                email_validation.style.display = 'inline-block';
                            }
                            buttonSubmit && buttonSubmit.setAttribute('disabled', true);
                        }
                    } else {
                        if (email_validation) {
                            email_validation.style.backgroundColor = defaultBg;
                            email_validation.textContent = '';
                            email_validation.style.display = 'none';
                        }
                        input.classList.remove('is-valid');
                        if (!input.required) {
                            input.classList.remove('is-invalid');
                            checkRequiredInValidation();
                        }
                    }
                }

                input.addEventListener('keyup', validateEmail);
                input.addEventListener('change', validateEmail);
                input.addEventListener('blur', validateEmail);
            }

            // Check if input type is url
            if (input.type === "url") {
                if (input.getAttribute("data-url-validation") === "true") {
                    // Add URL Validation Element
                    let url_validation;
                    let label = formGroup ? formGroup.querySelector("label") : null;
                    if (label) {
                        let parent = label.parentElement;
                        if (
                            parent &&
                            (parent.classList.contains("input-group") ||
                                parent.classList.contains("form-floating"))
                        ) {
                            let small = document.createElement("small");
                            small.className = "an-url-validation";
                            formGroup.insertBefore(small, formGroup.firstChild);
                            url_validation = small;
                        } else {
                            let small = document.createElement("small");
                            small.className = "an-url-validation";
                            label.insertAdjacentElement("afterend", small);
                            url_validation = small;
                        }
                    } else if (formGroup) {
                        let small = document.createElement("small");
                        small.className = "an-url-validation";
                        formGroup.insertBefore(small, formGroup.firstChild);
                        url_validation = small;
                    }
                    if (url_validation) {
                        url_validation.style.display = "none";
                        Object.assign(url_validation.style, badgeCss);
                    }
                    function isUrl(s) {
                        // URL can be filled with only domain name without http:// or https:// or www. or http://www. or https://www.
                        var regexp =
                            /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
                        return regexp.test(s);
                        // Whats mean of g or i or m etc?
                        // g: global. All matches (don't return after first match)
                        // i: insensitive. Case insensitive match (ignores case of [a-zA-Z])
                        // m: multiline. ^ and $ match start/end of line
                        // s: single line. Dot matches newline characters
                        // u: unicode. Treat pattern as a sequence of unicode code points
                        // y: sticky. Matches only from the index indicated by the lastIndex property of this regular expression in the target string (and does not attempt to match from any later indexes).
                    }
                    function validateUrl() {
                        if (input.value.length > 0) {
                            if (isUrl(input.value)) {
                                input.classList.remove("is-invalid");
                                input.classList.add("is-valid");
                                if (url_validation) {
                                    url_validation.style.backgroundColor = successBg;
                                    url_validation.textContent = "Url valid";
                                    url_validation.style.display = "inline-block";
                                    setTimeout(function () {
                                        url_validation.style.display = "none";
                                    }, 1500);
                                }
                                if (!input.required) {
                                    checkRequiredInValidation();
                                }
                            } else {
                                input.classList.remove("is-valid");
                                input.classList.add("is-invalid");
                                if (url_validation) {
                                    url_validation.style.backgroundColor = dangerBg;
                                    url_validation.textContent = "Url not valid";
                                    url_validation.style.display = "inline-block";
                                }
                                buttonSubmit && buttonSubmit.setAttribute("disabled", true);
                            }
                        } else {
                            if (url_validation) {
                                url_validation.style.backgroundColor = defaultBg;
                                url_validation.textContent = "";
                                url_validation.style.display = "none";
                            }
                            input.classList.remove("is-valid");
                            if (!input.required) {
                                input.classList.remove("is-invalid");
                                checkRequiredInValidation();
                            }
                        }
                    }
                    input.addEventListener("keyup", validateUrl);
                    input.addEventListener("change", validateUrl);
                    input.addEventListener("blur", validateUrl);
                }
            }

            // Add Phone Validation to input[type=tel] or input[type=text] that has a [data-phone-validation=true] and force to only numbers
            if ((input.type === "tel" || input.type === "text") && input.getAttribute("data-phone-validation") === "true") {
                var codeArea = input.getAttribute("data-code-area");
                var regexp = input.getAttribute("data-regexp");
                // Check if data-regexp is not set then use default regex and add default pattern to this attribute
                if (!regexp) {
                    regexp = '^\\+?[\\(]?[0-9]{3}[\\)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,8}$';
                }
                var phoneRegexp;
                if (codeArea) {
                    phoneRegexp = new RegExp('^\\+?' + codeArea + '[\\(]?[0-9]{3}[\\)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,8}$', 'im');
                } else {
                    phoneRegexp = new RegExp(regexp, 'im');
                }
                // Add Phone Validation Element
                let phone_validation;
                let label = formGroup ? formGroup.querySelector('label') : null;
                if (label) {
                    let parent = label.parentElement;
                    if (
                        parent &&
                        (parent.classList.contains('input-group') ||
                            parent.classList.contains('form-floating'))
                    ) {
                        let small = document.createElement('small');
                        small.className = 'an-phone-validation';
                        formGroup && formGroup.insertBefore(small, formGroup.firstChild);
                        phone_validation = small;
                    } else {
                        let small = document.createElement('small');
                        small.className = 'an-phone-validation';
                        label.insertAdjacentElement('afterend', small);
                        phone_validation = small;
                    }
                } else if (formGroup) {
                    let small = document.createElement('small');
                    small.className = 'an-phone-validation';
                    formGroup.insertBefore(small, formGroup.firstChild);
                    phone_validation = small;
                }
                if (phone_validation) {
                    Object.assign(phone_validation.style, badgeCss);
                    phone_validation.style.display = "none";
                }
                // Force input only number / Only ASCII character in that range allowed
                input.addEventListener('keypress', function (e) {
                    var charCode = e.which || e.keyCode;
                    if ((charCode >= 48 && charCode <= 57) || charCode == 43) {
                        if (phone_validation) phone_validation.style.display = "inline-block";
                    } else {
                        if (phone_validation) {
                            phone_validation.style.backgroundColor = dangerBg;
                            phone_validation.textContent = 'Only (+) and number allowed';
                            phone_validation.style.display = "inline-block";
                        }
                        e.preventDefault();
                    }
                });
                // Check if value match with pattern
                function validatePhone() {
                    var phoneValue = input.value;
                    // if first number is 0 and this input is required, replace it with codeArea
                    if (phoneValue.substring(0, 1) == "0" && input.required) {
                        if (codeArea) {
                            phoneValue = codeArea + phoneValue.substring(1);
                        } else {
                            phoneValue = phoneValue.substring(1);
                        }
                        input.value = phoneValue;
                    }
                    if (input.value.length > 0) {
                        if (phoneRegexp.test(input.value)) {
                            input.classList.remove('is-invalid');
                            input.classList.add('is-valid');
                            if (phone_validation) {
                                phone_validation.style.backgroundColor = successBg;
                                phone_validation.textContent = 'Number Valid';
                                phone_validation.style.display = "inline-block";
                            }
                            // If not required
                            if (!input.required) {
                                checkRequiredInValidation();
                            }
                            if (phone_validation) {
                                setTimeout(function () {
                                    phone_validation.style.display = "none";
                                }, 1500);
                            }
                        } else {
                            input.classList.remove('is-valid');
                            input.classList.add('is-invalid');
                            if (phone_validation) {
                                phone_validation.style.backgroundColor = dangerBg;
                                if (!input.required && input.value.length > 0) {
                                    if (
                                        codeArea &&
                                        phoneValue.substring(0, codeArea.length) !== codeArea &&
                                        phoneValue.substring(0, codeArea.length + 1) !== "+" + codeArea
                                    ) {
                                        phone_validation.textContent = 'Not Valid (Must start with ' + codeArea + ' or +' + codeArea + ')';
                                    } else {
                                        phone_validation.textContent = 'Not Valid';
                                    }
                                } else {
                                    phone_validation.textContent = 'Not Valid';
                                }
                                phone_validation.style.display = "inline-block";
                            }
                            if (buttonSubmit) buttonSubmit.setAttribute('disabled', true);
                        }
                    } else {
                        if (phone_validation) {
                            phone_validation.style.backgroundColor = defaultBg;
                            phone_validation.textContent = '';
                            phone_validation.style.display = "none";
                        }
                        input.classList.remove('is-valid');
                        // If not required
                        if (!input.required) {
                            input.classList.remove('is-invalid');
                            checkRequiredInValidation();
                        }
                    }
                }
                input.addEventListener('keyup', validatePhone);
                input.addEventListener('change', validatePhone);
                input.addEventListener('blur', validatePhone);
            }

            // Add Password Validation to input[type=password] that has a sibling with class .confirm-password
            // Add Toggle Password Button to input[type=password] that has a [data-toggle-password=true]
            // Add Password Strength Meter to input[type=password] that has a [data-password-strength=true] and validate from [data-regexp]
            if (input.type === 'password') {
                // Confirm Password Validation
                if (
                    input.id === 'an-confirm-password' ||
                    input.classList.contains('an-confirm-password')
                ) {
                    // Remove data-password-strength, data-regexp
                    input.removeAttribute('data-password-strength');
                    input.removeAttribute('data-regexp');

                    // Find or create password validation element
                    let password_validation;
                    let label = formGroup ? formGroup.querySelector('label') : null;
                    if (label) {
                        let parent = label.parentElement;
                        if (
                            parent &&
                            (parent.classList.contains('input-group') ||
                                parent.classList.contains('form-floating'))
                        ) {
                            password_validation = formGroup.querySelector('.an-password-validation');
                            if (!password_validation) {
                                password_validation = document.createElement('small');
                                password_validation.className = 'an-password-validation';
                                formGroup.insertBefore(password_validation, formGroup.firstChild);
                            }
                        } else {
                            password_validation = formGroup.querySelector('.an-password-validation');
                            if (!password_validation) {
                                password_validation = document.createElement('small');
                                password_validation.className = 'an-password-validation';
                                label.insertAdjacentElement('afterend', password_validation);
                            }
                        }
                    } else if (formGroup) {
                        password_validation = formGroup.querySelector('.an-password-validation');
                        if (!password_validation) {
                            password_validation = document.createElement('small');
                            password_validation.className = 'an-password-validation';
                            formGroup.insertBefore(password_validation, formGroup.firstChild);
                        }
                    }
                    if (password_validation) {
                        Object.assign(password_validation.style, badgeCss);
                        password_validation.style.display = 'none';
                    }

                    function validateConfirmPassword() {
                        let mainPassword = form.querySelector('.an-password');
                        if (input.value !== '') {
                            if (
                                mainPassword &&
                                input.value === mainPassword.value &&
                                mainPassword.classList.contains('is-valid')
                            ) {
                                input.classList.remove('is-invalid');
                                input.classList.add('is-valid');
                                if (!input.required) {
                                    checkRequiredInValidation();
                                } else {
                                    buttonSubmit && buttonSubmit.removeAttribute('disabled');
                                }
                                if (password_validation) {
                                    password_validation.style.backgroundColor = successBg;
                                    password_validation.textContent = 'Match';
                                    password_validation.style.display = 'inline-block';
                                    setTimeout(() => {
                                        password_validation.style.display = 'none';
                                    }, 1500);
                                }
                            } else {
                                input.classList.remove('is-valid');
                                input.classList.add('is-invalid');
                                buttonSubmit && buttonSubmit.setAttribute('disabled', true);
                                if (password_validation) {
                                    password_validation.style.backgroundColor = dangerBg;
                                    password_validation.textContent = 'Not Match';
                                    password_validation.style.display = 'inline-block';
                                }
                            }
                        } else {
                            input.classList.remove('is-valid');
                            if (!input.required) {
                                input.classList.remove('is-invalid');
                                checkRequiredInValidation();
                            }
                            if (password_validation) {
                                password_validation.style.backgroundColor = defaultBg;
                                password_validation.textContent = '';
                                password_validation.style.display = 'none';
                            }
                        }
                    }

                    input.addEventListener('keyup', validateConfirmPassword);

                    // Initial state
                    if (input.classList.contains('is-valid')) {
                        if (!input.required) {
                            checkRequiredInValidation();
                        } else {
                            buttonSubmit && buttonSubmit.removeAttribute('disabled');
                        }
                        if (password_validation) {
                            password_validation.style.backgroundColor = successBg;
                            password_validation.textContent = 'Match';
                            password_validation.style.display = 'inline-block';
                            setTimeout(() => {
                                password_validation.style.display = 'none';
                            }, 1500);
                        }
                    } else if (input.classList.contains('is-invalid')) {
                        buttonSubmit && buttonSubmit.setAttribute('disabled', true);
                        if (password_validation) {
                            password_validation.style.backgroundColor = dangerBg;
                            let mainPassword = form.querySelector('.an-password');
                            if (mainPassword && mainPassword.classList.contains('is-invalid')) {
                                password_validation.textContent = 'Require valid password!';
                            } else {
                                password_validation.textContent = 'Not Match';
                            }
                            password_validation.style.display = 'inline-block';
                        }
                    } else if (password_validation) {
                        password_validation.style.backgroundColor = defaultBg;
                        password_validation.textContent = '';
                        password_validation.style.display = 'none';
                    }
                }

                // Password Strength Meter
                if (input.getAttribute('data-password-strength') === 'true') {
                    // Find or create password strength and info elements
                    let password_strength, password_info;
                    let label = formGroup ? formGroup.querySelector('label') : null;
                    if (label) {
                        let parent = label.parentElement;
                        if (
                            parent &&
                            (parent.classList.contains('input-group') ||
                                parent.classList.contains('form-floating'))
                        ) {
                            password_strength = formGroup.querySelector('.an-password-strength');
                            if (!password_strength) {
                                password_strength = document.createElement('small');
                                password_strength.className = 'an-password-strength';
                                formGroup.insertBefore(password_strength, formGroup.firstChild);
                            }
                            password_info = formGroup.querySelector('.an-password-strength-data');
                            if (!password_info) {
                                password_info = document.createElement('div');
                                password_info.className = 'an-password-strength-data';
                                password_strength.insertAdjacentElement('afterend', password_info);
                            }
                        } else {
                            password_strength = formGroup.querySelector('.an-password-strength');
                            if (!password_strength) {
                                password_strength = document.createElement('small');
                                password_strength.className = 'an-password-strength';
                                label.insertAdjacentElement('afterend', password_strength);
                            }
                            password_info = formGroup.querySelector('.an-password-strength-data');
                            if (!password_info) {
                                password_info = document.createElement('div');
                                password_info.className = 'an-password-strength-data';
                                password_strength.insertAdjacentElement('afterend', password_info);
                            }
                        }
                    } else if (formGroup) {
                        password_strength = formGroup.querySelector('.an-password-strength');
                        if (!password_strength) {
                            password_strength = document.createElement('small');
                            password_strength.className = 'an-password-strength';
                            formGroup.insertBefore(password_strength, formGroup.firstChild);
                        }
                        password_info = formGroup.querySelector('.an-password-strength-data');
                        if (!password_info) {
                            password_info = document.createElement('div');
                            password_info.className = 'an-password-strength-data';
                            password_strength.insertAdjacentElement('afterend', password_info);
                        }
                    }
                    // Setup styles
                    if (password_strength) {
                        Object.assign(password_strength.style, badgeCss);
                        password_strength.style.display = 'none';
                    }
                    if (password_info) {
                        password_info.style.position = 'absolute';
                        password_info.style.top = '100%';
                        password_info.style.background = 'var(--' + prefix + 'body-bg)';
                        password_info.style.padding = '1rem';
                        password_info.style.borderRadius = '.25rem';
                        password_info.style.zIndex = '3';
                        password_info.style.color = 'currentColor';
                        password_info.style.boxShadow = '0 0.25rem 0.5rem rgba(0,0,0,0.08)';
                        password_info.style.border = '1px solid currentcolor';
                        password_info.style.marginTop = '0.25rem';
                        password_info.style.display = 'none';
                    }

                    // Build password info content
                    if (password_info) {
                        password_info.innerHTML = '';
                        let infoSmall = document.createElement('small');
                        infoSmall.textContent = 'Password must contain at least:';
                        password_info.appendChild(infoSmall);

                        let ulMain = document.createElement('ul');
                        ulMain.className = 'm-0 main';
                        let ulSub = document.createElement('ul');
                        ulSub.className = 'sub';
                        ulMain.appendChild(ulSub);
                        password_info.appendChild(ulMain);
                    }

                    // Default pattern
                    let minLength = 8;
                    let pattern = input.getAttribute('data-regexp');
                    let useDefault = !pattern;
                    let upper = true, lower = true, number = true, special = true;
                    if (pattern) {
                        // Parse pattern like "upper,min:6,number,special"
                        let parts = pattern.split(',');
                        upper = parts.includes('upper');
                        lower = parts.includes('lower');
                        number = parts.includes('number');
                        special = parts.includes('special');
                        let min = parts.find(p => p.startsWith('min:'));
                        if (min) minLength = parseInt(min.split(':')[1], 10) || 6;
                    }

                    // Add info items
                    if (password_info) {
                        let mainLi = document.createElement('li');
                        mainLi.innerHTML = `<small class="character-strength">${minLength} Character<span class="inc">, including:</span></small>`;
                        password_info.querySelector('.main').insertBefore(mainLi, password_info.querySelector('.main').firstChild);

                        if (upper) {
                            let li = document.createElement('li');
                            li.innerHTML = `<small class="uppercase-strength">1 Uppercase</small>`;
                            password_info.querySelector('.sub').appendChild(li);
                        }
                        if (lower) {
                            let li = document.createElement('li');
                            li.innerHTML = `<small class="lowercase-strength">1 Lowercase</small>`;
                            password_info.querySelector('.sub').appendChild(li);
                        }
                        if (number) {
                            let li = document.createElement('li');
                            li.innerHTML = `<small class="number-strength">1 Number</small>`;
                            password_info.querySelector('.sub').appendChild(li);
                        }
                        if (special) {
                            let li = document.createElement('li');
                            li.innerHTML = `<small class="special-strength">1 Special Character</small>`;
                            password_info.querySelector('.sub').appendChild(li);
                        }
                    }

                    function validateStrength() {
                        let val = input.value;
                        let valid = true;
                        if (password_info) {
                            // min length
                            let charElem = password_info.querySelector('.character-strength');
                            if (val.length >= minLength) {
                                charElem && (charElem.style.color = successText);
                            } else {
                                charElem && (charElem.style.color = dangerText);
                                valid = false;
                            }
                            // upper
                            if (upper) {
                                let el = password_info.querySelector('.uppercase-strength');
                                if (/[A-Z]/.test(val)) {
                                    el && (el.style.color = successText);
                                } else {
                                    el && (el.style.color = dangerText);
                                    valid = false;
                                }
                            }
                            // lower
                            if (lower) {
                                let el = password_info.querySelector('.lowercase-strength');
                                if (/[a-z]/.test(val)) {
                                    el && (el.style.color = successText);
                                } else {
                                    el && (el.style.color = dangerText);
                                    valid = false;
                                }
                            }
                            // number
                            if (number) {
                                let el = password_info.querySelector('.number-strength');
                                if (/[0-9]/.test(val)) {
                                    el && (el.style.color = successText);
                                } else {
                                    el && (el.style.color = dangerText);
                                    valid = false;
                                }
                            }
                            // special
                            if (special) {
                                let el = password_info.querySelector('.special-strength');
                                if (/[$@$!%*?&._-]/.test(val)) {
                                    el && (el.style.color = successText);
                                } else {
                                    el && (el.style.color = dangerText);
                                    valid = false;
                                }
                            }
                            // inc
                            let inc = password_info.querySelector('.inc');
                            if (
                                (!upper || /[A-Z]/.test(val)) &&
                                (!lower || /[a-z]/.test(val)) &&
                                (!number || /[0-9]/.test(val)) &&
                                (!special || /[$@$!%*?&._-]/.test(val))
                            ) {
                                inc && (inc.style.color = successText);
                            } else {
                                inc && (inc.style.color = 'currentcolor');
                            }
                        }
                        // Pattern check
                        let regex;
                        if (useDefault) {
                            regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&._-])[A-Za-z0-9$@$!%*?&._-]{' + minLength + ',}$');
                        } else {
                            let pat = '';
                            if (lower) pat += '(?=.*[a-z])';
                            if (upper) pat += '(?=.*[A-Z])';
                            if (number) pat += '(?=.*[0-9])';
                            if (special) pat += '(?=.*[$@$!%*?&._-])';
                            let allowed = '';
                            if (lower) allowed += 'a-z';
                            if (upper) allowed += 'A-Z';
                            if (number) allowed += '0-9';
                            if (special) allowed += '$@$!%*?&._-';
                            pat = '^' + pat + '[' + allowed + ']{' + minLength + ',}$';
                            regex = new RegExp(pat);
                        }
                        if (val.length > 0) {
                            if (regex.test(val)) {
                                input.classList.remove('is-invalid');
                                input.classList.add('is-valid');
                                if (password_strength) {
                                    password_strength.style.backgroundColor = successBg;
                                    password_strength.textContent = 'Strong';
                                    password_strength.style.display = 'inline-block';
                                }
                                if (!input.required) {
                                    checkRequiredInValidation();
                                } else {
                                    // Confirm password check
                                    let confirm = form.querySelector('.an-confirm-password');
                                    if (confirm) {
                                        if (confirm.value === val && input.classList.contains('is-valid')) {
                                            buttonSubmit && buttonSubmit.removeAttribute('disabled');
                                            confirm.classList.remove('is-invalid');
                                            confirm.classList.add('is-valid');
                                        } else {
                                            buttonSubmit && buttonSubmit.setAttribute('disabled', true);
                                            if (confirm.value !== '') {
                                                confirm.classList.remove('is-valid');
                                                confirm.classList.add('is-invalid');
                                                let pv = formGroup.querySelector('.an-password-validation');
                                                if (pv) {
                                                    pv.style.backgroundColor = dangerBg;
                                                    pv.textContent = 'Not Match';
                                                    pv.style.display = 'inline-block';
                                                }
                                            } else {
                                                confirm.classList.remove('is-invalid');
                                                confirm.classList.remove('is-valid');
                                            }
                                        }
                                    } else {
                                        buttonSubmit && buttonSubmit.removeAttribute('disabled');
                                    }
                                }
                                if (password_info) {
                                    password_info.classList.add('success');
                                    let inc = password_info.querySelector('.inc');
                                    inc && (inc.style.color = '#fff');
                                    password_info.style.backgroundColor = successBg;
                                    password_info.style.borderColor = successText;
                                    password_info.style.color = '#fff';
                                    password_info.querySelectorAll('small').forEach(s => s.style.color = '#fff');
                                    setTimeout(() => {
                                        password_info.style.display = 'none';
                                        password_strength && (password_strength.style.display = 'none');
                                        password_info.style.color = 'currentColor';
                                    }, 1500);
                                }
                            } else {
                                input.classList.remove('is-valid');
                                input.classList.add('is-invalid');
                                if (password_strength) {
                                    password_strength.style.backgroundColor = dangerBg;
                                    password_strength.textContent = 'Weak';
                                    password_strength.style.display = 'inline-block';
                                }
                                buttonSubmit && buttonSubmit.setAttribute('disabled', true);
                                if (password_info) {
                                    password_info.classList.remove('success');
                                    let inc = password_info.querySelector('.inc');
                                    inc && (inc.style.color = '');
                                    password_info.style.backgroundColor = 'var(--' + prefix + 'body-bg)';
                                    password_info.style.borderColor = 'inherit';
                                    password_info.style.color = 'currentColor';
                                    password_info.querySelectorAll('small').forEach(s => s.style.color = 'currentColor');
                                    password_info.style.display = 'block';
                                }
                            }
                        } else {
                            if (password_strength) {
                                password_strength.style.backgroundColor = defaultBg;
                                password_strength.textContent = '';
                                password_strength.style.display = 'none';
                            }
                            input.classList.remove('is-valid');
                            if (password_info) {
                                password_info.classList.remove('success');
                                let inc = password_info.querySelector('.inc');
                                inc && (inc.style.color = '');
                                password_info.style.backgroundColor = 'var(--' + prefix + 'body-bg)';
                                password_info.style.borderColor = 'inherit';
                                password_info.style.color = 'currentColor';
                                password_info.querySelectorAll('small').forEach(s => s.style.color = 'currentColor');
                                password_info.style.display = 'none';
                            }
                            if (!input.required) {
                                input.classList.remove('is-invalid');
                                checkRequiredInValidation();
                            }
                        }
                    }

                    input.addEventListener('keyup', validateStrength);

                    // Show/hide password info on focus/blur
                    input.addEventListener('focus', function () {
                        if (password_info) password_info.style.display = password_info.classList.contains('success') ? 'none' : 'block';
                    });
                    input.addEventListener('blur', function () {
                        if (password_info) password_info.style.display = 'none';
                    });
                }

                // Toggle Password Button
                if (input.getAttribute('data-toggle-password') === 'true') {
                    // Add toggle button if not exists
                    let toggle = formGroup ? formGroup.querySelector('.toggle-password') : null;
                    if (!toggle) {
                        let span = document.createElement('span');
                        span.className = 'toggle-password pass-closed';
                        span.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="fill:currentColor;"><path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm6 10 .002 8H6v-8h12zm-9-2V7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9z" /></svg>';
                        input.insertAdjacentElement('afterend', span);
                        toggle = span;
                    }
                    // Style input
                    input.style.paddingRight = '2.375rem';
                    // Style toggle
                    Object.assign(toggle.style, {
                        cursor: 'pointer',
                        display: 'block',
                        fontSize: '1.15rem',
                        height: '2.375rem',
                        lineHeight: '2.375rem',
                        position: 'absolute',
                        right: '0.25rem',
                        textAlign: 'center',
                        width: '2.375rem',
                        zIndex: 2,
                        top: '1.75rem',
                        color: 'var(--' + prefix + 'border-color,currentColor)'
                    });
                    // Keep secret badge
                    let keepSecret = formGroup ? formGroup.querySelector('.keep-secret') : null;
                    if (!keepSecret) {
                        let small = document.createElement('small');
                        small.className = 'keep-secret';
                        small.textContent = 'Keep secret!';
                        Object.assign(small.style, badgeCss, {
                            color: '#000',
                            backgroundColor: warningBg,
                            position: 'absolute',
                            right: '0px',
                            display: 'none'
                        });
                        input.insertAdjacentElement('beforebegin', small);
                        keepSecret = small;
                    }
                    // Adjust for .form-floating
                    if (input.parentElement && input.parentElement.classList.contains('form-floating')) {
                        toggle.style.top = '.65rem';
                    }
                    // Adjust if no label
                    if (!(formGroup && formGroup.querySelector('label'))) {
                        toggle.style.top = '0';
                        keepSecret.style.top = 'auto';
                        keepSecret.style.bottom = 'calc(100% + 0.25rem)';
                    }
                    // Toggle logic
                    toggle.addEventListener('click', function () {
                        if (toggle.classList.contains('pass-closed')) {
                            toggle.classList.remove('pass-closed');
                            toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="fill:currentColor;"><path d="M17 8V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2H9V7c0-1.654 1.346-3 3-3s3 1.346 3 3v1h2zm1 4 .002 8H6v-8h12z" /></svg>';
                            input.type = 'text';
                            if (window.innerWidth < 768) {
                                keepSecret && (keepSecret.style.display = 'none');
                            } else {
                                keepSecret && (keepSecret.style.display = 'inline-block');
                            }
                        } else {
                            toggle.classList.add('pass-closed');
                            toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="fill:currentColor;"><path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm6 10 .002 8H6v-8h12zm-9-2V7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9z" /></svg>';
                            input.type = 'password';
                            keepSecret && (keepSecret.style.display = 'none');
                        }
                    });
                }
            }

            // Count Character on input type text and textarea if [data-count="true"] attribute is set
            if ((input.getAttribute('data-count') === 'true' && input.tagName.toLowerCase() === 'input' && input.type === 'text') || (input.getAttribute('data-count') === 'true' && input.tagName.toLowerCase() === 'textarea')) {
                var maxlength = input.getAttribute('maxlength');
                if (!maxlength) maxlength = 500;

                // Helper to find or create counter element
                function getOrCreateCounterElem() {
                    let counter;
                    if (input.parentElement && input.parentElement.classList.contains('input-group')) {
                        counter = formGroup ? formGroup.querySelector('.an-counter-group') : null;
                        if (!counter) {
                            counter = document.createElement('small');
                            counter.className = 'an-counter an-counter-group';
                            counter.style.cssText = 'font-size:.75rem;color:currentColor;margin-top:.25em;position:absolute;right:0;bottom:0;top:100%';
                            formGroup && formGroup.querySelector('.input-group').appendChild(counter);
                        }
                    } else {
                        if (formGroup && formGroup.querySelector('label')) {
                            counter = formGroup.querySelector('.an-counter');
                            if (!counter) {
                                counter = document.createElement('small');
                                counter.className = 'an-counter';
                                counter.style.cssText = 'font-size:.75rem;color:currentColor;margin-top:.25em;position:absolute;right:0;';
                                formGroup.querySelector('label').insertAdjacentElement('afterend', counter);
                            }
                        } else {
                            counter = input.parentElement.querySelector('.an-counter');
                            if (!counter) {
                                counter = document.createElement('small');
                                counter.className = 'an-counter';
                                counter.style.cssText = 'font-size:.75rem;color:currentColor;margin-top:.25em;position:absolute;right:0;';
                                input.insertAdjacentElement('afterend', counter);
                            }
                        }
                    }
                    return counter;
                }

                var counterElem = getOrCreateCounterElem();

                function updateCounter() {
                    var valLen = input.value.length;
                    counterElem.textContent = 'Max. ' + valLen + '/' + maxlength + ' character';
                    if (valLen == maxlength) {
                        counterElem.style.color = dangerText;
                    } else {
                        counterElem.style.color = 'currentColor';
                    }
                    // Adjust position for input-group
                    if (input.closest('.input-group')) {
                        let groupCounter = input.closest('.input-group').querySelector('.an-counter-group');
                        if (input.classList.contains('is-invalid')) {
                            groupCounter && Object.assign(groupCounter.style, { top: 'auto', marginTop: '0' });
                        } else {
                            groupCounter && Object.assign(groupCounter.style, { top: '100%', marginTop: '.25rem' });
                        }
                    }
                }

                // Initial value
                counterElem.textContent = 'Max. ' + (input.value.length || 0) + '/' + maxlength + ' character';
                updateCounter();

                input.addEventListener('keyup', updateCounter);

                // Hide counter if maxlength is not set
                if (!input.hasAttribute('maxlength')) {
                    counterElem.style.display = 'none';
                    let warn = document.createElement('small');
                    warn.textContent = 'Please add maxlength attribute to this input/textarea';
                    if (input.parentElement && input.parentElement.classList.contains('input-group')) {
                        formGroup && formGroup.querySelector('.input-group').insertAdjacentElement('afterend', warn);
                    } else {
                        input.insertAdjacentElement('afterend', warn);
                    }
                }
            }

            // Multiple Checkbox with same name that is required
            if (input.type === 'checkbox') {
                // Check if there is multiple checkbox with same name
                if (formGroup && formGroup.querySelectorAll('input[type="checkbox"][name="' + input.name + '"]').length > 1) {
                    // Check if name has "[]" or not
                    if (!input.name.includes('[]')) {
                        formGroup.querySelectorAll('input[type="checkbox"][name="' + input.name + '"]').forEach(function (cb) {
                            cb.name = cb.name + '[]';
                        });
                    }
                }
                // Check if has parents with class .form-check-required
                var checkRequiredParent = input.closest('.form-check-required');
                if (checkRequiredParent) {
                    var label = checkRequiredParent.querySelector('.form-label');
                    // Check if label has children sup
                    if (label && !label.querySelector('sup')) {
                        var sup = document.createElement('sup');
                        sup.style.color = 'red';
                        sup.textContent = '*';
                        label.appendChild(sup);
                    }
                    // Get attribute data-min-check
                    var minCheck = checkRequiredParent.getAttribute('data-min-check');
                    if (!minCheck) minCheck = 1;
                    minCheck = parseInt(minCheck, 10);
                    // Find invalid feedback
                    var invalidFeedback = checkRequiredParent.querySelector('[class^="invalid-"]');
                    if (!invalidFeedback) {
                        var div = document.createElement('div');
                        div.className = invalidType;
                        div.textContent = 'Please select at least ' + minCheck + ' option';
                        checkRequiredParent.appendChild(div);
                    }
                    input.addEventListener('change', function () {
                        var totalChecked = checkRequiredParent.querySelectorAll('input[type="checkbox"]:checked').length;
                        if (totalChecked < minCheck) {
                            checkRequiredParent.classList.add('is-invalid');
                            if (buttonSubmit) buttonSubmit.setAttribute('disabled', true);
                        } else {
                            checkRequiredParent.classList.remove('is-invalid');
                            // Enable submit button if all required input is filled
                            var allRequired = form.querySelectorAll('input:required, select:required, textarea:required');
                            var invalidOrEmpty = Array.from(allRequired).filter(function (el) {
                                return el.value === '' || el.classList.contains('is-invalid');
                            });
                            if (invalidOrEmpty.length === 0 && buttonSubmit) {
                                buttonSubmit.removeAttribute('disabled');
                            }
                        }
                    });
                }
            }

            // Multiple Radio with same name that is required
            if (input.type === 'radio') {
                if (input.hasAttribute('required')) {
                    // Check if formGroup has class .form-check-required or not
                    if (formGroup && !formGroup.classList.contains('form-check-required')) {
                        formGroup.classList.add('form-check-required');
                    }
                }
                setTimeout(function () {
                    // Check if has parents with class .form-check-required or this has attribute required
                    var checkRequiredParent = input.closest('.form-check-required');
                    if (checkRequiredParent) {
                        var label = checkRequiredParent.querySelector('.form-label');
                        // Check if label has children sup
                        if (label && !label.querySelector('sup')) {
                            var sup = document.createElement('sup');
                            sup.style.color = 'red';
                            sup.textContent = '*';
                            label.appendChild(sup);
                        }
                        // Find invalid feedback
                        var invalidFeedback = checkRequiredParent.querySelector('[class^="invalid-"]');
                        // Check if invalid feedback is exist
                        if (!invalidFeedback) {
                            var div = document.createElement('div');
                            div.className = invalidType;
                            div.textContent = 'Please select one of these options';
                            checkRequiredParent.appendChild(div);
                        }
                        // On click submit button
                        if (buttonSubmit) {
                            buttonSubmit.addEventListener('click', function () {
                                var checked = checkRequiredParent.querySelectorAll('input[type="radio"]:checked');
                                if (checked.length === 0) {
                                    checkRequiredParent.classList.add('is-invalid');
                                    buttonSubmit.setAttribute('disabled', true);
                                } else {
                                    checkRequiredParent.classList.remove('is-invalid');
                                    // Enable submit button if all required input is filled
                                    var allRequired = form.querySelectorAll('input:required, select:required, textarea:required');
                                    var invalidOrEmpty = Array.from(allRequired).filter(function (el) {
                                        return el.value === '' || el.classList.contains('is-invalid');
                                    });
                                    if (invalidOrEmpty.length === 0) {
                                        buttonSubmit.removeAttribute('disabled');
                                    }
                                }
                            });
                        }
                        // On change and blur
                        input.addEventListener('change', function () {
                            var checked = checkRequiredParent.querySelectorAll('input[type="radio"]:checked');
                            if (checked.length === 0) {
                                checkRequiredParent.classList.add('is-invalid');
                                buttonSubmit && buttonSubmit.setAttribute('disabled', true);
                            } else {
                                checkRequiredParent.classList.remove('is-invalid');
                                // Enable submit button if all required input is filled
                                var allRequired = form.querySelectorAll('input:required, select:required, textarea:required');
                                var invalidOrEmpty = Array.from(allRequired).filter(function (el) {
                                    return el.value === '' || el.classList.contains('is-invalid');
                                });
                                if (invalidOrEmpty.length === 0 && buttonSubmit) {
                                    buttonSubmit.removeAttribute('disabled');
                                }
                            }
                        });
                        input.addEventListener('blur', function () {
                            var checked = checkRequiredParent.querySelectorAll('input[type="radio"]:checked');
                            if (checked.length === 0) {
                                checkRequiredParent.classList.add('is-invalid');
                                buttonSubmit && buttonSubmit.setAttribute('disabled', true);
                            } else {
                                checkRequiredParent.classList.remove('is-invalid');
                                // Enable submit button if all required input is filled
                                var allRequired = form.querySelectorAll('input:required, select:required, textarea:required');
                                var invalidOrEmpty = Array.from(allRequired).filter(function (el) {
                                    return el.value === '' || el.classList.contains('is-invalid');
                                });
                                if (invalidOrEmpty.length === 0 && buttonSubmit) {
                                    buttonSubmit.removeAttribute('disabled');
                                }
                            }
                        });
                    }
                }, 1000);
            }

            // File Input (No jQuery)
            if (input.type === 'file') {
                if (input.getAttribute('data-file-validation') === 'true') {
                    input.addEventListener('change', function () {
                        // Find invalid feedback
                        let invalidFeedback = formGroup ? formGroup.querySelector('[class^="invalid-"]') : null;
                        // Check if invalid feedback exists
                        if (!invalidFeedback && formGroup) {
                            invalidFeedback = document.createElement('div');
                            invalidFeedback.className = invalidType;
                            formGroup.appendChild(invalidFeedback);
                        }
                        // Get accept attribute
                        let accept = input.getAttribute('accept');
                        if (accept) {
                            accept = accept.split(',').map(function (item) {
                                return item.trim().replace('.', '');
                            });
                            // Extend accept for wildcards
                            if (accept.includes('image/*')) accept = accept.concat(['jpg', 'jpeg', 'png', 'gif', 'webp']);
                            if (accept.includes('video/*')) accept = accept.concat(['mp4', 'webm', 'ogg', 'mov', 'avi', 'wmv', 'flv', 'mkv', '3gp']);
                            if (accept.includes('audio/*')) accept = accept.concat(['mp3', 'wav', 'ogg', 'aac', 'wma', 'flac', 'alac', 'aiff', 'm4a']);
                            if (accept.includes('application/*')) accept = accept.concat(['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'zip', 'rar', 'apk', 'exe', 'txt', 'csv', 'json', 'xml', 'html', 'css', 'js', 'php', 'sql', 'psd', 'ai', 'eps', 'ps', 'ttf', 'otf', 'woff', 'woff2', 'eot', 'svg', 'ico', 'dwg', 'dxf', 'svgz', '3ds', 'max', 'blend', 'obj', 'stl', 'fbx', 'dae', 'glb', 'gltf', '3dm', '3mf', 'step', 'stp', 'skp', 'sketch']);
                            accept = accept.filter(function (item) {
                                return item !== 'image/*' && item !== 'video/*' && item !== 'audio/*' && item !== 'application/*';
                            });
                        }
                        // Get max file size and unit
                        let maxFileSize = input.getAttribute('data-max-size');
                        let maxSizeUnit = input.getAttribute('data-max-size-unit');
                        let invalidSizeMessage = input.getAttribute('data-invalid-size-message');
                        let invalidTypeMessage = input.getAttribute('data-invalid-type-message');
                        if (maxFileSize) {
                            maxFileSize = parseFloat(maxFileSize);
                            if (maxSizeUnit) {
                                maxSizeUnit = maxSizeUnit.toLowerCase();
                                if (maxSizeUnit === 'tb') maxFileSize *= 1024 * 1024 * 1024 * 1024;
                                else if (maxSizeUnit === 'gb') maxFileSize *= 1024 * 1024 * 1024;
                                else if (maxSizeUnit === 'mb') maxFileSize *= 1024 * 1024;
                                else if (maxSizeUnit === 'kb') maxFileSize *= 1024;
                            }
                        }
                        // Validate each file
                        Array.from(input.files).forEach(function (file) {
                            // File size check
                            if (maxFileSize && file.size > maxFileSize) {
                                if (invalidFeedback) invalidFeedback.textContent = invalidSizeMessage || 'File size too large';
                                input.classList.add('is-invalid');
                                input.value = '';
                                buttonSubmit && buttonSubmit.setAttribute('disabled', true);
                                return false;
                            } else if (invalidFeedback) {
                                invalidFeedback.textContent = '';
                                input.classList.remove('is-invalid');
                                checkRequiredInValidation();
                            }
                            // File type check
                            if (accept && accept.length > 0) {
                                let fileExtension = file.name.split('.').pop().toLowerCase();
                                if (!accept.includes(fileExtension)) {
                                    if (invalidFeedback) invalidFeedback.textContent = invalidTypeMessage || 'Invalid file type';
                                    input.classList.add('is-invalid');
                                    input.value = '';
                                    buttonSubmit && buttonSubmit.setAttribute('disabled', true);
                                    return false;
                                } else if (invalidFeedback) {
                                    invalidFeedback.textContent = '';
                                    input.classList.remove('is-invalid');
                                    checkRequiredInValidation();
                                }
                            }
                        });
                    });
                }
                let droppable = input.getAttribute('data-droppable');
                if (droppable === 'true') {
                    // Prevent duplicate
                    if (input.parentElement && input.parentElement.classList.contains('an-droppable-area')) return;
                    let droppableBtnText = input.getAttribute('data-droppable-btn-text') || 'Choose Files';
                    let droppableMsgText = input.getAttribute('data-droppable-msg-text') || 'or drop files here';
                    let DropArea = 'an-droppable-area';
                    let DropBtn = document.createElement('span');
                    DropBtn.className = 'an-droppable-btn btn btn-primary';
                    DropBtn.textContent = droppableBtnText;
                    let DropMsg = document.createElement('span');
                    DropMsg.className = 'an-droppable-msg';
                    DropMsg.textContent = droppableMsgText;
                    let DropDelete = document.createElement('div');
                    DropDelete.className = 'an-droppable-item-delete';
                    DropDelete.style.display = 'none';

                    input.classList.add('an-droppable-input');
                    // Wrap input file with div
                    let wrapper = document.createElement('div');
                    wrapper.className = DropArea;
                    input.parentNode.insertBefore(wrapper, input);
                    wrapper.appendChild(DropBtn);
                    wrapper.appendChild(DropMsg);
                    wrapper.appendChild(input);
                    wrapper.appendChild(DropDelete);

                    // Button click triggers input
                    DropBtn.addEventListener('click', function () {
                        input.click();
                    });

                    // Drag & drop events
                    ['dragenter', 'focus', 'click'].forEach(evt =>
                        input.addEventListener(evt, function () {
                            wrapper.classList.add('is-active');
                        })
                    );
                    ['dragleave', 'blur', 'drop'].forEach(evt =>
                        input.addEventListener(evt, function () {
                            wrapper.classList.remove('is-active');
                        })
                    );

                    // Change event
                    input.addEventListener('change', function () {
                        if (input.classList.contains('is-invalid')) {
                            wrapper.classList.add('is-invalid');
                            wrapper.classList.remove('is-valid', 'is-active');
                        } else {
                            wrapper.classList.remove('is-invalid');
                        }
                        if (input.classList.contains('is-valid')) {
                            wrapper.classList.add('is-valid');
                            wrapper.classList.remove('is-invalid');
                        } else {
                            wrapper.classList.remove('is-valid');
                        }
                        let filesCount = input.files.length;
                        if (filesCount === 1) {
                            let fileName = input.value.split('\\').pop();
                            DropMsg.textContent = fileName;
                            DropDelete.style.display = 'inline-block';
                        } else if (filesCount === 0) {
                            DropMsg.textContent = droppableMsgText;
                            DropDelete.style.display = 'none';
                        } else {
                            DropMsg.textContent = filesCount + ' files selected';
                            DropDelete.style.display = 'inline-block';
                        }
                    });

                    // Delete button
                    DropDelete.addEventListener('click', function () {
                        input.value = '';
                        DropMsg.textContent = droppableMsgText;
                        DropDelete.style.display = 'none';
                    });
                }
            }

            if (formGroup && !formGroup.querySelector('.form-floating') && floatingValidation === 'true') {
                formGroup.querySelectorAll('[class*="-validation"]').forEach(function (el) {
                    el.style.position = 'static';
                });
            }
        });
    });
};
if (document.querySelector('form').length > 0) {
    ANForm();
}

/* ======== Form Submit ======== */
function uploadForm(e) {
    var formElem = e.closest('form');
    var formId = formElem.id;
    var submitButton = formElem.querySelector('[type="submit"]');
    var submitButtonText = submitButton ? submitButton.textContent : '';
    var submitButtonProgressText = submitButton ? submitButton.getAttribute('data-progress-text') : '';
    if (!submitButtonProgressText) submitButtonProgressText = 'Sending...';
    var progress = formElem.querySelector('.an-submit-progress');
    var progressBar = progress ? progress.querySelector('.an-submit-progress-bar') : null;
    var alert = document.querySelector('.alert-an-form#alert-' + formId);
    var successMessage = formElem.getAttribute('data-success-message') || 'Thank you for your submission!';
    var errorMessage = formElem.getAttribute('data-error-message') || 'Something went wrong, please try again!';

    function setProgress(percent) {
        if (progressBar) progressBar.style.width = percent + '%';
    }

    function showAlert(msg, type) {
        if (!alert) return;
        alert.innerHTML = msg;
        alert.removeAttribute('hidden');
        alert.classList.remove('an-alert-danger', 'an-alert-success');
        alert.classList.add(type);
    }

    function hideAlert() {
        if (!alert) return;
        alert.setAttribute('hidden', true);
        alert.classList.remove('an-alert-danger', 'an-alert-success');
        alert.removeAttribute('style');
        alert.innerHTML = '';
    }

    function resetForm() {
        formElem.reset();
        formElem.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        formElem.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
        var dropMsg = formElem.querySelector('.an-droppable-msg');
        if (dropMsg) dropMsg.textContent = 'or drop files here';
        var dropDelete = formElem.querySelector('.an-droppable-item-delete');
        if (dropDelete) dropDelete.style.display = 'none';
        formElem.classList.remove('was-validated');
    }

    // Checkbox required validation
    var checkRequired = formElem.querySelector('.form-check-required');
    if (checkRequired) {
        var checkboxes = checkRequired.querySelectorAll('input[type="checkbox"]');
        var checked = Array.from(checkboxes).filter(cb => cb.checked);
        var minCheck = checkRequired.getAttribute('data-min-check');
        minCheck = minCheck ? parseInt(minCheck) : 1;
        if (checked.length < minCheck) {
            checkRequired.classList.add('is-invalid');
            var invalidType = 'invalid-feedback';
            if (!checkRequired.querySelector('[class^="invalid-"]')) {
                var div = document.createElement('div');
                div.className = invalidType;
                div.textContent = minCheck > 1 ? 'Please select min. ' + minCheck + ' option(s)!' : 'Please select at least one option!';
                checkRequired.appendChild(div);
            }
            showAlert(errorMessage, 'an-alert-danger');
            if (progress) progress.removeAttribute('hidden');
            setProgress(50);
            setTimeout(function () {
                setProgress(0);
                hideAlert();
                if (progress) progress.setAttribute('hidden', true);
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = submitButtonText;
                }
            }, 3000);
            return false;
        }
    }

    // Bot detection
    var botInput = formElem.querySelector('input[name="bot"]');
    if (botInput && botInput.value !== '') {
        showAlert('<strong><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M21.928 11.607c-.202-.488-.635-.605-.928-.633V8c0-1.103-.897-2-2-2h-6V4.61c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5c-1.103 0-2 .897-2 2v2.997l-.082.006A1 1 0 0 0 1.99 12v2a1 1 0 0 0 1 1H3v5c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5a1 1 0 0 0 1-1v-1.938a1.006 1.006 0 0 0-.072-.455zM5 20V8h14l.001 3.996L19 12v2l.001.005.001 5.995H5z"></path><ellipse cx="8.5" cy="12" rx="1.5" ry="2"></ellipse><ellipse cx="15.5" cy="12" rx="1.5" ry="2"></ellipse><path d="M8 16h8v2H8z"></path></svg> BOT DETECTED!</strong>', 'an-alert-danger');
        if (progress) progress.removeAttribute('hidden');
        setProgress(50);
        setTimeout(function () {
            setProgress(0);
            hideAlert();
            if (progress) progress.setAttribute('hidden', true);
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = submitButtonText;
            }
        }, 3000);
        return false;
    }

    // AJAX submit
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="an-loading-icon" role="status" aria-hidden="true">' + submitButtonProgressText + '</span>';
    }
    if (progress) {
        progress.removeAttribute('hidden');
        setProgress(0);
    }

    var formData = new FormData(formElem);
    var xhr = new XMLHttpRequest();
    xhr.open(formElem.method || 'POST', formElem.action);

    xhr.upload.onprogress = function (e) {
        if (e.lengthComputable) {
            var percent = Math.round((e.loaded / e.total) * 100);
            setProgress(percent);
        }
    };

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = submitButtonText;
            }
            setProgress(0);
            if (progress) progress.setAttribute('hidden', true);
            showAlert(successMessage, 'an-alert-success');
            setTimeout(function () {
                hideAlert();
                resetForm();
            }, 3000);
        } else {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = submitButtonText;
            }
            if (progress) progress.setAttribute('hidden', true);
            setProgress(0);
            showAlert(errorMessage, 'an-alert-danger');
            setTimeout(function () {
                hideAlert();
            }, 3000);
        }
    };

    xhr.onerror = function () {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = submitButtonText;
        }
        if (progress) progress.setAttribute('hidden', true);
        setProgress(0);
        showAlert(errorMessage, 'an-alert-danger');
        setTimeout(function () {
            hideAlert();
        }, 3000);
    };

    xhr.send(formData);
    return false;
}
