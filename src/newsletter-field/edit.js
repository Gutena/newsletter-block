/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { 
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
    PanelBody, 
    TextControl, 
    RangeControl, 
    SelectControl 
} from '@wordpress/components';
import { 
    InspectorControls, 
    useBlockProps, 
    useInnerBlocksProps 
} from '@wordpress/block-editor';

/**
 * Import custom
 */
import DynamicStyles from './styles';

const BLOCK_TEMPLATE = [
    [ 'gutena/newsletter-input-field' ],
    [ 'gutena/newsletter-button-field' ]
]

export default function edit( { attributes, setAttributes } ) {
    const { provider, mailchimpApiKey, mailchimpListID, textSuccess, textSubscribed, displayType, inputButtonGap } = attributes;
    
	const blockProps = useBlockProps( {
        className: 'gutena-newsletter-field-block',
        style: DynamicStyles( attributes )
    } );

    const innerBlocksProps = useInnerBlocksProps( {
        className: `gutena-newsletter-form ${ displayType }`
    }, {
        template: BLOCK_TEMPLATE,
        allowedBlocks: [ 'gutena/newsletter-button-field', 'gutena/newsletter-button-field' ],
        __experimentalLayout: true,
        templateLock: "all"
    } );

    const helpText = (
        <a href="https://mailchimp.com/help/find-audience-id/" target="_blank">{ __( 'Find Audience ID', 'newsletter-block-gutena' ) }</a>
    )
	
	return (
		<>
			<InspectorControls key="settings">
                <PanelBody title={ __( 'Settings', 'gutena-tabs' ) } initialOpen={ true }>
					<ToggleGroupControl label={ __( 'Display Type', 'gutena-testimonial' ) } value={ displayType } onChange={ ( value ) => setAttributes( { displayType: value } ) } isBlock>
                        <ToggleGroupControlOption value="row" label={ __( 'Fluid', 'gutena-testimonial' ) } />
                        <ToggleGroupControlOption value="column" label={ __( 'Seperated', 'gutena-testimonial' ) } />
                    </ToggleGroupControl>
                    <RangeControl
                        label={ __( 'Gap between Input and Button (PX)', 'gutena-btns' ) }
                        value={ inputButtonGap }
                        onChange={ ( value ) => setAttributes( { inputButtonGap: value } ) }
                        min={ 1 }
                        max={ 50 }
                    />
                </PanelBody>
                <PanelBody title={ __( 'Provider', 'newsletter-block-gutena' ) } initialOpen={ true }>
                    <SelectControl
                        label={ __( 'Choose Provider', 'newsletter-block-gutena' ) }
                        value={ provider }
                        options={ [
                            { label: __( '-- Select --', 'newsletter-block-gutena' ), value: '' },
                            { label: __( 'Mailchimp', 'newsletter-block-gutena' ), value: 'mailchimp' },
                        ] }
                        onChange={ ( value ) => setAttributes( { provider: value } ) }
                    />
                    {
                        ( provider === 'mailchimp' ) &&
                        <>
                            <TextControl
                                label={ __( 'Mailchimp API Key', 'newsletter-block-gutena' ) }
                                value={ mailchimpApiKey }
                                onChange={ ( value ) => setAttributes( { mailchimpApiKey: value } ) }
                            />
                            <TextControl
                                label={ __( 'Mailchimp Audience ID', 'newsletter-block-gutena' ) }
                                value={ mailchimpListID }
                                onChange={ ( value ) => setAttributes( { mailchimpListID: value } ) }
                                help={ helpText} 
                            />
                        </>
                    }
                </PanelBody>
                <PanelBody title={ __( 'Messages', 'newsletter-block-gutena' ) } initialOpen={ true }>
                    <TextControl
                        label={ __( 'Success Message', 'newsletter-block-gutena' ) }
                        value={ textSuccess }
                        onChange={ ( value ) => setAttributes( { textSuccess: value } ) }
                    />
                    <TextControl
                        label={ __( 'Already Subscribed Message', 'newsletter-block-gutena' ) }
                        value={ textSubscribed }
                        onChange={ ( value ) => setAttributes( { textSubscribed: value } ) }
                    />
                </PanelBody>
            </InspectorControls>

			<div { ...blockProps }>
                <div { ...innerBlocksProps } />
			</div>
		</>
	);
}