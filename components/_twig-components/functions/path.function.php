<?php

/**
 * @file
 * Function to support dummy path in the Pattern Lab.
 */

$function = new Twig_SimpleFunction('path', function ($string) {
  if ($string === '<front>') {
    return '/';
  }
  else {
    return $string;
  }
});
