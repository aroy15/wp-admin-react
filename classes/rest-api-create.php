<?php
use function False\true;
class React_Rest_API {
	
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'create_rest_route') );
		// add_action( 'init', array( $this, 'add_cors_http_header' ) );
	}

	function add_cors_http_header(){
		header("Access-Control-Allow-Origin: *");
	}

	public function create_rest_route() {
		register_rest_route( 'wprest/v1', '/settings', array(
			'method'   => 'GET',
			'callback' => array( $this, 'get_settings' ),
			'permission_callback' => array( $this, 'get_setting_permission' )
		) );

		register_rest_route( 'wprest/v1', '/settings-post', array(
			'method'   => 'POST',
			'callback' => array( $this, 'save_settings' ),
			'permission_callback' => array( $this, 'get_setting_permission' )
		) );
	}

	public function get_settings() {
		$firstname = get_option( 'react_firstname' );
		$lastname = get_option( 'react_lastname' );
		$email = get_option( 'react_email' );

		$respose = array(
			'firstname' => $firstname,
			'lastname'  => $lastname,
			'email'     => $email
		 );

		return rest_ensure_response( $respose );
	}

	public function get_setting_permission() {
		return true;
	}

	public function save_settings( $req ) {
		$params = $req->get_params();
		$firstname = sanitize_text_field( $req['firstname'] );
		$lastname = sanitize_text_field( $req['lastname'] );
		$email = sanitize_text_field( $req['email'] );

		update_option( 'react_firstname', $firstname );
		update_option( 'react_lastname', $lastname );
		update_option( 'react_email', $email );
		$content = array(
			"success" => true,
			"params"  => $params
		);
		// if( !is_user_logged_in() ) return 'You are not logged in';
		return rest_ensure_response ( $content );
	}

}
new React_Rest_API();
