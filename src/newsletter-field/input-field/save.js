/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Import custom
 */
import DynamicStyles from './styles';

export default function save( { attributes } ) {
    const { inputAlign } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'gutena-newsletter-field-input-block',
        style: DynamicStyles( attributes )
    } );

    return (
        <div { ...blockProps }>
            <input type="email" id="gutena-newsletter-field" className={ `gutena-newsletter-field ${ inputAlign }` } placeholder="name@email.com" />
        </div>
	);
}