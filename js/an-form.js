/*
    AN Form - Form Validation & Input Validation with Regex (Email, Phone, Password, etc) & Password Strength Meter & Toggle Password Button & Disable Space on Input & Disable Copy Paste Space on Input & Disable Autocomplete & Disable Spellcheck
    Author: Atas Nalar
    Version: 1.0
*/
(function ($) {
    'use strict';
    var prefix = document.querySelector('html').getAttribute('data-prefix') || '';
    var ANForm = function () {
        // Turn off autocomplete for all forms
        $('form, input, select, textarea').attr('autocomplete', 'off');
        // Turn off spellcheck for all forms
        $('form, input, select, textarea').attr('spellcheck', 'false');

        // Form Validation (on Submit, Input on Keyup)
        $('form').each(function () {
            var form = $(this);
            var inputs = form.find('input, textarea, select');
            // Input Validation
            inputs.each(function () {
                var input = $(this);
                var inputType = input.attr('type');
                var inputName = input.attr('name');

                // Add Validation to input that has attribute [required] on keyup
                if (input.attr('required') !== undefined) {
                    // Find label for input and add asterisk
                    var label = form.find('label[for="' + inputName + '"]');
                    // Check if label child sup exists
                    label.each(function () {
                        if ($(this).find('sup').length == 0) {
                            $(this).append('<sup style="color:red;">*</sup>');
                        }
                    });

                    input.on('keyup', function () {
                        if (input.val().length > 0 && inputType !== 'password' || input.val().length > 0 && inputType !== 'email') {
                            input.removeClass('is-invalid');
                            input.addClass('is-valid');
                        } else {
                            input.addClass('is-invalid');
                            input.removeClass('is-valid');
                        }
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
                    $(this).on('keydown', function (e) {
                        if (e.which == 32) {
                            return false;
                        }
                    });

                    $(this).on('paste', function (e) {
                        var text = e.originalEvent.clipboardData.getData('text');
                        if (text.match(/\s/g)) {
                            e.preventDefault();
                        }
                    });
                }

                // Add Email Validation to input[type=email] that has a [data-email-validation=true]
                if ($(this).is('[type="email"]')) {
                    var emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                    if ($(this).attr('data-email-validation') === 'true') {
                        // Check if label exists
                        if ($(this).closest('.form-group, .an-group').find('label').length) {
                            // Check if label parent has class .input-group, .form-floating
                            if ($(this).closest('.form-group, .an-group').find('label').parent().hasClass('input-group') || $(this).closest('.form-group, .an-group').find('label').parent().hasClass('form-floating')) {
                                // Add Email Validation Element on first child of .form-group or .an-group
                                $(this).closest('.form-group, .an-group').prepend('<small class="badge email-validation"></small>');
                            } else {
                                // Add Email Validation Element after label
                                $(this).closest('.form-group, .an-group').find('label').after('<small class="badge email-validation"></small>');
                            }
                        } else {
                            // Add Email Validation Element on first child of .form-group or .an-group
                            $(this).closest('.form-group, .an-group').prepend('<small class="badge email-validation"></small>');
                        }
                        // Hide Email Validation Element First
                        $(this).closest('.form-group, .an-group').find('.email-validation').hide();
                        // Email Validation css
                        $(this).closest('.form-group, .an-group').find('.email-validation').css({
                            'font-size': '0.75rem',
                            'font-weight': 'normal',
                            'padding': '0 .25rem',
                            'border-radius': 'var(--' + prefix + 'border-radius)',
                            'line-height': 'var(--' + prefix + 'body-line-height)',
                        });

                        // Check if value match with pattern
                        $(this).on('keyup', function () {
                            var email_validation = $(this).closest('.form-group, .an-group').find('.email-validation');

                            if ($(this).val().length > 0) {
                                if (emailRegexp.test($(this).val())) {
                                    $(this).removeClass('is-invalid');
                                    $(this).addClass('is-valid');
                                    email_validation.removeClass('bg-danger');
                                    email_validation.addClass('bg-success');
                                    email_validation.text('Email valid');
                                    email_validation.show();
                                    setTimeout(function () {
                                        email_validation.fadeOut('slow', function () { $(this).hide(); });
                                    }, 1500);
                                } else {
                                    $(this).removeClass('is-valid');
                                    $(this).addClass('is-invalid');
                                    email_validation.removeClass('bg-success');
                                    email_validation.addClass('bg-danger');
                                    email_validation.text('Email not valid');
                                    email_validation.show();
                                }
                            } else {
                                email_validation.removeClass('bg-success');
                                email_validation.removeClass('bg-danger');
                                $(this).removeClass('is-valid');
                                email_validation.text('');
                            }
                        });
                    }

                }

                // Add Phone Validation to input[type=tel] or input[type=text] that has a [data-phone-validation=true] and force to only numbers
                if ($(this).is('[type="tel"]') || $(this).is('[type="text"]')) {

                    if ($(this).attr('data-phone-validation') === 'true') {
                        var codeArea = $(this).attr('data-code-area');
                        if (codeArea !== undefined || codeArea !== '') {
                            var phoneRegexp = new RegExp('^' + codeArea + '[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,8}$', 'im');
                            // Sample output: 6281234567890
                        } else {
                            // Regex without code area, no need "+" on first. so can be any input numbers will be valid
                            var phoneRegexp = new RegExp('^\\+?[0-9]{3}[0-9]{3}[0-9]{4,9}$', 'im');
                            // Sample output: 081234567890
                        }
                        // Check if label exists
                        if ($(this).closest('.form-group, .an-group').find('label').length) {
                            // Check if label parent has class .input-group, .form-floating
                            if ($(this).closest('.form-group, .an-group').find('label').parent().hasClass('input-group') || $(this).closest('.form-group, .an-group').find('label').parent().hasClass('form-floating')) {
                                // Add Phone Validation Element on first child of .form-group or .an-group
                                $(this).closest('.form-group, .an-group').prepend('<small class="badge phone-validation"></small>');
                            } else {
                                // Add Phone Validation Element after label
                                $(this).closest('.form-group, .an-group').find('label').after('<small class="badge phone-validation"></small>');
                            }
                        } else {
                            // Add Phone Validation Element on first child of .form-group or .an-group
                            $(this).closest('.form-group, .an-group').prepend('<small class="badge phone-validation"></small>');
                        }
                        // Hide Phone Validation Element First
                        $(this).closest('.form-group, .an-group').find('.phone-validation').hide();
                        // Phone Validation css
                        $(this).closest('.form-group, .an-group').find('.phone-validation').css({
                            'font-size': '0.75rem',
                            'font-weight': 'normal',
                            'padding': '0 .25rem',
                            'border-radius': 'var(--' + prefix + 'border-radius)',
                            'line-height': 'var(--' + prefix + 'body-line-height)',
                        });
                        // Force input only number / Only ASCII character in that range allowed
                        /* Use on attribute version
                        $(this).attr('onkeypress', 'return (event.charCode >= 48 && event.charCode <= 57)');
                        */
                        $(this).on('keypress', function (e) {
                            var charCode = e.which || e.keyCode;
                            var phone_validation = $(this).closest('.form-group, .an-group').find('.phone-validation');

                            if (charCode >= 48 && charCode <= 57) {
                                phone_validation.show();
                            } else {
                                phone_validation.addClass('bg-danger');
                                phone_validation.text('Only number allowed');
                                phone_validation.show();
                            }
                            return (charCode >= 48 && charCode <= 57);
                        });
                        // Check if value match with pattern
                        $(this).on('keyup', function () {
                            var phone_validation = $(this).closest('.form-group, .an-group').find('.phone-validation');
                            var phoneValue = $(this).val();

                            // if first number is 0 and this input is required, replace it with codeArea
                            if (phoneValue.substring(0, 1) == 0 && $(this).attr('required') !== undefined) {
                                phoneValue = codeArea + phoneValue.substring(1);
                                $(this).val(phoneValue);
                            }

                            if ($(this).val().length > 0) {
                                if (phoneRegexp.test($(this).val())) {
                                    $(this).removeClass('is-invalid');
                                    $(this).addClass('is-valid');
                                    phone_validation.removeClass('bg-danger');
                                    phone_validation.addClass('bg-success');
                                    phone_validation.text('Number Valid');
                                    phone_validation.show();
                                    setTimeout(function () {
                                        phone_validation.fadeOut('slow', function () { $(this).hide(); });
                                    }, 1500);
                                } else {
                                    $(this).removeClass('is-valid');
                                    $(this).addClass('is-invalid');
                                    phone_validation.removeClass('bg-success');
                                    phone_validation.addClass('bg-danger');
                                    if ($(this).attr('required') === undefined && $(this).val().length > 0) {
                                        // If this input is not required and has value and first number is not equal with codeArea
                                        if (phoneValue.substring(0, codeArea.length) !== codeArea) {
                                            phone_validation.text('Not Valid (Must start with ' + codeArea + ')');
                                        } else {
                                            phone_validation.text('Not Valid');
                                        }
                                    } else {
                                        phone_validation.text('Not Valid');
                                    }
                                    phone_validation.show();
                                }
                            } else {
                                phone_validation.removeClass('bg-success');
                                phone_validation.removeClass('bg-danger');
                                $(this).removeClass('is-valid');
                                phone_validation.text('');
                                phone_validation.hide();
                            }

                            if ($(this).attr('required') === undefined && $(this).val().length == 0) {
                                $(this).removeClass('is-invalid');
                                $(this).removeClass('is-valid');
                                phone_validation.removeClass('bg-success');
                                phone_validation.removeClass('bg-danger');
                                phone_validation.text('');
                                phone_validation.hide();
                            }
                        });
                        // Check if codeArea is valid
                        $(this).on('blur', function () {
                            var phone_validation = $(this).closest('.form-group, .an-group').find('.phone-validation');
                            var phoneValue = $(this).val();

                            if (phoneValue.substring(0, 1) == 0 && $(this).attr('required') !== undefined) {
                                phoneValue = codeArea + phoneValue.substring(1);
                                $(this).val(phoneValue);
                            }
                            if ($(this).val().length > 0) {
                                if (phoneRegexp.test($(this).val())) {
                                    $(this).removeClass('is-invalid');
                                    $(this).addClass('is-valid');
                                    phone_validation.removeClass('bg-danger');
                                    phone_validation.addClass('bg-success');
                                    phone_validation.text('Number Valid');
                                    phone_validation.hide();
                                } else {
                                    $(this).removeClass('is-valid');
                                    $(this).addClass('is-invalid');
                                    phone_validation.removeClass('bg-success');
                                    phone_validation.addClass('bg-danger');
                                    phone_validation.text('Not Valid');
                                    phone_validation.show();
                                }
                            } else {
                                phone_validation.removeClass('bg-success');
                                phone_validation.removeClass('bg-danger');
                                $(this).removeClass('is-valid');
                                phone_validation.text('');
                                phone_validation.hide();
                            }

                            if ($(this).attr('required') === undefined && $(this).val().length == 0) {
                                $(this).removeClass('is-invalid');
                                $(this).removeClass('is-valid');
                                phone_validation.removeClass('bg-success');
                                phone_validation.removeClass('bg-danger');
                                phone_validation.text('');
                                phone_validation.hide();
                            }
                        });
                    }
                }

                // Add Password Validation to input[type=password] that has a sibling with class .confirm-password | Add Toggle Password Button to input[type=password] that has a [data-toggle-password=true] | Add Password Strength Meter to input[type=password] that has a [data-password-strength=true] and validate from [data-regexp]
                if ($(this).is('[type="password"]')) {
                    // Confirm Password Validation
                    if ($(this).attr('id') == 'confirm-password' || $(this).hasClass('confirm-password')) {
                        // Remove .password-strength, .password-strength-data, this attribute data-password-strength, data-regexp
                        $(this).removeAttr('data-password-strength');
                        $(this).removeAttr('data-regexp');
                        // Check if label exists
                        if ($(this).closest('.form-group, .an-group').find('label').length) {
                            // Check if label parent has class .input-group, .form-floating
                            if ($(this).closest('.form-group, .an-group').find('label').parent().hasClass('input-group') || $(this).closest('.form-group, .an-group').find('label').parent().hasClass('form-floating')) {
                                // Add Password Validation Element on first child of .form-group or .an-group
                                $(this).closest('.form-group, .an-group').prepend('<small class="badge password-validation"></small>');
                            } else {
                                // Add Password Validation Element after label
                                $(this).closest('.form-group, .an-group').find('label').after('<small class="badge password-validation"></small>');
                            }
                        } else {
                            // Add Password Validation Element on first child of .form-group or .an-group
                            $(this).closest('.form-group, .an-group').prepend('<small class="badge password-validation"></small>');
                        }
                        // Hide Password Validation Element First
                        $(this).closest('.form-group, .an-group').find('.password-validation').hide();
                        // Password Validation css
                        $(this).closest('.form-group, .an-group').find('.password-validation').css({
                            'font-size': '0.75rem',
                            'font-weight': 'normal',
                            'padding': '0 .25rem',
                            'border-radius': 'var(--' + prefix + 'border-radius)',
                            'line-height': 'var(--' + prefix + 'body-line-height)',
                        });

                        // Validate this value must same with other input[type=password] that are not #confirm-password or .confirm-password
                        $(this).on('keyup', function () {
                            var password_validations = $(this).closest('.form-group, .an-group').find('.password-validation');

                            if ($(this).val() !== '') {
                                if ($(this).val() === $('.password').val()) {
                                    $(this).removeClass('is-invalid');
                                    $(this).addClass('is-valid');
                                    password_validations.removeClass('bg-danger');
                                    password_validations.addClass('bg-success');
                                    password_validations.text('Match');
                                    password_validations.show();
                                } else {
                                    $(this).removeClass('is-valid');
                                    $(this).addClass('is-invalid');
                                    password_validations.removeClass('bg-success');
                                    password_validations.addClass('bg-danger');
                                    password_validations.text('Not Match');
                                    password_validations.show();
                                }
                            } else {
                                password_validations.removeClass('bg-success');
                                password_validations.removeClass('bg-danger');
                                $(this).removeClass('is-valid');
                                password_validations.text('');
                            }
                        });

                    }
                    // Password Strength Meter
                    if ($(this).attr('data-password-strength') == 'true') {
                        // Check if label exists
                        if ($(this).closest('.form-group, .an-group').find('label').length) {
                            // Check if label parent has class .input-group, .form-floating
                            if ($(this).closest('.form-group, .an-group').find('label').parent().hasClass('input-group') || $(this).closest('.form-group, .an-group').find('label').parent().hasClass('form-floating')) {
                                // Add Password Strength Element on first child of .form-group or .an-group
                                $(this).closest('.form-group, .an-group').prepend('<small class="badge password-strength"></small>');
                                // Add Password Strength Info Element
                                $(this).closest('.form-group, .an-group').find('.password-strength').after('<div class="password-strength-data"></div>');
                            } else {
                                // Add Password Strength Element after label
                                $(this).closest('.form-group, .an-group').find('label').after('<small class="badge password-strength"></small>');
                                // Add Password Strength Info Element
                                $(this).closest('.form-group, .an-group').find('.password-strength').after('<div class="password-strength-data"></div>');
                            }
                        } else {
                            // Add Password Strength Element on first child of .form-group or .an-group
                            $(this).closest('.form-group, .an-group').prepend('<small class="badge password-strength"></small>');
                            // Add Password Strength Info Element
                            $(this).closest('.form-group, .an-group').find('.password-strength').after('<div class="password-strength-data"></div>');
                        }
                        // Append Password Strength Info Details
                        $(this).closest('.form-group, .an-group').find('.password-strength-data').append('<small>Password must contain at least:</small>');
                        // Append Password Strength Info List Elements
                        $(this).closest('.form-group, .an-group').find('.password-strength-data').append('<ul class="m-0 main"><ul class="sub"></ul></ul>');
                        // Hide Password Strength & Password Strength Info Element First
                        $(this).closest('.form-group, .an-group').find('.password-strength').hide();
                        $(this).closest('.form-group, .an-group').find('.password-strength-data').hide();
                        // Password Strength css
                        $(this).closest('.form-group, .an-group').find('.password-strength').css({
                            'font-size': '0.75rem',
                            'font-weight': 'normal',
                            'padding': '0 .25rem',
                            'border-radius': 'var(--' + prefix + 'border-radius)',
                            'line-height': 'var(--' + prefix + 'body-line-height)',
                        });
                        // Password Strength Info css
                        $(this).closest('.form-group, .an-group').find('.password-strength-data').css({
                            'position': 'absolute',
                            'top': '100%',
                            'background': 'var(--' + prefix + 'body-bg)',
                            'padding': '1rem',
                            'border-radius': 'var(--' + prefix + 'border-radius)',
                            'z-index': '3',
                            'box-shadow': 'var(--' + prefix + 'box-shadow)',
                            'border': '1px solid var(--' + prefix + 'border-color)',
                            'margin-top': '0.25rem',
                        });

                        // Check if data-regex is not set then user default regex and add default pattern to this attribute
                        if ($(this).attr('data-password-strength') == 'true' && $(this).attr('data-regex') == undefined || $(this).attr('data-password-strength') == 'true' && $(this).attr('data-regex') == '') {
                            // Set Default Minimum Length
                            const minLength = 8;
                            // Set Default Password Pattern (Min 8 Character with 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character)
                            var password_pattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&._-])[A-Za-z0-9$@$!%*?&._-]{' + minLength + ',}$';

                            // Add Default Pattern
                            $(this).attr('pattern', password_pattern);
                            // Append Password Strength Info List Element Details with their class name that matches with current pattern:
                            // ! 8 characters
                            $(this).closest('.form-group, .an-group').find('.password-strength-data ul.main').prepend('<li><small class="character-strength">' + minLength + ' Character<span class="inc text-gray">, including:</span></small></li>');
                            // ! 1 uppercase letter
                            $(this).closest('.form-group, .an-group').find('.password-strength-data ul.sub').append('<li><small class="uppercase-strength">1 Uppercase</small></li>');
                            // ! 1 lowercase letter
                            $(this).closest('.form-group, .an-group').find('.password-strength-data ul.sub').append('<li><small class="lowercase-strength">1 Lowercase</small></li>');
                            // ! 1 number
                            $(this).closest('.form-group, .an-group').find('.password-strength-data ul.sub').append('<li><small class="number-strength">1 Number</small></li>');
                            // ! 1 special character
                            $(this).closest('.form-group, .an-group').find('.password-strength-data ul.sub').append('<li><small class="special-strength">1 Special Character</small></li>');
                            // Check if value match with pattern and add success class to each pattern
                            $(this).keyup(function () {
                                var password = $(this).val();
                                var password_strength = $(this).closest('.form-group, .an-group').find('.password-strength');
                                var password_pattern = $(this).attr('pattern');
                                var password_info = $(this).closest('.form-group, .an-group').find('.password-strength-data');

                                if (password.length > 0) {
                                    var regex = new RegExp(password_pattern);
                                    if (regex.test(password)) {
                                        password_strength.removeClass('bg-danger');
                                        password_strength.addClass('bg-success');
                                        password_strength.text('Strong');
                                        password_strength.show();
                                    } else {
                                        password_strength.removeClass('bg-success');
                                        password_strength.addClass('bg-danger');
                                        password_strength.text('Weak');
                                        password_strength.show();
                                    }
                                } else {
                                    password_strength.removeClass('bg-success');
                                    password_strength.removeClass('bg-danger');
                                    password_strength.text('');
                                }
                                if (password.length >= minLength) {
                                    password_info.find('.character-strength').addClass('text-success').removeClass('text-danger');
                                } else {
                                    password_info.find('.character-strength').removeClass('text-success').addClass('text-danger');
                                }
                                if (password.match(/[A-Z]/)) {
                                    password_info.find('.uppercase-strength').addClass('text-success').removeClass('text-danger');
                                } else {
                                    password_info.find('.uppercase-strength').removeClass('text-success').addClass('text-danger');
                                }
                                if (password.match(/[a-z]/)) {
                                    password_info.find('.lowercase-strength').addClass('text-success').removeClass('text-danger');
                                } else {
                                    password_info.find('.lowercase-strength').removeClass('text-success').addClass('text-danger');
                                }
                                if (password.match(/[0-9]/)) {
                                    password_info.find('.number-strength').addClass('text-success').removeClass('text-danger');
                                } else {
                                    $('.number-strength').removeClass('text-success').addClass('text-danger');
                                }
                                if (password.match(/[$@$!%*?&._-]/)) {
                                    password_info.find('.special-strength').addClass('text-success').removeClass('text-danger');
                                } else {
                                    password_info.find('.special-strength').removeClass('text-success').addClass('text-danger');
                                }
                                if (password.match(/[A-Z]/) && password.match(/[a-z]/) && password.match(/[0-9]/) && password.match(/[$@$!%*?&._-]/)) {
                                    password_info.find('.inc').addClass('text-success').removeClass('text-gray');
                                } else {
                                    password_info.find('.inc').removeClass('text-success').addClass('text-gray');
                                }
                                if (password.match(password_pattern)) {
                                    password_info.find('.character-strength').removeClass('text-success');
                                    password_info.find('.uppercase-strength').removeClass('text-success');
                                    password_info.find('.lowercase-strength').removeClass('text-success');
                                    password_info.find('.number-strength').removeClass('text-success');
                                    password_info.find('.special-strength').removeClass('text-success');
                                    password_info.addClass('text-white bg-success border-success');
                                    password_info.find('small').addClass('text-white');
                                    $(this).closest('.form-group, .an-group').find('.invalid-feedback').hide();
                                    $(this).removeClass('is-invalid');
                                    $(this).addClass('is-valid');
                                    setTimeout(function () {
                                        password_info.fadeOut('slow', function () { $(this).hide(); });
                                    }, 1500);

                                } else {
                                    password_info.removeClass('text-white bg-success border-success');
                                    password_info.find('small').removeClass('text-white');
                                    $(this).closest('.form-group, .an-group').find('.invalid-feedback').show();
                                    password_info.show();
                                }
                            });
                        } else {
                            // Convert each value in data-regex="upper,min:2,number,special" to object
                            var regex_data = $(this).attr('data-regex').split(',');
                            var regex_data_object = {};
                            for (var i = 0; i < regex_data.length; i++) {
                                var regex_data_split = regex_data[i].split(':');
                                regex_data_object[regex_data_split[0]] = regex_data_split[1];
                            }

                            // ! Check if include upper:
                            if ($(this).attr('data-regex').includes('upper')) {
                                var upperCase = 'A-Z';
                                var upperCase_match = new RegExp(/[A-Z]/);
                                var upperCase_pattern = '(?=.*[' + upperCase + '])';
                                // Extend and sum min{} if include upper
                                // if (regex_data_object.min) {
                                //     regex_data_object.min = parseInt(regex_data_object.min) + 1;
                                // }


                                // Append this to Password Strength Info List Element Details with their class name that matches with current pattern:
                                $(this).closest('.form-group, .an-group').find('.password-strength-data ul.sub').append('<li><small class="uppercase-strength">1 Uppercase</small></li>');
                            } else {
                                var upperCase = '';
                                var upperCase_pattern = '';
                            }
                            // ! Check if include lower:
                            if ($(this).attr('data-regex').includes('lower')) {
                                var lowerCase = 'a-z';
                                var lowerCase_match = new RegExp(/[a-z]/);
                                var lowerCase_pattern = '(?=.*[' + lowerCase + '])';
                                // Extend and sum min{} if include lower
                                // if (regex_data_object.min) {
                                //     regex_data_object.min = parseInt(regex_data_object.min) + 1;
                                // }

                                // Append this to Password Strength Info List Element Details with their class name that matches with current pattern:
                                $(this).closest('.form-group, .an-group').find('.password-strength-data ul.sub').append('<li><small class="lowercase-strength">1 Lowercase</small></li>');
                            } else {
                                var lowerCase = '';
                                var lowerCase_pattern = '';
                            }
                            // ! Check if include number:
                            if ($(this).attr('data-regex').includes('number')) {
                                var number = '0-9';
                                var number_match = new RegExp(/[0-9]/);
                                var number_pattern = '(?=.*[' + number + '])';
                                // Extend and sum min{} if include number
                                // if (regex_data_object.min) {
                                //     regex_data_object.min = parseInt(regex_data_object.min) + 1;
                                // }

                                // Append this to Password Strength Info List Element Details with their class name that matches with current pattern:
                                $(this).closest('.form-group, .an-group').find('.password-strength-data ul.sub').append('<li><small class="number-strength">1 Number</small></li>');
                            } else {
                                var number = '';
                                var number_pattern = '';
                            }
                            // ! Check if include special:
                            if ($(this).attr('data-regex').includes('special')) {
                                var special = '$@$!%*?&._-';
                                var special_match = new RegExp(/[$@$!%*?&._-]/);
                                var special_pattern = '(?=.*[' + special + '])';
                                // Extend and sum min{} if include special
                                // if (regex_data_object.min) {
                                //     regex_data_object.min = parseInt(regex_data_object.min) + 1;
                                // }

                                // Append this to Password Strength Info List Element Details with their class name that matches with current pattern:
                                $(this).closest('.form-group, .an-group').find('.password-strength-data ul.sub').append('<li><small class="special-strength">1 Special Character</small></li>');
                            } else {
                                var special = '';
                                var special_pattern = '';
                            }
                            // ! Check if include min:
                            if (regex_data_object.min && regex_data_object.min >= 6) {
                                var minLength = regex_data_object.min;

                                // Append this to Password Strength Info List Element Details with their class name that matches with current pattern:
                                $(this).closest('.form-group, .an-group').find('.password-strength-data ul.sub').append('<li><small class="character-strength">' + minLength + ' Character<span class="inc text-gray">, including:</span></small></li>');
                            } else {
                                var minLength = 8;

                                $(this).closest('.form-group, .an-group').find('.password-strength-data ul.sub').append('<li><small class="character-strength">' + minLength + ' Character<span class="inc text-gray">, including:</span></small></li>');
                            }

                            // Order last <li> to be the first one on ul.main / ul.sub:
                            $(this).closest('.form-group, .an-group').find('.password-strength-data ul.main li:last-child').prependTo($(this).parent().find('.password-strength-data ul.main'));
                            $(this).closest('.form-group, .an-group').find('.password-strength-data ul.sub li:last-child').prependTo($(this).parent().find('.password-strength-data ul.sub'));

                            // Add Default Pattern
                            $(this).attr('pattern', '^' + lowerCase_pattern + upperCase_pattern + number_pattern + special_pattern + '[' + lowerCase + upperCase + number + special + ']{' + minLength + ',}$');

                            // Check if value match with pattern and add success class to each pattern

                            //$(this).val($(this).attr('pattern'));
                            $(this).keyup(function () {
                                var password = $(this).val();
                                var password_strength = $(this).closest('.form-group, .an-group').find('.password-strength');
                                var password_pattern = $(this).attr('pattern');
                                var password_info = $(this).closest('.form-group, .an-group').find('.password-strength-data');

                                if (password.length > 0) {
                                    var regex = new RegExp(password_pattern);
                                    if (regex.test(password)) {
                                        password_strength.removeClass('bg-danger');
                                        password_strength.addClass('bg-success');
                                        password_strength.text('Strong');
                                        password_strength.show();
                                    } else {
                                        password_strength.removeClass('bg-success');
                                        password_strength.addClass('bg-danger');
                                        password_strength.text('Weak');
                                        password_strength.show();
                                    }
                                } else {
                                    password_strength.removeClass('bg-success');
                                    password_strength.removeClass('bg-danger');
                                    password_strength.text('');
                                }
                                if (password.length >= minLength) {
                                    password_info.find('.character-strength').addClass('text-success').removeClass('text-danger');
                                } else {
                                    password_info.find('.character-strength').removeClass('text-success').addClass('text-danger');
                                }
                                if (password.match(upperCase_match)) {
                                    password_info.find('.uppercase-strength').addClass('text-success').removeClass('text-danger');
                                } else {
                                    password_info.find('.uppercase-strength').removeClass('text-success').addClass('text-danger');
                                }
                                if (password.match(lowerCase_match)) {
                                    password_info.find('.lowercase-strength').addClass('text-success').removeClass('text-danger');
                                } else {
                                    password_info.find('.lowercase-strength').removeClass('text-success').addClass('text-danger');
                                }
                                if (password.match(number_match)) {
                                    password_info.find('.number-strength').addClass('text-success').removeClass('text-danger');
                                } else {
                                    $('.number-strength').removeClass('text-success').addClass('text-danger');
                                }
                                if (password.match(special_match)) {
                                    password_info.find('.special-strength').addClass('text-success').removeClass('text-danger');
                                } else {
                                    password_info.find('.special-strength').removeClass('text-success').addClass('text-danger');
                                }
                                if (password.match(upperCase_match) && password.match(lowerCase_match) && password.match(number_match) && password.match(special_match)) {
                                    password_info.find('.inc').addClass('text-success').removeClass('text-gray');
                                } else {
                                    password_info.find('.inc').removeClass('text-success').addClass('text-gray');
                                }
                                if (password.match(password_pattern)) {
                                    password_info.find('.character-strength').removeClass('text-success');
                                    password_info.find('.uppercase-strength').removeClass('text-success');
                                    password_info.find('.lowercase-strength').removeClass('text-success');
                                    password_info.find('.number-strength').removeClass('text-success');
                                    password_info.find('.special-strength').removeClass('text-success');
                                    password_info.find('.inc').removeClass('text-success');
                                    password_info.addClass('text-white bg-success border-success');
                                    $(this).closest('.form-group, .an-group').find('.invalid-feedback').hide();
                                    $(this).removeClass('is-invalid');
                                    $(this).addClass('is-valid');
                                    setTimeout(function () {
                                        password_info.fadeOut('slow', function () { $(this).hide(); });
                                    }, 1500);

                                } else {
                                    password_info.removeClass('text-white bg-success border-success');
                                    $(this).closest('.form-group, .an-group').find('.invalid-feedback').show();
                                    password_info.show();
                                }
                            });

                        }

                        // Show Password Strength Info Element on focus
                        $(this).focus(function () {
                            var password_info = $(this).closest('.form-group, .an-group').find('.password-strength-data');
                            password_info.show();

                            if (password_info.hasClass('text-white bg-success border-success')) {
                                password_info.hide();
                            }
                        });
                        // Hide Password Strength Info Element on blur / not focus
                        $(this).blur(function () {
                            var password_info = $(this).closest('.form-group, .an-group').find('.password-strength-data');
                            password_info.hide();
                        });
                    }
                    //Toggle Password Button
                    if ($(this).attr('data-toggle-password') == 'true') {
                        // Styling Input with Toggle Password
                        $(this).css({
                            'padding-right': '2.375rem',
                        });
                        // Check if siblings has class .icon-control or not
                        if ($(this).siblings('.icon-control').length) {
                            // Add Toggle Password Element with Icon Class
                            $(this).siblings('.icon-control').before('<span class="toggle-password text-gray bx bx-lock-alt"></span>');
                            // Add Notifications password open & keep-secret
                            $(this).siblings('.toggle-password').before('<small class="badge keep-secret bg-warning">Keep secret!</small>');
                        } else {
                            // Add Toggle Password Element with Icon Class
                            $(this).before('<span class="toggle-password text-gray bx bx-lock-alt"></span>');
                            // Add Notifications password open & keep-secret
                            $(this).siblings('.toggle-password').before('<small class="badge keep-secret bg-warning">Keep secret!</small>');
                        }
                        // Hide .keep-secret Element First
                        $(this).closest('.form-group, .an-group').find('.keep-secret').hide();
                        $(this).closest('.form-group, .an-group').find('.keep-secret').css({
                            'font-size': '0.75rem',
                            'font-weight': 'normal',
                            'padding': '0 .25rem',
                            'border-radius': 'var(--' + prefix + 'border-radius)',
                            'line-height': 'var(--' + prefix + 'body-line-height)',
                        });
                        // Toggle password visibility
                        $(this).closest('.form-group, .an-group').find('.toggle-password').on('click', function () {
                            if ($(this).hasClass('bx bx-lock-alt')) {
                                $(this).removeClass('bx bx-lock-alt');
                                $(this).addClass('bx bx-lock-open-alt');
                                $(this).siblings('input').attr('type', 'text');
                                // Hide .keep-secret on device width < 768px
                                if ($(window).width() < 768) {
                                    $(this).closest('.form-group, .an-group').find('.keep-secret').hide();
                                } else {
                                    $(this).closest('.form-group, .an-group').find('.keep-secret').show();
                                }
                            } else {
                                $(this).removeClass('bx bx-lock-open-alt');
                                $(this).addClass('bx bx-lock-alt');
                                $(this).closest('.form-group, .an-group').find('.keep-secret').hide();
                                $(this).siblings('input').attr('type', 'password');
                            }
                        });
                    }
                }

                // Count Character on input and textarea if [data-count="true"] attribute is set
                if ($(this).attr('data-count') == 'true' && $(this).is('input') || $(this).attr('data-count') == 'true' && $(this).is('textarea')) {
                    var maxlength = $(this).attr('maxlength');
                    // Check if parent has class .input-group
                    if ($(this).parent().hasClass('input-group')) {
                        // Add Counter Element append .input-group
                        $(this).closest('.form-group, .an-group').find('.input-group').append('<small class="counter counter-group" style="font-size:.75rem;color:var(--' + prefix + 'border-color);margin-top:.25em;position: absolute;right: 0;bottom: 0;top:100%"></small>');
                    } else {
                        // Check if label exists
                        if ($(this).closest('.form-group, .an-group').find('label').length) {
                            // Add Counter Element after label
                            $(this).closest('.form-group, .an-group').find('label').after('<small class="counter" style="font-size:.75rem;color:var(--' + prefix + 'border-color);float:right;margin-top:.25em;"></small>');
                        } else {
                            // Add Counter Element after input/textarea
                            $(this).after('<small class="counter" style="font-size:.75rem;color:var(--' + prefix + 'border-color);float:right;margin-top:.25em;"></small>');
                        }
                    }
                    // Add Counter Element Value
                    $(this).closest('.form-group, .an-group').find('.counter').text('Max. 0/' + maxlength + ' character');
                    // Count Character on input and textarea
                    $(this).on('keyup', function () {
                        var maxlength = $(this).attr('maxlength');
                        $(this).closest('.form-group, .an-group').find('.counter').text('Max. ' + $(this).val().length + '/' + maxlength + ' character');
                        // Add .text-danger if character is more than maxlength
                        if ($(this).val().length == maxlength) {
                            $(this).closest('.form-group, .an-group').find('.counter').addClass('text-danger');
                        } else {
                            $(this).closest('.form-group, .an-group').find('.counter').removeClass('text-danger');
                        }
                        if ($(this).closest('.input-group').find('[data-count="true"]').hasClass('is-invalid')) {
                            $(this).closest('.input-group').find('.counter-group').css({'top': 'auto', 'margin-top': '0'});
                        } else {
                            $(this).closest('.input-group').find('.counter-group').css({'top': '100%', 'margin-top': '.25rem'});
                        }
                    });

                    // If input value is not empty, set counter value
                    if ($(this).val().length > 0) {
                        $(this).closest('.form-group, .an-group').find('.counter').text('Max ' + $(this).val().length + '/' + maxlength + ' character');
                        if ($(this).closest('.input-group').find('[data-count="true"]').hasClass('is-invalid')) {
                            $(this).closest('.input-group').find('.counter-group').css({'top': 'auto', 'margin-top': '0'});
                        } else {
                            $(this).closest('.input-group').find('.counter-group').css({'top': '100%', 'margin-top': '.25rem'});
                        }
                    }

                    // Hide Counter Element if maxlength is not set
                    if (maxlength == undefined) {
                        $(this).closest('.form-group, .an-group').find('.counter').hide();
                        // Check if parent has class .input-group
                        if ($(this).parent().hasClass('input-group')) {
                            $(this).closest('.form-group, .an-group').find('.input-group').after('<small>Please add maxlength attribute to this input/textarea</small>');
                        } else {
                            $(this).after('<small>Please add maxlength attribute to this input/textarea</small>');
                        }
                    }
                }

            });

            // Customize checkValidity()
            $('form').each(function () {
                var form = $(this);
                var buttonSubmit = form.find('button[type="submit"], input[type="submit"]')
                // Check if all required fields are filled then enable submit button
                form.find('input, textarea, select').each(function () {
                    $(this).on('keyup', function () {
                        // Check if all required fields are filled then enable submit button (input/textarea/select)
                        if (form.find('input:required, textarea:required, select:required').filter(function () {
                            return this.value === "" || this.classList.contains('is-invalid');
                        }).length === 0) {
                            // Disable submit button only inside form
                            buttonSubmit.attr('disabled', false);
                        } else {
                            buttonSubmit.attr('disabled', true);
                        }
                    });
                });
            });
        });
    };
    //Load functions
    $(document).ready(function () {
        ANForm();
    });
})(jQuery);
// Check if jquery-form plugin is not exist in this page
if (typeof jQuery.fn.ajaxForm === 'undefined') {
    // Import jquery-form plugin
    $.getScript('https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.3.0/jquery.form.min.js');
}