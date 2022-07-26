let nodeList = document.querySelectorAll( '.gutena-newsletter-form' );
for ( let i = 0; i < nodeList.length; i++ ) {
    nodeList[i].addEventListener( 'submit', function( e ) {
        e.preventDefault();

        let parentNode = nodeList[i].closest( '.gutena-newsletter-field-block' );
        let nextNode = parentNode.nextElementSibling;
        let emailAddress = nodeList[i].querySelector( '#gutena-newsletter-field' ).value;
        let settingsData = nodeList[i].querySelector( '#gutena-newsletter-settings' ).value;

        if ( nextNode.classList.contains( 'gutena-newsletter-message' ) ) {
            nextNode.remove();
        }

        if ( ! validateEmail( emailAddress ) ) {
            parentNode.after( 
                Object.assign( document.createElement( 'div' ), { textContent: gutenaNewsletterBlock.email_invalid, className: 'gutena-newsletter-message status error' } )
            )
            return;
        }

        parentNode.after( 
            Object.assign( document.createElement( 'div' ), { innerHTML: '<span class="loader"></span>'+ 'Processing...', className: 'gutena-newsletter-message success' } )
        )
        
        const data = new FormData();
        data.append( 'action', 'gutena_subscribe_newsletter' );
        data.append( 'nonce', gutenaNewsletterBlock.nonce );
        data.append( 'email', emailAddress );
        data.append( 'data', settingsData );

        fetch( gutenaNewsletterBlock.ajax_url, {
            method: "POST",
            credentials: 'same-origin',
            body: data
        } )
        .then( ( response ) => response.json() )
        .then( ( data ) => {
            if ( data ) {
                if ( parentNode.nextElementSibling.classList.contains( 'gutena-newsletter-message' ) ) {
                    parentNode.nextElementSibling.remove();
                }

                if ( data.status == 'success' ) {
                    parentNode.querySelector( '#gutena-newsletter-field' ).value = '';
                }
                parentNode.after( 
                    Object.assign( document.createElement( 'div' ), { textContent: data.message, className: 'gutena-newsletter-message status ' + data.status } )
                )
            }
        } )
        .catch( ( error ) => {
            parentNode.after( 
                Object.assign( document.createElement( 'div' ), { textContent: error, className: 'gutena-newsletter-message error' } )
            )
        } );
    } );
}

const validateEmail = email => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}