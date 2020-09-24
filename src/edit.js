/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { 
	InnerBlocks, 
	MediaUpload,
	MediaUploadCheck,
	BlockControls,
	PanelColorSettings,
	InspectorControls,
	URLInputButton,
	BlockAlignmentToolbar
} from '@wordpress/block-editor';
import {
	Button,
	Dashicon,
	PanelBody,
	PanelRow,
	SelectControl,
	RangeControl,
} from '@wordpress/components';
import {
	Fragment,
} from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object} [props]           Properties passed from the editor.
 * @param {string} [props.className] Class name generated for the block.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { className, attributes, setAttributes } ) {
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

	const TEXT_TEMPLATE = [
		[
			'core/heading', {placeholder: 'Card Title', level: 3}
		],
		[
			'core/paragraph', {placeholder: 'Et doloremque possimus dolores. Ea ipsa laudantium ipsam exercitationem.'}
		],
	]

	const handleStyleChange = function( value ){
		if( value === "fullwidth" ){
			setAttributes(
				{
					displayStyle: value,
					alignment: undefined
				}
			)
		} else{
			setAttributes(
				{
					displayStyle: value
				}
			)
		}
	}

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title="Card Layout">
					<PanelRow>
						<SelectControl
							label={ __("Select the card style") }
							value={ attributes.displayStyle }
							options={
								[
									{
										value: "card",
										label: __( "Card" )
									},
									{
										value: "fullwidth",
										label: __( "Full Width Horizontal" )
									}

								]
							}
							onChange={ handleStyleChange }
						/>
					</PanelRow>
					<PanelRow>
						<RangeControl
							label={ __("Border Radius") }
							value={ attributes.borderRadius }
							onChange={ ( borderRadius ) => setAttributes( { borderRadius } ) }
							min={ 0 }
							max={ 100 }
							step={ 5 } 
							allowReset={ true }
							initialPosition={ 0 }
						/>
					</PanelRow>
				</PanelBody>
				
				<PanelColorSettings
					title={ __( "Color Settings" )}
					colorSettings={ [
						{
							value: attributes.textColor,
							onChange: ( textColor ) => setAttributes( { textColor } ),
							label: __( "Text color"),
						},
						{
							value: attributes.cardColor,
							onChange: ( cardColor ) => setAttributes( { cardColor } ),
							label: __( "Background color"),
						},
					] }
				/>
			</InspectorControls>
			
			<BlockControls>
				<URLInputButton 
					url={ attributes.link } 
					onChange={ link => setAttributes( { link } ) } 
				/>

				{attributes.displayStyle !== 'fullwidth' &&
					<BlockAlignmentToolbar 
						onChange={ alignment => setAttributes( { alignment } ) } 
						value={ attributes.alignment } 
						alignWide={ false }	
					/>
				}
			</BlockControls>

			<div className={ containerClass.join( ' ' ) } style={ containerStyle }>
				<div class="shnt-card-block__image-container" style={ imageStyle }>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( image ) => {
								setAttributes( { image }) 
							} }
							value={ attributes.image ? attributes.image.ID : undefined}
							render={
								( { open } ) => {
									if( !attributes.image ){
										return (
											<Button onClick={ open } >
												<Dashicon icon='format-image' />
											</Button>
										)
									} else {
										return (
											<Button onClick={ () => setAttributes( { image: undefined } ) } >
												<Dashicon icon='no' />
											</Button>
										)
									}
								}
							}
						/>
					</MediaUploadCheck>
				</div>
				<div class="shnt-card-block__content-container" style={ contentStyle }>
					<InnerBlocks template={TEXT_TEMPLATE} templateLock="all" />

					{ attributes.link !== undefined &&
						<a href={ attributes.link } class="see-more-link">
							{ __( "See More" ) }
						</a>
					}
				</div>
			</div>
		</Fragment>
	);
}
