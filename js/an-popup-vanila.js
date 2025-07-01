/*!
 *  Name: AN Popup
 *  Description: AN Popup is a simple and lightweight popup plugin that allows you to create a popup with multiple content type (Image, Video, Google Map, File, etc) and responsive.
 *  Author: Atas Nalar
 *  Version: 1.0.0
 *  License: GNU General Public License v3.0 or later
 *  License URI: http://www.gnu.org/licenses/gpl-3.0.html
 */
function fileExists(url) {
    // Use async
    var http = new XMLHttpRequest();
    http.open('HEAD', url, true);
    http.send();
    return http.status !== 404;
}
function ANPopUp() {
	var popupBtns = document.querySelectorAll('.an-popup-btn');
	if (popupBtns.length > 0) {
		popupBtns.forEach(function (btn) {
			var getAttr = function (el, attrs) {
				for (var i = 0; i < attrs.length; i++) {
					var val = el.getAttribute(attrs[i]);
					if (val) return val;
				}
				return null;
			};
			var source = getAttr(btn, [
				'href',
				'src',
				'data-image',
				'data-video',
				'data-map',
				'data-url',
				'data-src'
			]);
			if (!source && btn.querySelector('source')) {
				source = btn.querySelector('source').getAttribute('src');
			}
			var overlayColor = btn.getAttribute('data-overlay');
			var parentCard = btn.closest('.an-card');
			var parentGallery = btn.closest('.an-popup-gallery');
			if ((parentCard && parentCard.getAttribute('data-type') === 'gallery') || parentGallery) {
				var overlayParent = parentGallery ? parentGallery : btn.closest('.an-card-wrap');
				if (overlayParent && overlayParent.getAttribute('data-overlay')) {
					overlayColor = overlayParent.getAttribute('data-overlay');
					overlayParent.querySelectorAll('.an-popup-btn').forEach(function (b) {
						b.setAttribute('data-overlay', overlayColor);
					});
				}
			}
			if (overlayColor) {
				overlayColor = ' data-overlay="true" style="background:' + overlayColor + ';"';
			} else {
				overlayColor = '';
			}
			btn.addEventListener('click', function (e) {
				e.preventDefault();
				var downloadable = btn.getAttribute('data-downloadable') === 'true';
				var title = '';
				var cardBody = btn.closest('.an-card-body');
				if (cardBody && cardBody.querySelector('.an-card-title')) {
					title = cardBody.querySelector('.an-card-title').textContent.trim();
				}
				if (!title) {
					title = btn.getAttribute('data-title') || btn.getAttribute('title') || btn.getAttribute('alt') || '';
				}
				if (title) {
					title = title.charAt(0).toUpperCase() + title.slice(1);
				}
				var description = '';
				if (cardBody && cardBody.querySelector('.an-card-detail')) {
					description = cardBody.querySelector('.an-card-detail').innerHTML;
				} else {
					description = btn.getAttribute('data-description') || '';
				}
				var theAriaLabel = 'aria-label="Download"';
				var theDownload = 'download';
				if (downloadable && title) {
					theAriaLabel = 'aria-label="' + title + '"';
					theDownload = 'download="' + title + '"';
				}
				var autos = downloadable ? ' ms-auto' : '';
				var closeIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill:currenColor;"><path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path></svg>';
				var downloadIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill:currenColor;"><path d="M13 10H18L12 16L6 10H11V3H13V10ZM4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19Z"></path></svg>';
				var parent = '';
				if (btn.closest('.an-profile') || btn.closest('.an-avatar')) {
					parent = 'data-parent="an-profile"';
				} else if (btn.closest('.an-card-action')) {
					var card = btn.closest('.an-card');
					parent = 'data-parent="an-card-action" data-card-id="' + (card ? card.getAttribute('data-id') : '') + '"';
				}
				var targetReadmore = 'javascript:void(0)';
				if (window.location.href.indexOf('/page/') > -1) {
					targetReadmore = window.location.origin;
				}
				var readMoreBtn = '<a href="' + targetReadmore + '" class="readmore" ' + parent + ' style="padding:.5rem;text-decoration:underline;">Read More</a>';
				var CloseBtn = '<span class="an-popup-close' + autos + '" aria-label="Close">' + closeIcon + '</span>';
				if (source) {
					var html = '<div class="an-popup"' + overlayColor + '>';
					html += '<div class="an-popup-content">';
					html += '<div class="an-popup-header animated fadeInDown">';
					html += '<div class="an-popup-title-wrapper">';
					html += '<span class="an-popup-title">' + title + '</span>';
					html += '</div>';
					html += '<div class="an-popup-action" style="margin-left: auto;">';
					if (downloadable) {
						html += '<a href="' + source + '" ' + theAriaLabel + ' ' + theDownload + '>' + downloadIcon + '</a>';
					}
					html += CloseBtn;
					html += '</div>';
					html += '</div>';
					html += '<div class="an-popup-body animated fadeIn">';
					html += '<div class="an-popup-body-inner">';
					// Gallery
					if ((parentCard && parentCard.getAttribute('data-type') === 'gallery') || parentGallery) {
						var theParent = parentGallery ? parentGallery : btn.closest('.an-card-wrap');
						var galleryBtns = theParent ? theParent.querySelectorAll('.an-popup-btn') : [];
						var images = [], imagesAlt = [], imagesDescription = [], imagesDownloadable = [], galleryOverlays = [];
						galleryBtns.forEach(function (gbtn) {
							var galleryOverlay = gbtn.getAttribute('data-overlay');
							galleryOverlays.push(galleryOverlay ? ' data-overlay="' + galleryOverlay + '"' : '');
							var imageSrc = getAttr(gbtn, ['src', 'href', 'data-image']);
							if (!imageSrc && gbtn.querySelector('source')) {
								imageSrc = gbtn.querySelector('source').getAttribute('src');
							}
							images.push(imageSrc);
							var imageAlt = gbtn.getAttribute('alt') || gbtn.getAttribute('title') || '';
							imagesAlt.push(imageAlt);
							var imageDescription = gbtn.getAttribute('data-description') || '';
							imagesDescription.push(imageDescription ? 'data-description="' + imageDescription + '"' : '');
							var imageDownloadable = gbtn.getAttribute('data-downloadable') || '';
							imagesDownloadable.push(imageDownloadable ? 'data-downloadable="' + imageDownloadable + '"' : '');
						});
						html += '<div class="an-popup-gallery">';
						if (images.length > 1) {
							html += '<span class="an-popup-gallery-prev an-popup-nav-slider" aria-label="Previous"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill: currentColor;"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg></span>';
						}
						html += '<div class="an-popup-gallery-inner">';
						for (var i = 0; i < images.length; i++) {
							imagesAlt[i] = imagesAlt[i] ? imagesAlt[i].charAt(0).toUpperCase() + imagesAlt[i].slice(1) : '';
							var isActive = (images[i] === source && imagesAlt[i] === title);
							html += '<div class="an-popup-gallery-item' + (isActive ? ' active' : '') + '">';
							var styleNotExists = '';
							if (!fileExists(images[i])) {
								styleNotExists = ' style="width: 150px;height: 150px;"';
								imagesAlt[i] = 'Image not found';
								imagesDescription[i] = '';
								imagesDownloadable[i] = '';
							}
							html += '<img src="' + images[i] + '" alt="' + imagesAlt[i] + '" ' + imagesDescription[i] + ' ' + imagesDownloadable[i] + styleNotExists + galleryOverlays[i] + '>';
							html += '</div>';
						}
						html += '</div>';
						if (images.length > 1) {
							html += '<span class="an-popup-gallery-next an-popup-nav-slider" aria-label="Next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill: currentColor;"><path d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"></path></svg></span>';
						}
						html += '</div>';
					}
					// Video
					else if (parentCard && parentCard.getAttribute('data-type') === 'video') {
						var video = parentCard.querySelector('.an-video');
						if (video) {
							video.pause && video.pause();
							video.currentTime = 0;
							video.load && video.load();
							var playBtn = video.parentNode.querySelector('.an-video-play-btn');
							var stopBtn = video.parentNode.querySelector('.an-video-stop-btn');
							if (playBtn) playBtn.style.display = '';
							if (stopBtn) stopBtn.style.display = 'none';
						}
						var videoClone = parentCard.querySelector('.an-card-wrap .an-video') ? parentCard.querySelector('.an-card-wrap .an-video').cloneNode(true) : null;
						var cardWrap = parentCard.querySelector('.an-card-wrap');
						var popupSource = cardWrap ? cardWrap.getAttribute('data-popup-source') : null;
						html += '<div class="an-popup-video">';
						if (popupSource) {
							var videoSource = popupSource;
							if (/youtube/.test(videoSource) || /youtu\.be/.test(videoSource)) {
								if (/youtu\.be/.test(videoSource)) {
									videoSource = videoSource.replace('youtu.be/', 'youtube.com/embed/');
								}
								if (/watch/.test(videoSource)) {
									videoSource = videoSource.replace('watch?v=', 'embed/');
									if (/list=/.test(videoSource)) {
										videoSource = videoSource.replace('embed/', 'embed/videoseries?si=');
									}
								}
								if (/playlist/.test(videoSource)) {
									videoSource = videoSource.replace('playlist?list=', 'embed/videoseries?list=');
								}
								if (cardWrap && cardWrap.querySelector('.has-autoplay')) {
									videoSource += (/\?/.test(videoSource) ? '&' : '?') + 'autoplay=1';
								}
								if (!/origin=/.test(videoSource)) {
									videoSource += (/\?/.test(videoSource) ? '&' : '?') + 'origin=' + window.location.origin;
								}
								if (!title) title = 'Youtube Video';
								html += '<iframe src="' + videoSource + '" title="' + title + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
							} else if (/vimeo/.test(videoSource)) {
								var videoId = videoSource.split('/').pop();
								videoSource = 'https://player.vimeo.com/video/' + videoId;
								if (!/autoplay=/.test(videoSource)) {
									videoSource += (/\?/.test(videoSource) ? '&' : '?') + 'autoplay=1';
								}
								if (!title) title = 'Vimeo Video';
								html += '<iframe src="' + videoSource + '" title="' + title + '" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
							} else {
								if (fileExists(videoSource) && videoClone) {
									if (videoClone.querySelectorAll('source').length > 1) {
										var firstSource = videoClone.querySelector('source');
										videoClone.innerHTML = '';
										videoClone.appendChild(firstSource);
									}
									var videoSourceExtension = videoSource.split('.').pop();
									if (videoClone.querySelector('source')) {
										videoClone.querySelector('source').setAttribute('type', 'video/' + videoSourceExtension);
										videoClone.querySelector('source').setAttribute('src', videoSource);
									}
									html += videoClone.outerHTML;
								} else {
									html += '<div class="an-popup-content-not-supported">Source Video not found!</div>';
								}
							}
						} else if (videoClone) {
							var src = videoClone.querySelector('source') ? videoClone.querySelector('source').getAttribute('src') : videoClone.getAttribute('src');
							if (fileExists(src)) {
								html += videoClone.outerHTML;
							} else {
								html += '<div class="an-popup-content-not-supported">Source Video not found!</div>';
							}
						}
						html += '</div>';
					}
					// File, image, map, etc
					else {
						// Video file
						if (/\.(mp4|ogg|ogv|webm)/i.test(source)) {
							if (fileExists(source)) {
								var videoSourceExtension = source.split('.').pop();
								if (videoSourceExtension === 'ogv') videoSourceExtension = 'ogg';
								var controlsList = downloadable ? '' : ' controlsList="nodownload"';
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
						// Youtube
						else if (/youtu\.be|youtube/.test(source)) {
							if (/youtu\.be/.test(source)) {
								source = source.replace('youtu.be/', 'youtube.com/embed/');
							}
							if (/watch/.test(source)) {
								source = source.replace('watch?v=', 'embed/');
								if (/list=/.test(source)) {
									source = source.replace('embed/', 'embed/videoseries?si=');
								}
							}
							if (/playlist/.test(source)) {
								source = source.replace('playlist?list=', 'embed/videoseries?list=');
							}
							if (!/autoplay=/.test(source)) {
								source += (/\?/.test(source) ? '&' : '?') + 'autoplay=1';
							}
							if (!/origin=/.test(source)) {
								source += (/\?/.test(source) ? '&' : '?') + 'origin=' + window.location.origin;
							}
							if (!title) title = 'Youtube Video';
							html += '<div class="an-popup-video">';
							html += '<iframe src="' + source + '" title="' + title + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
							html += '</div>';
						}
						// Vimeo
						else if (/vimeo/.test(source)) {
							var videoId = source.split('/').pop();
							source = 'https://player.vimeo.com/video/' + videoId;
							if (!/autoplay=/.test(source)) {
								source += (/\?/.test(source) ? '&' : '?') + 'autoplay=1';
							}
							if (!title) title = 'Vimeo Video';
							html += '<div class="an-popup-video">';
							html += '<iframe src="' + source + '" title="' + title + '" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
							html += '</div>';
						}
						// Google Maps
						else if ((/maps/i.test(source) && /google/i.test(source)) || /maps\.app\.goo\.gl/.test(source)) {
							var zoom = 15;
							if (!/z=/.test(source)) {
								source += (/\?/.test(source) ? '&' : '?') + 'z=' + zoom;
							}
							if (!title) title = 'Google Map';
							html += '<div class="an-popup-google-map">';
							html += '<iframe src="' + source + '" title="' + title + '" frameborder="0" height="400" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
							html += '</div>';
						}
						// Hash
						else if (/#/.test(source)) {
							var targetHashId = source.split('#').pop();
							html += '<div class="an-popup-file-content">';
							html += '<div class="an-popup-file-content-inner"><div class="an-popup-file-content-loading"><span class="an-loading-icon" role="status" aria-hidden="true">Loading...</span></div></div>';
							html += '</div>';
							setTimeout(function () {
								var element = document.querySelector('.an-popup-file-content-inner');
								var targetEl = document.getElementById(targetHashId);
								if (targetEl) {
									var targetClone = targetEl.cloneNode(true);
									element.innerHTML = '';
									element.appendChild(targetClone);
									targetClone.classList.remove('an-hidden-target');
									setTimeout(function () {
										var hiddenDiv = document.createElement('div');
										hiddenDiv.id = targetHashId + '-hidden';
										hiddenDiv.className = 'an-hidden-target';
										targetEl.replaceWith(hiddenDiv);
										var popupFooter = document.querySelector('.an-popup-footer');
										if (popupFooter) popupFooter.remove();
									}, 100);
									document.addEventListener('click', function closePopup(e) {
										const isClose = e.target.closest('.an-popup-close');
										if (isClose || e.target.classList.contains('an-popup')) {
											targetClone.classList.add('an-hidden-target');
											var hidden = document.getElementById(targetHashId + '-hidden');
											if (hidden) hidden.replaceWith(targetClone);
											document.removeEventListener('click', closePopup);
										}
									});
								} else {
									element.innerHTML = '<div class="an-popup-file-content-not-found">File Content not found!</div>';
								}
							}, 250);
						}
						// Ajax file
						else if (/\.(html|txt|md|json|js|css|scss|jsx|ts|tsx|xml)/i.test(source) && btn.getAttribute('data-type') !== 'qr-code') {
							html += '<div class="an-popup-file-content">';
							html += '<div class="an-popup-file-content-inner"></div>';
							html += '</div>';
							var element = null;
							setTimeout(function () {
								element = document.querySelector('.an-popup-file-content-inner');
								var targetContent = btn.getAttribute('data-target-content');
								var sourceExtension = source.split('.').pop();
								var xhttp = new XMLHttpRequest();
								xhttp.onreadystatechange = function () {
									if (this.readyState === 4) {
										element.innerHTML = '<div class="an-popup-file-content-loading"><span class="an-loading-icon" role="status" aria-hidden="true">Loading...</span></div>';
										var theContent = this.responseText;
										if (this.status === 200) {
											if (/\.(html|md|json|js|css|scss|jsx|ts|tsx|xml)/i.test(source)) {
												if (targetContent) {
													if (!/\.html/i.test(source)) return false;
													var tempDiv = document.createElement('div');
													tempDiv.innerHTML = theContent;
													var found = tempDiv.querySelector(targetContent);
													element.innerHTML = found ? found.innerHTML : '';
												} else {
													if (!document.querySelector('head .an-prism')) {
														var prismCss = document.createElement('link');
														prismCss.className = 'an-prism';
														prismCss.rel = 'stylesheet';
														prismCss.href = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css';
														prismCss.crossOrigin = 'anonymous';
														document.head.appendChild(prismCss);

														var prismLineCss = document.createElement('link');
														prismLineCss.className = 'an-prism';
														prismLineCss.rel = 'stylesheet';
														prismLineCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/plugins/line-numbers/prism-line-numbers.min.css';
														prismLineCss.crossOrigin = 'anonymous';
														document.head.appendChild(prismLineCss);
													}
													if (!document.querySelector('body .an-prism')) {
														var prismJs = document.createElement('script');
														prismJs.className = 'an-prism';
														prismJs.src = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js';
														document.body.appendChild(prismJs);

														var prismLineJs = document.createElement('script');
														prismLineJs.className = 'an-prism';
														prismLineJs.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/plugins/line-numbers/prism-line-numbers.min.js';
														document.body.appendChild(prismLineJs);

														var runPrism = function() {
															setTimeout(function() {
																if (window.Prism) {
																	Prism.highlightAll();
																	document.querySelectorAll('pre').forEach(function(pre) {
																		pre.classList.add('line-numbers');
																	});
																}
															}, 500);
														};
														prismLineJs.onload = runPrism;
														prismJs.onload = runPrism;
													}
													element.innerHTML = '<pre data-src="' + source + '" class="line-numbers"></pre>';
												}
											} else {
												element.innerHTML = theContent;
											}
										}
										if (this.status === 404) {
											element.innerHTML = '<div class="an-popup-file-content-not-found">File Content not found!</div>';
										}
									}
								};
								xhttp.open('GET', source, true);
								xhttp.send();
							}, 0);
						}
						// PDF
						else if (/\.(pdf)/i.test(source) && btn.getAttribute('data-type') !== 'qr-code') {
							var toolbar = btn.getAttribute('data-toolbar') === 'false' ? '#toolbar=0' : '';
							html += '<div class="an-popup-file-content">';
							html += '<div class="an-popup-file-content-inner"></div>';
							html += '</div>';
							setTimeout(function () {
								var element = document.querySelector('.an-popup-file-content-inner');
								element.innerHTML = '<div class="an-popup-file-content-loading"><span class="an-loading-icon" role="status" aria-hidden="true">Loading...</span></div>';
								if (/^https?:\/\//.test(source)) {
									var xhttp = new XMLHttpRequest();
									xhttp.onreadystatechange = function () {
										if (this.readyState === 4) {
											if (this.status === 200) {
												element.innerHTML = '<iframe src="' + source + toolbar + '" title="' + title + '" frameborder="0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" height="600" style="width:100%;min-height: 600px;height:100%"></iframe>';
											}
											if (this.status === 404) {
												element.innerHTML = '<div class="an-popup-file-content-not-found">File Content not found!</div>';
											}
										}
									};
									xhttp.open('GET', source, true);
									xhttp.send();
								} else {
									if (!fileExists(source)) {
										element.innerHTML = '<div class="an-popup-file-content-not-found">File Content not found!</div>';
									} else {
										element.innerHTML = '<iframe src="' + source + toolbar + '" title="' + title + '" frameborder="0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" height="600" style="width:100%;min-height: 600px;height:100%"></iframe>';
									}
								}
							}, 0);
						}
						// Image
						else if ((/\.(jpe?g|png|gif|svg|webp|bmp|ico)/i.test(source) && btn.getAttribute('data-type') !== 'qr-code') || (/data:image|blob:|base64|unsplash|pexel/.test(source) && btn.getAttribute('data-type') !== 'qr-code')) {
							html += '<div class="an-popup-image">';
							html += '<img src="' + source + '" alt="' + title + '">';
							html += '</div>';
						}
						// QR code
						else if (btn.getAttribute('data-type') === 'qr-code') {
							var qrCodeUrl = 'https://quickchart.io/chart?cht=qr&chl=' + source + '&chs=380x380&chld=L|0';
							html += '<div class="an-popup-file-content" style="min-width: fit-content;">';
							html += '<div class="an-popup-file-content-inner qr-code text-center">';
							html += '<h4>Scan QR Code</h4>';
							html += '<img src="' + qrCodeUrl + '" alt="' + title + '" width="380" height="380" style="padding: .5rem; border-radius: .5rem; border: 2px solid;">';
							html += '<div class="qr-code-info mt-2">';
							html += title;
							html += '</div>';
						}
						// Not supported
						else {
							html += '<div class="an-popup-content-not-supported">Source not found/supported!</div>';
						}
					}
					html += '</div>';
					html += '</div>';
					if (description) {
						if (/<a/g.test(description)) {
							description = description.replace(/(<([^>]+)>)/gi, function (match, $1) {
								return /<a/g.test($1) ? match : '';
							});
						} else {
							description = description.replace(/(<([^>]+)>)/gi, '');
						}
						html += '<div class="an-popup-footer animated fadeInUp">';
						html += '<div class="an-popup-description">';
						html += '<small>' + description + '</small>';
						html += '</div>';
						if (description.length > 130) {
							html += readMoreBtn;
						}
						html += '</div>';
					}
					html += '</div>';
					html += '</div>';
					// Check if source status is not 404 except youtube/vimeo
					if (!/youtube|youtu\.be|vimeo/.test(source)) {
						if (!fileExists(source)) {
							var titleWrap = document.querySelector('.an-popup-title-wrapper');
							if (titleWrap) titleWrap.remove();
							var footer = document.querySelector('.an-popup-footer');
							if (footer) footer.remove();
							var action = document.querySelector('.an-popup-action [download]');
							if (action) action.remove();
							var imgWrap = document.querySelector('.an-popup-image');
							if (imgWrap) {
								imgWrap.style.maxHeight = '300px';
								var img = imgWrap.querySelector('img');
								if (img) img.style.aspectRatio = 1;
							}
						}
					}
					if (!document.querySelector('.an-popup')) {
						document.body.insertAdjacentHTML('beforeend', html);
						var popup = document.querySelector('.an-popup');
						popup.classList.add('an-popup-show');
						document.body.classList.add('an-popup-open');
						// Pause audio
						document.querySelectorAll('audio.active').forEach(function (audio) {
							if (!audio.paused) audio.pause();
						});
						// Gallery navigation
						var prevBtn = document.querySelector('.an-popup-gallery-prev');
						var nextBtn = document.querySelector('.an-popup-gallery-next');
						var galleryItems = document.querySelectorAll('.an-popup-gallery-item');
						var popupTitle = document.querySelector('.an-popup-title');
						var popupFooter = document.querySelector('.an-popup-footer');
						var popupAction = document.querySelector('.an-popup-action');
						function updateGalleryNav(direction) {
							var current = document.querySelector('.an-popup-gallery-item.active');
							var items = Array.from(galleryItems);
							var idx = items.indexOf(current);
							var newIdx = direction === 'prev' ? (idx - 1 + items.length) % items.length : (idx + 1) % items.length;
							var newItem = items[newIdx];
							current.classList.remove('active');
							newItem.classList.add('active');
							var img = newItem.querySelector('img');
							var newTitle = img ? img.getAttribute('alt') : '';
							var newDescription = img ? img.getAttribute('data-description') : '';
							var newDownloadable = img ? img.getAttribute('data-downloadable') : '';
							var newSrc = img ? img.getAttribute('src') : '';
							var newOverlay = img ? img.getAttribute('data-overlay') : '';
							if (newOverlay) {
								popup.setAttribute('data-overlay', 'true');
								popup.style.backgroundColor = newOverlay;
							} else {
								popup.removeAttribute('data-overlay');
								popup.removeAttribute('style');
							}
							if (popupTitle) popupTitle.textContent = newTitle;
							if (popupFooter) {
								popupFooter.innerHTML = '';
								if (newDescription) {
									if (/<a/g.test(newDescription)) {
										newDescription = newDescription.replace(/(<([^>]+)>)/gi, function (match, $1) {
											return /<a/g.test($1) ? match : '';
										});
									} else {
										newDescription = newDescription.replace(/(<([^>]+)>)/gi, '');
									}
									popupFooter.innerHTML = '<div class="an-popup-description"><small>' + newDescription + '</small></div>';
									if (newDescription.length > 130) {
										popupFooter.querySelector('.an-popup-description').insertAdjacentHTML('beforeend', readMoreBtn);
									}
								}
							}
							if (popupAction) {
								popupAction.innerHTML = '';
								if (newDownloadable === 'true') {
									var ariaLabel = 'aria-label="Download"';
									var downloadAttr = 'download';
									if (newTitle) {
										ariaLabel = 'aria-label="' + newTitle + '"';
										downloadAttr = 'download="' + newTitle + '"';
									}
									popupAction.innerHTML = '<a href="' + newSrc + '" ' + ariaLabel + ' ' + downloadAttr + '>' + downloadIcon + '</a>';
								}
								popupAction.insertAdjacentHTML('beforeend', CloseBtn);
							}
						}
						if (prevBtn) prevBtn.addEventListener('click', function () { updateGalleryNav('prev'); });
						if (nextBtn) nextBtn.addEventListener('click', function () { updateGalleryNav('next'); });
					}
				}
			});
		});
		// Close popup
		document.addEventListener('click', function (e) {
			const isClose = e.target.closest('.an-popup-close');

			if (isClose) {
				document.body.classList.remove('an-popup-open');

				// Remove all .an-prism elements if found
				var prismEls = document.querySelectorAll('.an-prism');
				if (prismEls.length > 0) {
				prismEls.forEach(function (el) {
					el.remove();
				});
				}

				var popup = document.querySelector('.an-popup');
				if (popup) {
				popup.classList.add('animated', 'fadeOut');
				setTimeout(function () {
					popup.classList.remove('an-popup-show');
					popup.remove();
				}, 500);
				}
			}
			// Readmore
			if (e.target.classList.contains('readmore')) {
				e.preventDefault();
				var parent = e.target.getAttribute('data-parent');
				document.body.classList.remove('an-popup-open');
				// Remove all .an-prism elements if found
				var prismEls = document.querySelectorAll('.an-prism');
				if (prismEls.length > 0) {
					prismEls.forEach(function(el) {
						el.remove();
					});
				}
				var popup = document.querySelector('.an-popup');
				if (popup) {
					popup.classList.add('animated', 'fadeOut');
					setTimeout(function () {
						popup.classList.remove('an-popup-show');
						popup.remove();
					}, 500);
				}
				if (parent === 'an-profile') {
					var aboutSection = document.querySelector('section#about');
					if (aboutSection) {
						if (document.documentElement.getAttribute('data-type') === 'v-card') {
							var navLink = document.querySelector('.an-nav-link[data-target="about"]');
							if (navLink) {
								navLink.click();
							} else {
								window.scrollTo(0, aboutSection.offsetTop);
							}
						} else {
							window.scrollTo(0, aboutSection.offsetTop);
						}
					} else if (window.location.href.indexOf('/page/') > -1) {
						window.location.href = e.target.getAttribute('href');
					} else {
						window.scrollTo(0, 0);
					}
				} else if (parent === 'an-card-action') {
					var cardID = e.target.getAttribute('data-card-id');
					var card = document.querySelector('.an-card[data-id="' + cardID + '"]');
					if (card) {
						var cardLink = card.querySelector('.an-card-link');
						if (cardLink && cardLink.getAttribute('href')) {
							window.location.href = cardLink.getAttribute('href');
						} else if (cardLink) {
							cardLink.click();
							var modal = document.getElementById('an-modal');
							if (modal) modal.style.display = 'block';
						}
					}
				} else {
					window.scrollTo(0, 0);
				}
			}
			// a[data-target] inside popup
			if (e.target.matches('.an-popup-content a[data-target]')) {
				e.preventDefault();
				document.body.classList.remove('an-popup-open');
				var popup = document.querySelector('.an-popup');
				if (popup) {
					popup.classList.add('animated', 'fadeOut');
					setTimeout(function () {
						popup.classList.remove('an-popup-show');
						popup.remove();
					}, 500);
				}
				var target = e.target.getAttribute('data-target');
				var el = document.getElementById(target);
				if (el) {
					window.scrollTo(0, el.offsetTop);
				} else {
					window.scrollTo(0, 0);
				}
			}
			// Outside popup-content
			if (e.target.classList.contains('an-popup')) {
				if (!e.target.querySelector('.an-popup-content').contains(e.target)) {
					document.body.classList.remove('an-popup-open');
					// Remove all .an-prism elements if found
					var prismEls = document.querySelectorAll('.an-prism');
					if (prismEls.length > 0) {
						prismEls.forEach(function(el) {
							el.remove();
						});
					}

					var popup = document.querySelector('.an-popup');
					if (popup) {
						popup.classList.add('animated', 'fadeOut');
						setTimeout(function () {
							popup.classList.remove('an-popup-show');
							popup.remove();
						}, 500);
					}
				}
			}
		});
	}
}
ANPopUp();
