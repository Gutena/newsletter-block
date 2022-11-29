/**
 * External dependencies
 */
import { includes, pickBy } from 'lodash';

export default function DynamicStyles( attributes ) {
	const { inputButtonGap } = attributes

	const styleProps = pickBy( {
        '--gutena--newsletter-input-button-gap': inputButtonGap + 'px',
        }, value => typeof value !== 'undefined' && '' !== value && 'NaN' !== value && 'none' !== value && 'px' !== value && ! includes( value, 'undefined' )
    )

	return styleProps
}