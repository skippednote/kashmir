<?php

/**
 * @file
 * Filter to support dummy placeholder in the Pattern Lab.
 */

$filter = new Twig_SimpleFilter('placeholder', function ($string) {
  return $string;
});
