/**
 * WordPress dependencies
 */
import { Icon } from '@wordpress/components';
import { RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * Import custom
 */
import parseIcon from '../../utils/parse-icon';
import { flattenIconsArray } from '../../utils/icon-functions';
import getIcons from '../../icons';
import DynamicStyles from './styles';

export default function save( { attributes } ) {
    const { btnText, btnPosition, btnType, btnIcon, btnIconPosition, btnIconSize } = attributes;

    const iconsAll = flattenIconsArray( getIcons() );
    const iconsObj = iconsAll.reduce( ( acc, value ) => {
        acc[ value?.name ] = value?.icon
        return acc
    }, {} )

    const renderSVG = ( svg, size ) => {
        let renderedIcon = iconsObj?.[ svg ];
        // Icons provided by third-parties are generally strings.
        if ( typeof renderedIcon === 'string' ) {
            renderedIcon = parseIcon( renderedIcon );
        }

        return <Icon icon={ renderedIcon } size={ size } />;
    }

    const blockProps = useBlockProps.save( {
        className: `gutena-newsletter-field-button-block ${ btnPosition }`,
        style: DynamicStyles( attributes )
    } );

    return (
        <div { ...blockProps }>
            <button type="submit" id="gutena-newsletter-action" className={ `gutena-newsletter-action icon-${ btnIconPosition } with-${ btnType }` }>
                {
                    btnType !== 'text' && btnIcon && (
                        <span className="gutena-newsletter-button-icon">
                            { renderSVG( btnIcon, btnIconSize ) }
                        </span>
                    )
                }
                {
					btnType !== 'icon' && (
                        <span className="gutena-newsletter-button-text">
                            <RichText.Content
                                tagName="span"
                                value={ btnText }
                            />
                        </span>
                    )
                }
            </button>
        </div>
	);
}