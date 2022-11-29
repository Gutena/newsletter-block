/**
 * External dependencies
 */
import { includes, pickBy } from 'lodash';

export default function DynamicStyles( attributes ) {
	const { inputMaxWidth } = attributes

	const styleProps = pickBy( {
        '--gutena--newsletter-input-max-width': inputMaxWidth + 'px',
        }, value => typeof value !== 'undefined' && '' !== value && 'NaN' !== value && 'none' !== value && 'px' !== value && ! includes( value, 'undefined' )
    )

	return styleProps
}