<?php // @codingStandardsIgnoreLine
/**
 * Plugin Name:     Newsletter Block by Gutena
 * Description:     Newsletter Block by Gutena
 * Version:         1.0.0
 * Author:          ExpressTech
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     newsletter-block-gutena
 *
 * @package         newsletter-block-gutena
 */

defined( 'ABSPATH' ) || exit;

/**
 * Abort if the class is already exists.
 */
if ( ! class_exists( 'Gutena_Newsletter' ) ) {

	/**
	 * Gutena Newsletter class.
	 *
	 * @class Main class of the plugin.
	 */
	class Gutena_Newsletter {

		/**
		 * Plugin version.
		 *
		 * @var string
		 */
		public $version = '1.0.0';

		/**
		 * Instance of this class.
		 *
		 * @since 1.0.0
		 * @var object
		 */
		protected static $instance;

		/**
		 * Get the singleton instance of this class.
		 *
		 * @since 1.0.0
		 * @return Gutena_Newsletter
		 */
		public static function get() {
			if ( ! ( self::$instance instanceof self ) ) {
				self::$instance = new self();
			}

			return self::$instance;
		}

		/**
		 * Constructor
		 *
		 * @since 1.0.0
		 */
		public function __construct() {
			add_action( 'init', [ $this, 'register' ] );
			add_filter( 'block_categories_all', [ $this, 'register_category' ], 10, 2 );
			add_action( 'wp_ajax_gutena_subscribe_newsletter', [ $this, 'subscription' ] );
			add_action( 'wp_ajax_nopriv_gutena_subscribe_newsletter', [ $this, 'subscription' ] );
		}

		/**
		 * Register required functionalities.
		 */
		public function register() {
			// Register blocks.
			register_block_type( __DIR__ . '/build' );
			register_block_type( __DIR__ . '/build/newsletter-field', [
				'render_callback' => [ $this, 'render_block' ],
			] );

			// Enqueue assets.
			wp_register_script( 'gutena-newsletter-block', plugins_url( 'frontend.min.js', __FILE__ ), [], $this->version, true );
			wp_localize_script( 'gutena-newsletter-block', 'gutenaNewsletterBlock', [
				'ajax_url'      => admin_url( 'admin-ajax.php' ),
				'nonce'         => wp_create_nonce( 'gutena_newsletter' ),
				'in_process'    => __( 'Processing...', 'newsletter-block-gutena' ),
				'email_invalid' => __( 'Email is not valid!', 'newsletter-block-gutena' ),
			] );
		}

		/**
		 * Render Gutena Newsletter field block.
		 */
		public function render_block( $attributes, $content, $block ) {
			$wrapper_attributes = get_block_wrapper_attributes( [ 'class' => 'gutena-newsletter-field-block' ] );
			if ( strpos( $wrapper_attributes, 'style' ) === false ) {
				$wrapper_attributes = 'style="border-radius: 6px; color: #000000; background-color: #EBEBEB; padding-top: 12px; padding-bottom: 12px; padding-left: 20px; padding-right: 20px; margin-top: 10px; margin-bottom: 10px; margin-left: 0; margin-right: 0; font-size: 18px;" class="gutena-newsletter-field-block has-text-color has-background wp-block-gutena-newsletter-field"';
			}
			
			$icon_color = ! empty( $attributes['iconColor'] ) ? $attributes['iconColor'] : 'inherit';

			unset( $attributes['style'] );
			unset( $attributes['iconColor'] );

			$output = '<form class="gutena-newsletter-form">';
			$output .= '<input type="email" id="gutena-newsletter-field" class="gutena-newsletter-field" placeholder="name@email.com" />';
			$output .= "<input type='hidden' id='gutena-newsletter-settings' class='gutena-newsletter-settings' value='" . wp_json_encode( $attributes, JSON_HEX_APOS | JSON_HEX_QUOT ) . "' />";
			$output .= '<input type="submit" id="gutena-newsletter-action" class="gutena-newsletter-action" value="→" style="color: ' . esc_attr( $icon_color ) . '" />';
			$output .= '</form>';

			return sprintf(
				'<div %1$s>%2$s</div>',
				$wrapper_attributes,
				$output
			);
		}

		/**
		 * Register block category.
		 */
		public function register_category( $block_categories, $editor_context ) {
			$fields = wp_list_pluck( $block_categories, 'slug' );
			
			if ( ! empty( $editor_context->post ) && ! in_array( 'gutena', $fields, true ) ) {
				array_push(
					$block_categories,
					[
						'slug'  => 'gutena',
						'title' => __( 'Gutena', 'newsletter-block-gutena' ),
					]
				);
			}

			return $block_categories;
		}

		/**
		 * Process subscription via AJAX.
		 */
		public function subscription() {
			check_ajax_referer( 'gutena_newsletter', 'nonce' );
			
			if ( empty( $_POST['data'] ) ) {
				wp_send_json( [
					'status'  => 'error',
					'message' => __( 'Error occured!', 'newsletter-block-gutena' ),
				] );
			}
			
			$data = json_decode( wp_unslash( html_entity_decode( $_POST['data'] ) ), true ); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput
			if ( 0 !== json_last_error() || empty( $data ) ) {
				wp_send_json( [
					'status'  => 'error',
					'message' => __( 'Error occured!', 'newsletter-block-gutena' ),
				] );
			}

			$email = ! empty( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';

			$data = wp_parse_args( $this->sanitize( $data ), [
				'email'           => $email,
				'provider'        => '',
				'mailchimpApiKey' => '',
				'mailchimpListID' => '',
				'textSuccess'     => 'Thank you for subscribing!',
				'textSubscribed'  => 'You are already subscribed with us!',
			] );

			if ( 'mailchimp' === $data['provider'] ) {
				if ( ! empty( $data['mailchimpApiKey'] ) && ! empty( $data['mailchimpListID'] ) ) {
					$this->process_mailchimp( $data['email'], $data['mailchimpApiKey'], $data['mailchimpListID'], $data['textSuccess'], $data['textSubscribed'] );
				} else {
					wp_send_json( [
						'status'  => 'error',
						'message' => __( 'Connect the form to a provider', 'newsletter-block-gutena' ),
					] );
				}
			}

			wp_send_json( [
				'status'  => 'error',
				'message' => __( 'Can\'t process your request.', 'newsletter-block-gutena' ),
			] );
		}

		/**
		 * Process Mailchimp subscription.
		 */
		private function process_mailchimp( $email, $api_key, $list_id, $success, $subscribed ) {
			$phone = $fname = $lname = '';
			$double_optin = false;

			$api_endpoint = 'https://<dc>.api.mailchimp.com/3.0/';
			list( , $datacentre ) = explode( '-', $api_key );
			$api_endpoint = str_replace( '<dc>', $datacentre, $api_endpoint );

			$response = wp_remote_post( $api_endpoint . '/lists/' . $list_id . '/members', [
				'headers'   => [
					'Content-Type'  => 'application/json',
					'Authorization' => 'Basic '. base64_encode( 'user:' . $api_key ), // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
				],
				'body'      => wp_json_encode( [
					'email_address'     => $email,
					'merge_fields'      => [
						'FNAME' => $fname,
						'LNAME' => $lname,
						'PHONE' => $phone,
					],
					'email_type'        => 'html',
					'status'            => 'subscribed',
					'double_optin'      => $double_optin,
					'update_existing'   => true,
					'replace_interests' => false,
					'send_welcome'      => false,
				] ),
				'sslverify' => false,
			] );

			if ( is_wp_error( $response ) ) {
				wp_send_json( [
					'status'  => 'error',
					'message' => $response->get_error_message(),
				] );
			} else {
				$result = json_decode( wp_remote_retrieve_body( $response ), true );
				$response = [];

				if ( isset( $result['status'] ) && $result['status'] == 'subscribed' ) {
					$response['status'] = 'success';
					$response['message'] = $success;
				}
				elseif ( isset( $result['status'] ) && $result['status'] == 400 && ! isset( $result['errors'] ) ) {
					$response['status'] = 'warning';
					$response['message'] = $email . ' ' . $subscribed;
				}
				else {
					$response['status'] = 'error';
					$response['message'] = __( 'Can\'t process your request.', 'newsletter-block-gutena' );
				}

				wp_send_json( $response );
			}
		}

		/**
		 * Sanitize data.
		 */
		private function sanitize( $array ) {
			foreach ( (array) $array as $k => $v ) {
				if ( is_array( $v ) ) {
					$array[ $k ] = $this->sanitize( $v );
				} else {
					$array[ $k ] = sanitize_text_field( $v );
				}
			}
			return $array;                                                       
		}
	}
}

/**
 * Check the existance of the function.
 */
if ( ! function_exists( 'gutena_newsletter_init' ) ) {
	/**
	 * Returns the main instance of Gutena_Newsletter to prevent the need to use globals.
	 *
	 * @return Gutena_Newsletter
	 */
	function gutena_newsletter_init() {
		return Gutena_Newsletter::get();
	}

	// Start it.
	gutena_newsletter_init();
}