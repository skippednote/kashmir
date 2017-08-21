<?php

/**
 * @file
 * Filter to support dummy clean_id in the Pattern Lab.
 */

$filter = new Twig_SimpleFilter('clean_id', function ($string) {
  return $string;
});
