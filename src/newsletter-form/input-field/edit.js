/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { 
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
    PanelBody, 
    TextControl,
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
    const { inputMaxWidth, inputAlign, inputPlaceholder } = attributes;

	const blockProps = useBlockProps( {
        className: 'gutena-newsletter-form-input-block',
        style: DynamicStyles( attributes )
    } );

	return (
        <>
            <InspectorControls>
				<PanelBody title={ __( 'Settings', 'newsletter-block-gutena' ) } initialOpen={ true }>
                    <ToggleGroupControl 
                        label={ __( 'Input Text Align', 'newsletter-block-gutena' ) } 
                        value={ inputAlign } 
                        onChange={ ( value ) => setAttributes( { inputAlign: value } ) } 
                        isBlock
                    >
                        <ToggleGroupControlOption value="left" label={ __( 'Left', 'newsletter-block-gutena' ) } />
                        <ToggleGroupControlOption value="center" label={ __( 'Center', 'newsletter-block-gutena' ) } />
                        <ToggleGroupControlOption value="right" label={ __( 'Right', 'newsletter-block-gutena' ) } />
                    </ToggleGroupControl>
                    <TextControl
                        label={ __( 'Input Placeholder', 'newsletter-block-gutena' ) } 
                        value={ inputPlaceholder }
                        onChange={ ( value ) => setAttributes( { inputPlaceholder: value } ) }
                    />
                    <RangeControl
                        label={ __( 'Max Width (PX)', 'newsletter-block-gutena' ) }
                        value={ inputMaxWidth }
                        onChange={ ( value ) => setAttributes( { inputMaxWidth: value } ) }
                        min={ 2 }
                        max={ 800 }
                        allowReset={ true }
                    />
                </PanelBody>
            </InspectorControls>

            <div { ...blockProps }>
                <input type="email" id="gutena-newsletter-field" className={ `gutena-newsletter-field ${ inputAlign }` } placeholder={ inputPlaceholder } aria-label="Input Field" />
            </div>
        </>
	);
}