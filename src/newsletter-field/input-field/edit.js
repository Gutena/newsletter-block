/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { 
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
    PanelBody, 
    RangeControl
} from '@wordpress/components';
import { 
    InspectorControls, 
    useBlockProps 
} from '@wordpress/block-editor';

/**
 * Import custom
 */
import DynamicStyles from './styles';

export default function edit( { attributes, setAttributes } ) {
    const { inputMaxWidth, inputAlign } = attributes;

	const blockProps = useBlockProps( {
        className: 'gutena-newsletter-field-input-block',
        style: DynamicStyles( attributes )
    } );

	return (
        <>
            <InspectorControls>
				<PanelBody title={ __( 'Settings', 'gutena-btns' ) } initialOpen={ true }>
                    <ToggleGroupControl 
                        label={ __( 'Input Align', 'gutena-testimonial' ) } 
                        value={ inputAlign } 
                        onChange={ ( value ) => setAttributes( { inputAlign: value } ) } 
                        isBlock
                    >
                        <ToggleGroupControlOption value="left" label={ __( 'Left', 'gutena-testimonial' ) } />
                        <ToggleGroupControlOption value="center" label={ __( 'Center', 'gutena-testimonial' ) } />
                        <ToggleGroupControlOption value="right" label={ __( 'Right', 'gutena-testimonial' ) } />
                    </ToggleGroupControl>
                    <RangeControl
                        label={ __( 'Max Width (PX)', 'gutena-btns' ) }
                        value={ inputMaxWidth }
                        onChange={ ( value ) => setAttributes( { inputMaxWidth: value } ) }
                        min={ 2 }
                        max={ 800 }
                        allowReset={ true }
                    />
                </PanelBody>
            </InspectorControls>

            <div { ...blockProps }>
                <input type="email" id="gutena-newsletter-field" className={ `gutena-newsletter-field ${ inputAlign }` } placeholder="name@email.com" />
            </div>
        </>
	);
}