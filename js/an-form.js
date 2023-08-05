/*
    Author: Atas Nalar
    Version: 1.0
*/
(function ($) {
    'use strict';

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
                        // Add Email Validation Element
                        $(this).before('<small class="email-validation"></small>');
                        // Hide Email Validation Element First
                        $(this).prev().hide();
                        // Email Validation css
                        $(this).prev().css({
                            'color': 'var(--white)',
                            'font-size': '0.75rem',
                            'padding': '0 .25rem',
                            'border-radius': '0.25rem',
                        });

                        // Check if value match with pattern
                        $(this).on('keyup', function () {
                            var email_validation = $(this).prev();

                            if ($(this).val().length > 0) {
                                if (emailRegexp.test($(this).val())) {
                                    $(this).removeClass('is-invalid');
                                    $(this).addClass('is-valid');
                                    email_validation.removeClass('bg-danger');
                                    email_validation.addClass('bg-success');
                                    email_validation.text('Email valid');
                                    email_validation.show();
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
                        if (codeArea == undefined || codeArea == '') {
                            // Throw an error
                            $(this).after('<small style="color:red;">Please add data-code-area attribute to this input</small>');
                            form.find('button[type="submit"]').attr('disabled', true);
                        }
                        // var phoneRegexp = /^62[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/im;
                        var phoneRegexp = new RegExp('^' + codeArea + '[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,8}$', 'im');
                        // Add Phone Validation Element
                        $(this).before('<small class="phone-validation"></small>');
                        // Hide Phone Validation Element First
                        $(this).prev().hide();
                        // Phone Validation css
                        $(this).prev().css({
                            'color': 'var(--white)',
                            'font-size': '0.75rem',
                            'padding': '0 .25rem',
                            'border-radius': '0.25rem',
                        });
                        // Force input only number / Only ASCII character in that range allowed
                        /* Use on attribute version
                        $(this).attr('onkeypress', 'return (event.charCode >= 48 && event.charCode <= 57)');
                        */
                        $(this).on('keypress', function (e) {
                            var charCode = e.which || e.keyCode;
                            var phone_validation = $(this).prev();

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
                            var phone_validation = $(this).prev();
                            var phoneValue = $(this).val();

                            // if first number is 0 and this input is required, replace it with codeArea
                            if (phoneValue.substring(0, 1) == 0) {
                                phoneValue = codeArea + phoneValue.substring(1);
                                $(this).val(phoneValue);
                            }

                            if ($(this).val().length > 0) {
                                if (phoneRegexp.test($(this).val())) {
                                    $(this).removeClass('is-invalid');
                                    $(this).addClass('is-valid');
                                    phone_validation.removeClass('bg-danger');
                                    phone_validation.addClass('bg-success');
                                    phone_validation.text('Valid');
                                    phone_validation.show();
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
                            }
                        });
                        // Check if codeArea is valid
                        $(this).on('blur', function () {
                            var phone_validation = $(this).prev();
                            var phoneValue = $(this).val();

                            if (phoneValue.substring(0, 1) == 0) {
                                phoneValue = codeArea + phoneValue.substring(1);
                                $(this).val(phoneValue);
                            }
                            if ($(this).val().length > 0) {
                                if (phoneRegexp.test($(this).val())) {
                                    $(this).removeClass('is-invalid');
                                    $(this).addClass('is-valid');
                                    phone_validation.removeClass('bg-danger');
                                    phone_validation.addClass('bg-success');
                                    phone_validation.text('Valid');
                                    phone_validation.show();
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
                            }
                        });
                    }


                }

                // Add Password Validation to input[type=password] that has a sibling with class .confirm-password | Add Toggle Password Button to input[type=password] that has a [data-toggle-password=true] | Add Password Strength Meter to input[type=password] that has a [data-password-strength=true] and validate from [data-regexp]
                if ($(this).is('[type="password"]')) {
                    // Confirm Password Validation
                    if ($(this).attr('id') == 'confirm-password' || $(this).hasClass('confirm-password')) {
                        // Remove .password-strength, .password-strength-info, this attribute data-password-strength, data-regexp
                        $(this).removeAttr('data-password-strength');
                        $(this).removeAttr('data-regexp');

                        // Add Password Validation Element
                        $(this).before('<small class="password-validations"></small>');
                        // Hide Password Validation Element First
                        $(this).parent().find('.password-validations').hide();
                        // Password Validation css
                        $(this).parent().find('.password-validations').css({
                            'color': 'var(--white)',
                            'font-size': '0.75rem',
                            'padding': '0 .25rem',
                            'margin-right': '0.25rem',
                            'border-radius': '0.25rem',
                        });

                        // Validate this value must same with other input[type=password] that are not #confirm-password or .confirm-password
                        $(this).on('keyup', function () {
                            var password_validations = $(this).parent().find('.password-validations');

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
                        // Add Password Strength Element
                        $(this).before('<small class="password-strength"></small>');
                        // Add Password Strength Info Element
                        $(this).before('<div class="password-strength-info" data-switch="true" data-property="border-radius"></div>');
                        // Append Password Strength Info Details
                        $(this).parent().find('.password-strength-info').append('<small>Password must contain at least:</small>');
                        // Append Password Strength Info List Elements
                        $(this).parent().find('.password-strength-info').append('<ul class="m-0 main"><ul class="sub"></ul></ul>');
                        // Hide Password Strength & Password Strength Info Element First
                        $(this).parent().find('.password-strength').hide();
                        $(this).parent().find('.password-strength-info').hide();
                        // Password Strength css
                        $(this).parent().find('.password-strength').css({
                            'color': 'var(--white)',
                            'font-size': '0.75rem',
                            'padding': '0 .25rem',
                            'margin-right': '.25rem',
                            'border-radius': '0.25rem',
                        });
                        // Password Strength Info css
                        $(this).parent().find('.password-strength-info').css({
                            'position': 'absolute',
                            'top': '100%',
                            'background': 'var(--white)',
                            'padding': '1rem',
                            'border-radius': '0.5rem',
                            'z-index': '3',
                            'box-shadow': '0 0.25rem 0.5rem rgba(0,0,0,0.1)',
                            'border': '1px solid var(--gray-10)',
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
                            $(this).parent().find('.password-strength-info ul.main').prepend('<li><small class="character-strength">' + minLength + ' Character<span class="inc text-gray">, including:</span></small></li>');
                            // ! 1 uppercase letter
                            $(this).parent().find('.password-strength-info ul.sub').append('<li><small class="uppercase-strength">1 Uppercase</small></li>');
                            // ! 1 lowercase letter
                            $(this).parent().find('.password-strength-info ul.sub').append('<li><small class="lowercase-strength">1 Lowercase</small></li>');
                            // ! 1 number
                            $(this).parent().find('.password-strength-info ul.sub').append('<li><small class="number-strength">1 Number</small></li>');
                            // ! 1 special character
                            $(this).parent().find('.password-strength-info ul.sub').append('<li><small class="special-strength">1 Special Character</small></li>');
                            // Check if value match with pattern and add success class to each pattern
                            $(this).keyup(function () {
                                var password = $(this).val();
                                var password_strength = $(this).parent().find('.password-strength');
                                var password_pattern = $(this).attr('pattern');
                                var password_info = $(this).parent().find('.password-strength-info');

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
                                    $(this).parent().find('.invalid-feedback').hide();
                                    $(this).removeClass('is-invalid');
                                    $(this).addClass('is-valid');
                                    setTimeout(function () {
                                        password_info.fadeOut('slow', function () { $(this).hide(); });
                                    }, 1500);

                                } else {
                                    password_info.removeClass('text-white bg-success border-success');
                                    password_info.find('small').removeClass('text-white');
                                    $(this).parent().find('.invalid-feedback').show();
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
                                $(this).parent().find('.password-strength-info ul.sub').append('<li><small class="uppercase-strength">1 Uppercase</small></li>');
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
                                $(this).parent().find('.password-strength-info ul.sub').append('<li><small class="lowercase-strength">1 Lowercase</small></li>');
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
                                $(this).parent().find('.password-strength-info ul.sub').append('<li><small class="number-strength">1 Number</small></li>');
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
                                $(this).parent().find('.password-strength-info ul.sub').append('<li><small class="special-strength">1 Special Character</small></li>');
                            } else {
                                var special = '';
                                var special_pattern = '';
                            }
                            // ! Check if include min:
                            if (regex_data_object.min && regex_data_object.min >= 6) {
                                var minLength = regex_data_object.min;

                                // Append this to Password Strength Info List Element Details with their class name that matches with current pattern:
                                $(this).parent().find('.password-strength-info ul.sub').append('<li><small class="character-strength">' + minLength + ' Character<span class="inc text-gray">, including:</span></small></li>');
                            } else {
                                var minLength = 8;

                                $(this).parent().find('.password-strength-info ul.sub').append('<li><small class="character-strength">' + minLength + ' Character<span class="inc text-gray">, including:</span></small></li>');
                            }

                            // Order last <li> to be the first one on ul.main / ul.sub:
                            $(this).parent().find('.password-strength-info ul.main li:last-child').prependTo($(this).parent().find('.password-strength-info ul.main'));
                            $(this).parent().find('.password-strength-info ul.sub li:last-child').prependTo($(this).parent().find('.password-strength-info ul.sub'));

                            // Add Default Pattern
                            $(this).attr('pattern', '^' + lowerCase_pattern + upperCase_pattern + number_pattern + special_pattern + '[' + lowerCase + upperCase + number + special + ']{' + minLength + ',}$');

                            // Check if value match with pattern and add success class to each pattern

                            //$(this).val($(this).attr('pattern'));
                            $(this).keyup(function () {
                                var password = $(this).val();
                                var password_strength = $(this).parent().find('.password-strength');
                                var password_pattern = $(this).attr('pattern');
                                var password_info = $(this).parent().find('.password-strength-info');

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
                                    $(this).parent().find('.invalid-feedback').hide();
                                    $(this).removeClass('is-invalid');
                                    $(this).addClass('is-valid');
                                    setTimeout(function () {
                                        password_info.fadeOut('slow', function () { $(this).hide(); });
                                    }, 1500);

                                } else {
                                    password_info.removeClass('text-white bg-success border-success');
                                    $(this).parent().find('.invalid-feedback').show();
                                    password_info.show();
                                }
                            });

                        }

                        // Show Password Strength Info Element on focus
                        $(this).focus(function () {
                            var password_info = $(this).parent().find('.password-strength-info');
                            password_info.show();

                            if (password_info.hasClass('text-white bg-success border-success')) {
                                password_info.hide();
                            }
                        });
                        // Hide Password Strength Info Element on blur / not focus
                        $(this).blur(function () {
                            var password_info = $(this).parent().find('.password-strength-info');
                            password_info.hide();
                        });
                    }
                    //Toggle Password Button
                    if ($(this).attr('data-toggle-password') == 'true') {
                        // Styling Input with Toggle Password
                        $(this).css({
                            'padding-right': '2.375rem',
                        });
                        // Add Toggle Password Element with Icon Class
                        $(this).after('<span class="toggle-password text-gray bx bx-lock-alt"></span>');
                        // Add Notifications password open & not secure
                        if ($(this).siblings('.password-validations').length) {
                            $(this).siblings('.password-validations').after('<small class="not-secure bg-warning text-dark float-end" style="font-size:.75rem;padding:0 .25rem;border-radius:.25rem">Not secure!</small>');
                        } else {
                            $(this).prev().before('<small class="not-secure bg-warning text-dark float-end" style="font-size:.75rem;padding:0 .25rem;border-radius:.25rem">Not secure!</small>');
                        }
                        // Hide .not-secure Element First
                        $(this).parent().find('.not-secure').hide();
                        // Toggle password visibility
                        $(this).next().on('click', function () {
                            if ($(this).hasClass('bx bx-lock-alt')) {
                                $(this).removeClass('bx bx-lock-alt');
                                $(this).addClass('bx bx-lock-open-alt');
                                $(this).prev().attr('type', 'text');
                                // Hide .not-secure on device width < 768px
                                if ($(window).width() < 768) {
                                    $(this).parent().find('.not-secure').hide();
                                } else {
                                    $(this).parent().find('.not-secure').show();
                                }
                            } else {
                                $(this).removeClass('bx bx-lock-open-alt');
                                $(this).addClass('bx bx-lock-alt');
                                $(this).parent().find('.not-secure').hide();
                                $(this).prev().attr('type', 'password');
                            }
                        });
                    }
                }

                // Count Character on input and textarea if [data-count="true"] attribute is set
                if ($(this).attr('data-count') == 'true' && $(this).is('input') || $(this).attr('data-count') == 'true' && $(this).is('textarea')) {
                    var maxlength = $(this).attr('maxlength');

                    // Add Counter Element
                    $(this).after('<small class="counter" style="font-size:.75rem;color:#60686E;float:right;margin-top:.25em;"></small>');
                    // Add Counter Element Value
                    $(this).parent().find('.counter').text('Max. 0/' + maxlength + ' character');
                    // Count Character on input and textarea
                    $(this).on('keyup', function () {
                        var maxlength = $(this).attr('maxlength');
                        $(this).parent().find('.counter').text('Max. ' + $(this).val().length + '/' + maxlength + ' character');
                        // Add .text-danger if character is more than maxlength
                        if ($(this).val().length == maxlength) {
                            $(this).parent().find('.counter').addClass('text-danger');
                        } else {
                            $(this).parent().find('.counter').removeClass('text-danger');
                        }
                    });

                    // If input value is not empty, set counter value
                    if ($(this).val().length > 0) {
                        $(this).parent().find('.counter').text('Max ' + $(this).val().length + '/' + maxlength + ' character');
                    }

                    // Hide Counter Element if maxlength is not set
                    if (maxlength == undefined) {
                        $(this).parent().find('.counter').hide();
                        $(this).after('<small>Please add maxlength attribute to this input/textarea</small>');
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