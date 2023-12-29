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
        shareText : 'Bagikan ke',
        sendText : 'Kirim ke',
        print : 'Cetak',
        copy : 'Salin Tautan',
        copied : 'Tersalin!',
        copysuccess : 'berhasil disalin',
        sharetitle : 'Judul',
        sharecontent : 'Konten',
        sharepage : 'Halaman',
    },
    en : {
        shareText : 'Share to',
        sendText : 'Send to',
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
// If language code is en-US, change it to en
if (languageCode == 'en-US') {
    languageCode = 'en';
}
// If language code is id-ID, change it to id
if (languageCode == 'id-ID') {
    languageCode = 'id';
}
// If language code is not in the list, change it to en
if (languageCode != 'en' && languageCode != 'id') {
    languageCode = 'en';
}
// === End Translation === //
var ANShare = function () {
    var socialShareElement = document.getElementById('an-social-share');
    if (socialShareElement) {
        var socialAccount = socialShareElement.getAttribute('data-share').split(',');

        socialAccount.forEach(function (account) {
            // if social account includes 'facebook'
            if (account === 'facebook') {
                socialShareElement.innerHTML += '<button type="button" class="an-share-button an-share-facebook" data-type="facebook" aria-label="Facebook" title="' + lang[languageCode].shareText + ' Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentcolor;"><path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path></svg></button';
            }
            // if social account includes 'twitter'
            if (account === 'twitter') {
                socialShareElement.innerHTML += '<button type="button" class="an-share-button an-share-twitter" data-type="twitter" aria-label="Twitter" title="' + lang[languageCode].shareText + ' Twitter"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24" style="fill: currentcolor;"><path d="m19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path></svg></button';
            }
            // if social account includes 'twitter-x'
            if (account === 'twitter-x') {
                socialShareElement.innerHTML += '<button type="button" class="an-share-button an-share-twitter-x" data-type="twitter-x" aria-label="Twitter-X" title="' + lang[languageCode].shareText + ' Twitter-X"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 2H1L9.26086 13.0145L1.44995 21.9999H4.09998L10.4883 14.651L16 22H23L14.3917 10.5223L21.8001 2H19.1501L13.1643 8.88578L8 2ZM17 20L5 4H7L19 20H17Z" fill="currentColor"></path></svg></button';
            }
            // if social account includes 'pinterest'
            if (account === 'pinterest') {
                socialShareElement.innerHTML += '<button type="button" class="an-share-button an-share-pinterest" data-type="pinterest" aria-label="Pinterest" title="' + lang[languageCode].shareText + ' Pinterest"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M11.99 2C6.472 2 2 6.473 2 11.99c0 4.232 2.633 7.85 6.35 9.306-.088-.79-.166-2.006.034-2.868.182-.78 1.172-4.966 1.172-4.966s-.299-.599-.299-1.484c0-1.388.805-2.425 1.808-2.425.853 0 1.264.64 1.264 1.407 0 .858-.546 2.139-.827 3.327-.235.994.499 1.805 1.479 1.805 1.775 0 3.141-1.872 3.141-4.575 0-2.392-1.719-4.064-4.173-4.064-2.843 0-4.512 2.132-4.512 4.335 0 .858.331 1.779.744 2.28a.3.3 0 0 1 .069.286c-.076.315-.245.994-.277 1.133-.044.183-.145.222-.335.134-1.247-.581-2.027-2.405-2.027-3.871 0-3.151 2.289-6.045 6.601-6.045 3.466 0 6.159 2.469 6.159 5.77 0 3.444-2.171 6.213-5.184 6.213-1.013 0-1.964-.525-2.29-1.146l-.623 2.374c-.225.868-.834 1.956-1.241 2.62a10 10 0 0 0 2.958.445c5.517 0 9.99-4.473 9.99-9.99S17.507 2 11.99 2"></path></svg></button';
            }
            // if social account includes 'linkedin'
            if (account === 'linkedin') {
                socialShareElement.innerHTML += '<button type="button" class="an-share-button an-share-linkedin" data-type="linkedin" aria-label="LinkedIn" title="' + lang[languageCode].shareText + ' LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><circle cx="4.983" cy="5.009" r="2.188"></circle><path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"></path></svg></button';
            }
            // if social account includes 'whatsapp'
            if (account === 'whatsapp') {
                socialShareElement.innerHTML += '<button type="button" class="an-share-button an-share-whatsapp" data-type="whatsapp" aria-label="Whatsapp" title="' + lang[languageCode].shareText + ' Whatsapp"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263"></path></svg></button';
            }
            // if social account includes 'telegram'
            if (account === 'telegram') {
                socialShareElement.innerHTML += '<button type="button" class="an-share-button an-share-telegram" data-type="telegram" aria-label="Telegram" title="' + lang[languageCode].shareText + ' Telegram"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"></path></svg></button';
            }
            // if social account includes 'line'
            if (account === 'line') {
                socialShareElement.innerHTML += '<button type="button" class="an-share-button an-share-line" data-type="line" aria-label="Line" title="' + lang[languageCode].shareText + ' Line"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" style="fill: currentColor;"><path d="M8.5 0C3.825 0 0 3.236 0 7.253c0 3.571 2.975 6.584 7.119 7.142.319.112.637.223.744.446a.997.997 0 0 1 0 .781l-.107.782c0 .223-.106.892.744.446.956-.447 4.887-3.013 6.694-5.133C16.469 10.267 17 8.815 17 7.253 17 3.236 13.175 0 8.5 0ZM5.525 9.373c0 .112-.106.224-.213.224H2.87v-4.13c0-.11.106-.222.212-.222h.638c.106 0 .212.111.212.223v3.124h1.381c.107 0 .213.112.213.223v.558Zm1.381 0c0 .112-.106.224-.212.224h-.532c-.106 0-.212-.112-.212-.224V5.468c0-.112.106-.223.212-.223H6.8c.106 0 .213.111.213.223v3.905h-.107Zm4.144 0c0 .112-.106.224-.213.224h-.53L8.393 7.03v2.343c0 .112-.107.224-.213.224h-.53c-.106 0-.213-.112-.213-.224V5.468c0-.112.107-.223.213-.223h.637l1.807 2.566V5.468c0-.112.106-.223.212-.223h.638c.106 0 .212.111.212.223v3.905h-.106Zm3.294-3.236c0 .112-.106.224-.213.224h-1.594v.67h1.594c.107 0 .213.11.213.222v.67c0 .111-.106.223-.213.223h-1.594v.67h1.594c.107 0 .213.111.213.223v.67c0 .11-.106.222-.213.222h-2.444V5.356h2.444c.107 0 .213.112.213.223v.558Z"></path></svg></button';
            }
            // if social account includes 'skype'
            if (account === 'skype') {
                socialShareElement.innerHTML += '<button type="button" class="an-share-button an-share-skype" data-type="skype" aria-label="Skype" title="' + lang[languageCode].shareText + ' Skype"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M11.857 17.417c-2.947 0-4.294-1.524-4.294-2.641 0-.266.108-.521.298-.705a.946.946 0 0 1 .71-.264c1.261 0 .931 1.92 3.286 1.92 1.203 0 1.91-.736 1.91-1.425 0-.415-.234-.889-1.028-1.079l-2.629-.673c-2.111-.545-2.479-1.737-2.479-2.842 0-2.293 2.068-3.124 4.036-3.124 1.814 0 3.97 1.016 3.97 2.391 0 .592-.488.91-1.055.91-1.078 0-.897-1.536-3.063-1.536-1.077 0-1.645.513-1.645 1.23s.839.96 1.574 1.123l1.941.445c2.126.486 2.691 1.751 2.691 2.963 0 1.865-1.423 3.305-4.226 3.305m8.139-3.942c.086-.49.128-.986.128-1.482a8.472 8.472 0 0 0-2.952-6.474 8.211 8.211 0 0 0-6.788-1.856A4.818 4.818 0 0 0 7.935 3a4.954 4.954 0 0 0-4.27 2.519 5.103 5.103 0 0 0-.015 5.011 8.51 8.51 0 0 0 2.282 7.453 8.23 8.23 0 0 0 7.333 2.355 4.823 4.823 0 0 0 2.443.662 4.954 4.954 0 0 0 4.269-2.518 5.095 5.095 0 0 0 .016-5.009"></path></svg></button';
            }
            // if social account includes 'email'
            if (account === 'email') {
                socialShareElement.innerHTML += '<button type="button" class="an-share-button an-share-email" data-type="email" aria-label="Email" title="' + lang[languageCode].sendText + ' Email"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path></svg></button';
            }
            // if social account includes 'gmail'
            if (account === 'gmail') {
                socialShareElement.innerHTML += '<button type="button" class="an-share-button an-share-gmail" data-type="gmail" aria-label="Gmail" title="' + lang[languageCode].sendText + ' Gmail"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="m18.73 5.41-1.28 1L12 10.46 6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64z"></path></svg></button';
            }
            // if social account includes 'print' or 'print:{target class/id}'
            if (account === 'print' || account.includes('print:')) {
                var targetPrint = account.split(':')[1];
                var targetPrintElements = '';
                if (targetPrint) {
                    // Target can be multiple elements if it's a class
                    targetPrintElements = ' data-print-target="' + targetPrint + '"';
                }
                socialShareElement.innerHTML += '<button type="button" class="an-share-button an-share-print" data-type="print"' + targetPrintElements + ' aria-label="' + lang[languageCode].print + '" title="' + lang[languageCode].print + '"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M19 7h-1V2H6v5H5c-1.654 0-3 1.346-3 3v7c0 1.103.897 2 2 2h2v3h12v-3h2c1.103 0 2-.897 2-2v-7c0-1.654-1.346-3-3-3zM8 4h8v3H8V4zm8 16H8v-4h8v4zm4-3h-2v-3H6v3H4v-7c0-.551.449-1 1-1h14c.552 0 1 .449 1 1v7z"></path><path d="M14 10h4v2h-4z"></path></svg></button>';
            }
            if (account === 'copy') {
                var copyTitle = socialShareElement.getAttribute('data-copy-title') || document.title;
                socialShareElement.innerHTML += '<input type="hidden" name="copy-link" id="copy-link" value="' + window.location.href + '" />';
                socialShareElement.innerHTML += '<button type="button" class="an-share-button an-share-copy" data-type="copy" aria-label="' + lang[languageCode].copy + '" title="' + lang[languageCode].copy + '" data-message="URL ' + copyTitle + ' ' + lang[languageCode].copysuccess + '"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"></path><path d="M6 12h6v2H6zm0 4h6v2H6z"></path></svg></button>';
            }
        });
        // Wrap all buttons in list (Type: Dropdown)
        document.querySelectorAll('ul#an-social-share.an-social-share-list').forEach(function(list) {
            list.querySelectorAll('.an-share-button').forEach(function(link) {
                link.classList.add('an-item-list');
                var li = document.createElement('li');
                li.appendChild(link.cloneNode(true));
                link.parentNode.replaceChild(li, link);
            });
        });
        // On Click
        var shareButtons = document.querySelectorAll('.an-share-button');
        var shareContent = document.querySelector('[data-share-content]');
        shareButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                var shareType = this.dataset.type;
                var docTitle = document.title;
                var pageTitle = window.location.pathname.split('/').pop().replace('.html', '').replace(/-/g, ' ').replace(/\w\S*/g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
                if (pageTitle === '') {
                    pageTitle = docTitle;
                }
                if (shareType === 'facebook') {
                    var sharelink = 'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href;
                    window.open(sharelink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                }
                else if (shareType === 'twitter') {
                    var sharelink = encodeURIComponent(lang[languageCode].sharetitle + ': ' + docTitle + '\nLink url: ' + window.location.href);
                    if (shareContent) {
                        sharelink = encodeURIComponent(lang[languageCode].sharetitle + ': ' + docTitle + '\n' + lang[languageCode].sharecontent + ': ' + shareContent.innerHTML + '\nLink url: ' + window.location.href);
                    }
                    window.open('https://twitter.com/intent/tweet?text=' + sharelink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                }
                else if (shareType === 'twitter-x') {
                    var sharelink = encodeURIComponent(lang[languageCode].sharetitle + ': ' + docTitle + '\nLink url: ' + window.location.href);
                    if (shareContent) {
                        sharelink = encodeURIComponent(lang[languageCode].sharetitle + ': ' + docTitle + '\n' + lang[languageCode].sharecontent + ': ' + shareContent.innerHTML + '\nLink url: ' + window.location.href);
                    }
                    window.open('https://twitter.com/intent/tweet?text=' + sharelink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                }
                else if (shareType === 'pinterest') {
                    var sharelink = encodeURIComponent(lang[languageCode].sharetitle + ': ' + docTitle + '\nLink url: ' + window.location.href);
                    if (shareContent) {
                        sharelink = encodeURIComponent(lang[languageCode].sharetitle + ': ' + docTitle + '\n' + lang[languageCode].sharecontent + ': ' + shareContent.innerHTML + '\nLink url: ' + window.location.href);
                    }
                    window.open('https://pinterest.com/pin/create/button/?url=' + sharelink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                }
                else if (shareType === 'linkedin') {
                    var sharelink = encodeURIComponent(window.location.href + '&title=' + docTitle + '&source=' + window.location.href);
                    if (shareContent) {
                        sharelink = encodeURIComponent(window.location.href + '&title=' + docTitle + '&summary=' + shareContent.innerHTML + '&source=' + window.location.href);
                    }
                    window.open('https://www.linkedin.com/shareArticle/?mini=true&url=' + sharelink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                    // window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + sharelink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                }
                else if (shareType === 'whatsapp') {
                    var sharelink = encodeURIComponent(lang[languageCode].sharetitle + ': ' + docTitle + '\nLink url: ' + window.location.href);
                    if (shareContent) {
                        sharelink = encodeURIComponent(lang[languageCode].sharetitle + ': ' + docTitle + '\n' + lang[languageCode].sharecontent + ': ' + shareContent.innerHTML + '\nLink url: ' + window.location.href);
                    }
                    // window.open('whatsapp://send?text=' + sharelink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                    window.open('https://api.whatsapp.com/send?text=' + sharelink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                    // window.open('https://wa.me/?text=' + sharelink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                    // window.open('https://web.whatsapp.com/send?text=' + sharelink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                }
                else if (shareType === 'telegram') {
                    var sharelink = encodeURIComponent(lang[languageCode].sharetitle + ': ' + docTitle + '\nLink url: ' + window.location.href);
                    if (shareContent) {
                        sharelink = encodeURIComponent(lang[languageCode].sharetitle + ': ' + docTitle + '\n' + lang[languageCode].sharecontent + ': ' + shareContent.innerHTML + '\nLink url: ' + window.location.href);
                    }
                    window.open('https://telegram.me/share/url?url=' + sharelink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                }
                else if (shareType === 'line') {
                    var sharelink = encodeURIComponent(lang[languageCode].sharetitle + ': ' + docTitle + '\nLink url: ' + window.location.href);
                    if (shareContent) {
                        sharelink = encodeURIComponent(lang[languageCode].sharetitle + ': ' + docTitle + '\n' + lang[languageCode].sharecontent + ': ' + shareContent.innerHTML + '\nLink url: ' + window.location.href);
                    }
                    // window.open('https://line.me/R/msg/text/?' + sharelink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                    // window.open('https://social-plugins.line.me/lineit/share?url=' + sharelink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                    window.open('https://lineit.line.me/share/ui?url=' + sharelink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                }
                else if (shareType === 'skype') {
                    var sharelink = encodeURIComponent(lang[languageCode].sharetitle + ': ' + docTitle + '\nLink url: ' + window.location.href);
                    if (shareContent) {
                        sharelink = encodeURIComponent(lang[languageCode].sharetitle + ': ' + docTitle + '\n' + lang[languageCode].sharecontent + ': ' + shareContent.innerHTML + '\nLink url: ' + window.location.href);
                    }
                    window.open('https://web.skype.com/share?url=' + sharelink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                }
                else if (shareType === 'email') {
                    var subject = encodeURIComponent(lang[languageCode].sharepage + ': ' + pageTitle);
                    var body = encodeURIComponent(lang[languageCode].sharetitle + ': ' + docTitle + '\nLink url: ' + window.location.href);
                    if (shareContent) {
                        body = encodeURIComponent(lang[languageCode].sharetitle + ': ' + docTitle + '\n' + lang[languageCode].sharecontent + ': ' + shareContent.innerHTML + '\nLink url: ' + window.location.href);
                    }
                    window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
                }
                else if (shareType === 'gmail') {
                    var gmailLink = encodeURIComponent(lang[languageCode].sharepage + ': ' + pageTitle) + '&body=' + encodeURIComponent(lang[languageCode].sharetitle + ': ' + docTitle + '\nLink url: ' + window.location.href);
                    if (shareContent) {
                        gmailLink = encodeURIComponent(lang[languageCode].sharepage + ': ' + pageTitle) + '&body=' + encodeURIComponent(lang[languageCode].sharetitle + ': ' + docTitle + '\n' + lang[languageCode].sharecontent + ': ' + shareContent.innerHTML + '\nLink url: ' + window.location.href);
                    }
                    window.open('https://mail.google.com/mail/?view=cm&fs=1&tf=1&su=' + gmailLink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                }
                else if (shareType === 'print') {
                    // Check if target is set
                    var target = this.dataset.printTarget;
                    // Target can be multiple elements if it's a class, then combine all elements html
                    if (target) {
                        var targetElements = document.querySelectorAll(target);
                        var targetElementsHtml = '';
                        targetElements.forEach(function (element) {
                            targetElementsHtml += element.outerHTML;
                        });
                        // Set elementHtml to targetElementsHtml
                        var elementHtml = targetElementsHtml;
                        // Get all stylesheets
                        var stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
                        // Open all stylesheets and get their content
                        stylesheets.forEach(function (stylesheet) {
                            var xhr = new XMLHttpRequest();
                            xhr.open('GET', stylesheet.href, false);
                            xhr.send();
                            // Append stylesheet content to elementHtml
                            elementHtml += '<style>' + xhr.responseText + '</style>';
                        });
                        // Get all styles
                        var styles = document.querySelectorAll('style');
                        // Append styles content to elementHtml
                        styles.forEach(function (style) {
                            elementHtml += '<style>' + style.innerHTML + '</style>';
                        });
                        // Get all inline styles
                        var inlineStyles = document.querySelectorAll('[style]');
                        // Append inline styles content to elementHtml
                        inlineStyles.forEach(function (inlineStyle) {
                            elementHtml += '<style>' + inlineStyle.outerHTML + '</style>';
                        });
                        // Print elementHtml
                        printElement(elementHtml);
                    } else {
                        // Print page
                        window.print();
                    }
                }
                else if (shareType === 'copy') {
                    // Run copyText function
                    copyText(this);
                }
            });
        });
    }
};
window.addEventListener('load', function () {
    ANShare();
});

// Get Dropdown
const dropdown = document.getElementById('an-social-share-dropdown');
// Check if Dropdown exists
if (dropdown) {
    // Get Dropdown Trigger
    const dropdownTrigger = document.getElementById('an-social-share-trigger');
    // Get Dropdown List
    const dropdownList = document.querySelector('.an-social-share-list');

    // Set Dropdown position to left/right/top/bottom if it's not in view
    function setDropdownPosition() {
        var dropdownLeft = dropdown.getBoundingClientRect().left;
        var dropdownTop = dropdown.getBoundingClientRect().top;
        var dropdownWidth = dropdown.offsetWidth + 110;
        var dropdownHeight = dropdown.offsetHeight + 110;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        // Set Dropdown position to left if it's not in view
        if (dropdownLeft < (windowWidth / 2)) {
            dropdownList.classList.add('an-dropdown-right');
        } else {
            dropdownList.classList.remove('an-dropdown-right');
        }
        // Set Dropdown position to right if it's not in view
        if (dropdownLeft + dropdownWidth > windowWidth) {
            dropdownList.classList.add('an-dropdown-left');
        } else {
            dropdownList.classList.remove('an-dropdown-left');
        }
        // Set Dropdown position to top if it's not in view
        if (dropdownTop < (windowHeight / 2)) {
            dropdownList.classList.add('an-dropdown-bottom');
        } else {
            dropdownList.classList.remove('an-dropdown-bottom');
        }
        // Set Dropdown position to bottom if it's not in view
        if (dropdownTop + dropdownHeight > windowHeight) {
            dropdownList.classList.add('an-dropdown-top');
        } else {
            dropdownList.classList.remove('an-dropdown-top');
        }

    }
    setDropdownPosition();

    // Set Dropdown position on resize and orientation change and scroll
    window.addEventListener('resize', function () {
        setDropdownPosition();
    });
    window.addEventListener('orientationchange', function () {
        setDropdownPosition();
    });
    window.addEventListener('scroll', function () {
        setDropdownPosition();
    });

    if (dropdownTrigger) {
        // Open List
        dropdownTrigger.addEventListener('click', function () {
            // Add class to list and body
            dropdownList.classList.toggle('an-dropdown-show');
            document.body.classList.toggle('an-dropdown-open');
            setDropdownPosition();
        });
    }

    // Close list when click outside
    document.addEventListener('click', function (e) {
        if (e.target !== dropdownTrigger && e.target !== dropdownTrigger.firstElementChild && e.target !== dropdownList && e.target !== dropdownList.firstElementChild) {
            if (e.target !== document.querySelector('.an-share-copy')) {
                // Remove class from list and body
                dropdownList.classList.remove('an-dropdown-show');
                document.body.classList.remove('an-dropdown-open');
            } else {
                setTimeout(function () {
                    // Remove class from list and body
                    dropdownList.classList.remove('an-dropdown-show');
                    document.body.classList.remove('an-dropdown-open');
                }, 2000);
            }
        }
    });

    // Close list when press ESC
    document.addEventListener('keydown', function (e) {
        if (e.keyCode === 27) {
            // Remove class from list and body
            dropdownList.classList.remove('an-dropdown-show');
            document.body.classList.remove('an-dropdown-open');
        }
    });
}
// Get Modal
const modal = document.getElementById('an-social-share-modal');

// Check if modal exists
if (modal) {
    // Get Modal Trigger
    const modalTrigger = document.getElementById('an-social-share-trigger');
    // Get Close Button
    const closeBtn = document.querySelector('.an-social-share-close');

    // On load
    window.addEventListener('load', function () {
            // Move modal to body and prevent duplicate modal
            document.body.appendChild(modal);
    });

    if (modalTrigger) {
        // Open Modal
        modalTrigger.addEventListener('click', function () {
            // Add class to modal and body
            modal.classList.add('an-modal-show');
            document.body.classList.add('an-modal-open');
        });
    }
    if (closeBtn) {
        // Close Modal
        closeBtn.addEventListener('click', function () {
            // Remove class from modal and body
            modal.classList.remove('an-modal-show');
            document.body.classList.remove('an-modal-open');
        });
    }

    // Close modal when click outside modal
    document.addEventListener('click', function (e) {
        if (e.target === modal) {
            // Remove class from modal and body
            modal.classList.remove('an-modal-show');
            document.body.classList.remove('an-modal-open');
        }
    });

    // Close modal when press ESC
    document.addEventListener('keydown', function (e) {
        if (e.keyCode === 27) {
            // Remove class from modal and body
            modal.classList.remove('an-modal-show');
            document.body.classList.remove('an-modal-open');
        }
    });
}

// Print Specific Element
printElement = function (elementHtml) {
    // Create new iframe
    var iframe = document.createElement('iframe');
    // Set iframe style
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    // Append iframe to body
    document.body.appendChild(iframe);
    // Get iframe document
    var iframeDoc = iframe.contentWindow.document;
    // Set iframe document
    iframeDoc.open();
    iframeDoc.write(elementHtml);
    iframeDoc.close();
    // Print iframe
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    // Remove iframe
    setTimeout(function () {
        document.body.removeChild(iframe);
    }, 100);
};

// Copy to clipboard
function copyText(el) {
    var content;
    if (el.parentElement.tagName === 'LI') {
        content = el.parentElement.parentElement.querySelector('input').value;
    } else {
        content = el.previousElementSibling.value;
    }

    var temp = document.createElement("input");
    temp.setAttribute('readonly', 'readonly');
    document.body.appendChild(temp);
    temp.value = content.replace(/<br ?\/?>/g, "\n");
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);

    var text = el.innerHTML;
    var ariaLabel = el.getAttribute('aria-label');
    el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>';
    el.setAttribute('aria-label', lang[languageCode].copied);
    el.style.backgroundColor = 'var(--social-share-success)';
    el.style.color = 'var(--social-share-text)';
    el.style.fill = 'var(--social-share-text)';
    el.style.pointerEvents = 'none';
    el.setAttribute('disabled', 'disabled');

    // Create alert
    document.body.insertAdjacentHTML('beforeend', '<div class="an-share-alert-copied"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="20" viewBox="0 0 24 24" style="fill: currentColor;"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg><span>' + el.dataset.message + '</span></div>');

    // Style Alert position on mobile
    if (window.innerWidth < 768) {
        var alertElement = document.querySelector('.an-share-alert-copied');
        alertElement.style.width = '90%';
        alertElement.style.right = '50%';
        alertElement.style.transform = 'translateX(50%)';
    }

    setTimeout(function () {
        el.innerHTML = text;
        el.setAttribute('aria-label', ariaLabel);
        var alertElement = document.querySelector('.an-share-alert-copied');
        alertElement.parentNode.removeChild(alertElement);
        el.removeAttribute('style');
        el.removeAttribute('disabled');
    }, 2000);
}

// Copy to clipboard other element with target id
// Example: <button class="btn btn-primary onClick="copyThat('#target-id', 'text/html');">Copy</button>
// <p id="target-id">Content</p>
function copyThat(target, type) {
    var content, temp;

    if (type === 'html') {
        content = target.innerHTML;
        temp = document.createElement("textarea");
    } else {
        content = target.innerText;
        temp = document.createElement("input");
    }

    temp.setAttribute('readonly', 'readonly');
    document.body.appendChild(temp);

    if (type === 'html') {
        temp.value = content.replace(/style="[^"]*"/g, '');
    } else {
        temp.value = content.replace(/<br ?\/?>/g, "\n");
    }

    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);

    // Create alert
    document.body.insertAdjacentHTML('beforeend', '<div class="an-share-alert-copied">' + lang[languageCode].copied + '</div>');

    // Style Alert position on mobile
    if (window.innerWidth < 768) {
        var alertElement = document.querySelector('.an-share-alert-copied');
        alertElement.style.width = '90%';
        alertElement.style.right = '50%';
        alertElement.style.transform = 'translateX(50%)';
    }

    setTimeout(function () {
        var alertElement = document.querySelector('.an-share-alert-copied');
        alertElement.parentNode.removeChild(alertElement);
    }, 2000);
}
