/*!
  *  Name: AN Popup
  *  Description: AN Popup is a simple and lightweight jquery plugin that allows you to create a popup with multiple content type (Image, Video, Google Map, File, etc) and responsive.
  *  Author: Atas Nalar
  *  Version: 1.0.0
  *  License: GNU General Public License v3.0 or later
  *  License URI: http://www.gnu.org/licenses/gpl-3.0.html
*/
function ANPopUp() {
    if ($('.an-popup-btn').length > 0) {
        // Trigger Pop Up
        $('.an-popup-btn').each(function () {
            var source = $(this).attr('href') || $(this).attr('src') || $(this).attr('data-image') || $(this).find('source').attr('src') || $(this).attr('data-video');
            $(this).on('click', function(e) {
                var downloadable = $(this).data('downloadable');
                if (downloadable === true) {
                    var theAriaLabel = 'aria-label="Download"';
                    var theDownload = 'download';
                    if (title !== undefined && title !== '') {
                        theAriaLabel = 'aria-label="' + title + '"';
                        theDownload = 'download="' + title + '"';
                    }
                }
                var autos = '';
                if (downloadable === true) {
                    autos = ' ms-auto';
                }
                var closeIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill:currenColor;"><path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path></svg>';
                var downloadIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill:currenColor;"><path d="M13 10H18L12 16L6 10H11V3H13V10ZM4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19Z"></path></svg>';
                // Check parent element
                var parent = '';
                // Check if this parent is "an-profile"
                if ($(this).parents('.an-profile').length || $(this).parents('.an-avatar').length) {
                    parent = 'data-parent="an-profile"';
                } else if ($(this).parents('.an-card-action').length) {
                    parent = 'data-parent="an-card-action" data-card-id="' + $(this).parents('.an-card').attr('data-id') + '"';
                } else {
                    parent = '';
                }
                var targetReadmore = 'javascript:void(0)';
                if (window.location.href.indexOf('/page/') > -1) {
                    targetReadmore = window.location.origin;
                }
                var readMoreBtn = '<a href="' + targetReadmore + '" class="readmore p-2 text-decoration-underline" ' + parent + '>Read More</a>';
                var CloseBtn = '<span class="an-popup-close'+autos+'" aria-label="Close">' + closeIcon + '</span>';
                if (source) {
                    var title = $(this).parents('.an-card-body').find('.an-card-title').text() || $(this).attr('data-title') || $(this).attr('title');
                    if (title !== undefined && title !== '') {
                        title = title;
                    } else {
                        title = $(this).attr('alt') || $(this).attr('title') || '';
                    }
                    // Capitalize
                    title = title.charAt(0).toUpperCase() + title.slice(1);
                    var description = $(this).parents('.an-card-body').find('.an-card-detail').html() || $(this).attr('data-description');
                    var html = '<div class="an-popup">';
                    html += '<div class="an-popup-content">';
                    html += '<div class="an-popup-header animated fadeInDown">';
                        html += '<div class="an-popup-title-wrapper">';
                        html += '<span class="an-popup-title excerpt">' + title + '</span>';
                        html += '</div>';
                        html += '<div class="an-popup-action ms-auto">';
                        if (downloadable === true) {
                            html += '<a href="' + source + '" '+ theAriaLabel +' '+ theDownload +'>'+ downloadIcon +'</a>';
                        }
                        html += CloseBtn;
                        html += '</div>';
                        html += '</div>';
                        html += '<div class="an-popup-body animated fadeIn">';
                        html += '<div class="an-popup-body-inner">';
                        // Check if this parent is .an-card has attributes data-type="gallery"
                        if ($(this).parents('.an-card').attr('data-type') === 'gallery' || $(this).parents('.an-popup-gallery').length) {
                            // Get all images from siblings
                            var images = [];
                            // Get all images alt from siblings
                            var imagesAlt = [];
                            // Get all images description from siblings
                            var imagesDescription = [];
                            // Get all images downloadable from siblings
                            var imagesDownloadable = [];
                            var theParent = '.an-card-wrap';
                            if ($(this).parents('.an-popup-gallery').length) {
                                theParent = '.an-popup-gallery';
                            }
                            // Loop each image
                            $(this).parents(theParent).find('.an-popup-btn').each(function () {
                                // Get image source
                                var imageSrc = $(this).attr('src') || $(this).attr('href') || $(this).attr('data-image') || $(this).find('source').attr('src');
                                // Push image source to images array
                                images.push(imageSrc);
                                // Get image alt
                                var imageAlt = $(this).attr('alt') || $(this).attr('title') || '';
                                // Push image alt to imagesAlt array
                                imagesAlt.push(imageAlt);
                                // Get data-description
                                var imageDescription = $(this).attr('data-description') || '';
                                // Check if imageDescription is not empty
                                if (imageDescription !== undefined && imageDescription !== '') {
                                    // Push imageDescription to imageDescription array
                                    imagesDescription.push('data-description="' + imageDescription + '"');
                                } else {
                                    // Push empty string to imageDescription array
                                    imagesDescription.push('');
                                }
                                // Get data-downloadable
                                var imageDownloadable = $(this).attr('data-downloadable') || '';
                                // Check if imageDownloadable is not empty
                                if (imageDownloadable !== undefined && imageDownloadable !== '') {
                                    // Push imageDownloadable to imageDownloadable array
                                    imagesDownloadable.push('data-downloadable="' + imageDownloadable + '"');
                                } else {
                                    // Push empty string to imageDownloadable array
                                    imagesDownloadable.push('');
                                }
                            });
                            // Set as gallery
                            html += '<div class="an-popup-gallery">';
                            // Check if image more than 1
                            if (images.length > 1) {
                            html += '<span class="an-popup-gallery-prev an-popup-nav-slider" aria-label="Previous"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill: currentColor;"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg></span>';
                            $('.an-popup-title-wrapper').append('<div class="an-popup-gallery-counter">(<span class="an-popup-gallery-counter-current"></span>/<span class="an-popup-gallery-counter-total">' + images.length + '</span>)</div>');
                            }
                            html += '<div class="an-popup-gallery-inner">';
                            // Loop each image and add class active to the image that equals to clicked image and prevent duplicate image
                            for (var i = 0; i < images.length; i++) {
                                // Capitalize
                                imagesAlt[i] = imagesAlt[i].charAt(0).toUpperCase() + imagesAlt[i].slice(1);
                                if (images[i] === source && imagesAlt[i] === title) {
                                    html += '<div class="an-popup-gallery-item active">';
                                    $('.an-popup-gallery-counter-current').text(i + 1);
                                } else {
                                    html += '<div class="an-popup-gallery-item">';
                                }
                                var styleNotExists = '';
                                if (!fileExists(images[i])) {
                                    styleNotExists = ' style="width: 150px;height: 150px;"';
                                    imagesAlt[i] = 'Image not found';
                                    imagesDescription[i] = '';
                                    imagesDownloadable[i] = '';
                                }
                                html += '<img src="' + images[i] + '" alt="' + imagesAlt[i] + '" ' + imagesDescription[i] + ' ' + imagesDownloadable[i] + styleNotExists +'>';
                                html += '</div>';
                            }
                            html += '</div>';
                            // Check if image more than 1
                            if (images.length > 1) {
                            html += '<span class="an-popup-gallery-next an-popup-nav-slider" aria-label="Next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill: currentColor;"><path d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"></path></svg></span>';
                            }
                            html += '</div>';
                        } else if ($(this).parents('.an-card').attr('data-type') === 'video') {
                            // Stop video
                            $(this).parents('.an-card').find('.an-video').each(function () {
                                $(this).get(0).pause();
                                $(this).get(0).currentTime = 0;
                                // Show poster instead of paused video
                                $(this).get(0).load();
                                // Show play button
                                $(this).siblings('.an-video-play-btn').fadeIn('fast');
                                $(this).siblings('.an-video-stop-btn').fadeOut('fast').removeClass('played');
                            });
                            // Clone video
                            var videoClone = $(this).closest('.an-card').find('.an-card-wrap').find('.an-video').clone();
                            // Check if parent "an-card-wrap" has attribute data-play-hover="true"
                            if ($(this).closest('.an-card').find('.an-card-wrap').attr('data-play-hover') === 'true') {
                                // Add attribute autoplay to video
                                videoClone.attr('autoplay', '');
                            }
                            // If video doesn't has attribute controls , add it
                            if (!videoClone.attr('controls')) {
                                videoClone.attr('controls', '');
                            }
                            // Check if video has class .has-autoplay
                            if (videoClone.hasClass('has-autoplay')) {
                                // Remove class .has-autoplay
                                videoClone.removeClass('has-autoplay');
                                // Set attribute autoplay to video
                                videoClone.attr('autoplay', '');
                            }
                            // If video is muted, unmute it
                            if (videoClone.attr('muted') !== undefined) {
                                videoClone.removeAttr('muted');
                            }
                            html += '<div class="an-popup-video">';
                            // Check if parent "an-card-wrap" has attribute data-popup-source
                            if ($(this).closest('.an-card').find('.an-card-wrap').attr('data-popup-source') !== undefined && $(this).closest('.an-card').find('.an-card-wrap').attr('data-popup-source') !== '') {
                                // Get video source
                                var videoSource = $(this).closest('.an-card').find('.an-card-wrap').attr('data-popup-source');
                                // Check if video source is youtube url or self-hosted video (mp4)
                                if (videoSource && videoSource.match(/youtube/g) || videoSource && videoSource.match(/youtu.be/g)) {
                                    // Check if is youtube share url
                                    if (videoSource.match(/youtu.be/g)) {
                                        // Replace youtu.be/ with youtube.com/embed/
                                        videoSource = videoSource.replace('youtu.be/', 'youtube.com/embed/');
                                    }
                                    // Check if is youtube watch url
                                    if (videoSource.match(/watch/g)) {
                                        // Replace watch?v= with embed/
                                        videoSource = videoSource.replace('watch?v=', 'embed/');
                                        // Check if has parameter list=
                                        if (videoSource.match(/list=/g)) {
                                            // Replace embed/ with embed/videoseries?list=
                                            videoSource = videoSource.replace('embed/', 'embed/videoseries?si=');
                                        }
                                    }
                                    // Check if source is youtube playlist.
                                    if (videoSource.match(/playlist/g)) {
                                        // Replace playlist?list= with embed/videoseries?list=
                                        videoSource = videoSource.replace('playlist?list=', 'embed/videoseries?list=');
                                    }
                                    // Check if video has class .has-autoplay
                                    if ($(this).closest('.an-card').find('.an-card-wrap').children().hasClass('has-autoplay')) {
                                        // Check if has any parameter
                                        if (videoSource.match(/\?/g)) {
                                            // Set autoplay to video source
                                            videoSource = videoSource + '&autoplay=1';
                                        } else {
                                            // Set autoplay to video source
                                            videoSource = videoSource + '?autoplay=1';
                                        }
                                    }
                                    // Check if doesn't has parameter origin
                                    if (!videoSource.match(/origin=/g)) {
                                        // Check if has any parameter
                                        if (videoSource.match(/\?/g)) {
                                            // Add parameter origin
                                            videoSource = videoSource + '&origin=' + window.location.origin;
                                        } else {
                                            // Add parameter origin
                                            videoSource = videoSource + '?origin=' + window.location.origin;
                                        }
                                    }
                                    // Check if title empty
                                    if (title === '') {
                                        // Set title to 'Video'
                                        title = 'Youtube Video';
                                    }
                                    html += '<iframe src="' + videoSource + '" title="' + title + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
                                }
                                // Check if source is vimeo url
                                else if (videoSource.match(/vimeo/g)) {
                                    // Get video id
                                    var videoId = videoSource.split('/').pop();
                                    // Set video source
                                    videoSource = 'https://player.vimeo.com/video/' + videoId;
                                    // Check if doesn't has parameter autoplay
                                    if (!videoSource.match(/autoplay=/g)) {
                                        // Check if has any parameter
                                        if (videoSource.match(/\?/g)) {
                                            // Set autoplay to video source
                                            videoSource = videoSource + '&autoplay=1';
                                        } else {
                                            // Set autoplay to video source
                                            videoSource = videoSource + '?autoplay=1';
                                        }
                                    }
                                    // Check if title empty
                                    if (title === '') {
                                        // Set title to 'Video'
                                        title = 'Vimeo Video';
                                    }
                                    html += '<div class="an-popup-video">';
                                    html += '<iframe src="' + videoSource + '" title="' + title + '" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
                                    html += '</div>';
                                }
                                // Return Self-hosted video
                                else {
                                    if (fileExists(videoSource)) {
                                        // Check if has multiple source inside video
                                        if (videoClone.find('source').length > 1) {
                                            // Remove all source except first source
                                            videoClone.find('source:not(:first-child)').remove();
                                        }
                                        // Get extension of video source
                                        var videoSourceExtension = videoSource.split('.').pop();
                                        // Replace videoClone type with video source extension
                                        videoClone.find('source').attr('type', 'video/' + videoSourceExtension);
                                        // Replace source with video source
                                        videoClone.find('source').attr('src', videoSource);
                                        html += videoClone[0].outerHTML;
                                    } else {
                                        html += '<div class="an-popup-content-not-supported">Source Video not found!</div>';
                                    }
                                }
                            } else {
                                if (fileExists(videoClone.find('source').attr('src') || videoClone.find('source').attr('data-src') || videoClone.attr('src') || videoClone.attr('data-src'))) {
                                    html += videoClone[0].outerHTML;
                                } else {
                                    html += '<div class="an-popup-content-not-supported">Source Video not found!</div>';
                                }
                            }
                            html += '</div>';
                        } else {
                            // Check if source extension is  self-hosted video file
                            if (source.match(/\.(mp4|ogg|ogv|webm)/g)) {
                                if (fileExists(source)) {
                                    var videoSourceExtension = source.split('.').pop();
                                    if (videoSourceExtension === 'ogv') {
                                        videoSourceExtension = 'ogg';
                                    }
                                    var controlsList = '';
                                    if (downloadable === false) {
                                        controlsList = ' controlsList="nodownload"';
                                    }
                                    html += '<div class="an-popup-video">';
                                    html += '<video controls autoplay muted' + controlsList + '>';
                                    html += '<source src="' + source + '" type="video/' + videoSourceExtension + '">';
                                    html += 'Your browser does not support the video element.';
                                    html += '</video>';
                                    html += '</div>';
                                } else {
                                    html += '<div class="an-popup-content-not-supported">Source Video not found!</div>';
                                }
                            }
                            // Check if source is youtube url
                            // var regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|playlist\?list=))((\w|-){11})(?:\S+)?$/;
                            else if (source.match(/youtu.be/g) || source.match(/youtube/g)) {
                                // Check if is youtube share url
                                if (source.match(/youtu.be/g)) {
                                    // Replace youtu.be/ with youtube.com/embed/
                                    source = source.replace('youtu.be/', 'youtube.com/embed/');
                                }
                                // Check if is youtube watch url
                                if (source.match(/watch/g)) {
                                    // Replace watch?v= with embed/
                                    source = source.replace('watch?v=', 'embed/');
                                    // Check if has parameter list=
                                    if (source.match(/list=/g)) {
                                        // Replace embed/ with embed/videoseries?list=
                                        source = source.replace('embed/', 'embed/videoseries?si=');
                                    }
                                }
                                // Check if source is youtube playlist.
                                if (source.match(/playlist/g)) {
                                    // Replace playlist?list= with embed/videoseries?list=
                                    source = source.replace('playlist?list=', 'embed/videoseries?list=');
                                }
                                // Check if doesn't has parameter autoplay
                                if (!source.match(/autoplay=/g)) {
                                    // Check if has any parameter
                                    if (source.match(/\?/g)) {
                                        // Set autoplay to video source
                                        source = source + '&autoplay=1';
                                    } else {
                                        // Set autoplay to video source
                                        source = source + '?autoplay=1';
                                    }
                                }
                                // Check if doesn't has parameter origin
                                if (!source.match(/origin=/g)) {
                                    // Check if has any parameter
                                    if (source.match(/\?/g)) {
                                        // Add parameter origin
                                        source = source + '&origin=' + window.location.origin;
                                    } else {
                                        // Add parameter origin
                                        source = source + '?origin=' + window.location.origin;
                                    }
                                }
                                // Check if title empty
                                if (title === '') {
                                    // Set title to 'Video'
                                    title = 'Youtube Video';
                                }
                                html += '<div class="an-popup-video">';
                                html += '<iframe src="' + source + '" title="' + title + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
                                html += '</div>';
                            }
                            // Check if source is vimeo url
                            else if (source.match(/vimeo/g)) {
                                // Get video id
                                var videoId = source.split('/').pop();
                                // Set video source
                                source = 'https://player.vimeo.com/video/' + videoId;
                                // Check if doesn't has parameter autoplay
                                if (!source.match(/autoplay=/g)) {
                                    // Check if has any parameter
                                    if (source.match(/\?/g)) {
                                        // Set autoplay to video source
                                        source = source + '&autoplay=1';
                                    } else {
                                        // Set autoplay to video source
                                        source = source + '?autoplay=1';
                                    }
                                }
                                // Check if title empty
                                if (title === '') {
                                    // Set title to 'Video'
                                    title = 'Vimeo Video';
                                }
                                html += '<div class="an-popup-video">';
                                html += '<iframe src="' + source + '" title="' + title + '" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
                                html += '</div>';
                            }
                            // Check if source is google map url (share link | embed link | google map url)
                            else if (source.match(/maps/i) && source.match(/google/i) || source.match(/maps.app.goo.gl/g)) {
                                // Set zoom level
                                var zoom = 15;
                                // Check if source doesn't has parameter z=
                                if (!source.match(/z=/g)) {
                                    // Check if source has any parameter
                                    if (source.match(/\?/g)) {
                                        // Set zoom level to source
                                        source = source + '&z=' + zoom;
                                    } else {
                                        // Set zoom level to source
                                        source = source + '?z=' + zoom;
                                    }
                                }
                                // Check if title empty
                                if (title === '') {
                                    // Set title to 'Google Map'
                                    title = 'Google Map';
                                }
                                html += '<div class="an-popup-google-map">';
                                html += '<iframe src="' + source + '" title="' + title + '" frameborder="0" height="400" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
                                html += '</div>';
                            }
                            // Check if source is hash or not
                            else if (source.match(/#/g)) {
                                html += '<div class="an-popup-file-content">';
                                html += '<div class="an-popup-file-content-inner"></div>';
                                html += '</div>';
                                var element = $('.an-popup-file-content-inner');
                                // Find the target id
                                var targetHashId = source.split('#').pop();
                                // Set loading icon
                                element.html('<div class="an-popup-file-content-loading"><span class="an-loading-icon" role="status" aria-hidden="true">Loading...</span></div>');
                                // Check if target id is found
                                if ($('#' + targetHashId).length) {
                                    // Clone the target
                                    var targetClone = $('#' + targetHashId).clone();
                                    // Set content
                                    element.html(targetClone);
                                    // Remove class "an-hidden-target" from cloned content
                                    targetClone.removeClass('an-hidden-target');
                                    setTimeout(function () {
                                        // Replace the target with the new content with class .an-hidden-target except cloned content
                                        $('body').find('#' + targetHashId).not(targetClone).replaceWith('<div id="' + targetHashId + '-hidden" class="an-hidden-target"></div>');
                                        $('.an-popup-footer').remove();
                                    }, 100);
                                    // On close pop up
                                    $(document).on('click', '.an-popup-close', function() {
                                        // Add class "an-hidden-target"
                                        targetClone.addClass('an-hidden-target');
                                        // Replace the new content with the target
                                        $('#' + targetHashId + '-hidden').replaceWith(targetClone);
                                    });
                                    $(document).on('click', '.an-popup', function(e) {
                                        if (!$(e.target).closest('.an-popup-content').length) {
                                            // Add class "an-hidden-target"
                                            targetClone.addClass('an-hidden-target');
                                            // Replace the new content with the target
                                            $('#' + targetHashId + '-hidden').replaceWith(targetClone);
                                        }
                                    });
                                } else {
                                    // Set content
                                    element.html('<div class="an-popup-file-content-not-found">File Content not found!</div>');
                                }
                            }
                            // Check if source is content ajax request (file)
                            else if (source.match(/\.(html|txt|md|json|js|css|scss|jsx|ts|tsx|xml)/g)) {
                                html += '<div class="an-popup-file-content">';
                                html += '<div class="an-popup-file-content-inner"></div>';
                                html += '</div>';
                                var element = $('.an-popup-file-content-inner');
                                var targetContent = $(this).attr('data-target-content');
                                var sourceExtension = source.split('.').pop();
                                // Using XMLHttpRequest
                                var xhttp;
                                xhttp = new XMLHttpRequest();
                                xhttp.onreadystatechange = function () {
                                    if (this.readyState === 4) {
                                        // Set loading icon
                                        element.html('<div class="an-popup-file-content-loading"><span class="an-loading-icon" role="status" aria-hidden="true">Loading...</span></div>');
                                        var theContent = this.responseText;
                                        // Check if target content is empty and source is url or relative path without extension
                                        if (targetContent === undefined && !source.match(/\.(txt|md|json|js|css|scss|jsx|ts|tsx|xml)/g)) {
                                            element.html('target content is empty');
                                            // Return false
                                            return false;
                                        }
                                        // Check if target content is not empty
                                        if (targetContent !== undefined && targetContent !== '' && !source.match(/\.(txt|md|json|js|css|scss|jsx|ts|tsx|xml)/g)) {
                                            // Get content inside of source file/url of source file/url
                                            theContent = $(theContent).find(targetContent).html() || $(theContent).filter(targetContent).html();
                                        }
                                        // Check if request status is success
                                        if (this.status === 200) {
                                            // Set content
                                            var preWrap = '';
                                            if (source.match(/\.(md|json|js|css|scss|jsx|ts|tsx|xml)/g)) {
                                                // if ($('head').find('.an-prism').length === 0) {
                                                //     $('head').append('<link class="an-prism" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css">');
                                                // }
                                                // if ($('body').find('.an-prism').length === 0) {
                                                //     $('body').append('<script class="an-prism" src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>');
                                                //     // Prism With theme "Tomorrow Night"
                                                //     $('body').append('<script class="an-prism" type="text/javascript">$(document).ready(function(){setTimeout(function(){Prism.highlightAll()}, 500)});</script>');
                                                // }
                                                preWrap = '<pre class="pre-blocks"><code class="language-' + sourceExtension + '">' + theContent + '</code></pre>';
                                                element.html(preWrap);
                                            } else {
                                                element.html(theContent);
                                            }
                                        }
                                        // Check if request status is error
                                        if (this.status === 404) {
                                            // Set content
                                            element.html('<div class="an-popup-file-content-not-found">File Content not found!</div>');
                                        }
                                    }
                                }
                                xhttp.open('GET', source, true);
                                xhttp.send();
                            }
                            // Check if source is image
                            else if (source.match(/\.(jpe?g|png|gif|svg|webp|bmp|ico)/g) || source.match(/data:image/g) || source.match(/blob:/g) || source.match(/base64/g) || source.match(/unsplash/g) || source.match(/pexel/g)) {
                                html += '<div class="an-popup-image">';
                                html += '<img src="' + source + '" alt="' + title + '">';
                                html += '</div>';
                            }
                            // Show error message (Source not supported)
                            else {
                                html += '<div class="an-popup-content-not-supported">Source not found/supported!</div>';
                            }
                        }
                        html += '</div>';
                    html += '</div>';
                    if (description !== undefined && description !== '') {
                        // Remove tag from description except a tag or a link
                        if (description.match(/<a/g)) {
                            description = description.replace(/(<([^>]+)>)/gi, function (match, $1) {
                                return /<a/g.test($1) ? match : '';
                            });
                        } else {
                            description = description.replace(/(<([^>]+)>)/gi, '');
                        }
                        html += '<div class="an-popup-footer animated fadeInUp">';
                        html += '<div class="an-popup-description">';
                        html += '<small class="excerpt-2 fs-sm">' + description + '</small>';
                        html += '</div>';
                        // If Description character more than 130 then add "readmore" button
                        if (description.length > 130) {
                            html += readMoreBtn;
                        }
                        html += '</div>';
                    }
                    html += '</div>';
                    html += '</div>';
                    // Check if source status is not 404 except youtube
                    if (!source.match(/youtube/g) || !source.match(/youtu.be/g) || !source.match(/vimeo/g)) {
                        if (!fileExists(source)) {
                            // Remove title
                            $('.an-popup-title-wrapper').remove();
                            // Remove footer
                            $('.an-popup-footer').remove();
                            // Remove action
                            $('.an-popup-action [download]').remove();
                            // add css to image wrapper
                            $('.an-popup-image').css('max-height', '300px');
                            $('.an-popup-image').find('img').css('aspect-ratio', 1);
                        }
                    }
                    // Check if popup is not exist
                    if (!$('.an-popup').length) {
                        $('body').append(html);
                        $('.an-popup').addClass('an-popup-show');
                        // Disable body scroll when popup image is open
                        $('body').addClass('an-popup-open');
                        // Add click event for previous gallery item
                        var thePopupTitle = $('.an-popup-title');
                        var thePopupFooter = $('.an-popup-footer');
                        var thePopupAction = $('.an-popup-action');
                        // Pause audio when popup video is open
                        if ($('.an-popup-video').length) {
                            $('audio.active').each(function () {
                                // Check if audio is playing
                                if (!this.paused) {
                                    // Pause audio
                                    this.pause();
                                }
                            });
                        }
                        $('.an-popup-gallery-prev').on('click', function() {
                            var $currentItem = $('.an-popup-gallery-item.active');
                            var $prevItem = $currentItem.prev('.an-popup-gallery-item');

                            if ($prevItem.length === 0) {
                                // Wrap around to the last item if at the beginning
                                $prevItem = $('.an-popup-gallery-item:last');
                            }
                            var $prevItemTitle = $prevItem.find('img').attr('alt');
                            var $prevItemDescription = $prevItem.find('img').attr('data-description');
                            var $prevItemDownloadable = $prevItem.find('img').attr('data-downloadable');
                            var $prevItemSrc = $prevItem.find('img').attr('src');

                            $currentItem.removeClass('active');
                            thePopupTitle.text($prevItemTitle);
                            thePopupFooter.html('');
                            // Check if description is not empty
                            if ($prevItemDescription !== undefined && $prevItemDescription !== '') {
                                // Remove tag from description except a tag or a link
                                if ($prevItemDescription.match(/<a/g)) {
                                    $prevItemDescription = $prevItemDescription.replace(/(<([^>]+)>)/gi, function (match, $1) {
                                        return /<a/g.test($1) ? match : '';
                                    });
                                } else {
                                    $prevItemDescription = $prevItemDescription.replace(/(<([^>]+)>)/gi, '');
                                }
                                thePopupFooter.append('<div class="an-popup-description"><small class="excerpt-2 fs-sm">' + $prevItemDescription + '</small></div>');
                                // If Description character more than 130 then add "readmore" button
                                if ($prevItemDescription.length > 130) {
                                    thePopupFooter.find('.an-popup-description').append(readMoreBtn);
                                }
                            }
                            thePopupAction.html('');
                            if ($prevItemDownloadable !== undefined && $prevItemDownloadable !== '') {
                                if ($prevItemDownloadable === 'true') {
                                    var $prevItemtheAriaLabel = 'aria-label="Download"';
                                    var $prevItemtheDownload = 'download';
                                    if ($prevItemTitle !== undefined && $prevItemTitle !== '') {
                                        $prevItemtheAriaLabel = 'aria-label="' + $prevItemTitle + '"';
                                        $prevItemtheDownload = 'download="' + $prevItemTitle + '"';
                                    }
                                    thePopupAction.append('<a href="' + $prevItemSrc + '" '+ $prevItemtheAriaLabel +' '+ $prevItemtheDownload +'>'+ downloadIcon +'</a>');
                                }
                            }
                            thePopupAction.append(CloseBtn);
                            $('.an-popup-gallery-counter-current').text($prevItem.index() + 1);
                            $prevItem.addClass('active');
                        });
                        // Add click event for next gallery item
                        $('.an-popup-gallery-next').on('click', function() {
                            var $currentItem = $('.an-popup-gallery-item.active');
                            var $nextItem = $currentItem.next('.an-popup-gallery-item');

                            if ($nextItem.length === 0) {
                                // Wrap around to the first item if at the end
                                $nextItem = $('.an-popup-gallery-item:first');
                            }
                            var $nextItemTitle = $nextItem.find('img').attr('alt');
                            var $nextItemDescription = $nextItem.find('img').attr('data-description');
                            var $nextItemDownloadable = $nextItem.find('img').attr('data-downloadable');
                            var $nextItemSrc = $nextItem.find('img').attr('src');

                            $currentItem.removeClass('active');
                            thePopupTitle.text($nextItemTitle);
                            thePopupFooter.html('');
                            // Check if description is not empty
                            if ($nextItemDescription !== undefined && $nextItemDescription !== '') {
                                // Remove tag from description except a tag or a link
                                if ($nextItemDescription.match(/<a/g)) {
                                    $nextItemDescription = $nextItemDescription.replace(/(<([^>]+)>)/gi, function (match, $1) {
                                        return /<a/g.test($1) ? match : '';
                                    });
                                } else {
                                    $nextItemDescription = $nextItemDescription.replace(/(<([^>]+)>)/gi, '');
                                }
                                thePopupFooter.append('<div class="an-popup-description"><small class="excerpt-2 fs-sm">' + $nextItemDescription + '</small></div>');
                                // If Description character more than 130 then add "readmore" button
                                if ($nextItemDescription.length > 130) {
                                    thePopupFooter.find('.an-popup-description').append(readMoreBtn);
                                }
                            }
                            thePopupAction.html('');
                            if ($nextItemDownloadable !== undefined && $nextItemDownloadable !== '') {
                                if ($nextItemDownloadable === 'true') {
                                    var $nextItemtheAriaLabel = 'aria-label="Download"';
                                    var $nextItemtheDownload = 'download';
                                    if ($nextItemTitle !== undefined && $nextItemTitle !== '') {
                                        $nextItemtheAriaLabel = 'aria-label="' + $nextItemTitle + '"';
                                        $nextItemtheDownload = 'download="' + $nextItemTitle + '"';
                                    }
                                    thePopupAction.append('<a href="' + $nextItemSrc + '" '+ $nextItemtheAriaLabel +' '+ $nextItemtheDownload +'>'+ downloadIcon +'</a>');
                                }
                            }
                            thePopupAction.append(CloseBtn);
                            $('.an-popup-gallery-counter-current').text($nextItem.index() + 1);
                            $nextItem.addClass('active');
                        });
                    }
                }
                e.preventDefault();
            });
        });
        // On click event for .an-popup-close
        $(document).on('click', '.an-popup-close', function() {
            $('body').removeClass('an-popup-open');
            $('.an-popup').addClass('animated fadeOut');
            // // Play audio when popup is close
            // $('audio.active').each(function () {
            //     // Check if audio is paused
            //     if (this.paused) {
            //         // Play audio
            //         this.play();
            //     }
            // });
            setTimeout(function() {
                $('.an-popup').removeClass('an-popup-show').remove();
                // $('.an-prism').each(function() {
                //     $(this).remove();
                // });
            }, 500);
        });
        // On click event for .readmore
        $(document).on('click', '.readmore', function() {
            var parent = $(this).data('parent');
            $('body').removeClass('an-popup-open');
            $('.an-popup').addClass('animated fadeOut');
            // // Play audio when popup is close
            // $('audio.active').each(function () {
            //     // Check if audio is paused
            //     if (this.paused) {
            //         // Play audio
            //         this.play();
            //     }
            // });
            setTimeout(function() {
                $('.an-popup').removeClass('an-popup-show').remove();
                // $('.an-prism').each(function() {
                //     $(this).remove();
                // });
            }, 500);
            if (parent === 'an-profile') {
                // Scroll to about section or to top
                // Check if about section is exist or not
                if ($('section#about').length) {
                    $('html, body').scrollTop($('section#about').offset().top - initialOffset);
                } else if (window.location.href.indexOf('/page/') > -1) {
                    window.location.href = $(this).attr('href');
                } else {
                    $('html, body').scrollTop(0);
                }
            } else if (parent === 'an-card-action') {
                var cardID = $(this).data('card-id');
                // Trigger click on card link
                $('.an-card[data-id="' + cardID + '"]').find('.an-card-link').each(function() {
                    // Check if this has href attribute
                    if ($(this).attr('href') !== undefined && $(this).attr('href') !== '') {
                        // Redirect to href
                        window.location.href = $(this).attr('href');
                    } else {
                        // Trigger click on card link to open modal
                        $(this).trigger('click');
                        // show modal
                        $('#an-modal').modal('show');
                    }
                });
            } else {
                // Scroll to top
                $('html, body').scrollTop(0);
            }
            return false;
        });
        // On click event for a tag inside .an-popup-content
        $(document).on('click', '.an-popup-content a[data-target]', function() {
            $('body').removeClass('an-popup-open');
            $('.an-popup').addClass('animated fadeOut');
            // // Play audio when popup is close
            // $('audio.active').each(function () {
            //     // Check if audio is paused
            //     if (this.paused) {
            //         // Play audio
            //         this.play();
            //     }
            // });
            setTimeout(function() {
                $('.an-popup').removeClass('an-popup-show').remove();
                // $('.an-prism').each(function() {
                //     $(this).remove();
                // });
            }, 500);
            var target = $(this).data('target');
            if ($('#' + target).length) {
                // Scroll to target
                $('html, body').scrollTop($('#' + target).offset().top - initialOffset);
            } else {
                // Scroll to top
                $('html, body').scrollTop(0);
            }
            return false;
        });
        // On click event outside of .an-popup-content
        $(document).on('click', '.an-popup', function(e) {
            if (!$(e.target).closest('.an-popup-content').length) {
                $('body').removeClass('an-popup-open');
                $('.an-popup').addClass('animated fadeOut');
                // // Play audio when popup is close
                // $('audio.active').each(function () {
                //     // Check if audio is paused
                //     if (this.paused) {
                //         // Play audio
                //         this.play();
                //     }
                // });
                setTimeout(function() {
                    $('.an-popup').removeClass('an-popup-show').remove();
                    // $('.an-prism').each(function() {
                    //     $(this).remove();
                    // });
                }, 500);
            }
        });
    }
}
ANPopUp();