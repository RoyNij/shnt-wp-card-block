// .blockbook/index.js

// It's important to import the JS code that registers your block in the @wordpress/blocks package
import './src/index.js';

// You should also import the stylesheets (editor and style) of your blocks.
import './src/style.scss';
import './src/editor.scss';

// Once your blocks are loaded, make sure to tell BlockBook to add them to the menu.
import { registerBlockType } from 'blockbook-api';

registerBlockType( 'create-block/shnt-card-block' );