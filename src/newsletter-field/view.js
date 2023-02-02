document.addEventListener( 'DOMContentLoaded', () => {
    if ( ! window.gutenaNewsletterBlockLegacy ) return;
    
    let nodeList = document.querySelectorAll( '.gutena-newsletter-field-block .gutena-newsletter-form' );
    for ( let i = 0; i < nodeList.length; i++ ) {
        nodeList[i]?.addEventListener( 'submit', function( e ) {
            e.preventDefault();

            let parentNode = nodeList[i].closest( '.gutena-newsletter-field-block' );
            let nextNode = parentNode?.nextElementSibling;
            let emailAddress = nodeList[i].querySelector( '#gutena-newsletter-field' ).value;
            let settingsData = nodeList[i].querySelector( '#gutena-newsletter-settings' ).value;

            if ( nextNode && nextNode !== 'undefined' ) {
                if ( nextNode.classList.contains( 'gutena-newsletter-message' ) ) {
                    nextNode.remove();
                }
            }

            if ( ! validateEmail( emailAddress ) ) {
                createNotice( parentNode, { textContent: gutenaNewsletterBlockLegacy.email_invalid, className: 'gutena-newsletter-message status error' } )
                return;
            }

            createNotice( parentNode, { innerHTML: '<span class="loader"></span>' + gutenaNewsletterBlockLegacy.in_process, className: 'gutena-newsletter-message success' } )

            const data = new FormData();
            data.append( 'action', 'gutena_subscribe_newsletter' );
            data.append( 'nonce', gutenaNewsletterBlockLegacy.nonce );
            data.append( 'email', emailAddress );
            data.append( 'data', settingsData );

            fetch( gutenaNewsletterBlockLegacy?.ajax_url, {
                method: "POST",
                credentials: 'same-origin',
                body: data
            } )
            .then( ( response ) => response.json() )
            .then( ( data ) => {
                if ( data ) {
                    if ( parentNode?.nextElementSibling?.classList.contains( 'gutena-newsletter-message' ) ) {
                        parentNode.nextElementSibling.remove();
                    }

                    if ( data.status == 'success' ) {
                        parentNode.querySelector( '#gutena-newsletter-field' ).value = '';
                    }
                    createNotice( parentNode, { textContent: data.message, className: 'gutena-newsletter-message status ' + data.status } )
                }
            } )
            .catch( ( error ) => {
                createNotice( parentNode, { textContent: error, className: 'gutena-newsletter-message error' } )
            } );
        } );
    }
} );

const createNotice = ( node, data ) => {
    node.after( 
        Object.assign( document.createElement( 'div' ), data )
    )
}

const validateEmail = email => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}