/**
 * Custom dependencies
 */
import FilterStyles from '../../utils/filter';

export default function DynamicStyles( attributes ) {
	const { inputMaxWidth } = attributes

	const styleProps = FilterStyles( {
        '--gutena--newsletter-input-max-width': inputMaxWidth + 'px',
    } )

	return styleProps
}