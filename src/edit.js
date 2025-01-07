import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import placeholderImage from './image.png';

const BLOCK_TEMPLATE = [
	[ "core/columns", { "style": { "spacing": { "padding": {"top": "40px", "right":" 40px", "bottom": "40px", "left": "40px" }, "margin": { "top": "0", "right":" 0", "bottom": "0", "left": "0" } }, "border": { "width": "1px", "radius": "10px", "style": "solid", "color":"#0c0c0c" } }, "backgroundColor": "background" }, [
        [ "core/column", { width: "30%", verticalAlignment: "center", className: "gutena-newsletter-col-first" }, [
            [ "core/image", { sizeSlug: "full", "width": "140px", "height": "115px", url: placeholderImage, alt:"Image", align: "center" }]
        ] ],
        [ "core/column", { className: "gutena-newsletter-col-last", "style": { "spacing": { "blockGap": "6px" } } }, [
            [ "core/heading", { content: "Subscribe", "style":{ "typography": { "fontSize": "28px" }, "spacing": { "margin": { "top": "0px", "right": "0px", "bottom": "6px", "left": "0px" } } } } ],
            [ "core/paragraph", { content: "Sign up for free content.", "style": { "typography": { "fontSize": "14px" }, "spacing": { "margin": { "top": "0px", "right": "0px", "bottom": "10px", "left": "0px" } } }, "color": { "text": "#505050" } } ],
			[ "gutena/newsletter-form" ],
            [ "core/paragraph", { content: "I won’t send you spam. Unsubscribe at any time.", "style": { "typography": { "fontSize": "14px" } }, "color": { "text": "#505050" } } ],
        ] ],
    ] ]
];

export default function edit() {
	const blockProps = useBlockProps( {
        className: 'gutena-newsletter-block',
    } );

    const innerBlocksProps = useInnerBlocksProps( blockProps, {
        template: BLOCK_TEMPLATE,
    } );

	return <div { ...innerBlocksProps } />;
}
