/**
 * Custom dependencies
 */
import FilterStyles from '../utils/filter';

export default function DynamicStyles( attributes ) {
	const { inputButtonGap, errorMessageColor, successMessageColor } = attributes

	const styleProps = FilterStyles( {
        '--gutena--newsletter-input-button-gap': inputButtonGap + 'px',
		'--gutena--newsletter-error-message-color': errorMessageColor,
		'--gutena--newsletter-success-message-color': successMessageColor
    } )

	return styleProps
}