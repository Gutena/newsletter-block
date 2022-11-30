/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Import custom
 */
import DynamicStyles from './styles';

export default function save( { attributes } ) {
    const { displayType, textPosition } = attributes;

    const blockProps = useBlockProps.save( {
        className: `gutena-newsletter-field-block message-${ textPosition }`,
        style: DynamicStyles( attributes )
    } );

    const { children, ...innerBlocksProps } = useInnerBlocksProps.save( {
        className: `gutena-newsletter-form ${ displayType }`
    } );

    return (
        <div { ...blockProps }>
            <form { ...innerBlocksProps }>
                { children }
                [GUTENA_NEWSLETTER_DATA]
            </form>
        </div>
    );
}