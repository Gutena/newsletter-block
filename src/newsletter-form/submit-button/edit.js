/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
    Icon,
    PanelBody, 
    BaseControl,
    ColorPalette,
    RangeControl, 
    SelectControl,
    ToolbarGroup,
    ToolbarButton
} from '@wordpress/components';
import { 
    RichText,
    BlockControls,
    InspectorControls, 
    useBlockProps 
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import InserterModal from '../../components/IconControl/inserter';
import IconControl from '../../components/IconControl/IconControl';
import parseIcon from '../../utils/parse-icon';
import { flattenIconsArray } from '../../utils/icon-functions';
import getIcons from '../../icons';
import DynamicStyles from './styles';

export default function edit( { attributes, context, setAttributes } ) {
    const { btnText, btnMaxWidth, btnPosition, btnType, btnIcon, btnIconPosition, btnIconSize, btnIconColor, btnIconSpacing } = attributes;
    const displayType = context?.gutenaNewsletterDisplayType;
    const stackOnMobile = context?.gutenaNewsletterStackOnMobile;

    const [ isInserterOpen, setInserterOpen ] = useState( false );

    const isStackedLayout = ( displayType === 'column' || ( displayType === 'row' && stackOnMobile ) )
    const iconsAll = flattenIconsArray( getIcons() );
    const iconsObj = iconsAll.reduce( ( acc, value ) => {
        acc[ value?.name ] = value?.icon
        return acc
    }, {} );

    const renderSVG = ( svg, size ) => {
        let renderedIcon = iconsObj?.[ svg ];
        // Icons provided by third-parties are generally strings.
        if ( typeof renderedIcon === 'string' ) {
            renderedIcon = parseIcon( renderedIcon );
        }

        return <Icon icon={ renderedIcon } size={ size } />;
    }

    const blockProps = useBlockProps( {
        className: `gutena-newsletter-submit-button-block ${ btnPosition }`,
        style: DynamicStyles( attributes )
    } );

	return (
        <>
            { btnIcon &&
                <BlockControls>
                    <ToolbarGroup>
                        <ToolbarButton
                            icon={ renderSVG( btnIcon ) }
                            label={ __( 'Edit Icon', 'gutena-tabs' ) }
                            onClick={ () => setInserterOpen( true ) }
                        />
                    </ToolbarGroup>
                </BlockControls>
            }

			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'newsletter-block-gutena' ) } initialOpen={ true }>
                    {
                        isStackedLayout && (
                            <ToggleGroupControl label={ ( displayType === 'row' && stackOnMobile ) ? __( 'Button Position (Mobile)', 'newsletter-block-gutena' ) : __( 'Button Position', 'newsletter-block-gutena' ) } value={ btnPosition } onChange={ ( value ) => setAttributes( { btnPosition: value } ) } isBlock>
                                <ToggleGroupControlOption value="left" label={ __( 'Left', 'newsletter-block-gutena' ) } />
                                <ToggleGroupControlOption value="center" label={ __( 'Center', 'newsletter-block-gutena' ) } />
                                <ToggleGroupControlOption value="right" label={ __( 'Right', 'newsletter-block-gutena' ) } />
                                <ToggleGroupControlOption value="auto" label={ __( 'Fluid', 'newsletter-block-gutena' ) } />
                            </ToggleGroupControl>
                        )
                    }
                    {
                        isStackedLayout && btnPosition !== 'auto' && (
                            <RangeControl
                                label={ __( 'Max Width (px)', 'newsletter-block-gutena' ) }
                                value={ btnMaxWidth }
                                onChange={ ( value ) => setAttributes( { btnMaxWidth: value } ) }
                                min={ 5 }
                                max={ 600 }
                                allowReset={ true }
                            />
                        )
                    }
                    <SelectControl
                        label={ __( 'Button Type', 'newsletter-block-gutena' ) }
                        value={ btnType }
                        options={ [
                            { label: 'Only Text', value: 'text' },
                            { label: 'Only Icon', value: 'icon' },
                            { label: 'Text and Icon', value: 'text-icon' },
                        ] }
                        onChange={ ( value ) => setAttributes( { btnType: value } ) }
                    />
                    {
						btnType !== 'text' && (
                            <IconControl 
                                label="select icon" 
                                activeIcon={ btnIcon } 
                                value={ btnIcon } 
                                onChange={ ( value ) => setAttributes( { btnIcon: value?.iconName } ) }
                                onClear={ () => setAttributes( { btnIcon: '' } ) }
                            />
                        )
                    }
					{
						btnType !== 'text' && btnIcon && (
                            <>
                                <RangeControl
                                    label={ __( 'Icon Size (PX)', 'newsletter-block-gutena' ) }
                                    value={ btnIconSize }
                                    onChange={ ( value ) => setAttributes( { btnIconSize: value } ) }
                                    min={ 2 }
                                    max={ 100 }
                                />
                                <BaseControl label={ __( 'Icon Color', 'newsletter-block-gutena' ) } marginBottom={ 5 }>
                                    <ColorPalette
                                        colors={ [] }
                                        value={ btnIconColor }
                                        onChange={ ( color ) => setAttributes( { btnIconColor: color } ) }
                                    />
                                </BaseControl>
                            </>
						)
					}
                    {
						btnType === 'text-icon' && btnIcon && (
                            <>
                                <ToggleGroupControl label={ __( 'Icon Position', 'newsletter-block-gutena' ) } value={ btnIconPosition } onChange={ ( value ) => setAttributes( { btnIconPosition: value } ) } isBlock>
                                    <ToggleGroupControlOption value="left" label={ __( 'Left', 'newsletter-block-gutena' ) } />
                                    <ToggleGroupControlOption value="right" label={ __( 'Right', 'newsletter-block-gutena' ) } />
                                </ToggleGroupControl>
                                <RangeControl
                                    label={ __( 'Gap between Icon and Title (px)', 'newsletter-block-gutena' ) }
                                    value={ btnIconSpacing }
                                    onChange={ ( value ) => setAttributes( { btnIconSpacing: value } ) }
                                    min={ 1 }
                                    max={ 100 }
                                />
                            </>
						)
					}
				</PanelBody>
			</InspectorControls>

            <InserterModal
                isInserterOpen={ isInserterOpen }
                setInserterOpen={ setInserterOpen }
                value={ btnIcon }
                onChange={ ( value ) => setAttributes( { btnIcon: value?.iconName } ) } 
            />

            <div { ...blockProps }>
                <button type="submit" id="gutena-newsletter-action" className={ `gutena-newsletter-action icon-${ btnIconPosition } with-${ btnType }` } aria-label="Submit Buton">
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
                                <RichText
                                    tagName="span"
                                    placeholder={ __( 'Enter text...', 'newsletter-block-gutena' ) }
                                    value={ btnText }
                                    onChange={ value => setAttributes( { btnText: value } ) }
                                />
                            </span>
                        )
                    }
                </button>
            </div>
        </>
	);
}