<?php

/**
 * @file
 * Filter to support dummy safe_join in the Pattern Lab.
 */

$filter = new Twig_SimpleFilter('safe_join', function ($string) {
  return $string;
});
