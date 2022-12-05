document.addEventListener( 'DOMContentLoaded', () => {
    if ( ! window.gutenaNewsletterBlock ) return;

    let nodeList = document.querySelectorAll( '.gutena-newsletter-form-block .gutena-newsletter-form' );
    for ( let i = 0; i < nodeList.length; i++ ) {
        nodeList[i]?.addEventListener( 'submit', function( e ) {
            e.preventDefault();

            let currentNode = nodeList[i];
            let nextNode = currentNode?.nextElementSibling;

            let emailAddress = currentNode.querySelector( '#gutena-newsletter-field' ).value;
            let settingsData = currentNode.querySelector( '#gutena-newsletter-settings' ).value;

            if ( nextNode && nextNode !== 'undefined' ) {
                if ( nextNode.classList.contains( 'gutena-newsletter-message' ) ) {
                    nextNode.remove();
                }
            }

            if ( ! validateEmail( emailAddress ) ) {
                createNotice( currentNode, { innerHTML: `<span id="gutena-newsletter-info-text" class="info-text">${ gutenaNewsletterBlock.email_invalid }</span>`, className: 'gutena-newsletter-message status error' } )
                return;
            }

            createNotice( currentNode, { innerHTML: `<span class="loader"></span><span id="gutena-newsletter-info-text" class="info-text">${ gutenaNewsletterBlock.in_process }</span>`, className: 'gutena-newsletter-message success' } )
            
            const data = new FormData();
            data.append( 'action', 'gutena_subscribe_newsletter' );
            data.append( 'nonce', gutenaNewsletterBlock.nonce );
            data.append( 'email', emailAddress );
            data.append( 'data', settingsData );

            fetch( gutenaNewsletterBlock?.ajax_url, {
                method: "POST",
                credentials: 'same-origin',
                body: data
            } )
            .then( ( response ) => response.json() )
            .then( ( data ) => {
                if ( data ) {
                    if ( currentNode?.nextElementSibling?.classList.contains( 'gutena-newsletter-message' ) ) {
                        currentNode.nextElementSibling.remove();
                    }

                    if ( data.status == 'success' ) {
                        currentNode.querySelector( '#gutena-newsletter-field' ).value = '';
                    }
                    createNotice( currentNode, { innerHTML: `<span id="gutena-newsletter-info-text" class="info-text">${ data.message }</span>`, className: 'gutena-newsletter-message status ' + data.status } )
                }
            } )
            .catch( ( error ) => {
                createNotice( currentNode, { innerHTML: `<span id="gutena-newsletter-info-text" class="info-text">${ error }</span>`, className: 'gutena-newsletter-message error' } )
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