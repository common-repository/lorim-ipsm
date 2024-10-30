<?php
/**
 * Plugin Name: lorim-ipsm
 * Plugin URI: 
 * Description: lorim-ipsm - is a plugin for generating lorim-ipsm place holder content (text and images)
 * Author: Michael LaPan
 * Author URI: https://michaellapan.com
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
