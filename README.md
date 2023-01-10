# atasnalar-bootstrap

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
- Added: New Sass variables (circular progress bar, preloader, box shadow, etc.)
- Added: New Sass mixins (button, box shadow, text, background, etc.)
- Added: New Sass Utilities (box shadow, cursor, image width (.img-8 > .img-96, .img-128, .img-256, .img-512))
- Added: New Radio Box Style for input type radio
- Added: New Component (Circular Progress Bar)
- Added: New Component (Preloader)
- Added: New Component (Toggle Switch Theme Mode => Light/Dark)
- Added: New Component (Typing Text Animation) with support for multiple text,custom speed, variable color & theme color.
- Added: New Dropdown Toggle Icon (chevron as default, caret as alternative with class .toggle-caret)
- Added: New Divider with Text (Separator) with class .strike (Ex: <div class="strike"><span>Text</span></div>)
- Added: Icon support for input, textarea, select.
- Added: Style for broken image callback
- Added: Icon only button
- Added: Style for placeholder, selection, and link with failed url (no http in url)
- Added: New class .pre-blocks for styling pre tag based on theme mode (light/dark)
- Added: New class for transition (Ex: .pull, .push, .hover-up, .hover-down)
- Added: Scrollbar style for webkit browser (Optional). Must be imported manually your main sass file. (Ex: @import "node_modules/atasnalar-bootstrap/scss/scrollbar";)
and more...

JS Files:
- Added: Animation to Circular Progress Bar
- Removed Prefixes (bs-) from data attributes and (bs.) from script variables and functions to simplify the code. Ex: (data-bs-target -> data-target, data-bs-tooltip -> data-tooltip, data-bs-placement -> data-placement, shown.bs.tooltip -> shown.tooltip, etc.)

 == Credits ==
 * Bootstrap v5.3.0 (https://getbootstrap.com/)
 * Copyright 2011-2022 The Bootstrap Authors
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)

 == Documentation ==
 * Bootstrap - Default: https://getbootstrap.com/docs/
 * Atas Nalar - Bootstrap: On the way...
