<?php
/**
 * The override configuration file for RG2.
 * 
 * Only required for development use on local host.
 * 
 */
  //define('OVERRIDE_UI_THEME', 'le-frog');
  define('OVERRIDE_UI_THEME', 'smoothness');

  define('OVERRIDE_BASE_DIRECTORY', '//localhost/rg2-protractor-tests/instrumented');

  define('OVERRIDE_KARTAT_DIRECTORY', '../../kartat/');
  
  define("RG_LOG_FILE", "log/rg2log.txt");
?>