/**
 * BLOCK: lorim-ipsm
 *
 * simple block for giveing paragraphs of lorim ipsm generated randomly
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n

var el = wp.element.createElement,
    registerBlockType = wp.blocks.registerBlockType,
    TextControl = wp.components.TextControl;

/*
 * Seeded random function, will always give the same number from the seed.
 * Seed MUST increase in order to get the next "random" number
 */
function seededRandom(s) {
    return function() {
        s = Math.sin(s) * 10000; return s - Math.floor(s);
    };
};

registerBlockType( 'cgb/block-lorim-ipsm', {
	title: __( 'lorim-ipsm' ), // Block title.
	icon: 'text', 
	category: 'common', 
	keywords: [
		__( 'placeholder text' ),
		__( 'lorim ipsm block' ),
		__( 'utility block' ),
	],

	/**
	 * This display's the editor options
	 * Each one has its own class with its style set to none for the front end
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	attributes: {
		paragraphs: {
			type: 'string',
			default: 1,
			source: 'html',
        	selector: '.paragraphs',
		},
		wordsPersentence: {
			type: 'string',
			default: 24,
			source: 'html',
        	selector: '.wordsPersentence',
		},
		sentencesPerParagraph: {
			type: 'string',
			default: 5,
			source: 'html',
        	selector: '.sentencesPerParagraph',
		},
		randomSeed: {
			type: 'string',
			default: 627,
			source: 'html',
        	selector: '.randomSeed',
		},
	},
	edit: ( props ) => {
		const { attributes, setAttributes } = props;
		return (
			el( 'div', { className: props.className },
				el( TextControl, {
					label: 'How many paragraphs of lorem ipsum? ',
					value: props.attributes.paragraphs,
					onChange: ( value ) => {
						setAttributes( { paragraphs: value } );
					}
				}),
				el( TextControl, {
					label: 'Max words per sentence?',
					value: props.attributes.wordsPersentence,
					onChange: ( value ) => {
						setAttributes( { wordsPersentence: value } );
					}
				}),
				el( TextControl, {
					label: 'Max sentences per paragraph?',
					value: props.attributes.sentencesPerParagraph,
					onChange: ( value ) => {
						setAttributes( { sentencesPerParagraph: value } );
					}
				}),
				el( TextControl, {
					label: 'Seed for random ipsm generation?',
					value: props.attributes.randomSeed,
					onChange: ( value ) => {
						setAttributes( { randomSeed: value } );
					}
				})
			)
		);
	},

	/**
	 * Takes the arguments from the editor and outputs them as hidden item's
	 * Then generates pusdo random lorim ipsm and outputs it for the front end
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		let ipsm = []
		let ipsmText = [
			'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 
			'elit', 'donec', 'nec', 'nulla', 'vitae', 'lacus', 'mattis', 'volutpat', 
			'eu', 'at', 'sapien', 'nunc', 'interdum', 'congue', 'libero', 'quis', 
			'laoreet', 'elit', ',', 'sagittis', 'ut', 'pellentesque', 'lacus', 'erat',
			 'dictum', 'condimentum', 'pharetra', 'vel', 'malesuada', 'volutpat', 
			 'risus', 'nunc', 'sit', 'amet', 'risus', 'dolor', 'etiam', 'posuere', 
			 'tellus', 'nisl', 'Integer', 'lorem', 'ligula', 'tempor', 'eu', 'laoreet', 
			 'ac', 'eleifend', 'quis', 'diam', 'proin', 'cursus', 'nibh', 'eu', 
			 'vehicula', 'varius', 'lacus', 'elit', ',', 'eleifend', 'elit', 'eget', 
			 'commodo', 'ante', 'felis', 'at', 'neque', 'integer', 'sit', 'amet', 
			 'justo', 'sed', 'elit', 'porta', 'convallis', 'a', 'at', 'metus', 
			 'suspendisse', 'molestie', 'turpis', 'pulvinar', 'nisl', 'tincidunt', 
			 'quis', 'fringilla', 'enim', 'lobortis', 'curabitur', 'placerat', 'quam', 
			 'ac', 'sem', 'venenatis', 'blandit', 'Pellentesque', 'habitant', 'morbi', 
			 'tristique', 'senectus', 'et', 'netus', 'et', 'malesuada', 'fames', 'ac', 
			 'turpis', 'egestas', 'nullam', 'sed', 'ligula', 'nisl', 'nam', 'ullamcorper', 
			 'elit', 'id', 'magna', 'hendrerit', 'sit', 'amet', 'dignissim', 'elit', 
			 'sodales', 'aenean', 'accumsan', 'consectetur', 'rutrum', ','
		]
        let paragraphs = props.attributes.paragraphs

		let seed = 627;

		if (!isNaN(props.attributes.randomSeed)) {
			seed = Number(props.attributes.randomSeed)
		}

        let wordsPersentence = props.attributes.wordsPersentence
        let wordsVarance = Math.floor((seededRandom(seed)() * wordsPersentence)) + Math.floor(wordsPersentence / 2)
        
		seed += 1;

        let sentencesPerParagraph = props.attributes.sentencesPerParagraph
        let sentenceVarance = Math.floor((seededRandom(seed)() * sentencesPerParagraph)) + Math.floor(sentencesPerParagraph / 2)

        if (!isNaN(paragraphs)) {
			for (var i = 1; i <= Number(paragraphs); i++) {
				let sentence = '';
				for (var k = 1; k <= Number(sentencesPerParagraph); k++) {
					for (var j = 1; j <= wordsVarance; j++) {
						seed += 37;
						sentence += ipsmText[Math.floor((seededRandom(seed)() * wordsPersentence) + 1)]
						sentence += ' '
					}
	        		sentence = sentence.trim() + '. '
	        		wordsVarance = Math.floor((seededRandom(seed)() * wordsPersentence)) + Math.floor(wordsPersentence / 2)
				}
				ipsm.push(el( 'p', {}, sentence ))
			}
        }
		const { attributes } = props;
		return el('div', {},
				el( 'p', {className: 'paragraphs'}, attributes.paragraphs ), 
				el( 'p', {className: 'wordsPersentence'}, attributes.wordsPersentence ), 
				el( 'p', {className: 'sentencesPerParagraph'}, attributes.sentencesPerParagraph ),
				el( 'p', {className: 'randomSeed'}, attributes.randomSeed ),
				ipsm
		)  
		},
	} );
