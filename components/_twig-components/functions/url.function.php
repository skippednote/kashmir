<?php

/**
 * @file
 * Function to support dummy url in the Pattern Lab.
 */

$function = new Twig_SimpleFunction('url', function ($string) {
  return '#';
});
