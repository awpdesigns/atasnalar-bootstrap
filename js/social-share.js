/*!
  *  Name: Social Share
  *  Description: Social Share Component/Widget
  *  Author: Atas Nalar
  *  Version: 1.0.0
  *  License: GNU General Public License v3.0 or later
  *  License URI: http://www.gnu.org/licenses/gpl-3.0.html
*/
// === Translation === //
var lang = {
    id : {
        shareText : 'Bagikan',
        sharefb : 'Bagikan ke Facebook',
        sharetw : 'Bagikan ke Twitter',
        sharepin : 'Bagikan ke Pinterest',
        shareli : 'Bagikan ke Linkedin',
        sharewa : 'Bagikan ke Whatsapp',
        sharetg : 'Bagikan ke Telegram',
        shareline : 'Bagikan ke Line',
        shareskype : 'Bagikan ke Skype',
        sendemail : 'Kirim ke Email',
        sendgmail : 'Kirim ke Gmail',
        print : 'Cetak',
        copy : 'Salin Tautan',
        copied : 'Berhasil disalin!',
        copysuccess : 'berhasil disalin',
        sharetitle : 'Judul',
        sharecontent : 'Konten',
        sharepage : 'Halaman',
    },
    en : {
        shareText : 'Share',
        sharefb : 'Share to Facebook',
        sharetw : 'Share to Twitter',
        sharepin : 'Share to Pinterest',
        shareli : 'Share to Linkedin',
        sharewa : 'Share to Whatsapp',
        sharetg : 'Share to Telegram',
        shareline : 'Share to Line',
        shareskype : 'Share to Skype',
        sendemail : 'Send to Email',
        sendgmail : 'Send to Gmail',
        print : 'Print',
        copy : 'Copy Link',
        copied : 'Copied!',
        copysuccess : 'successfully copied',
        sharetitle : 'Title',
        sharecontent : 'Content',
        sharepage : 'Page',

    }
}
var languageCode = $('html').attr('lang');
(function ($) {
    'use strict';

    var ANShare = function () {

        $('#an-social-share').each(function () {
            // Split social accounts from data-share attribute
            var socialAccount = $(this).attr('data-share').split(',');

            // Loop through social accounts
            // if social account includes 'facebook'
            if (socialAccount.includes('facebook')) {
                $(this).append('<a href="#facebook" target="_blank" class="an-share-facebook" aria-label="Facebook" title="' + lang[languageCode].sharefb + '"><i class="bx bxl-facebook"></i></a>');
            }
            // if social account includes 'twitter'
            if (socialAccount.includes('twitter')) {
                $(this).append('<a href="#twitter" target="_blank" class="an-share-twitter" aria-label="Twitter" title="' + lang[languageCode].sharetw + '"><i class="bx bxl-twitter"></i></a>');
            }
            // if social account includes 'pinterest'
            if (socialAccount.includes('pinterest')) {
                $(this).append('<a href="#pinterest" target="_blank" class="an-share-pinterest" aria-label="Pinterest" title="' + lang[languageCode].sharepin + '"><i class="bx bxl-pinterest"></i></a>');
            }
            // if social account includes 'linkedin'
            if (socialAccount.includes('linkedin')) {
                $(this).append('<a href="#linkedin" target="_blank" class="an-share-linkedin" aria-label="LinkedIn" title="' + lang[languageCode].shareli + '"><i class="bx bxl-linkedin"></i></a>');
            }
            // if social account includes 'whatsapp'
            if (socialAccount.includes('whatsapp')) {
                $(this).append('<a href="#whatsapp" target="_blank" class="an-share-whatsapp" aria-label="Whatsapp" title="' + lang[languageCode].sharewa + '"><i class="bx bxl-whatsapp"></i></a>');
            }
            // if social account includes 'telegram'
            if (socialAccount.includes('telegram')) {
                $(this).append('<a href="#telegram" target="_blank" class="an-share-telegram" aria-label="Telegram" title="' + lang[languageCode].sharetg + '"><i class="bx bxl-telegram"></i></a>');
            }
            // if social account includes 'line'
            if (socialAccount.includes('line')) {
                $(this).append('<a href="#line" target="_blank" class="an-share-line" aria-label="Line" title="' + lang[languageCode].shareline + '"><i class="bx bxl-line"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M8.5 0C3.825 0 0 3.236 0 7.253c0 3.571 2.975 6.584 7.119 7.142.319.112.637.223.744.446a.997.997 0 0 1 0 .781l-.107.782c0 .223-.106.892.744.446.956-.447 4.887-3.013 6.694-5.133C16.469 10.267 17 8.815 17 7.253 17 3.236 13.175 0 8.5 0ZM5.525 9.373c0 .112-.106.224-.213.224H2.87v-4.13c0-.11.106-.222.212-.222h.638c.106 0 .212.111.212.223v3.124h1.381c.107 0 .213.112.213.223v.558Zm1.381 0c0 .112-.106.224-.212.224h-.532c-.106 0-.212-.112-.212-.224V5.468c0-.112.106-.223.212-.223H6.8c.106 0 .213.111.213.223v3.905h-.107Zm4.144 0c0 .112-.106.224-.213.224h-.53L8.393 7.03v2.343c0 .112-.107.224-.213.224h-.53c-.106 0-.213-.112-.213-.224V5.468c0-.112.107-.223.213-.223h.637l1.807 2.566V5.468c0-.112.106-.223.212-.223h.638c.106 0 .212.111.212.223v3.905h-.106Zm3.294-3.236c0 .112-.106.224-.213.224h-1.594v.67h1.594c.107 0 .213.11.213.222v.67c0 .111-.106.223-.213.223h-1.594v.67h1.594c.107 0 .213.111.213.223v.67c0 .11-.106.222-.213.222h-2.444V5.356h2.444c.107 0 .213.112.213.223v.558Z"/></svg></i></a>');
            }
            // if social account includes 'skype'
            if (socialAccount.includes('skype')) {
                $(this).append('<a href="#skype" target="_blank" class="an-share-skype" aria-label="Skype" title="' + lang[languageCode].shareskype + '"><i class="bx bxl-skype"></i></a>');
            }
            // if social account includes 'email'
            if (socialAccount.includes('email')) {
                $(this).append('<a href="#email" target="_blank" class="an-share-email" aria-label="Email" title="' + lang[languageCode].sendemail + '"><i class="bx bx-envelope"></i></a>');
            }
            // if social account includes 'gmail'
            if (socialAccount.includes('gmail')) {
                $(this).append('<a href="#gmail" target="_blank" class="an-share-gmail" aria-label="Gmail" title="' + lang[languageCode].sendgmail + '"><i class="bx bxl-gmail"></i></a>');
            }
            // if social account includes 'print'
            if (socialAccount.includes('print')) {
                $(this).append('<a href="#print" class="an-share-print" aria-label="Print" title="' + lang[languageCode].print + '"><i class="bx bx-printer"></i></a>');
            }
            // if social account includes 'copy'
            if (socialAccount.includes('copy')) {
                var copyTitle = $(this).attr('data-copy-title') ? $(this).attr('data-copy-title') : document.title;
                $(this).append('<input type="hidden" name="copy-link" id="copy-link" value="' + window.location.href + '" />');
                // Get title of page
                $(this).append('<a href="#copy" class="an-share-copy" onclick="copyText(this)" aria-label="Copy link" title="' + lang[languageCode].copy + '" data-message="URL ' + copyTitle + ' ' + lang[languageCode].copysuccess + '"><i class="bx bx-link"></i></a>');
            }

            // find each a[class^="an-share-"] and add click event
            var shareButton = $(this).find('a[class^="an-share-"]');
            // Get inner html of element with attribute data-an-content if it exists
            var shareContent = $('[data-an-content]') ? $('[data-an-content]').html() : '';
            shareButton.each(function () {
                shareButton.on('click', function (e) {
                    e.preventDefault();
                    var shareLink = $(this).attr('href');
                    var docTitle = document.title;
                    // Replace "|" with "-"
                    var docTitle = docTitle.replace(/\|/g, '-');

                    if (shareLink === '#facebook') {
                        window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href, 'facebook-share-dialog', 'width=626,height=436,scrollbars=yes,resizable=yes');
                        return;
                    }
                    if (shareLink === '#twitter') {
                        if (shareContent) {
                            window.open('https://twitter.com/intent/tweet?url=' + lang[languageCode].sharetitle + ':%20' + docTitle + '%0A' + lang[languageCode].sharecontent + ':%20' + shareContent + '%0ALink%20url:%20' + window.location.href, 'twitter-share-dialog', 'width=626,height=436,scrollbars=yes,resizable=yes');
                            return;
                        } else {
                            window.open('https://twitter.com/intent/tweet?url=' + lang[languageCode].sharetitle + ':%20' + docTitle + '%0ALink%20url:%20' + window.location.href, 'twitter-share-dialog', 'width=626,height=436,scrollbars=yes,resizable=yes');
                            return;
                        }
                    }
                    if (shareLink === '#google-plus') {
                        window.open('https://plus.google.com/share?url=' + window.location.href, 'googleplus-share-dialog', 'width=626,height=436,scrollbars=yes,resizable=yes');
                        return;
                    }
                    if (shareLink === '#pinterest') {
                        if (shareContent) {
                            window.open('https://pinterest.com/pin/create/button/?url=' + window.location.href + '&description=' + shareContent, 'pinterest-share-dialog', 'width=626,height=436,scrollbars=yes,resizable=yes');
                            return;
                        } else {
                            window.open('https://pinterest.com/pin/create/button/?url=' + window.location.href, 'pinterest-share-dialog', 'width=626,height=436,scrollbars=yes,resizable=yes');
                            return;
                        }
                    }
                    if (shareLink === '#linkedin') {
                        window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + window.location.href, 'linkedin-share-dialog', 'width=626,height=436,scrollbars=yes,resizable=yes');
                        return;
                    }
                    if (shareLink === '#whatsapp') {
                        if (shareContent) {
                            window.open('whatsapp://send?text=' + lang[languageCode].sharetitle + ':%20' + docTitle + '%0A' + lang[languageCode].sharecontent + ':%20' + shareContent + '%0ALink%20url:%20' + window.location.href, 'whatsapp-share-dialog', 'width=626,height=436,scrollbars=yes,resizable=yes');
                            return;
                        } else {
                            window.open('whatsapp://send?text=' + lang[languageCode].sharetitle + ':%20' + docTitle + '%0ALink%20url:%20' + window.location.href, 'whatsapp-share-dialog', 'width=626,height=436,scrollbars=yes,resizable=yes');
                            return;
                        }
                    }
                    if (shareLink === '#telegram') {
                        if (shareContent) {
                            window.open('https://telegram.me/share/url?url=' + lang[languageCode].sharetitle + ':%20' + docTitle + '%0A' + lang[languageCode].sharecontent + ':%20' + shareContent + '%0ALink%20url:%20' + window.location.href, 'telegram-share-dialog', 'width=626,height=436,scrollbars=yes,resizable=yes');
                            return;
                        } else {
                            window.open('https://telegram.me/share/url?url=' + lang[languageCode].sharetitle + ':%20' + docTitle + '%0ALink%20url:%20' + window.location.href, 'telegram-share-dialog', 'width=626,height=436,scrollbars=yes,resizable=yes');
                            return;
                        }
                    }
                    if (shareLink === '#line') {
                        if (shareContent) {
                            window.open('https://lineit.line.me/share/ui?url=' + lang[languageCode].sharetitle + ':%20' + docTitle + '%0A' + lang[languageCode].sharecontent + ':%20' + shareContent + '%0ALink%20url:%20' + window.location.href, 'line-share-dialog', 'width=626,height=436,scrollbars=yes,resizable=yes');
                            return;
                        } else {
                            window.open('https://lineit.line.me/share/ui?url=' + lang[languageCode].sharetitle + ':%20' + docTitle + '%0ALink%20url:%20' + window.location.href, 'line-share-dialog', 'width=626,height=436,scrollbars=yes,resizable=yes');
                            return;
                        }
                    }
                    if (shareLink === '#skype') {
                        if (shareContent) {
                            window.open('https://web.skype.com/share?url=' + window.location.href + '&text=' + shareContent, 'skype-share-dialog', 'width=626,height=436,scrollbars=yes,resizable=yes');
                            return;
                        } else {
                            window.open('https://web.skype.com/share?url=' + window.location.href, 'skype-share-dialog', 'width=626,height=436,scrollbars=yes,resizable=yes');
                            return;
                        }
                    }
                    if (shareLink === '#email') {
                        if (shareContent) {
                            window.location.href = 'mailto:?subject=' + lang[languageCode].sharepage + ':%20' + docTitle + '&body=' + lang[languageCode].sharetitle + ':%20' + docTitle + '%0A' + lang[languageCode].sharecontent + ':%20' + shareContent + '%0ALink%20url:%20' + window.location.href;
                            return;
                        } else {
                            window.location.href = 'mailto:?subject=' + lang[languageCode].sharepage + ':%20' + docTitle + '&body=' + lang[languageCode].sharetitle + ':%20' + docTitle + '%0ALink%20url:%20' + window.location.href;
                            return;
                        }
                    }
                    if (shareLink === '#gmail') {
                        if (shareContent) {
                            window.open('https://mail.google.com/mail/?view=cm&fs=1&tf=1&su=' + lang[languageCode].sharepage + ':%20' + docTitle + '&body=' + lang[languageCode].sharetitle + ':%20' + docTitle + '%0A' + lang[languageCode].sharecontent + ':%20' + shareContent + '%0ALink%20url:%20' + window.location.href, 'gmail-share-dialog', 'width=626,height=436,scrollbars=yes,resizable=yes');
                        } else {
                            window.open('https://mail.google.com/mail/?view=cm&fs=1&tf=1&su=' + lang[languageCode].sharepage + ':%20' + docTitle + '&body=' + lang[languageCode].sharetitle + ':%20' + docTitle + '%0ALink%20url:%20' + window.location.href, 'gmail-share-dialog', 'width=626,height=436,scrollbars=yes,resizable=yes');
                            return;
                        }
                    }
                    if (shareLink === '#print') {
                        window.location.href = 'javascript:window.print()';
                        return;
                    }
                    if (shareLink === '#copy') {
                        window.location.href = 'javascript:void(0)';
                        return;
                    }
                });
            });
        });
        $('ul#an-social-share.dropdown-menu').each(function () {
            // Find a then wrap it with li tag
            $(this).find('a').addClass('dropdown-item').wrap('<li></li>');
        });
    };
    $(window).on('load', function () {
        var cdnBoxicons = 'https://unpkg.com/boxicons@latest/css/boxicons.min.css';

        if ($('#an-social-share').length > 0) {
            // Check if boxicons is exists in head tag
            if ($('#boxicons-css').length === 0) {
                // If not exists, then add boxicons to head tag
                $('head').append('<link rel="stylesheet" href="' + cdnBoxicons + '" class="boxicons-css">');
            }
        }

        if ($('#an-social-share').length === 0) {
            $('#an-social-css').remove();
            $('#an-social-js').remove();
        }

        ANShare();
    });
})(jQuery);

function copyText(el) {
    var content = jQuery(el).siblings('input').val();
    var temp = jQuery("<input>");
    temp.attr('readonly', 'readonly');
    jQuery("body").append(temp);
    temp.val(content.replace(/<br ?\/?>/g, "\n")).select();
    document.execCommand("copy");
    temp.remove();

    var text = jQuery(el).html();
    jQuery(el).html('<i class="bx bx-check" style="color: var(--social-share-white);"></i>');
    jQuery(el).css('background-color', 'var(--social-share-success)' ? 'var(--social-share-success)' : '#27C451');
    jQuery(el).css('color', 'var(--social-share-white)');
    jQuery(el).addClass('disabled');

    // Create alert
    jQuery(el).parents('body').append('<div class="an-share-alert-copied">' + jQuery(el).data('message') + '</div>');

    // Style Alert position on mobile
    if (jQuery(window).width() < 768) {
        jQuery('.an-share-alert-copied').css({
            'width': '90%',
            'right': '50%',
            'transform': 'translateX(50%)'
        });
    }


    setTimeout(function () {
        jQuery(el).html(text);
        jQuery(el).parents('body').find('.an-share-alert-copied').remove();
        jQuery(el).removeAttr('style');
        jQuery(el).removeClass('disabled');
    }, 2000);
}

// Copy to clipboard other element with target id
// Example: <button class="btn btn-primary onClick="copyThat('#target-id', 'text/html');">Copy</button>
// <p id="target-id">Content</p>
function copyThat(target, type) {
    if (type === 'html') {
        var content = jQuery(target).html();
        var temp = jQuery("<textarea>");
    } else {
        var content = jQuery(target).text();
        var temp = jQuery("<input>");
    }
    temp.attr('readonly', 'readonly');
    jQuery("body").append(temp);
    if (type === 'html') {
        // Remove attribute style
        temp.val(content.replace(/style="[^"]*"/g, '')).select();
    } else {
        temp.val(content.replace(/<br ?\/?>/g, "\n")).select();
    }
    document.execCommand("copy");
    temp.remove();

    // Create alert
    jQuery(target).parents('body').append('<div class="an-share-alert-copied">' + lang[languageCode].copied + '</div>');

    // Style Alert position on mobile
    if (jQuery(window).width() < 768) {
        jQuery('.an-share-alert-copied').css({
            'width': '90%',
            'right': '50%',
            'transform': 'translateX(50%)'
        });
    }

    setTimeout(function () {
        jQuery(target).parents('body').find('.an-share-alert-copied').remove();
    }, 2000);
}