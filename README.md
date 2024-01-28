# atasnalar-bootstrap

By default we set prefix to empty.
If you set the prefix in your custom Sass file,<br />
Add *data-prefix="{your-prefix}" to the html tag based on your prefix in your custom variable Sass file*. (ex: data-prefix="bs-").<br />
This will help you to automatically add your custom prefix to the inline style in all html tags (ex: &lt;span&gt; style="color: var(--color);"&gt; will changed to &lt;span style="color: var(--bs-color);"&gt;) on the fly. So, you don't need to change anything in inline style in html tags.

Note: In JS file, we don't use prefix. So, you don't need to change anything in JS file. But, if you want to use variable in your custom JS file, simply get the prefix from the html tag.<br />
(ex: var prefix = document.documentElement.getAttribute("data-prefix");) and use it in your custom JS file.

Example to enable Tooltip in JS:<br />
/* ======== Tooltip ======== */<br />
// Don&apos;t use "bs-" after "data-"<br />
const tooltipTriggerList = document.querySelectorAll(&apos;[data-toggle="tooltip"]&apos;)<br />
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))<br />
Example for Event Toast in JS:<br />
/* ======== Toast, Popovers ======== */<br />
// Don&apos;t use "bs." after "hidden.", "show.", "shown.", "hide."<br />
const myToastEl = document.getElementById(&apos;.toast&apos;)<br />
myToastEl.addEventListener(&apos;hidden.toast&apos;, () => {<br />
  // do something...<br />
})<br />

Overall just like Bootstrap.

== Usage ==

1. Install via NPM: npm install atasnalar-bootstrap
2. Import Atas Nalar - Bootstrap Sass file to your main Sass file: @import "node_modules/atasnalar-bootstrap/scss/atasnalar-bootstrap";
3. Import Customized Bootstrap JavaScript file to your main JavaScript file: (Expanded = bootstrap.bundle.js, Minified = bootstrap.bundle.min.js) => import 'node_modules/atasnalar-bootstrap/js/bootstrap.bundle.min.js';

== Customization ==

This Sass is based on Bootstrap ^5.3.0. Big thanks to all Bootstrap author & contributor.

For information, we don't recommend editing all files directly. This file has been re-implemented by Atas Nalar with some changes in Sass & JavaScript files and will be overwritten by us when "New Updates" from Bootstrap are released.

== New Features & Implementation ==

Sass Files:
- Extend: Theme Color (tertiary)
- Extend: Pallete for Theme Color (primary, secondary, tertiary, success, info, warning, danger, light, dark)
- Extend: Box Shadow Color (primary, secondary, tertiary, success, info, warning, danger)
- Extend: Text Color (colors & theme colors) with hover state (.text-primary, text-hover-primary, etc.)
- Extend: Background Color (colors & theme colors) with hover state (.bg-primary, bg-hover-primary, etc.)
- Extend: Root Variables
- Extend: Tooltip Color [Usages: add attribute data-custom-class="tooltip-{color}" to the element that has tooltip]
  (primary, secondary, tertiary, success, info, warning, danger, blue, indigo, purple, pink, red, orange, yellow, green, teal, cyan)
- Added: New Sass variables (circular progress bar, preloader, box shadow, etc.)
- Added: New Sass mixins (button, box shadow, text, background, etc.)
- Added: New Sass Utilities (box shadow, cursor, image width (.img-8 > .img-96, .img-128, .img-256, .img-512))
- Added: New Radio Box Style for input type radio
- Added: New Component (Circular Progress Bar)
- Added: New Component (Preloader)
- Added: New Component (Toggle Switch Theme Mode => Light/Dark)
- Added: New Component (Typing Text Animation) with support for multiple text,custom speed, variable color & theme color.
- Added: New Dropdown Toggle Icon (chevron as default, caret as alternative with class .toggle-caret)
- Added: New Divider with Text (Separator) with class .strike (Ex: &lt;div class="strike"&gt; &lt;span&gt;Text&lt;/span&gt;&lt;/div&gt;)
- Added: Icon support for input, textarea, select.
- Added: Style for broken image callback
- Added: Icon only button
- Added: Style for placeholder, selection, and link with failed url (no http in url)
- Added: New class .pre-blocks for styling pre tag based on theme mode (light/dark)
- Added: New class for transition (Ex: .pull, .push, .hover-up, .hover-down)
- Added: Scrollbar style for webkit browser (Optional). Must be imported manually your main sass file. (Ex: @import "node_modules/atasnalar-bootstrap/scss/scrollbar";)
and more...

JS Files:
- Added: New JS function for toggle switch theme mode (light/dark)
- Added: New JS function for Animation to Circular Progress Bar
- Modified: Removed Prefixes (bs-) from data attributes and (bs.) from script variables and functions to simplify the code. Ex: (data-bs-target -> data-target, data-bs-tooltip -> data-tooltip, data-bs-placement -> data-placement, shown.bs.tooltip -> shown.tooltip, etc.)

 == Credits ==

 * Bootstrap v5.3.0 (https://getbootstrap.com/)
 * Copyright 2011-2022 The Bootstrap Authors
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)

 == Documentation ==

 * Bootstrap - Default: https://getbootstrap.com/docs/
 * Atas Nalar - Bootstrap: Full Documentation: On the way... | Simple Documentation: https://github.com/awpdesigns/atasnalar-bootstrap/blob/master/Instructions.txt
