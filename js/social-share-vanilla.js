/*!
 *  Name: Social Share
 *  Description: Social Share Component/Widget
 *  Author: Atas Nalar
 *  Version: 1.0.0
 *  License: GNU General Public License v3.0 or later
 *  License URI: http://www.gnu.org/licenses/gpl-3.0.html
 */

// Localization
var shareText = 'Share to';
var prints = 'Print';
var copy = 'Copy Link';
var copied = 'Copied!';
var copysuccess = 'successfully copied';
var sharetitle = 'Title';
var sharecontentText = 'Content';

if (document.documentElement.lang === 'id') {
    shareText = 'Bagikan ke';
    prints = 'Cetak';
    copy = 'Salin Tautan';
    copied = 'Tersalin!';
    copysuccess = 'berhasil disalin';
    sharetitle = 'Judul';
    sharecontentText = 'Konten';
}

function ANShare() {
    var socialShareElement = document.getElementById('an-social-share');
    if (!socialShareElement) return;

    var socialAccount = (socialShareElement.getAttribute('data-share') || '').split(',');
    var shareUrl = socialShareElement.getAttribute('data-share-url') || window.location.href;
    var docTitle = socialShareElement.getAttribute('data-share-title') || document.title;
    var pageTitle = window.location.pathname.split('/').pop().replace('.html', '').replace(/-/g, ' ').replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }) || docTitle;

    // Generate share buttons
    socialAccount.forEach(function (account) {
        var btnHtml = '';
        switch (true) {
            case account === 'facebook':
                btnHtml = '<button type="button" class="an-share-button an-share-facebook" data-type="facebook" aria-label="Facebook" title="' + shareText + ' Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentcolor;"><path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path></svg></button>';
                break;
            case account === 'twitter':
                btnHtml = '<button type="button" class="an-share-button an-share-twitter" data-type="twitter" aria-label="Twitter" title="' + shareText + ' Twitter"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24" style="fill: currentcolor;"><path d="m19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path></svg></button>';
                break;
            case account === 'x':
                btnHtml = '<button type="button" class="an-share-button an-share-x" data-type="x" aria-label="X" title="' + shareText + ' X"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 2H1L9.26086 13.0145L1.44995 21.9999H4.09998L10.4883 14.651L16 22H23L14.3917 10.5223L21.8001 2H19.1501L13.1643 8.88578L8 2ZM17 20L5 4H7L19 20H17Z" fill="currentColor"></path></svg></button>';
                break;
            case account === 'pinterest':
                btnHtml = '<button type="button" class="an-share-button an-share-pinterest" data-type="pinterest" aria-label="Pinterest" title="' + shareText + ' Pinterest"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M11.99 2C6.472 2 2 6.473 2 11.99c0 4.232 2.633 7.85 6.35 9.306-.088-.79-.166-2.006.034-2.868.182-.78 1.172-4.966 1.172-4.966s-.299-.599-.299-1.484c0-1.388.805-2.425 1.808-2.425.853 0 1.264.64 1.264 1.407 0 .858-.546 2.139-.827 3.327-.235.994.499 1.805 1.479 1.805 1.775 0 3.141-1.872 3.141-4.575 0-2.392-1.719-4.064-4.173-4.064-2.843 0-4.512 2.132-4.512 4.335 0 .858.331 1.779.744 2.28a.3.3 0 0 1 .069.286c-.076.315-.245.994-.277 1.133-.044.183-.145.222-.335.134-1.247-.581-2.027-2.405-2.027-3.871 0-3.151 2.289-6.045 6.601-6.045 3.466 0 6.159 2.469 6.159 5.77 0 3.444-2.171 6.213-5.184 6.213-1.013 0-1.964-.525-2.29-1.146l-.623 2.374c-.225.868-.834 1.956-1.241 2.62a10 10 0 0 0 2.958.445c5.517 0 9.99-4.473 9.99-9.99S17.507 2 11.99 2"></path></svg></button>';
                break;
            case account === 'linkedin':
                btnHtml = '<button type="button" class="an-share-button an-share-linkedin" data-type="linkedin" aria-label="LinkedIn" title="' + shareText + ' LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><circle cx="4.983" cy="5.009" r="2.188"></circle><path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"></path></svg></button>';
                break;
            case account === 'whatsapp':
                btnHtml = '<button type="button" class="an-share-button an-share-whatsapp" data-type="whatsapp" aria-label="Whatsapp" title="' + shareText + ' Whatsapp"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263"></path></svg></button>';
                break;
            case account === 'telegram':
                btnHtml = '<button type="button" class="an-share-button an-share-telegram" data-type="telegram" aria-label="Telegram" title="' + shareText + ' Telegram"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"></path></svg></button>';
                break;
            case account === 'line':
                btnHtml = '<button type="button" class="an-share-button an-share-line" data-type="line" aria-label="Line" title="' + shareText + ' Line"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18" style="fill: currentColor;"><path d="M8.5 0C3.825 0 0 3.236 0 7.253c0 3.571 2.975 6.584 7.119 7.142.319.112.637.223.744.446a.997.997 0 0 1 0 .781l-.107.782c0 .223-.106.892.744.446.956-.447 4.887-3.013 6.694-5.133C16.469 10.267 17 8.815 17 7.253 17 3.236 13.175 0 8.5 0ZM5.525 9.373c0 .112-.106.224-.213.224H2.87v-4.13c0-.11.106-.222.212-.222h.638c.106 0 .212.111.212.223v3.124h1.381c.107 0 .213.112.213.223v.558Zm1.381 0c0 .112-.106.224-.212.224h-.532c-.106 0-.212-.112-.212-.224V5.468c0-.112.106-.223.212-.223H6.8c.106 0 .213.111.213.223v3.905h-.107Zm4.144 0c0 .112-.106.224-.213.224h-.53L8.393 7.03v2.343c0 .112-.107.224-.213.224h-.53c-.106 0-.213-.112-.213-.224V5.468c0-.112.107-.223.213-.223h.637l1.807 2.566V5.468c0-.112.106-.223.212-.223h.638c.106 0 .212.111.212.223v3.905h-.106Zm3.294-3.236c0 .112-.106.224-.213.224h-1.594v.67h1.594c.107 0 .213.11.213.222v.67c0 .111-.106.223-.213.223h-1.594v.67h1.594c.107 0 .213.111.213.223v.67c0 .11-.106.222-.213.222h-2.444V5.356h2.444c.107 0 .213.112.213.223v.558Z"></path></svg></button>';
                break;
            case account === 'skype':
                btnHtml = '<button type="button" class="an-share-button an-share-skype" data-type="skype" aria-label="Skype" title="' + shareText + ' Skype"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M11.857 17.417c-2.947 0-4.294-1.524-4.294-2.641 0-.266.108-.521.298-.705a.946.946 0 0 1 .71-.264c1.261 0 .931 1.92 3.286 1.92 1.203 0 1.91-.736 1.91-1.425 0-.415-.234-.889-1.028-1.079l-2.629-.673c-2.111-.545-2.479-1.737-2.479-2.842 0-2.293 2.068-3.124 4.036-3.124 1.814 0 3.97 1.016 3.97 2.391 0 .592-.488.91-1.055.91-1.078 0-.897-1.536-3.063-1.536-1.077 0-1.645.513-1.645 1.23s.839.96 1.574 1.123l1.941.445c2.126.486 2.691 1.751 2.691 2.963 0 1.865-1.423 3.305-4.226 3.305m8.139-3.942c.086-.49.128-.986.128-1.482a8.472 8.472 0 0 0-2.952-6.474 8.211 8.211 0 0 0-6.788-1.856A4.818 4.818 0 0 0 7.935 3a4.954 4.954 0 0 0-4.27 2.519 5.103 5.103 0 0 0-.015 5.011 8.51 8.51 0 0 0 2.282 7.453 8.23 8.23 0 0 0 7.333 2.355 4.823 4.823 0 0 0 2.443.662 4.954 4.954 0 0 0 4.269-2.518 5.095 5.095 0 0 0 .016-5.009"></path></svg></button>';
                break;
            case account === 'threads':
                btnHtml = '<button type="button" class="an-share-button an-share-threads" data-type="threads" aria-label="Threads" title="' + shareText + ' Threads"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M12.1835 1.41016L12.1822 1.41016C9.09012 1.43158 6.70036 2.47326 5.09369 4.51569C3.66581 6.33087 2.93472 8.86436 2.91016 12.0068V12.0082C2.93472 15.1508 3.66586 17.6696 5.09369 19.4847C6.70043 21.5271 9.10257 22.5688 12.1946 22.5902H12.1958C14.944 22.5711 16.8929 21.8504 18.4985 20.2463C20.6034 18.1434 20.5408 15.5048 19.8456 13.8832C19.3163 12.6493 18.2709 11.6618 16.8701 11.0477C16.6891 8.06345 15.0097 6.32178 12.2496 6.30415C10.6191 6.29409 9.14792 7.02378 8.24685 8.39104L9.90238 9.5267C10.4353 8.71818 11.2789 8.32815 12.2371 8.33701C13.6244 8.34586 14.5362 9.11128 14.7921 10.4541C14.02 10.3333 13.1902 10.2982 12.3076 10.3488C9.66843 10.5008 7.9399 12.061 8.05516 14.2244C8.17571 16.4862 10.367 17.7186 12.4476 17.605C14.9399 17.4684 16.4209 15.6292 16.7722 13.2836C17.3493 13.6575 17.7751 14.1344 18.0163 14.6969C18.4559 15.7222 18.4838 17.4132 17.1006 18.7952C15.8838 20.0108 14.4211 20.5407 12.1891 20.5572C9.71428 20.5388 7.85698 19.746 6.65154 18.2136C5.51973 16.7748 4.92843 14.6882 4.90627 12.0002C4.92843 9.31211 5.51973 7.22549 6.65154 5.78673C7.85698 4.25433 9.71424 3.46156 12.189 3.44303C14.6819 3.4617 16.5728 4.25837 17.8254 5.79937C18.5162 6.64934 18.949 7.66539 19.2379 8.71407L21.1776 8.19656C20.8148 6.85917 20.2414 5.58371 19.363 4.50305C17.7098 2.46918 15.2816 1.43166 12.1835 1.41016ZM12.4204 12.3782C13.3044 12.3272 14.1239 12.3834 14.8521 12.5345C14.7114 14.1116 14.0589 15.4806 12.3401 15.575C11.2282 15.6376 10.1031 15.1413 10.0484 14.114C10.0077 13.3503 10.5726 12.4847 12.4204 12.3782Z"></path></svg></button>';
                break;
            case account === 'email':
                btnHtml = '<button type="button" class="an-share-button an-share-email" data-type="email" aria-label="Email" title="' + shareText + ' Email"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path></svg></button>';
                break;
            case account === 'gmail':
                btnHtml = '<button type="button" class="an-share-button an-share-gmail" data-type="gmail" aria-label="Gmail" title="' + shareText + ' Gmail"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="m18.73 5.41-1.28 1L12 10.46 6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64z"></path></svg></button>';
                break;
            case account === 'copy':
                var copyTitle = socialShareElement.getAttribute('data-copy-title') || docTitle;
                socialShareElement.innerHTML += '<input type="hidden" name="copy-link" id="copy-link" value="' + shareUrl + '" />';
                btnHtml = '<button type="button" class="an-share-button an-share-copy" data-type="copy" aria-label="' + copy + '" title="' + copy + '" data-message="URL ' + copyTitle + ' ' + copysuccess + '"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"></path><path d="M6 12h6v2H6zm0 4h6v2H6z"></path></svg></button>';
                break;
            default:
                if (account === 'print' || account.includes('print:')) {
                    var targetPrint = account.split(':')[1];
                    var targetPrintElements = targetPrint ? ' data-print-target="' + targetPrint + '"' : '';
                    btnHtml = '<button type="button" class="an-share-button an-share-print" data-type="print"' + targetPrintElements + ' aria-label="' + prints + '" title="' + prints + '"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M19 7h-1V2H6v5H5c-1.654 0-3 1.346-3 3v7c0 1.103.897 2 2 2h2v3h12v-3h2c1.103 0 2-.897 2-2v-7c0-1.654-1.346-3-3-3zM8 4h8v3H8V4zm8 16H8v-4h8v4zm4-3h-2v-3H6v3H4v-7c0-.551.449-1 1-1h14c.552 0 1 .449 1 1v7z"></path><path d="M14 10h4v2h-4z"></path></svg></button>';
                }
                break;
        }
        if (btnHtml) socialShareElement.innerHTML += btnHtml;
    });

    // Wrap all buttons in list (Dropdown)
    document.querySelectorAll('ul#an-social-share.an-social-share-list').forEach(function (list) {
        list.querySelectorAll('.an-share-button').forEach(function (link) {
            link.classList.add('an-item-list');
            var li = document.createElement('li');
            li.appendChild(link.cloneNode(true));
            link.parentNode.replaceChild(li, link);
        });
    });

    // Share content extraction
    var shareContent = document.querySelectorAll('[data-share-content]');
    var shareContentData = '';
    if (shareContent.length > 1) {
        shareContent.forEach(function (content) {
            shareContentData += content.textContent + '.\n\n';
        });
    } else if (shareContent.length === 1) {
        shareContentData = shareContent[0].textContent;
    } else {
        var singleShareContent = document.querySelector('[data-share-content]');
        if (singleShareContent) shareContentData = singleShareContent.textContent;
    }

    // Share button click handlers
    document.querySelectorAll('.an-share-button').forEach(function (button) {
        var shareType = button.getAttribute('data-type');
        button.addEventListener('click', function () {
            var sharelink;
            switch (shareType) {
                case 'facebook':
                    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareUrl), '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                    break;
                case 'twitter':
                case 'x':
                    sharelink = encodeURIComponent(sharetitle + ': ' + docTitle + '\n' + (shareContentData ? (sharecontentText + ': ' + shareContentData + '\n') : '') + 'Link url: ' + shareUrl);
                    window.open('https://twitter.com/intent/tweet?text=' + sharelink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                    break;
                case 'pinterest':
                    sharelink = encodeURIComponent(sharetitle + ': ' + docTitle + '\n' + (shareContentData ? (sharecontentText + ': ' + shareContentData + '\n') : '') + 'Link url: ' + shareUrl);
                    window.open('https://pinterest.com/pin/create/button/?url=' + sharelink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                    break;
                case 'linkedin':
                    sharelink = encodeURIComponent(shareUrl + '&title=' + docTitle + (shareContentData ? '&summary=' + shareContentData : '') + '&source=' + shareUrl);
                    window.open('https://www.linkedin.com/shareArticle/?mini=true&url=' + sharelink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                    break;
                case 'whatsapp':
                    sharelink = encodeURIComponent(sharetitle + ': ' + docTitle + '\n' + (shareContentData ? (sharecontentText + ': ' + shareContentData + '\n') : '') + 'Link url: ' + shareUrl);
                    window.open('https://api.whatsapp.com/send?text=' + sharelink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                    break;
                case 'telegram':
                    sharelink = encodeURIComponent(sharetitle + ': ' + docTitle + '\n' + (shareContentData ? (sharecontentText + ': ' + shareContentData + '\n') : '') + 'Link url: ' + shareUrl);
                    window.open('https://telegram.me/share/url?url=' + sharelink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                    break;
                case 'line':
                    sharelink = encodeURIComponent(sharetitle + ': ' + docTitle + '\n' + (shareContentData ? (sharecontentText + ': ' + shareContentData + '\n') : '') + 'Link url: ' + shareUrl);
                    window.open('https://lineit.line.me/share/ui?url=' + sharelink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                    break;
                case 'skype':
                    sharelink = encodeURIComponent(sharetitle + ': ' + docTitle + '\n' + (shareContentData ? (sharecontentText + ': ' + shareContentData + '\n') : '') + 'Link url: ' + shareUrl);
                    window.open('https://web.skype.com/share?url=' + sharelink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                    break;
                case 'threads':
                    sharelink = encodeURIComponent(sharetitle + ': ' + docTitle + '\n' + (shareContentData ? (sharecontentText + ': ' + shareContentData + '\n') : '') + 'Link url: ' + shareUrl);
                    window.open('https://threads.net/intent/post?text=' + sharelink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                    break;
                case 'email':
                    var subject = encodeURIComponent(pageTitle);
                    var body = encodeURIComponent(sharetitle + ': ' + docTitle + '\n' + (shareContentData ? (sharecontentText + ': ' + shareContentData + '\n') : '') + 'Link url: ' + shareUrl);
                    window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
                    break;
                case 'gmail':
                    var gmailLink = encodeURIComponent(pageTitle) + '&body=' + encodeURIComponent(sharetitle + ': ' + docTitle + '\n' + (shareContentData ? (sharecontentText + ': ' + shareContentData + '\n') : '') + 'Link url: ' + shareUrl);
                    window.open('https://mail.google.com/mail/?view=cm&fs=1&tf=1&su=' + gmailLink, '_blank', 'width=626,height=436,scrollbars=yes,resizable=yes');
                    break;
                case 'print':
                    var target = this.dataset.printTarget;
                    closeDropdownAndModal();
                    if (target) {
                        var targetElements = document.querySelectorAll(target);
                        var elementHtml = '';
                        targetElements.forEach(function (element) {
                            elementHtml += element.outerHTML;
                        });
                        // Add stylesheets and styles
                        document.querySelectorAll('link[rel="stylesheet"]').forEach(function (stylesheet) {
                            try {
                                var xhr = new XMLHttpRequest();
                                xhr.open('GET', stylesheet.href, false);
                                xhr.send();
                                elementHtml += '<style>' + xhr.responseText + '</style>';
                            } catch (e) {}
                        });
                        document.querySelectorAll('style').forEach(function (style) {
                            elementHtml += '<style>' + style.innerHTML + '</style>';
                        });
                        printElement(elementHtml);
                    } else {
                        window.print();
                    }
                    break;
                case 'copy':
                    copyText(this);
                    break;
            }
        });
    });

    // Dropdown logic
    var dropdown = document.getElementById('an-social-share-dropdown');
    if (dropdown) {
        var dropdownTrigger = document.getElementById('an-social-share-trigger');
        var dropdownList = document.querySelector('.an-social-share-list');

        function setDropdownPosition() {
            var rect = dropdown.getBoundingClientRect();
            var dropdownWidth = dropdown.offsetWidth + 110;
            var dropdownHeight = dropdown.offsetHeight + 110;
            var anData = document.querySelector('[data-an-scroll]') || document.getElementById('an-data');
            var windowWidth = (anData && anData.clientWidth) || window.innerWidth;
            var windowHeight = (anData && anData.clientHeight) || window.innerHeight;

            dropdownList.classList.toggle('an-dropdown-right', rect.left < windowWidth / 2);
            dropdownList.classList.toggle('an-dropdown-left', rect.left + dropdownWidth > windowWidth);
            dropdownList.classList.toggle('an-dropdown-bottom', rect.top < windowHeight / 2);
            dropdownList.classList.toggle('an-dropdown-top', rect.top + dropdownHeight > windowHeight);
        }
        setDropdownPosition();
        ['resize', 'orientationchange', 'scroll'].forEach(function (evt) {
            window.addEventListener(evt, setDropdownPosition);
        });
        var anData = document.querySelector('[data-an-scroll]') || document.getElementById('an-data');
        if (anData) {
            ['resize', 'orientationchange', 'scroll'].forEach(function (evt) {
                anData.addEventListener(evt, setDropdownPosition);
            });
        }
        if (dropdownTrigger) {
            dropdownTrigger.addEventListener('click', function () {
                dropdownTrigger.classList.toggle('an-dropdown-active');
                dropdownList.classList.toggle('an-dropdown-show');
                document.body.classList.toggle('an-dropdown-open');
                setDropdownPosition();
            });
        }
        document.addEventListener('click', function (e) {
            if (dropdownList && !dropdown.contains(e.target)) {
                dropdownList.classList.remove('an-dropdown-show');
                document.body.classList.remove('an-dropdown-open');
                if (dropdownTrigger) dropdownTrigger.classList.remove('an-dropdown-active');
            }
        });
        document.addEventListener('keydown', function (e) {
            if (e.keyCode === 27 && dropdownList) {
                dropdownList.classList.remove('an-dropdown-show');
                document.body.classList.remove('an-dropdown-open');
                if (dropdownTrigger) dropdownTrigger.classList.remove('an-dropdown-active');
            }
        });
    }

    // Modal logic
    var modal = document.getElementById('an-social-share-modal');
    if (modal) {
        var modalTrigger = document.getElementById('an-social-share-trigger');
        var closeBtn = document.querySelector('.an-social-share-close');
        window.addEventListener('load', function () {
            document.body.appendChild(modal);
        });
        if (modalTrigger) {
            modalTrigger.addEventListener('click', function () {
                modal.classList.add('an-modal-show');
                document.body.classList.add('an-modal-open');
            });
        }
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                modal.classList.remove('an-modal-show');
                document.body.classList.remove('an-modal-open');
            });
        }
        document.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.classList.remove('an-modal-show');
                document.body.classList.remove('an-modal-open');
            }
        });
        document.addEventListener('keydown', function (e) {
            if (e.keyCode === 27) {
                modal.classList.remove('an-modal-show');
                document.body.classList.remove('an-modal-open');
            }
        });
    }

    function closeDropdownAndModal() {
        var dropdownTrigger = document.getElementById('an-social-share-trigger');
        var dropdownList = document.querySelector('.an-social-share-list');
        var modal = document.getElementById('an-social-share-modal');
        if (dropdownTrigger && dropdownList) {
            dropdownTrigger.classList.remove('an-dropdown-active');
            dropdownList.classList.remove('an-dropdown-show');
            document.body.classList.remove('an-dropdown-open');
        }
        if (modal) {
            modal.classList.remove('an-modal-show');
            document.body.classList.remove('an-modal-open');
        }
    }
}

// Run ANShare function On Load
window.addEventListener('load', ANShare);

// Print Specific Element
function printElement(elementHtml) {
    var iframe = document.createElement('iframe');
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    document.body.appendChild(iframe);
    var iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(elementHtml);
    iframeDoc.close();
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    setTimeout(function () {
        document.body.removeChild(iframe);
    }, 100);
}

// Copy to clipboard
function copyText(el) {
    var content;
    if (el.parentElement.tagName === 'LI') {
        content = el.parentElement.parentElement.querySelector('input').value;
    } else {
        content = el.previousElementSibling.value;
    }
    var temp = document.createElement('input');
    temp.setAttribute('readonly', 'readonly');
    document.body.appendChild(temp);
    temp.value = content.replace(/<br ?\/?>/g, '\n');
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);

    var text = el.innerHTML;
    var ariaLabel = el.getAttribute('aria-label');
    el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>';
    el.setAttribute('aria-label', copied);
    el.style.backgroundColor = 'var(--social-share-success)';
    el.style.color = 'var(--social-share-text)';
    el.style.fill = 'var(--social-share-text)';
    el.style.pointerEvents = 'none';
    el.setAttribute('disabled', 'disabled');

    document.body.insertAdjacentHTML('beforeend', '<div class="an-share-alert-copied"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="20" viewBox="0 0 24 24" style="fill: currentColor;"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg><span>' + el.dataset.message + '</span></div>');
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
        if (alertElement) alertElement.parentNode.removeChild(alertElement);
        el.removeAttribute('style');
        el.removeAttribute('disabled');
    }, 2000);
}

// Copy to clipboard other element with target id
function copyThat(target, type) {
    var content, temp;
    if (type === 'html') {
        content = target.innerHTML;
        temp = document.createElement('textarea');
    } else {
        content = target.innerText;
        temp = document.createElement('input');
    }
    temp.setAttribute('readonly', 'readonly');
    document.body.appendChild(temp);
    if (type === 'html') {
        temp.value = content.replace(/style="[^"]*"/g, '');
    } else {
        temp.value = content.replace(/<br ?\/?>/g, '\n');
    }
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);

    document.body.insertAdjacentHTML('beforeend', '<div class="an-share-alert-copied">' + copied + '</div>');
    if (window.innerWidth < 768) {
        var alertElement = document.querySelector('.an-share-alert-copied');
        alertElement.style.width = '90%';
        alertElement.style.right = '50%';
        alertElement.style.transform = 'translateX(50%)';
    }
    setTimeout(function () {
        var alertElement = document.querySelector('.an-share-alert-copied');
        if (alertElement) alertElement.parentNode.removeChild(alertElement);
    }, 2000);
}
