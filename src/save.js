/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { className, attributes } ) {
	const containerClass = [
		className, 
		"shnt-card-block", 
		attributes.displayStyle ? attributes.displayStyle : "card",
		attributes.alignment ? ("align-" + attributes.alignment) : ""
	];

	const containerStyle = {
		borderRadius: attributes.borderRadius > 0 ? attributes.borderRadius + 'px' : 0
	}

	const imageStyle = {
		backgroundImage: attributes.image ? 'url(' + attributes.image.url + ')' : ''
	}

	const contentStyle = {
		color: attributes.textColor || "#404040",
		backgroundColor: attributes.cardColor || "#FAFAFA",
	}

	return (
		<div className={ containerClass.join( ' ' ) } style={ containerStyle }>
			<div class="shnt-card-block__image-container" style={ imageStyle }>
			</div>
			<div class="shnt-card-block__content-container" style={ contentStyle }>
				<InnerBlocks.Content />

				{ attributes.link !== undefined &&
					<a href={ attributes.link } class="see-more-link">
						{ __( "See More" ) }
					</a>
				}
			</div>
		</div>
	);
}
