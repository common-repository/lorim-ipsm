/**
 * BLOCK: lorim-picture-ipsm
 *
 * Outputs a place holder image from the imputs on the editor
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n

var el = wp.element.createElement,
    registerBlockType = wp.blocks.registerBlockType,
    TextControl = wp.components.TextControl;

registerBlockType( 'cgb/block-lorim-picture-ipsm', {
	
	title: __( 'lorim-picture-ipsm' ), 
	icon: 'format-image', 
	category: 'common', 
	keywords: [
		__( 'placeholder image' ),
		__( 'lorim ipsm image' ),
		__( 'utility block' ),
	],

	/**
	 * Editor inputs for getting width and height of place holder image
	 * 
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	attributes: {
		pictureWidth: {
			type: 'string',
			default: 80,
			source: 'html',
        	selector: '.pictureWidth',
		},
		pictureHeight: {
			type: 'string',
			default: 80,
			source: 'html',
        	selector: '.pictureHeight',
		},
	},
	edit: ( props ) => {
		const { attributes, setAttributes } = props;
		return (
			el( 'div', { className: props.className },
				el( TextControl, {
					label: 'Picture Width?',
					value: props.attributes.pictureWidth,
					onChange: ( value ) => {
						setAttributes( { pictureWidth: value } );
					}
				}),
				el( TextControl, {
					label: 'Picture Height?',
					value: props.attributes.pictureHeight,
					onChange: ( value ) => {
						setAttributes( { pictureHeight: value } );
					}
				})
			)
		);
	},

	/**
	 * return hidden values for editor options
	 * returns an image, with the width and height from the editor, form picsum.photos
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {

		const { attributes } = props;
		return el('div', {},
				el( 'p', {className: 'pictureWidth'}, attributes.pictureWidth ), 
				el( 'p', {className: 'pictureHeight'}, attributes.pictureHeight ), 
				el( 'img', {src: "https://picsum.photos/" + attributes.pictureWidth + '/' + attributes.pictureHeight}), 
		)  
		},
	} );
