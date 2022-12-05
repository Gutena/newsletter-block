/**
 * External dependencies
 */
import { includes, pickBy } from 'lodash';

export default function FilterStyles( styles ) {
	const styleProps = pickBy( styles, value => typeof value !== 'undefined' && '' !== value && 'NaN' !== value && 'none' !== value && 'px' !== value && ! includes( value, 'undefined' ) )

	return styleProps
}