/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Import custom
 */
import DynamicStyles from './styles';

export default function save( { attributes } ) {
    const { displayType, stackOnMobile, textPosition } = attributes;

    const blockProps = useBlockProps.save( {
        className: `gutena-newsletter-form-block message-${ textPosition }`,
        style: DynamicStyles( attributes )
    } );

    const innerBlocksProps = useInnerBlocksProps.save( {
        className: classnames( `gutena-newsletter-form ${ displayType }`, {
            'stacked': stackOnMobile
        } )
    } );

    return (
        <div { ...blockProps }>
            <form { ...innerBlocksProps } />
        </div>
    );
}