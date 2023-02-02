/**
 * Custom dependencies
 */
import FilterStyles from '../utils/filter';

export default function DynamicStyles( attributes ) {
	const { inputButtonGap } = attributes

	const styleProps = FilterStyles( {
        '--gutena--newsletter-input-button-gap': inputButtonGap + 'px',
    } )

	return styleProps
}