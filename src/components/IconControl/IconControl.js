/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { edit } from '@wordpress/icons';
import { useState } from '@wordpress/element';
import {  
    __experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
    __experimentalUseGradient,
} from "@wordpress/block-editor";
import { 
    Icon,
    PanelBody, 
    BaseControl
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import InserterModal from './inserter';
import getIcons from '../../icons';
import parseIcon from '../../utils/parse-icon';
import { flattenIconsArray } from '../../utils/icon-functions';

/**
 * Control styles
 */
import './editor.scss'

const noop = () => {};

const IconControl = ( {
    label = __( 'Select Icon', 'newsletter-block-gutena' ),
    value = '',
    onChange= noop,
    onClear = noop,
    withPanel = false
} ) => {

    const [ isInserterOpen, setInserterOpen ] = useState( false );

    const iconsAll = flattenIconsArray( getIcons() );
	const namedIcon = iconsAll.filter( ( i ) => i.name === value );
	let printedIcon = ! isEmpty( namedIcon ) ? namedIcon[ 0 ].icon : '';

	// Icons provided by third-parties are generally strings.
	if ( typeof printedIcon === 'string' ) {
		printedIcon = parseIcon( printedIcon );
	}

    const controls = (
        <BaseControl label={ label } __nextHasNoMarginBottom={ true }>
            <div className="gutena-newsletter-icon-picker">
                <div className="icon-picker">
                    <div className="icon-picker__current">
                        {
                            ! isEmpty( printedIcon )
                            ? <span className="icon-picker__icon">
                                <span className="icon-picker__elm">
                                    <Icon icon={ printedIcon } />
                                </span>
                                <span className="icon-picker__del" role="button" onClick={ onClear }>×</span>
                            </span>
                            : <span className="icon-picker__icon--empty">Select</span>
                        }
                    </div>
                    <div className="icon-picker__button" onClick={ () => setInserterOpen( true ) }>
                        <Icon icon={ edit } />
                    </div>
                </div>
            </div>
            <InserterModal
				isInserterOpen={ isInserterOpen }
				setInserterOpen={ setInserterOpen }
                value={ value }
                onChange={ onChange }
			/>
        </BaseControl>
    );

    if ( withPanel ) {
        return (
            <PanelBody title={ label } initialOpen={ false }>
                { controls }
            </PanelBody>
        );
    }

    return controls;
};

export default IconControl;