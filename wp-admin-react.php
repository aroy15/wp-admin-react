<?php
/**
 * Plugin Name: WP Admin React
 * Author: Anjon Roy
 * Author URI: https://anjonroy.com/
 * Version: 1.0.0
 * Description: WP Admin With React
 * Text-Domain: admin-react
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}
/**
 * Define Plugins Contstants
 */
define( 'WPADMIN_PATH', trailingslashit( plugin_dir_path( __FILE__ ) ) );
define( 'WPADMIN_URL', trailingslashit( plugins_url( '/', __FILE__ ) ) );


function load_scripts( $hook_suffix ){
	if ( $hook_suffix != 'toplevel_page_wp-settings' ) {
		return;
	}
	wp_enqueue_script( 'wp-admin-react-js', plugin_dir_url(__FILE__) . 'dist/assets/js/main.js', array(), time(), true );
	wp_localize_script( 'wp-admin-react-js', 'appLocalizer', array(
		'apiUrl' => home_url('/wp-json'),
		'nonce' => wp_create_nonce('wp_rest')
	) );

	// wp_enqueue_style('wp-admin-react-css', WPADMIN_URL.'build/main.css', array(), time() );
}
add_action('admin_enqueue_scripts', 'load_scripts' );

class WP_Create_Admin_Page {
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'create_admin_menu' ) );
	}

	public function create_admin_menu() {
		$capability = 'manage_options';
		$slug = 'wp-settings';

		add_menu_page(
			__( 'WP React Admin', 'admin-react' ),
			__( 'WP React Admin', 'admin-react' ),
			$capability,
			$slug,
			array( $this, 'menu_page_template' ),
			'dashicons-buddicons-replies'
		);
	}

	public function menu_page_template() {
		echo "<div class='wrap'><div id='wp-admin-app'></div></div>";
	}
}

new WP_Create_Admin_Page();

require_once WPADMIN_PATH . 'classes/rest-api-create.php';