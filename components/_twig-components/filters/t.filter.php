<?php

/**
 * @file
 * Filter to support dummy t in the Pattern Lab.
 */

$filter = new Twig_SimpleFilter('t', function ($string) {
  return $string;
});
