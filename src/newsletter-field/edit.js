import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';
import { InspectorControls, PanelColorSettings, useBlockProps } from '@wordpress/block-editor';

export default function edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
        className: 'gutena-newsletter-field-block',
    } );

    const helpText = (
        <a href="https://mailchimp.com/help/find-audience-id/" target="_blank">{ __( 'Find Audience ID', 'newsletter-block-gutena' ) }</a>
    )
	
	return (
		<>
			<InspectorControls key="settings">
                <PanelBody title={ __( 'Provider', 'newsletter-block-gutena' ) }>
                    <SelectControl
                        label={ __( 'Choose Provider', 'newsletter-block-gutena' ) }
                        value={ attributes.provider }
                        options={ [
                            { label: __( '-- Select --', 'newsletter-block-gutena' ), value: '' },
                            { label: __( 'Mailchimp', 'newsletter-block-gutena' ), value: 'mailchimp' },
                        ] }
                        onChange={ ( value ) => setAttributes( { provider: value } ) }
                    />
                    {
                        ( attributes.provider === 'mailchimp' ) ? 
                        <>
                            <TextControl
                                label={ __( 'Mailchimp API Key', 'newsletter-block-gutena' ) }
                                value={ attributes.mailchimpApiKey }
                                onChange={ ( value ) => setAttributes( { mailchimpApiKey: value } ) }
                            />
                            <TextControl
                                label={ __( 'Mailchimp Audience ID', 'newsletter-block-gutena' ) }
                                value={ attributes.mailchimpListID }
                                onChange={ ( value ) => setAttributes( { mailchimpListID: value } ) }
                                help={ helpText} 
                            />
                        </>
                        : <></>
                    }
                </PanelBody>
                <PanelBody title={ __( 'Messages', 'newsletter-block-gutena' ) } initialOpen={ false }>
                    <TextControl
                        label={ __( 'Success Message', 'newsletter-block-gutena' ) }
                        value={ attributes.textSuccess }
                        onChange={ ( value ) => setAttributes( { textSuccess: value } ) }
                    />
                    <TextControl
                        label={ __( 'Already Subscribed Message', 'newsletter-block-gutena' ) }
                        value={ attributes.textSubscribed }
                        onChange={ ( value ) => setAttributes( { textSubscribed: value } ) }
                    />
                </PanelBody>
                <PanelColorSettings
                    title={ __( 'Icon Color' ) }
                    colorSettings={ [
                        {
                            value: attributes.iconColor,
                            onChange: ( value ) => setAttributes( { iconColor: value } ),
                            label: __( 'Color', 'newsletter-block-gutena' ),
                        }
                    ] }
                />
            </InspectorControls>

			<div { ...blockProps }>
                <form className="gutena-newsletter-form">
                    <input type="email" id="gutena-newsletter-field" className="gutena-newsletter-field" placeholder="name@email.com" />
                    <input type="submit" id="gutena-newsletter-action" className="gutena-newsletter-action" value="→" style={{ color: attributes.iconColor }} />
                </form>
			</div>
		</>
	);
}