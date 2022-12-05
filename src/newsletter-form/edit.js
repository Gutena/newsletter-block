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

/**
 * Styles
 */
import './editor.scss';

const BLOCK_TEMPLATE = [
    [ 'gutena/newsletter-input-field' ],
    [ 'gutena/newsletter-submit-button' ]
]

export default function edit( { attributes, setAttributes } ) {
    const { 
        provider, 
        mailchimpApiKey, 
        mailchimpListID, 
        textSuccess, 
        textSubscribed, 
        textPosition, 
        displayType, 
        inputButtonGap 
    } = attributes;
    
	const blockProps = useBlockProps( {
        className: `gutena-newsletter-form-block message-${ textPosition }`,
        style: DynamicStyles( attributes )
    } );

    const innerBlocksProps = useInnerBlocksProps( {
        className: `gutena-newsletter-form ${ displayType }`
    }, {
        template: BLOCK_TEMPLATE,
        allowedBlocks: [ 'gutena/newsletter-input-field', 'gutena/newsletter-submit-button' ],
        __experimentalLayout: true,
        templateLock: "all"
    } );

    const helpText = (
        <a href="https://mailchimp.com/help/find-audience-id/" target="_blank">{ __( 'Find Audience ID', 'newsletter-block-gutena' ) }</a>
    )
	
	return (
		<>
			<InspectorControls key="settings">
                <PanelBody title={ __( 'Settings', 'newsletter-block-gutena' ) } initialOpen={ true }>
					<ToggleGroupControl label={ __( 'Display Type', 'newsletter-block-gutena' ) } value={ displayType } onChange={ ( value ) => setAttributes( { displayType: value } ) } isBlock>
                        <ToggleGroupControlOption value="row" label={ __( 'Side by Side', 'newsletter-block-gutena' ) } />
                        <ToggleGroupControlOption value="column" label={ __( 'Up and Down', 'newsletter-block-gutena' ) } />
                    </ToggleGroupControl>
                    <RangeControl
                        label={ __( 'Gap After Input (PX)', 'gutena-btns' ) }
                        value={ inputButtonGap }
                        onChange={ ( value ) => setAttributes( { inputButtonGap: value } ) }
                        min={ 0 }
                        max={ 50 }
                    />
                </PanelBody>
                <PanelBody title={ __( 'Platform', 'newsletter-block-gutena' ) } initialOpen={ true }>
                    <SelectControl
                        label={ __( 'Choose Platform', 'newsletter-block-gutena' ) }
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
                <PanelBody title={ __( 'Messages after Submit', 'newsletter-block-gutena' ) } initialOpen={ false }>
                    <ToggleGroupControl label={ __( 'Message Align', 'newsletter-block-gutena' ) } value={ textPosition } onChange={ ( value ) => setAttributes( { textPosition: value } ) } isBlock>
                        <ToggleGroupControlOption value="left" label={ __( 'Left', 'newsletter-block-gutena' ) } />
                        <ToggleGroupControlOption value="center" label={ __( 'Center', 'newsletter-block-gutena' ) } />
                        <ToggleGroupControlOption value="right" label={ __( 'Right', 'newsletter-block-gutena' ) } />
                    </ToggleGroupControl>
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