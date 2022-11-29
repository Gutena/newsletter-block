/**
 * External dependencies
 */
import { includes, pickBy } from 'lodash';

export default function DynamicStyles( attributes ) {
	const { btnMaxWidth, btnIconSpacing, btnIconColor } = attributes

	const styleProps = pickBy( {
        '--gutena--newsletter-icon-spacing': btnIconSpacing + 'px',
        '--gutena--newsletter-icon-color': btnIconColor,
        '--gutena--newsletter-button-width': btnMaxWidth + 'px',
        }, value => typeof value !== 'undefined' && '' !== value && 'NaN' !== value && 'none' !== value && 'px' !== value && ! includes( value, 'undefined' )
    )

	return styleProps
}