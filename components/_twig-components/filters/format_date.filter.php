<?php

/**
 * @file
 * Filter to support dummy format_date in the Pattern Lab.
 */

$filter = new Twig_SimpleFilter('format_date', function ($string) {
  return $string;
});
