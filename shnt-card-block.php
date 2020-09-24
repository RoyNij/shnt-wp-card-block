<?php
/**
 * Plugin Name:     Show 'n Tell - Generic Card Block
 * Description:     Block plugin to quickly create generic cards with as little prestyled elements as possible
 * Version:         0.1.0
 * Author:          Roy Nijhof
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     shnt-card-block
 *
 * @package         create-block
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function create_block_shnt_card_block_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "create-block/shnt-card-block" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'create-block-shnt-card-block-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'create-block-shnt-card-block-block-editor', 'shnt-card-block' );

	$editor_css = 'build/index.css';
	wp_register_style(
		'create-block-shnt-card-block-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'create-block-shnt-card-block-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'create-block/shnt-card-block', array(
		'editor_script' => 'create-block-shnt-card-block-block-editor',
		'editor_style'  => 'create-block-shnt-card-block-block-editor',
		'style'         => 'create-block-shnt-card-block-block',
	) );
}
add_action( 'init', 'create_block_shnt_card_block_block_init' );
