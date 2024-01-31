/*
    AN Form - Form Validation & Input Validation with Regex (Email, Phone, Password, etc) & Password Strength Meter & Toggle Password Button & Disable Space on Input & Disable Copy Paste Space on Input & Disable Autocomplete & Disable Spellcheck
    Author: Atas Nalar
    Version: 1.0
*/
// Check if jquery-form plugin is not exist in this page
if (typeof jQuery.fn.ajaxForm === 'undefined') {
    // Import jquery-form plugin
    $.getScript('https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.3.0/jquery.form.min.js');
}
var prefix = document.querySelector('html').getAttribute('data-prefix') || '';
var ANForm = function () {
    // Form Validation (on Submit, Input on Keyup)
    $('form').each(function () {
        var form = $(this);
        var inputs = form.find('input, textarea, select');
        var buttonSubmit = form.find('button[type="submit"], input[type="submit"]');

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
            'padding': '0 .25rem',
            'border-radius': '.25rem',
            'line-height': '1.5',
            'text-align': 'center',
            'vertical-align': 'baseline',
            'white-space': 'nowrap',
            'display': 'inline-block',
            'color': '#fff',
            'background-color': defaultBg,
        };

        // Check if form doesn't have class .an-form
        if (!form.hasClass('an-form')) {
            // Stop here
            return;
        }

        // Feedback Class Type
        var floatingValidation = form.attr('data-floating-validation');
        var invalidType = 'invalid-feedback';
        var validType = 'valid-feedback';
        if (floatingValidation === 'true') {
            invalidType = 'invalid-tooltip';
            validType = 'valid-tooltip';

            // Replace class .invalid-feedback with .invalid-tooltip
            form.find('[class^="invalid-"]').each(function () {
                var className = $(this).attr('class');
                var newClassName = className.replace('invalid-feedback', 'invalid-tooltip');
                $(this).removeClass(className);
                $(this).addClass(newClassName);
            });
            // Replace class .valid-feedback with .valid-tooltip
            form.find('[class^="valid-"]').each(function () {
                var className = $(this).attr('class');
                var newClassName = className.replace('valid-feedback', 'valid-tooltip');
                $(this).removeClass(className);
                $(this).addClass(newClassName);
            });

            // Set absolute position to badge
            badgeCss['position'] = 'absolute';
            badgeCss['z-index'] = '5';
            badgeCss['bottom'] = '100%';
            badgeCss['margin-bottom'] = '.1rem';
        }

        // Get form id
        var formID = form.attr('id');
        // Check if form id is not empty
        if (formID === undefined || formID === '') {
            // Generate random id max 4 digits
            formID = 'an-form-' + Math.floor(Math.random() * 9999);
            // Add id to form
            form.attr('id', formID);
        }
        // Check alert ".alert-an-form" is exist or not
        if (form.parent().find('.alert-an-form').length === 0) {
            // Add alert ".alert-an-form" before form
            form.before('<div id="alert-' + formID + '" class="alert-an-form" role="alert" aria-label="Form Alert" hidden></div>');
        } else {
            // Check if alert ".alert-an-form" has id or not
            if (form.parent().find('.alert-an-form').attr('id') === undefined || form.parent().find('.alert-an-form').attr('id') === '') {
                // Add id to alert ".alert-an-form"
                form.parent().find('.alert-an-form').attr('id', 'alert-' + formID);
            } else {
                // Check if alert ".alert-an-form" has id but not same with form id
                if (form.parent().find('.alert-an-form').attr('id') !== formID) {
                    // Add id to alert ".alert-an-form"
                    form.parent().find('.alert-an-form').attr('id', 'alert-' + formID);
                } else {
                    // Do nothing
                }
            }
            // Check if alert ".alert-an-form" has role or not
            if (form.parent().find('.alert-an-form').attr('role') === undefined || form.parent().find('.alert-an-form').attr('role') === '') {
                // Add role to alert ".alert-an-form"
                form.parent().find('.alert-an-form').attr('role', 'alert');
            }
            // Check if alert ".alert-an-form" has hidden attribute or not
            if (form.parent().find('.alert-an-form').attr('hidden') === undefined || form.parent().find('.alert-an-form').attr('hidden') === '') {
                // Add hidden attribute to alert ".alert-an-form"
                form.parent().find('.alert-an-form').attr('hidden', true);
            }
            // Check if alert ".alert-an-form" has class .d-none or not
            if (form.parent().find('.alert-an-form').hasClass('d-none')) {
                // Remove class .d-none
                form.parent().find('.alert-an-form').removeClass('d-none');
            }
            // Check if alert ".alert-an-form" has aria-label or not
            if (form.parent().find('.alert-an-form').attr('aria-label') === undefined || form.parent().find('.alert-an-form').attr('aria-label') === '') {
                // Add aria-label to alert ".alert-an-form"
                form.parent().find('.alert-an-form').attr('aria-label', 'Form Alert');
            }
        }

        // Turn off autocomplete for all forms
        form.attr('autocomplete', 'off');
        // Turn off spellcheck for all forms
        form.attr('spellcheck', 'false');

        // Turn off autocomplete for all inputs
        inputs.attr('autocomplete', 'off');
        // Turn off spellcheck for all inputs
        inputs.attr('spellcheck', 'false');

        // Add BOT Protection if not exist
        if (form.find('#bot').length === 0) {
            form.prepend('<input type="text" name="bot" id="bot" class="noview">');
        }

        // Check if there is input type file exist
        if (form.find('input[type="file"]').length) {
            // Check if this has attribute enctype
            if (form.attr('enctype') === undefined || form.attr('enctype') === '') {
                // Set enctype attribute
                form.attr('enctype', 'multipart/form-data');
            }
        }

        function checkRequired() {
            // if (form.find('input:required, select:required, textarea:required').filter(function () {
            //     return $(this).val() === '' || $(this).attr('class').includes('is-invalid');
            // }).length === 0) {
            //     // Disable submit button only inside form
            //     buttonSubmit.attr('disabled', false);
            // } else {
            //     buttonSubmit.attr('disabled', true);
            // }
            // Check if all fields (input/textarea/select) is required are filled or if field is not required but has parents .form-check-required and this field not checked
            if (form.find('input, select, textarea').filter(function () {
                if (!$(this).prop('required') && $(this).closest('.form-check-required').length) {
                    // Check if this field is checkbox or radio
                    if ($(this).attr('type') == 'checkbox' || $(this).attr('type') == 'radio') {
                        return $(this).closest('.form-check-required').find('input:checkbox:checked, input:radio:checked').length === 0;
                    } else {
                        return false;
                    }
                } else {
                    return $(this).prop('required') && $(this).val() === '' || $(this).prop('required') && $(this).attr('class').includes('is-invalid');
                }
            }).length === 0) {
                // Enable submit button if all required input is filled
                buttonSubmit.attr('disabled', false);
            } else {
                // Disable submit button
                buttonSubmit.attr('disabled', true);
            }
        }
        function checkRequiredInValidation() {
            // if (form.find('input:required, select:required, textarea:required').filter(function () {
            //     return $(this).val() === '' || $(this).attr('class').includes('is-invalid');
            // }).length === 0) {
            //     // Disable submit button only inside form
            //     buttonSubmit.attr('disabled', false);
            // }
            // Check if all fields (input/textarea/select) is required are filled or if field is not required but has parents .form-check-required and this field not checked
            if (form.find('input, select, textarea').filter(function () {
                if (!$(this).prop('required') && $(this).closest('.form-check-required').length) {
                    // Check if this field is checkbox or radio
                    if ($(this).attr('type') == 'checkbox' || $(this).attr('type') == 'radio') {
                        return $(this).closest('.form-check-required').find('input:checkbox:checked, input:radio:checked').length === 0;
                    } else {
                        return false;
                    }
                } else {
                    return $(this).prop('required') && $(this).val() === '' || $(this).prop('required') && $(this).attr('class').includes('is-invalid');
                }
            }).length === 0) {
                // Enable submit button if all required input is filled
                buttonSubmit.attr('disabled', false);
            }
        }

        // Input Validation
        inputs.each(function () {
            var input = $(this);
            var inputName = input.attr('name');
            var formGroup = input.closest('.form-group, .an-group');

            // Add Validation to input that has attribute [required] on keyup
            if (input.attr('required') !== undefined) {
                // Find label for input and add asterisk
                var label = form.find('label[for="' + inputName + '"]');
                // Check if label child sup exists
                label.each(function () {
                    if ($(this).find('sup').length == 0) {
                        // Check if label has parent .form-floating
                        if ($(this).parents().hasClass('form-floating')) {
                            // Add asterisk before label
                            $(this).prepend('<sup style="color:red;">*</sup>');
                        } else {
                            // Add asterisk after label
                            $(this).append('<sup style="color:red;">*</sup>');
                        }
                    }
                });
                // On keyup & change for input or textarea
                input.on('keyup', function () {
                    if (input.val().length > 0 && input.is(':valid')) {
                        input.removeClass('is-invalid');
                        input.addClass('is-valid');
                    } else {
                        input.addClass('is-invalid');
                        input.removeClass('is-valid');
                    }
                    checkRequired();
                });
            } else {
                input.on('keyup', function () {
                    if (input.val().length > 0) {
                        input.addClass('is-valid');
                    } else {
                        input.removeClass('is-valid');
                    }
                });
            }

            // Disable space on input [data-whitespace="false"] and from copy paste whitespace/space
            if ($(this).attr('data-whitespace') == 'false') {
                // Check if label exists
                if (formGroup.find('label').length) {
                    // Check if label parent has class .input-group, .form-floating
                    if (formGroup.find('label').parent().hasClass('input-group') || formGroup.find('label').parent().hasClass('form-floating')) {
                        // Add Whitespace Validation Element on first child of .form-group or .an-group
                        formGroup.prepend('<small class="an-whitespace-validation"></small>');
                    } else {
                        // Add Whitespace Validation Element after label
                        formGroup.find('label').after('<small class="an-whitespace-validation"></small>');
                    }
                } else {
                    // Add Phone Validation Element on first child of .form-group or .an-group
                    formGroup.prepend('<small class="an-whitespace-validation"></small>');
                }
                var whitespace_validation = formGroup.find('.an-whitespace-validation');
                // Set Text Whitespace Validation
                whitespace_validation.text('Space not allowed');
                // Whitespace Validation css
                whitespace_validation.css(badgeCss);
                // Add background color to Whitespace Validation Element
                whitespace_validation.css('background-color', dangerBg);
                // Hide Whitespace Validation Element First
                whitespace_validation.hide();
                $(this).on('keypress', function (e) {
                    if (e.which == 32) {
                        // Show Whitespace Validation Element
                        whitespace_validation.show();
                        // Set Timeout to hide Whitespace Validation Element
                        setTimeout(function () {
                            whitespace_validation.fadeOut('slow', function () { $(this).hide(); });
                        }, 1500);
                        return false;
                    }
                });

                $(this).on('paste', function (e) {
                    var text = e.originalEvent.clipboardData.getData('text');
                    if (text.match(/\s/g)) {
                        // Show Whitespace Validation Element
                        whitespace_validation.show();
                        // Set Timeout to hide Whitespace Validation Element
                        setTimeout(function () {
                            whitespace_validation.fadeOut('slow', function () { $(this).hide(); });
                        }, 1500);
                        e.preventDefault();
                    }
                });
            }

            // Only allow number on input [data-number="true"] and from copy paste number
            if ($(this).attr('data-number') == 'true') {
                // Check if label exists
                if (formGroup.find('label').length) {
                    // Check if label parent has class .input-group, .form-floating
                    if (formGroup.find('label').parent().hasClass('input-group') || formGroup.find('label').parent().hasClass('form-floating')) {
                        // Add Number Validation Element on first child of .form-group or .an-group
                        formGroup.prepend('<small class="an-number-validation"></small>');
                    } else {
                        // Add Number Validation Element after label
                        formGroup.find('label').after('<small class="an-number-validation"></small>');
                    }
                } else {
                    // Add Phone Validation Element on first child of .form-group or .an-group
                    formGroup.prepend('<small class="an-number-validation"></small>');
                }
                var number_validation = formGroup.find('.an-number-validation');
                // Set Text Number Validation
                number_validation.text('Only number allowed');
                // Number Validation css
                number_validation.css(badgeCss);
                // Add background color to Number Validation Element
                number_validation.css('background-color', dangerBg);
                // Hide Number Validation Element First
                number_validation.hide();
                $(this).on('keydown', function (e) {
                    var charCode = e.which || e.keyCode; // this deprecated but still works.

                    if (charCode >= 48 && charCode <= 57) {
                        number_validation.hide();
                    } else {
                        number_validation.show();
                        // Set Timeout to hide Number Validation Element
                        setTimeout(function () {
                            number_validation.fadeOut('slow', function () { $(this).hide(); });
                        }, 1500);
                    }
                    return (charCode >= 48 && charCode <= 57);
                });
            }

            // Add Email Validation to input[type=email] that has a [data-email-validation=true]
            if ($(this).is('[type="email"]')) {
                if ($(this).attr('data-email-validation') === 'true') {
                    // Get custom domain from data-email-domain attribute
                    var emailDomain = $(this).attr('data-email-domain');
                    // Check if data-email-domain is not set
                    if (emailDomain == undefined || emailDomain == '') {
                        // /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        // Any domain allowed
                        var emailRegexp = new RegExp('^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@([a-z0-9-]+\\.)+[a-z]{2,}$', 'im');
                    } else {
                        // Remove space from emailDomain
                        emailDomain = emailDomain.replace(/\s/g, '');
                        // Remove @ from emailDomain
                        emailDomain = emailDomain.replace(/@/g, '');
                        var emailRegexp = '';
                        // Check if data-email-domain has multiple domain separated by comma
                        if (emailDomain.indexOf(',') > -1) {
                            // Get each domain
                            var emailDomainSplit = emailDomain.split(',');
                            // Wrap each domain with pipe () and join them with pipe
                            var emailDomainJoin = emailDomainSplit.map(function (x) { return '(' + x + ')'; }).join('|');
                            // Create new RegExp with custom domain
                            emailRegexp = new RegExp('^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@(' + emailDomainJoin + ')$', 'im');
                        } else {
                            // Create new RegExp with custom domain
                            emailRegexp = new RegExp('^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@(' + emailDomain + ')$', 'im');
                        }
                    }

                    // Check if label exists
                    if (formGroup.find('label').length) {
                        // Check if label parent has class .input-group, .form-floating
                        if (formGroup.find('label').parent().hasClass('input-group') || formGroup.find('label').parent().hasClass('form-floating')) {
                            // Add Email Validation Element on first child of .form-group or .an-group
                            formGroup.prepend('<small class="an-email-validation"></small>');
                        } else {
                            // Add Email Validation Element after label
                            formGroup.find('label').after('<small class="an-email-validation"></small>');
                        }
                    } else {
                        // Add Email Validation Element on first child of .form-group or .an-group
                        formGroup.prepend('<small class="an-email-validation"></small>');
                    }
                    var email_validation = formGroup.find('.an-email-validation');
                    // Email Validation css
                    email_validation.css(badgeCss);
                    // Hide Email Validation Element First
                    email_validation.hide();

                    // Check if value match with pattern on keyup & blur
                    $(this).on('keyup change blur', function () {
                        if ($(this).val().length > 0) {
                            if (emailRegexp.test($(this).val())) {
                                $(this).removeClass('is-invalid');
                                $(this).addClass('is-valid');
                                email_validation.css('background-color', successBg);
                                email_validation.text('Email valid');
                                email_validation.show();
                                // If not required
                                if ($(this).attr('required') === undefined) {
                                    checkRequiredInValidation();
                                }
                                setTimeout(function () {
                                    email_validation.fadeOut('slow', function () { $(this).hide(); });
                                }, 1500);
                            } else {
                                $(this).removeClass('is-valid');
                                $(this).addClass('is-invalid');
                                email_validation.css('background-color', dangerBg);
                                email_validation.text('Email not valid');
                                email_validation.show();
                                // Disable submit button
                                buttonSubmit.attr('disabled', true);
                            }
                        } else {
                            email_validation.css('background-color', defaultBg);
                            $(this).removeClass('is-valid');
                            email_validation.text('');
                            email_validation.hide();
                            // If not required
                            if ($(this).attr('required') === undefined) {
                                $(this).removeClass('is-invalid');
                                checkRequiredInValidation();
                            }
                        }
                    });
                }

            }

            // Check if input type is url
            if ($(this).is('[type="url"]')) {
                // Check if has attribute data-url-validation="true"
                if ($(this).attr('data-url-validation') == 'true') {
                    // Check if label exists
                    if (formGroup.find('label').length) {
                        // Check if label parent has class .input-group, .form-floating
                        if (formGroup.find('label').parent().hasClass('input-group') || formGroup.find('label').parent().hasClass('form-floating')) {
                            // Add URL Validation Element on first child of .form-group or .an-group
                            formGroup.prepend('<small class="an-url-validation"></small>');
                        } else {
                            // Add URL Validation Element after label
                            formGroup.find('label').after('<small class="an-url-validation"></small>');
                        }
                    } else {
                        // Add URL Validation Element on first child of .form-group or .an-group
                        formGroup.prepend('<small class="an-url-validation"></small>');
                    }
                    var url_validation = formGroup.find('.an-url-validation');
                    // Url validation css
                    url_validation.css(badgeCss);
                    // Hide URL Validation Element First
                    url_validation.hide();
                    // Check if value is valid url
                    $(this).on('keyup change blur', function () {
                        if ($(this).val().length > 0) {
                            if (isUrl($(this).val())) {
                                $(this).removeClass('is-invalid');
                                $(this).addClass('is-valid');
                                url_validation.css('background-color', successBg);
                                url_validation.text('Url valid');
                                url_validation.show();
                                // If not required
                                if ($(this).attr('required') === undefined) {
                                    checkRequiredInValidation();
                                }
                                setTimeout(function () {
                                    url_validation.fadeOut('slow', function () { $(this).hide(); });
                                }, 1500);
                            } else {
                                $(this).removeClass('is-valid');
                                $(this).addClass('is-invalid');
                                url_validation.css('background-color', dangerBg);
                                url_validation.text('Url not valid');
                                url_validation.show();
                                // Disable submit button
                                buttonSubmit.attr('disabled', true);
                            }
                        } else {
                            url_validation.css('background-color', defaultBg);
                            $(this).removeClass('is-valid');
                            url_validation.text('');
                            url_validation.hide();
                            // If not required
                            if ($(this).attr('required') === undefined) {
                                $(this).removeClass('is-invalid');
                                checkRequiredInValidation();
                            }
                        }
                    });

                    // Check if value is valid url
                    function isUrl(s) {
                        // // URL must start with http:// or https:// or www. or http://www. or https://www.
                        // var regexp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

                        // URL can be filled with only domain name without http:// or https:// or www. or http://www. or https://www.
                        var regexp = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
                        // Whats mean of g or i or m etc?
                        // g: global. All matches (don't return after first match)
                        // i: insensitive. Case insensitive match (ignores case of [a-zA-Z])
                        // m: multiline. ^ and $ match start/end of line
                        // s: single line. Dot matches newline characters
                        // u: unicode. Treat pattern as a sequence of unicode code points
                        // y: sticky. Matches only from the index indicated by the lastIndex property of this regular expression in the target string (and does not attempt to match from any later indexes).

                        return regexp.test(s);
                    }
                }
            }

            // Add Phone Validation to input[type=tel] or input[type=text] that has a [data-phone-validation=true] and force to only numbers
            if ($(this).is('[type="tel"]') || $(this).is('[type="text"]')) {
                if ($(this).attr('data-phone-validation') === 'true') {
                    var codeArea = $(this).attr('data-code-area');
                    var regexp = $(this).attr('data-regexp');
                    // Check if data-regexp is not set then user default regex and add default pattern to this attribute
                    if ($(this).attr('data-regexp') == undefined || $(this).attr('data-regexp') == '') {
                        // Set Default Regex
                        var regexp = '^\\+?[\\(]?[0-9]{3}[\\)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,8}$';
                    }
                    if (codeArea !== undefined && codeArea !== '') {
                        var phoneRegexp = new RegExp('^\\+?' + codeArea + '[\\(]?[0-9]{3}[\\)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,8}$', 'im');
                    } else {
                        var phoneRegexp = new RegExp(regexp, 'im');
                    }
                    // Check if label exists
                    if (formGroup.find('label').length) {
                        // Check if label parent has class .input-group, .form-floating
                        if (formGroup.find('label').parent().hasClass('input-group') || formGroup.find('label').parent().hasClass('form-floating')) {
                            // Add Phone Validation Element on first child of .form-group or .an-group
                            formGroup.prepend('<small class="an-phone-validation"></small>');
                        } else {
                            // Add Phone Validation Element after label
                            formGroup.find('label').after('<small class="an-phone-validation"></small>');
                        }
                    } else {
                        // Add Phone Validation Element on first child of .form-group or .an-group
                        formGroup.prepend('<small class="an-phone-validation"></small>');
                    }
                    var phone_validation = formGroup.find('.an-phone-validation');
                    // Phone Validation css
                    phone_validation.css(badgeCss);
                    // Hide Phone Validation Element First
                    phone_validation.hide();
                    // Force input only number / Only ASCII character in that range allowed
                    /* Use on attribute version
                    $(this).attr('onkeypress', 'return (event.charCode >= 48 && event.charCode <= 57)');
                    */
                    $(this).on('keypress', function (e) {
                        var charCode = e.which || e.keyCode;
                        // Check if character is number or "+"
                        if (charCode >= 48 && charCode <= 57 || charCode == 43) {
                            phone_validation.show();
                        } else {
                            phone_validation.css('background-color', dangerBg);
                            phone_validation.text('Only (+) and number allowed');
                            phone_validation.show();
                        }
                        return (charCode >= 48 && charCode <= 57 || charCode == 43);
                    });
                    // Check if value match with pattern
                    $(this).on('keyup change blur', function () {
                        var phoneValue = $(this).val();

                        // if first number is 0 and this input is required, replace it with codeArea
                        if (phoneValue.substring(0, 1) == 0 && $(this).attr('required') !== undefined) {
                            if (codeArea !== undefined && codeArea !== '') {
                                phoneValue = codeArea + phoneValue.substring(1);
                            } else {
                                phoneValue = phoneValue.substring(1);
                            }
                            $(this).val(phoneValue);
                        }

                        if ($(this).val().length > 0) {
                            if (phoneRegexp.test($(this).val())) {
                                $(this).removeClass('is-invalid');
                                $(this).addClass('is-valid');
                                phone_validation.css('background-color', successBg);
                                phone_validation.text('Number Valid');
                                phone_validation.show();
                                // If not required
                                if ($(this).attr('required') === undefined) {
                                    checkRequiredInValidation();
                                }
                                setTimeout(function () {
                                    phone_validation.fadeOut('slow', function () { $(this).hide(); });
                                }, 1500);
                            } else {
                                $(this).removeClass('is-valid');
                                $(this).addClass('is-invalid');
                                phone_validation.css('background-color', dangerBg);
                                if ($(this).attr('required') === undefined && $(this).val().length > 0) {
                                        // If this input is not required and has value and first number is not equal with codeArea or not equal with +codeArea
                                        if (codeArea && phoneValue.substring(0, codeArea.length) !== codeArea && phoneValue.substring(0, codeArea.length + 1) !== '+' + codeArea) {
                                            phone_validation.text('Not Valid (Must start with ' + codeArea + ' or +' + codeArea + ')');
                                        } else {
                                            phone_validation.text('Not Valid');
                                        }
                                } else {
                                    phone_validation.text('Not Valid');
                                }
                                phone_validation.show();
                                // Disable submit button
                                buttonSubmit.attr('disabled', true);
                            }
                        } else {
                            phone_validation.css('background-color', defaultBg);
                            $(this).removeClass('is-valid');
                            phone_validation.text('');
                            phone_validation.hide();
                            // If not required
                            if ($(this).attr('required') === undefined) {
                                $(this).removeClass('is-invalid');
                                checkRequiredInValidation();
                            }
                        }
                    });
                }
            }

            // Add Password Validation to input[type=password] that has a sibling with class .confirm-password | Add Toggle Password Button to input[type=password] that has a [data-toggle-password=true] | Add Password Strength Meter to input[type=password] that has a [data-password-strength=true] and validate from [data-regexp]
            if ($(this).is('[type="password"]')) {
                // Confirm Password Validation
                if ($(this).attr('id') == 'an-confirm-password' || $(this).hasClass('an-confirm-password')) {
                    // Remove .password-strength, .password-strength-data, this attribute data-password-strength, data-regexp
                    $(this).removeAttr('data-password-strength');
                    $(this).removeAttr('data-regexp');
                    // Check if label exists
                    if (formGroup.find('label').length) {
                        // Check if label parent has class .input-group, .form-floating
                        if (formGroup.find('label').parent().hasClass('input-group') || formGroup.find('label').parent().hasClass('form-floating')) {
                            // Add Password Validation Element on first child of .form-group or .an-group
                            formGroup.prepend('<small class="an-password-validation"></small>');
                        } else {
                            // Add Password Validation Element after label
                            formGroup.find('label').after('<small class="an-password-validation"></small>');
                        }
                    } else {
                        // Add Password Validation Element on first child of .form-group or .an-group
                        formGroup.prepend('<small class="an-password-validation"></small>');
                    }
                    var password_validations = formGroup.find('.an-password-validation');
                    // Hide Password Validation Element First
                    password_validations.hide();
                    // Password Validation css
                    password_validations.css(badgeCss);

                    // Validate this value must same with other input[type=password] that are not #an-confirm-password or .an-confirm-password
                    $(this).on('keyup', function () {
                        if ($(this).val() !== '') {
                            if ($(this).val() === $('.an-password').val()) {
                                $(this).removeClass('is-invalid');
                                $(this).addClass('is-valid');
                                // If not required
                                if ($(this).attr('required') === undefined) {
                                    checkRequiredInValidation();
                                } else {
                                    // Enable submit button
                                    buttonSubmit.attr('disabled', false);
                                }
                                password_validations.css('background-color', successBg);
                                password_validations.text('Match');
                                password_validations.show();
                                setTimeout(function () {
                                    password_validations.fadeOut('slow', function () { $(this).hide(); });
                                }, 1500);
                            } else {
                                $(this).removeClass('is-valid');
                                $(this).addClass('is-invalid');
                                // Disable submit button
                                buttonSubmit.attr('disabled', true);
                                password_validations.css('background-color', dangerBg);
                                password_validations.text('Not Match');
                                password_validations.show();
                            }
                        } else {
                            $(this).removeClass('is-valid');
                            // If not required
                            if ($(this).attr('required') === undefined) {
                                $(this).removeClass('is-invalid');
                                checkRequiredInValidation();
                            }
                            password_validations.css('background-color', defaultBg);
                            password_validations.text('');
                        }
                    });
                    if ($(this).hasClass('is-valid')) {
                        // If not required
                        if ($(this).attr('required') === undefined) {
                            checkRequiredInValidation();
                        } else {
                            // Enable submit button
                            buttonSubmit.attr('disabled', false);
                        }
                        password_validations.css('background-color', successBg);
                        password_validations.text('Match');
                        password_validations.show();
                        setTimeout(function () {
                            password_validations.fadeOut('slow', function () { $(this).hide(); });
                        }, 1500);
                    } else if ($(this).hasClass('is-invalid')) {
                        // Disable submit button
                        buttonSubmit.attr('disabled', true);
                        password_validations.css('background-color', dangerBg);
                        password_validations.text('Not Match');
                        password_validations.show();
                    } else {
                        password_validations.css('background-color', defaultBg);
                        password_validations.text('');
                        password_validations.hide();
                    }
                }
                // Password Strength Meter
                if ($(this).attr('data-password-strength') == 'true') {
                    // Check if label exists
                    if (formGroup.find('label').length) {
                        // Check if label parent has class .input-group, .form-floating
                        if (formGroup.find('label').parent().hasClass('input-group') || formGroup.find('label').parent().hasClass('form-floating')) {
                            // Add Password Strength Element on first child of .form-group or .an-group
                            formGroup.prepend('<small class="an-password-strength"></small>');
                            // Add Password Strength Info Element
                            formGroup.find('.an-password-strength').after('<div class="an-password-strength-data"></div>');
                        } else {
                            // Add Password Strength Element after label
                            formGroup.find('label').after('<small class="an-password-strength"></small>');
                            // Add Password Strength Info Element
                            formGroup.find('.an-password-strength').after('<div class="an-password-strength-data"></div>');
                        }
                    } else {
                        // Add Password Strength Element on first child of .form-group or .an-group
                        formGroup.prepend('<small class="an-password-strength"></small>');
                        // Add Password Strength Info Element
                        formGroup.find('.an-password-strength').after('<div class="an-password-strength-data"></div>');
                    }
                    var password_strength = formGroup.find('.an-password-strength');
                    var password_info = formGroup.find('.an-password-strength-data');
                    // Append Password Strength Info Details
                    password_info.append('<small>Password must contain at least:</small>');
                    // Append Password Strength Info List Elements
                    password_info.append('<ul class="m-0 main"><ul class="sub"></ul></ul>');
                    // Color dark/light
                    var sDarkRgb = 'var(--' + prefix + 'body-color-rgb)';
                    var sWhite = 'var(--' + prefix + 'body-bg)';
                    // Password Strength css
                    password_strength.css(badgeCss);
                    // Password Strength Info css
                    password_info.css({
                        'position': 'absolute',
                        'top': '100%',
                        'background': sWhite,
                        'padding': '1rem',
                        'border-radius': '.25rem',
                        'z-index': '3',
                        'color': 'currentColor',
                        'box-shadow': '0 0.25rem 0.5rem rgba(' + sDarkRgb + ', 0.08)',
                        'border': '1px solid currentcolor',
                        'margin-top': '0.25rem',
                    });
                    // Hide Password Strength & Password Strength Info Element First
                    password_strength.hide();
                    password_info.hide();

                    // Check if data-regexp is not set then user default regex and add default pattern to this attribute
                    if ($(this).attr('data-password-strength') == 'true' && $(this).attr('data-regexp') == undefined || $(this).attr('data-password-strength') == 'true' && $(this).attr('data-regexp') == '') {
                        // Set Default Minimum Length
                        const minLength = 8;
                        // Set Default Password Pattern (Min 8 Character with 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character)
                        var password_pattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&._-])[A-Za-z0-9$@$!%*?&._-]{' + minLength + ',}$';

                        // Add Default Pattern
                        // $(this).attr('pattern', password_pattern);
                        // Append Password Strength Info List Element Details with their class name that matches with current pattern:
                        // ! 8 characters
                        formGroup.find('.an-password-strength-data ul.main').prepend('<li><small class="character-strength">' + minLength + ' Character<span class="inc">, including:</span></small></li>');
                        // ! 1 uppercase letter
                        formGroup.find('.an-password-strength-data ul.sub').append('<li><small class="uppercase-strength">1 Uppercase</small></li>');
                        // ! 1 lowercase letter
                        formGroup.find('.an-password-strength-data ul.sub').append('<li><small class="lowercase-strength">1 Lowercase</small></li>');
                        // ! 1 number
                        formGroup.find('.an-password-strength-data ul.sub').append('<li><small class="number-strength">1 Number</small></li>');
                        // ! 1 special character
                        formGroup.find('.an-password-strength-data ul.sub').append('<li><small class="special-strength">1 Special Character</small></li>');
                        // Check if value match with pattern and add success class to each pattern
                        $(this).on('keyup', function () {
                            var password = $(this).val();
                            // var password_pattern = $(this).attr('pattern');
                            if (password.length >= minLength) {
                                password_info.find('.character-strength').css('color', successText);
                            } else {
                                password_info.find('.character-strength').css('color', dangerText);
                            }
                            if (password.match(/[A-Z]/)) {
                                password_info.find('.uppercase-strength').css('color', successText);
                            } else {
                                password_info.find('.uppercase-strength').css('color', dangerText);
                            }
                            if (password.match(/[a-z]/)) {
                                password_info.find('.lowercase-strength').css('color', successText);
                            } else {
                                password_info.find('.lowercase-strength').css('color', dangerText);
                            }
                            if (password.match(/[0-9]/)) {
                                password_info.find('.number-strength').css('color', successText);
                            } else {
                                password_info.find('.number-strength').css('color', dangerText);
                            }
                            if (password.match(/[$@$!%*?&._-]/)) {
                                password_info.find('.special-strength').css('color', successText);
                            } else {
                                password_info.find('.special-strength').css('color', dangerText);
                            }
                            if (password.match(/[A-Z]/) && password.match(/[a-z]/) && password.match(/[0-9]/) && password.match(/[$@$!%*?&._-]/)) {
                                password_info.find('.inc').css('color', successText);
                            } else {
                                password_info.find('.inc').css('color', 'currentcolor');
                            }
                            if (password.length > 0) {
                                var regex = new RegExp(password_pattern);
                                if (regex.test($(this).val()) || password.match(password_pattern)) {
                                    $(this).removeClass('is-invalid');
                                    $(this).addClass('is-valid');
                                    password_strength.css('background-color', successBg);
                                    password_strength.text('Strong');
                                    password_strength.show();
                                    // If not required
                                    if ($(this).attr('required') === undefined) {
                                        checkRequiredInValidation();
                                    } else {
                                        // Check if there is confirmation password
                                        if (form.find('.an-confirm-password').length > 0) {
                                            // Check if confirmation password is valid
                                            if ($('.an-confirm-password').val() === $(this).val()) {
                                                // Enable submit button
                                                buttonSubmit.attr('disabled', false);
                                                // Add success class to confirmation password
                                                $('.an-confirm-password').removeClass('is-invalid');
                                                $('.an-confirm-password').addClass('is-valid');
                                            } else {
                                                // Disable submit button
                                                buttonSubmit.attr('disabled', true);
                                                // Add error class to confirmation password if value not match and has value
                                                if ($('.an-confirm-password').val() !== '') {
                                                    $('.an-confirm-password').removeClass('is-valid');
                                                    $('.an-confirm-password').addClass('is-invalid');
                                                    $('.an-password-validation').css('background-color', dangerBg);
                                                    $('.an-password-validation').text('Not Match');
                                                    $('.an-password-validation').show();
                                                } else {
                                                    $('.an-confirm-password').removeClass('is-invalid');
                                                    $('.an-confirm-password').removeClass('is-valid');
                                                }
                                            }
                                        } else {
                                            // Enable submit button
                                            buttonSubmit.attr('disabled', false);
                                        }
                                    }
                                    password_info.addClass('success');
                                    password_info.find('.inc').css('color',  '#fff');
                                    password_info.css({
                                        'background-color': successBg,
                                        'border-color': successText,
                                        'color': '#fff'
                                    });
                                    password_info.find('small').css('color', '#fff');
                                    formGroup.find('[class^="invalid-"]').hide();
                                    setTimeout(function () {
                                        password_info.fadeOut('slow', function () { $(this).hide(); });
                                        password_strength.hide();
                                        password_info.css('color', 'currentColor');
                                    }, 1500);
                                } else {
                                    $(this).removeClass('is-valid');
                                    $(this).addClass('is-invalid');
                                    password_strength.css('background-color', dangerBg);
                                    password_strength.text('Weak');
                                    password_strength.show();
                                    // Disable submit button
                                    buttonSubmit.attr('disabled', true);
                                    password_info.removeClass('success');
                                    password_info.find('.inc').css('color', '');
                                    password_info.css({
                                        'background-color': sWhite,
                                        'border-color': 'inherit',
                                        'color': 'currentColor'
                                    });
                                    password_info.children('small').css('color', 'currentColor');
                                    formGroup.find('[class^="invalid-"]').show();
                                    password_info.show();
                                }
                            } else {
                                password_strength.css('background-color', defaultBg);
                                $(this).removeClass('is-valid');
                                password_strength.text('');
                                password_strength.hide();
                                password_info.removeClass('success');
                                password_info.find('.inc').css('color', '');
                                password_info.css({
                                    'background-color': sWhite,
                                    'border-color': 'inherit',
                                    'color': 'currentColor'
                                });
                                password_info.children('small').css('color', 'currentColor');
                                password_info.hide();
                                // If not required
                                if ($(this).attr('required') === undefined) {
                                    formGroup.find('[class^="invalid-"]').hide();
                                    $(this).removeClass('is-invalid');
                                    checkRequiredInValidation();
                                }
                            }

                        });
                    } else {
                        // Convert each value in data-regexp="upper,min:2,number,special" to object
                        var regex_data = $(this).attr('data-regexp').split(',');
                        var regex_data_object = {};
                        for (var i = 0; i < regex_data.length; i++) {
                            var regex_data_split = regex_data[i].split(':');
                            regex_data_object[regex_data_split[0]] = regex_data_split[1];
                        }

                        // ! Check if include min:
                        if (regex_data_object.min && regex_data_object.min >= 6) {
                            var minLength = regex_data_object.min;

                            // Append this to Password Strength Info List Element Details with their class name that matches with current pattern:
                            formGroup.find('.an-password-strength-data ul.main').prepend('<li><small class="character-strength">' + minLength + ' Character<span class="inc">, and only allowed:</span></small></li>');
                        } else {
                            var minLength = 6;

                            formGroup.find('.an-password-strength-data ul.main').prepend('<li><small class="character-strength">' + minLength + ' Character<span class="inc">, and only allowed:</span></small></li>');
                        }
                        // ! Check if include upper:
                        if ($(this).attr('data-regexp').includes('upper')) {
                            var upperCase = 'A-Z';
                            var upperCase_match = new RegExp(/[A-Z]/);
                            var upperCase_pattern = '(?=.*[' + upperCase + '])';
                            // Extend and sum min{} if include upper
                            // if (regex_data_object.min) {
                            //     regex_data_object.min = parseInt(regex_data_object.min) + 1;
                            // }


                            // Append this to Password Strength Info List Element Details with their class name that matches with current pattern:
                            formGroup.find('.an-password-strength-data ul.sub').append('<li><small class="uppercase-strength">Uppercase</small></li>');
                        } else {
                            var upperCase = '';
                            var upperCase_pattern = '';
                            formGroup.find('.an-password-strength-data ul.main').append('<li style="list-style: &quot;*&quot;;font-style: italic;text-decoration: underline;"><small class="character-strength not-allowed">Uppercase Character (A-Z) not allowed</small></li>');
                        }
                        // ! Check if include lower:
                        if ($(this).attr('data-regexp').includes('lower')) {
                            var lowerCase = 'a-z';
                            var lowerCase_match = new RegExp(/[a-z]/);
                            var lowerCase_pattern = '(?=.*[' + lowerCase + '])';
                            // Extend and sum min{} if include lower
                            // if (regex_data_object.min) {
                            //     regex_data_object.min = parseInt(regex_data_object.min) + 1;
                            // }

                            // Append this to Password Strength Info List Element Details with their class name that matches with current pattern:
                            formGroup.find('.an-password-strength-data ul.sub').append('<li><small class="lowercase-strength">Lowercase</small></li>');
                        } else {
                            var lowerCase = '';
                            var lowerCase_pattern = '';
                            formGroup.find('.an-password-strength-data ul.main').append('<li style="list-style: &quot;*&quot;;font-style: italic;text-decoration: underline;"><small class="character-strength not-allowed">Lowercase Character (a-z) not allowed</small></li>');
                        }
                        // ! Check if include number:
                        if ($(this).attr('data-regexp').includes('number')) {
                            var number = '0-9';
                            var number_match = new RegExp(/[0-9]/);
                            var number_pattern = '(?=.*[' + number + '])';
                            // Extend and sum min{} if include number
                            // if (regex_data_object.min) {
                            //     regex_data_object.min = parseInt(regex_data_object.min) + 1;
                            // }

                            // Append this to Password Strength Info List Element Details with their class name that matches with current pattern:
                            formGroup.find('.an-password-strength-data ul.sub').append('<li><small class="number-strength">Number</small></li>');
                        } else {
                            var number = '';
                            var number_pattern = '';
                            formGroup.find('.an-password-strength-data ul.main').append('<li style="list-style: &quot;*&quot;;font-style: italic;text-decoration: underline;"><small class="character-strength not-allowed">Number Character (0-9) not allowed</small></li>');
                        }
                        // ! Check if include special:
                        if ($(this).attr('data-regexp').includes('special')) {
                            var special = '$@$!%*?&._-';
                            var special_match = new RegExp(/[$@$!%*?&._-]/);
                            var special_pattern = '(?=.*[' + special + '])';
                            // Extend and sum min{} if include special
                            // if (regex_data_object.min) {
                            //     regex_data_object.min = parseInt(regex_data_object.min) + 1;
                            // }

                            // Append this to Password Strength Info List Element Details with their class name that matches with current pattern:
                            formGroup.find('.an-password-strength-data ul.sub').append('<li><small class="special-strength">Special Character</small></li>');
                        } else {
                            var special = '';
                            var special_pattern = '';
                            formGroup.find('.an-password-strength-data ul.main').append('<li style="list-style: &quot;*&quot;;font-style: italic;text-decoration: underline;"><small class="character-strength not-allowed">Special Character ($@$!%*?&._-) not allowed</small></li>');
                        }

                        // // Add Default Pattern
                        // $(this).attr('pattern', '^' + lowerCase_pattern + upperCase_pattern + number_pattern + special_pattern + '[' + lowerCase + upperCase + number + special + ']{' + minLength + ',}$');

                        // Check if value match with pattern and add success class to each pattern
                        $(this).on('keyup', function () {
                            var password = $(this).val();
                            var password_pattern = '^' + lowerCase_pattern + upperCase_pattern + number_pattern + special_pattern + '[' + lowerCase + upperCase + number + special + ']{' + minLength + ',}$';
                            // console.log(password_pattern);

                            if (password.length > 0) {
                                var regex = new RegExp(password_pattern);
                                if (regex.test(password)) {
                                    password_strength.css('background-color', successBg);
                                    password_strength.text('Strong');
                                    password_strength.show();
                                } else {
                                    password_strength.css('background-color', dangerBg);
                                    password_strength.text('Weak');
                                    password_strength.show();
                                }
                            } else {
                                password_strength.css('background-color', defaultBg);
                                password_strength.text('');
                            }
                            if (password.length >= minLength) {
                                password_info.find('.character-strength:not(.not-allowed)').css('color', successText);
                            } else {
                                password_info.find('.character-strength:not(.not-allowed)').css('color', dangerText);
                            }
                            if (password.match(upperCase_match)) {
                                password_info.find('.uppercase-strength').css('color', successText);
                            } else {
                                password_info.find('.uppercase-strength').css('color', dangerText);
                            }
                            if (password.match(lowerCase_match)) {
                                password_info.find('.lowercase-strength').css('color', successText);
                            } else {
                                password_info.find('.lowercase-strength').css('color', dangerText);
                            }
                            if (password.match(number_match)) {
                                password_info.find('.number-strength').css('color', successText);
                            } else {
                                password_info.find('.number-strength').css('color', dangerText);
                            }
                            if (password.match(special_match)) {
                                password_info.find('.special-strength').css('color', successText);
                            } else {
                                password_info.find('.special-strength').css('color', dangerText);
                            }
                            if (password.match(upperCase_match) && password.match(lowerCase_match) && password.match(number_match) && password.match(special_match)) {
                                password_info.find('.inc').css('color', successText);
                            } else {
                                password_info.find('.inc').css('color', 'currentcolor');
                            }
                            if (password.match(password_pattern)) {
                                password_info.addClass('success');
                                password_info.find('.inc').css('color',  '#fff');
                                password_info.css({
                                    'background-color': successBg,
                                    'border-color': successText,
                                    'color': '#fff'
                                });
                                password_info.find('small').css('color', '#fff');
                                formGroup.find('[class^="invalid-"]').hide();
                                $(this).removeClass('is-invalid');
                                $(this).addClass('is-valid');
                                setTimeout(function () {
                                    password_info.fadeOut('slow', function () { $(this).hide(); });
                                    password_strength.hide();
                                    password_info.css('color', 'currentColor');
                                }, 1500);

                            } else {
                                password_info.removeClass('success');
                                password_info.find('.inc').css('color', 'currentcolor');
                                password_info.css({
                                    'background-color': sWhite,
                                    'border-color': 'inherit',
                                });
                                password_info.children('small').css('color', 'currentcolor');
                                password_info.find('.character-strength.not-allowed').css('color', 'currentcolor');
                                formGroup.find('[class^="invalid-"]').show();
                                password_info.show();
                            }
                        });

                    }

                    // Show Password Strength Info Element on focus
                    $(this).on('focus', function () {
                        password_info.show();

                        if (password_info.hasClass('success')) {
                            password_info.hide();
                        }
                    });
                    // Hide Password Strength Info Element on blur / not focus
                    $(this).on('blur', function () {
                        password_info.hide();
                    });
                }
                //Toggle Password Button
                if ($(this).attr('data-toggle-password') == 'true') {
                    var ClosedIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="fill:currentColor;"><path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm6 10 .002 8H6v-8h12zm-9-2V7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9z" /></svg>';
                    var OpenIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="fill:currentColor;"><path d="M17 8V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2H9V7c0-1.654 1.346-3 3-3s3 1.346 3 3v1h2zm1 4 .002 8H6v-8h12z" /></svg>';
                    // Styling Input with Toggle Password
                    $(this).css({
                        'padding-right': '2.375rem',
                    });
                    // Check if siblings has class .icon-control or not
                    if ($(this).siblings('.icon-control').length) {
                        // Add Toggle Password Element with Icon Class
                        $(this).after('<span class="toggle-password pass-closed">' + ClosedIcon + '</span>');
                        // Add Notifications password open & keep-secret
                        $(this).siblings('.icon-control').before('<small class="keep-secret">Keep secret!</small>');
                    } else {
                        // Add Toggle Password Element with Icon Class
                        $(this).after('<span class="toggle-password pass-closed">' + ClosedIcon + '</span>');
                        // Add Notifications password open & keep-secret
                        $(this).before('<small class="keep-secret">Keep secret!</small>');
                    }
                    var toggle_password = formGroup.find('.toggle-password');
                    toggle_password.css({
                        'cursor': 'pointer',
                        'display': 'block',
                        'font-size': '1.15rem',
                        'height': '2.375rem',
                        'line-height': '2.375rem',
                        'position': 'absolute',
                        'right': '0.25rem',
                        'text-align': 'center',
                        'width': '2.375rem',
                        'z-index': 2,
                        'top': '1.75rem',
                        // Use variable border-color and fallback to currentColor if not exists
                        'color': 'var(--' + prefix + 'border-color,currentColor)',
                    });
                    var keep_secret = formGroup.find('.keep-secret');
                    keep_secret.css(badgeCss);
                    // Hide .keep-secret Element First
                    keep_secret.hide();
                    keep_secret.css({
                        'color': '#000',
                        'background-color': warningBg,
                        'position': 'absolute',
                        'right': '0px',
                    });
                    // Check if parent has class .form-floating
                    if ($(this).parent().hasClass('form-floating')) {
                        // Custom css top
                        toggle_password.css('top', '.65rem');
                    }
                    // Parent find label
                    var label = formGroup.find('label');
                    // Check if label not exists
                    if (!label.length) {
                        // Custom css top
                        toggle_password.css('top', '0');
                        keep_secret.css({
                            'top': 'auto',
                            'bottom': 'calc(100% + 0.25rem)',
                        });
                    }
                    // Toggle password visibility
                    toggle_password.on('click', function () {
                        if ($(this).hasClass('pass-closed')) {
                            $(this).removeClass('pass-closed');
                            $(this).html(OpenIcon);
                            $(this).siblings('input').attr('type', 'text');
                            // Hide .keep-secret on device width < 768px
                            if ($(window).width() < 768) {
                                keep_secret.hide();
                            } else {
                                keep_secret.show();
                            }
                        } else {
                            $(this).addClass('pass-closed');
                            $(this).html(ClosedIcon);
                            keep_secret.hide();
                            $(this).siblings('input').attr('type', 'password');
                        }
                    });
                }
            }

            // Count Character on input type text and textarea if [data-count="true"] attribute is set
            if ($(this).attr('data-count') == 'true' && $(this).is('input[type="text"]') || $(this).attr('data-count') == 'true' && $(this).is('textarea')) {
                var maxlength = $(this).attr('maxlength');
                // Check if maxlength is not set
                if (maxlength == undefined || maxlength == '') {
                    maxlength = 500;
                }
                // Check if parent has class .input-group
                if ($(this).parent().hasClass('input-group')) {
                    // Add An-counter Element append .input-group
                    formGroup.find('.input-group').append('<small class="an-counter an-counter-group" style="font-size:.75rem;color:currentColor;margin-top:.25em;position: absolute;right: 0;bottom: 0;top:100%"></small>');
                } else {
                    // Check if label exists
                    if (formGroup.find('label').length) {
                        // Add An-counter Element after label
                        formGroup.find('label').after('<small class="an-counter" style="font-size:.75rem;color:currentColor;margin-top:.25em;position: absolute;right: 0;"></small>');
                    } else {
                        // Add An-counter Element after input/textarea
                        $(this).after('<small class="an-counter" style="font-size:.75rem;color:currentColor;margin-top:.25em;position: absolute;right: 0;"></small>');
                    }
                }
                // Add An-counter Element Value
                formGroup.find('.an-counter').text('Max. 0/' + maxlength + ' character');
                // Count Character on input and textarea
                $(this).on('keyup', function () {
                    formGroup.find('.an-counter').text('Max. ' + $(this).val().length + '/' + maxlength + ' character');
                    // Add .text-danger if character is more than maxlength
                    if ($(this).val().length == maxlength) {
                        formGroup.find('.an-counter').css('color', dangerText);
                    } else {
                        formGroup.find('.an-counter').css('color', 'currentColor');
                    }
                    if ($(this).closest('.input-group').find('[data-count="true"]').hasClass('is-invalid')) {
                        $(this).closest('.input-group').find('.an-counter-group').css({'top': 'auto', 'margin-top': '0'});
                    } else {
                        $(this).closest('.input-group').find('.an-counter-group').css({'top': '100%', 'margin-top': '.25rem'});
                    }
                });

                // If input value is not empty, set an-counter value
                if ($(this).val().length > 0) {
                    formGroup.find('.an-counter').text('Max ' + $(this).val().length + '/' + maxlength + ' character');
                    if ($(this).closest('.input-group').find('[data-count="true"]').hasClass('is-invalid')) {
                        $(this).closest('.input-group').find('.an-counter-group').css({'top': 'auto', 'margin-top': '0'});
                    } else {
                        $(this).closest('.input-group').find('.an-counter-group').css({'top': '100%', 'margin-top': '.25rem'});
                    }
                }

                // Hide An-counter Element if maxlength is not set
                if (maxlength == undefined) {
                    formGroup.find('.an-counter').hide();
                    // Check if parent has class .input-group
                    if ($(this).parent().hasClass('input-group')) {
                        formGroup.find('.input-group').after('<small>Please add maxlength attribute to this input/textarea</small>');
                    } else {
                        $(this).after('<small>Please add maxlength attribute to this input/textarea</small>');
                    }
                }
            }

            // Multiple Checkbox with same name that is required
            if ($(this).is('[type="checkbox"]')) {
                // Check if there is multiple checkbox with same name
                if (formGroup.find('input[type="checkbox"][name="' + $(this).attr('name') + '"]').length > 1) {
                    // Check if name has "[]" or not
                    if (!$(this).attr('name').includes('[]')) {
                        // Add "[]" to each checkbox name with same name
                        formGroup.find('input[type="checkbox"][name="' + $(this).attr('name') + '"]').each(function() {
                            $(this).attr('name', $(this).attr('name') + '[]');
                        });
                    }
                }
                // Check if has parents with class .form-check-required
                if ($(this).parents('.form-check-required').length) {
                    var label = $(this).parents('.form-check-required').children('.form-label');
                    // Check if label has children sup
                    if (label.children('sup').length === 0) {
                        // Append sup to label
                        label.append('<sup style="color:red;">*</sup>');
                    }
                    // Get attribute data-min-check
                    var minCheck = $(this).parents('.form-check-required').data('min-check');
                    // Check if minCheck is empty
                    if (minCheck === undefined || minCheck === '') {
                        // Set minCheck to 1
                        minCheck = 1;
                    }
                    // Find invalid feedback
                    var invalidFeedback = $(this).parents('.form-check-required').find('[class^="invalid-"]');
                    // Check if minCheck is not empty
                    if (minCheck !== undefined && minCheck !== '') {
                        // Check if invalid feedback is exist
                        if (invalidFeedback.length === 0) {
                            // Append invalid feedback
                            $(this).parents('.form-check-required').append('<div class="' + invalidType + '">Please select at least ' + minCheck + ' option</div>');
                        }
                        // On change
                        $(this).on('change', function() {
                            var totalChecked = $(this).parents('.form-check-required').find('input[type="checkbox"]:checked').length;
                            // Check if totalChecked is less than minCheck
                            if (totalChecked < minCheck) {
                                // Set is-invalid class to parents
                                $(this).parents('.form-check-required').addClass('is-invalid');
                                // Disable submit button
                                form.find('[type="submit"]').attr('disabled', true);
                            } else {
                                // Remove is-invalid class from parents
                                $(this).parents('.form-check-required').removeClass('is-invalid');
                                // Enable submit button if all required input is filled
                                if (form.find('input:required, select:required, textarea:required').filter(function() {
                                    return $(this).val() === '' || $(this).attr('class').includes('is-invalid');
                                }).length === 0) {
                                    buttonSubmit.attr('disabled', false);
                                }
                                // // Get all checked value
                                // var checkedValue = [];
                                // $(this).parents('.form-check-required').find('input[type="checkbox"]:checked').each(function() {
                                //     checkedValue.push($(this).val());
                                // });
                                // // Convert checkedValue to string
                                // checkedValue = checkedValue.join(',');
                                // checkedValue = checkedValue.replace(/,([^,]*)$/, ' and $1');
                                // // console.log(checkedValue);
                            }
                        });
                    }
                }
            }

            // Multiple Radio with same name that is required
            if ($(this).is('[type="radio"]')) {
                if ($(this).attr('required') !== undefined) {
                    // Check if form-group has class .form-check-required or not
                    if (!formGroup.hasClass('form-check-required')) {
                        // Add class .form-check-required to form-group
                        formGroup.addClass('form-check-required');
                    }
                }
                setTimeout(function() {
                    // Check if has parents with class .form-check-required or this has attribute required
                    if ($(this).parents('.form-check-required').length) {
                        var label = $(this).parents('.form-check-required').children('.form-label');
                        // Check if label has children sup
                        if (label.children('sup').length === 0) {
                            // Append sup to label
                            label.append('<sup style="color:red;">*</sup>');
                        }
                        // Find invalid feedback
                        var invalidFeedback = $(this).parents('.form-check-required').find('[class^="invalid-"]');
                        // Check if invalid feedback is exist
                        if (invalidFeedback.length === 0) {
                            // Append invalid feedback
                            $(this).parents('.form-check-required').append('<div class="' + invalidType + '">Please select one of these options</div>');
                        }
                        var $this = $(this);
                        // On click submit button
                        form.find('[type="submit"]').on('click', function() {
                            // Check if input type radio is checked or not
                            if ($this.parents('.form-check-required').find('input[type="radio"]:checked').length === 0) {
                                // Set is-invalid class to parents
                                $this.parents('.form-check-required').addClass('is-invalid');
                                // Disable submit button
                                form.find('[type="submit"]').attr('disabled', true);
                            } else {
                                // Remove is-invalid class from parents
                                $this.parents('.form-check-required').removeClass('is-invalid');
                                // Enable submit button if all required input is filled
                                if (form.find('input:required, select:required, textarea:required').filter(function() {
                                    return $(this).val() === '' || $(this).attr('class').includes('is-invalid');
                                }).length === 0) {
                                    buttonSubmit.attr('disabled', false);
                                }
                            }
                        });
                        // On change
                        $(this).on('change blur', function() {
                            // Check if input type radio is checked or not
                            if ($(this).parents('.form-check-required').find('input[type="radio"]:checked').length === 0) {
                                // Set is-invalid class to parents
                                $(this).parents('.form-check-required').addClass('is-invalid');
                                // Disable submit button
                                form.find('[type="submit"]').attr('disabled', true);
                            } else {
                                // Remove is-invalid class from parents
                                $(this).parents('.form-check-required').removeClass('is-invalid');
                                // Enable submit button if all required input is filled
                                if (form.find('input:required, select:required, textarea:required').filter(function() {
                                    return $(this).val() === '' || $(this).attr('class').includes('is-invalid');
                                }).length === 0) {
                                    buttonSubmit.attr('disabled', false);
                                }
                            }
                        });
                    }
                }.bind(this), 1000);
            }

            // File Input
            if ($(this).is('[type="file"]')) {
                if ($(this).attr('data-file-validation') === 'true') {
                    // On change
                    $(this).on('change', function() {
                        var $this = $(this);
                        // Find invalid feedback
                        var $invalidFeedback = formGroup.find('[class^="invalid-"]');
                        // Check if invalid feedback is exist
                        if ($invalidFeedback.length === 0) {
                            // Append invalid feedback
                            formGroup.append('<div class="' + invalidType + '"></div>');
                        }
                        // Get accept attribute
                        var accept = $(this).attr('accept');
                        // Convert accept to readable format array
                        accept = accept.split(',').map(function(item) {
                            return item.trim().replace('.', '');
                        });
                        // Check if accept contains image/* or video/* or audio/*
                        // Convert to readable format. Example: image/* to 'jpg', 'jpeg', 'png', 'gif', 'webp'. etc.
                        if (accept.includes('image/*')) {
                            // Extend accept
                            accept = accept.concat(['jpg', 'jpeg', 'png', 'gif', 'webp']);
                        }
                        if (accept.includes('video/*')) {
                            // Extend accept
                            accept = accept.concat(['mp4', 'webm', 'ogg', 'mov', 'avi', 'wmv', 'flv', 'mkv', '3gp']);
                        }
                        if (accept.includes('audio/*')) {
                            // Extend accept
                            accept = accept.concat(['mp3', 'wav', 'ogg', 'aac', 'wma', 'flac', 'alac', 'aiff', 'm4a']);
                        }
                        if (accept.includes('application/*')) {
                            // Extend accept
                            accept = accept.concat(['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'zip', 'rar', 'apk', 'exe', 'txt', 'csv', 'json', 'xml', 'html', 'css', 'js', 'php', 'sql', 'psd', 'ai', 'eps', 'ps', 'ttf', 'otf', 'woff', 'woff2', 'eot', 'svg', 'ico', 'dwg', 'dxf', 'svgz', '3ds', 'max', 'blend', 'obj', 'stl', 'fbx', 'dae', 'glb', 'gltf', '3dm', '3mf', 'step', 'stp', 'skp', 'sketch']);
                        }
                        // Remove image/*, video/*, audio/*, application/* from accept
                        accept = accept.filter(function(item) {
                            return item !== 'image/*' && item !== 'video/*' && item !== 'audio/*' && item !== 'application/*';
                        });
                        // console.log(accept);
                        // Get multiple attribute
                        var multiple = $(this).attr('multiple');
                        // Get max file size
                        var maxFileSize = $(this).data('max-size');
                        // Get max size unit
                        var maxSizeUnit = $(this).data('max-size-unit');
                        // Get invalid size message
                        var invalidSizeMessage = $(this).data('invalid-size-message');
                        // Get invalid type message
                        var invalidTypeMessage = $(this).data('invalid-type-message');
                        // Compare selected file with each attribute
                        $.each(this.files, function(index, file) {
                            // Index start from 0
                            index = index + 1;
                            // Check if maxFileSize is not empty
                            if (maxFileSize !== undefined && maxFileSize !== '') {
                                // Check if maxSizeUnit is not empty
                                if (maxSizeUnit !== undefined && maxSizeUnit !== '') {
                                    // Make lowercase maxSizeUnit
                                    maxSizeUnit = maxSizeUnit.toLowerCase();
                                    // Check maxSizeUnit value. Example: TB, GB, MB, KB
                                    if (maxSizeUnit === 'tb') {
                                        // Convert maxFileSize to TB
                                        maxFileSize = maxFileSize * 1024 * 1024 * 1024 * 1024;
                                    } else if (maxSizeUnit === 'gb') {
                                        // Convert maxFileSize to GB
                                        maxFileSize = maxFileSize * 1024 * 1024 * 1024;
                                    } else if (maxSizeUnit === 'mb') {
                                        // Convert maxFileSize to MB
                                        maxFileSize = maxFileSize * 1024 * 1024;
                                    } else if (maxSizeUnit === 'kb') {
                                        // Convert maxFileSize to KB
                                        maxFileSize = maxFileSize * 1024;
                                    } else {
                                        // Convert maxFileSize to B
                                        maxFileSize = maxFileSize;
                                    }
                                }
                                // Get file size from file
                                var fileSize = file.size;
                                // Check if file size is more than maxFileSize
                                if (fileSize > maxFileSize) {
                                    $invalidFeedback.text(invalidSizeMessage);
                                    // Set is-invalid class to parents
                                    $this.addClass('is-invalid');
                                    // Reset input file
                                    $this.val('');
                                    // Disable submit button
                                    form.find('[type="submit"]').attr('disabled', true);
                                    // Return false
                                    return false;
                                } else {
                                    // Remove invalid size message
                                    $invalidFeedback.text('');
                                    // Remove is-invalid class from parents
                                    $this.removeClass('is-invalid');
                                    checkRequiredInValidation();
                                }
                            }
                            // Check if accept is not empty
                            if (accept !== undefined && accept !== '') {
                                // Get file extension from file name
                                var fileExtension = file.name.split('.').pop().toLowerCase();
                                // Check if file extension is not in accept
                                if (!accept.includes(fileExtension)) {
                                    $invalidFeedback.text(invalidTypeMessage);
                                    // Set is-invalid class to parents
                                    $this.addClass('is-invalid');
                                    // Reset input file
                                    $this.val('');
                                    // Disable submit button
                                    form.find('[type="submit"]').attr('disabled', true);
                                    // Return false
                                    return false;
                                } else {
                                    // Remove invalid type message
                                    $invalidFeedback.text('');
                                    // Remove is-invalid class from parents
                                    $this.removeClass('is-invalid');
                                    checkRequiredInValidation();
                                }
                            }
                        });
                    });
                }
                var droppable = $(this).data('droppable');
                if (droppable === true) {
                    // Check if droppable-area is exist
                    if ($(this).parent().hasClass('an-droppable-area')) {
                        return false;
                    }
                    var droppableBtnText = $(this).data('droppable-btn-text');
                    var droppableMsgText = $(this).data('droppable-msg-text');
                    if (droppable === undefined || droppable === '') {
                        droppable = false;
                    }
                    if (droppableBtnText === undefined || droppableBtnText === '') {
                        droppableBtnText = 'Choose Files';
                    }
                    if (droppableMsgText === undefined || droppableMsgText === '') {
                        droppableMsgText = 'or drop files here';
                    }
                    var DropArea = 'an-droppable-area';
                    var DropBtn = '<span class="an-droppable-btn btn btn-primary">' + droppableBtnText + '</span>';
                    var DropMsg = '<span class="an-droppable-msg">' + droppableMsgText + '</span>';
                    var DropDelete = '<div class="an-droppable-item-delete"></div>';
                    $(this).addClass('an-droppable-input');

                    // Wrap input file with div
                    $(this).wrap('<div class="' + DropArea + '"></div>');
                    // Add drop button & drop message
                    $(this).before(DropBtn + DropMsg);
                    // Add delete button
                    $(this).after(DropDelete);
                    var $fileInput = $('.an-droppable-input');
                    var $droparea = $('.an-droppable-area');
                    var $delete = $('.an-droppable-item-delete');

                    $fileInput.on('dragenter focus click', function () {
                        $droparea.addClass('is-active');
                    });

                    $fileInput.on('dragleave blur drop', function () {
                        $droparea.removeClass('is-active');
                    });

                    $fileInput.on('change', function () {
                        // Check if this has class 'is-invalid'
                        if ($(this).hasClass('is-invalid')) {
                            // Add class 'is-invalid' to droparea
                            $droparea.addClass('is-invalid');
                            $droparea.removeClass('is-valid');
                            $droparea.removeClass('is-active');
                        } else {
                            // Remove class 'is-invalid' to droparea
                            $droparea.removeClass('is-invalid');
                        }
                        // Check if this has class 'is-valid'
                        if ($(this).hasClass('is-valid')) {
                            // Add class 'is-valid' to droparea
                            $droparea.addClass('is-valid');
                            $droparea.removeClass('is-invalid');
                        } else {
                            // Remove class 'is-valid' to droparea
                            $droparea.removeClass('is-valid');
                        }

                        let filesCount = $(this)[0].files.length;
                        let $textContainer = $(this).prev();

                        if (filesCount === 1) {
                            let fileName = $(this).val().split('\\').pop();
                            $textContainer.text(fileName);
                            $delete.css('display', 'inline-block');
                        } else if (filesCount === 0) {
                            $textContainer.text(droppableMsgText);
                            $delete.css('display', 'none');
                        } else {
                            $textContainer.text(filesCount + ' files selected');
                            $delete.css('display', 'inline-block');
                        }
                    });

                    $delete.on('click', function () {
                        $('.an-droppable-input').val(null);
                        $('.an-droppable-msg').text(droppableMsgText);
                        $('.an-droppable-item-delete').css('display', 'none');
                    });
                }
            }

            if (formGroup.find('.form-floating').length === 0 && floatingValidation === 'true') {
                // Check if label parent has class .input-group, .form-floating
                formGroup.find('[class*="-validation"]').each(function () {
                    $(this).css('position', 'static');
                });
            }
        });
    });
};
if ($('form').length > 0) {
    ANForm();
}

/* ======== Form Submit ======== */
function uploadForm(e) {

    var form = $(e).parents('form').attr('id');
    var submitButton = $('#' + form).find('[type="submit"]');
    var submitButtonText = submitButton.text();
    var submitButtonProgressText = submitButton.data('progress-text');
    if (submitButtonProgressText === undefined || submitButtonProgressText === '') {
        submitButtonProgressText = 'Sending...';
    }
    var progress = $('#' + form).find('.an-submit-progress');
    var progressBar = progress.find('.an-submit-progress-bar');
    var alert = $('.alert-an-form#alert-' + form);
    var successMessage = $('#' + form).data('success-message');
    if (successMessage === undefined || successMessage === '') {
        successMessage = 'Thank you for your submission!';
    }
    var errorMessage = $('#' + form).data('error-message');
    if (errorMessage === undefined || errorMessage === '') {
        errorMessage = 'Something went wrong, please try again!';
    }

    $('#' + form).ajaxForm({
        // This function is for validation before submit
        beforeSend: function() {
            submitButton.attr('disabled', true);
            submitButton.html('<span class="an-loading-icon" role="status" aria-hidden="true">' + submitButtonProgressText + '</span>');
            progress.removeAttr('hidden');
            progressBar.css('width', '0%');

            // Check if .form-check-required is exist and has multiple input type checkbox with same name. This is for checkbox required
            if ($('#' + form).find('.form-check-required').length && $('#' + form).find('.form-check-required input[type="checkbox"][name="' + $('#' + form).find('.form-check-required input[type="checkbox"]').attr('name') + '"]:checked').length === 0) {
                // Add class .is-invalid to .form-check-required
                $('#' + form).find('.form-check-required').find('input[type="checkbox"]').parents('.form-check-required').addClass('is-invalid');
                // Check if .form-check-required has attribute data-min-check
                if ($('#' + form).find('.form-check-required').find('input[type="checkbox"]').parents('.form-check-required').attr('data-min-check') !== undefined && $('#' + form).find('.form-check-required').find('input[type="checkbox"]').parents('.form-check-required').attr('data-min-check') !== '') {
                    // Check if .form-check-required doesn't has class invalid feedback
                    if ($('#' + form).find('.form-check-required').find('input[type="checkbox"]').parents('.form-check-required').find('[class^="invalid-"]').length === 0) {
                        // Append invalid feedback
                        $('#' + form).find('.form-check-required').find('input[type="checkbox"]').parents('.form-check-required').append('<div class="' + invalidType + '">Please select min. ' + $('#' + form).find('.form-check-required').find('input[type="checkbox"]').parents('.form-check-required').attr('data-min-check') + ' option(s)!</div>');
                    }
                    alert.text(errorMessage);
                } else {
                    // Check if .form-check-required doesn't has class invalid feedback
                    if ($('#' + form).find('.form-check-required').find('input[type="checkbox"]').parents('.form-check-required').find('[class^="invalid-"]').length === 0) {
                        // Append invalid feedback
                        $('#' + form).find('.form-check-required').find('input[type="checkbox"]').parents('.form-check-required').append('<div class="' + invalidType + '">Please select at least one option!</div>');
                    }
                    alert.text(errorMessage);
                }
                progressBar.css('width', '50%');
                alert.removeAttr('hidden').addClass('an-alert-danger');
                setTimeout(function() {
                    progressBar.css('width', '0%');
                    alert.fadeOut('slow', function () {
                        $(this).attr('hidden', true).removeClass('an-alert-danger');
                        $(this).removeAttr('style').html('');
                        progress.attr('hidden', true);
                        submitButton.attr('disabled', false);
                        submitButton.html(submitButtonText);
                    });
                }, 3000);
                // Reset form
                return false;
            }

            // Bot Detection
            if ($('#' + form).find('input[name="bot"]').val() !== '') {
                alert.html('<strong><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M21.928 11.607c-.202-.488-.635-.605-.928-.633V8c0-1.103-.897-2-2-2h-6V4.61c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5c-1.103 0-2 .897-2 2v2.997l-.082.006A1 1 0 0 0 1.99 12v2a1 1 0 0 0 1 1H3v5c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5a1 1 0 0 0 1-1v-1.938a1.006 1.006 0 0 0-.072-.455zM5 20V8h14l.001 3.996L19 12v2l.001.005.001 5.995H5z"></path><ellipse cx="8.5" cy="12" rx="1.5" ry="2"></ellipse><ellipse cx="15.5" cy="12" rx="1.5" ry="2"></ellipse><path d="M8 16h8v2H8z"></path></svg> BOT DETECTED!</strong>');
                progressBar.css('width', '50%');
                alert.removeAttr('hidden').addClass('an-alert-danger');
                setTimeout(function() {
                    progressBar.css('width', '0%');
                    alert.fadeOut('slow', function () {
                        $(this).attr('hidden', true).removeClass('an-alert-danger');
                        $(this).removeAttr('style').html('');
                        progress.attr('hidden', true);
                        submitButton.attr('disabled', false);
                        submitButton.html(submitButtonText);
                    });
                }, 3000);
                // Reset form
                return false;
            }
        },
        // This function is for progress bar
        uploadProgress: function(event, position, total, percentComplete) {
            progressBar.css('width', percentComplete + '%');
        },
        xhr: function() {
            var xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener('progress', function(e) {
                if (e.lengthComputable) {
                    var percent = Math.round((e.loaded / e.total) * 100);
                    progressBar.css('width', percent + '%');
                }
            });
            return xhr;
        },
        success: function() {
            submitButton.attr('disabled', false);
            submitButton.html(submitButtonText);
            progressBar.css('width', '0%');
            progress.attr('hidden', true);
            alert.html(successMessage);
            alert.removeAttr('hidden').addClass('an-alert-success');
            setTimeout(function() {
                alert.fadeOut('slow', function () {
                    $(this).attr('hidden', true).removeClass('an-alert-success');
                    $(this).removeAttr('style').html('');
                });
                // Reset form
                $('#' + form).resetForm();
                // Remove class .is-invalid and .is-valid
                $('#' + form).find('.is-invalid').removeClass('is-invalid');
                $('#' + form).find('.is-valid').removeClass('is-valid');
                $('#' + form).find('.an-droppable-msg').text('or drop files here');
                $('#' + form).find('.an-droppable-item-delete').css('display', 'none');
                // Remove was-validated class
                $('#' + form).removeClass('was-validated');
                // // Reload page
                // location.reload();
            }, 3000);
            return false;
        },
        error: function(xhr, status, error) {
            submitButton.attr('disabled', false);
            submitButton.html(submitButtonText);
            progress.attr('hidden', true);
            progressBar.css('width', '0%');
            alert.html(errorMessage);
            alert.removeAttr('hidden').addClass('an-alert-danger');
            setTimeout(function() {
                alert.fadeOut('slow', function () {
                    $(this).attr('hidden', true).removeClass('an-alert-danger');
                    $(this).removeAttr('style').html('');
                });
            }, 3000);
            return false;
        }
    });
}