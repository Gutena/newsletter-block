import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';
import { InspectorControls, PanelColorSettings, useBlockProps } from '@wordpress/block-editor';

export default function edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
        className: 'gutena-newsletter-field-block',
    } );
	
	return (
		<>
			<InspectorControls key="settings">
                <PanelBody title={ __( 'Provider', 'gutena-newsletter' ) }>
                    <SelectControl
                        label={ __( 'Choose Provider', 'gutena-newsletter' ) }
                        value={ attributes.provider }
                        options={ [
                            { label: __( '-- Select --', 'gutena-newsletter' ), value: '' },
                            { label: __( 'Mailchimp', 'gutena-newsletter' ), value: 'mailchimp' },
                        ] }
                        onChange={ ( value ) => setAttributes( { provider: value } ) }
                    />
                    {
                        ( attributes.provider === 'mailchimp' ) ? 
                        <>
                            <TextControl
                                label={ __( 'Mailchimp Api Key', 'gutena-newsletter' ) }
                                value={ attributes.mailchimpApiKey }
                                onChange={ ( value ) => setAttributes( { mailchimpApiKey: value } ) }
                            />
                            <TextControl
                                label={ __( 'Mailchimp List ID', 'gutena-newsletter' ) }
                                value={ attributes.mailchimpListID }
                                onChange={ ( value ) => setAttributes( { mailchimpListID: value } ) }
                            />
                        </>
                        : <></>
                    }
                </PanelBody>
                <PanelBody title={ __( 'Messages', 'gutena-newsletter' ) } initialOpen={ false }>
                    <TextControl
                        label={ __( 'Success Message', 'gutena-newsletter' ) }
                        value={ attributes.textSuccess }
                        onChange={ ( value ) => setAttributes( { textSuccess: value } ) }
                    />
                    <TextControl
                        label={ __( 'Already Subscribed Message', 'gutena-newsletter' ) }
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
                            label: __( 'Color', 'gutena-newsletter' ),
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