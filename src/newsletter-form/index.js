/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Child block
 */
import './input-field/index'
import './submit-button/index'

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

/**
 * External dependencies
 */
import { omit } from 'lodash';

/**
 * Import custom
 */
import DynamicStyles from './styles';

/**
 * Styles
 */
import './style.scss';

/**
 * Register Block
 */
registerBlockType( metadata, {
	edit,
	save,
	icon: (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g clipPath="url(#clip0_1017_47)">
				<path d="M22 14H20V7.238L12.072 14.338L4 7.216V19H14V21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V14ZM4.511 5L12.061 11.662L19.502 5H4.511ZM19 22L15.464 18.464L16.879 17.05L19 19.172L22.536 15.636L23.95 17.05L19 22Z" fill="#0EA489"/>
			</g>
			<defs>
				<clipPath id="clip0_1017_47">
					<rect width="24" height="24" fill="white"/>
				</clipPath>
			</defs>
		</svg>
	),
	deprecated: [
		{
			attributes: omit( metadata?.attributes, [ 'stackOnMobile' ] ),
			save: ( { attributes } ) => {
				const { displayType, textPosition } = attributes;

				const blockProps = useBlockProps.save( {
					className: `gutena-newsletter-form-block message-${ textPosition }`,
					style: DynamicStyles( attributes )
				} );

				const innerBlocksProps = useInnerBlocksProps.save( {
					className: `gutena-newsletter-form ${ displayType }`
				} );

				return (
					<div { ...blockProps }>
						<form { ...innerBlocksProps } />
					</div>
				);
			},
		}
	]
} );