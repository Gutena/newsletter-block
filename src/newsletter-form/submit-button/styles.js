/**
 * Custom dependencies
 */
import FilterStyles from '../../utils/filter';

export default function DynamicStyles( attributes ) {
	const { btnMaxWidth, btnIconSpacing, btnIconColor } = attributes

	const styleProps = FilterStyles( {
        '--gutena--newsletter-button-icon-spacing': btnIconSpacing + 'px',
        '--gutena--newsletter-button-icon-color': btnIconColor,
        '--gutena--newsletter-button-width': btnMaxWidth + 'px',
    } );

	return styleProps
}