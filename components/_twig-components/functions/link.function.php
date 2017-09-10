<?php

/**
 * @file
 * Function to support dummy link in the Pattern Lab.
 */

$function = new Twig_SimpleFunction(
    'link',
    function ($title, $url, $attributes) {
      if (isset($attributes)) {
        return '<a href="' . $url . '"' . $attributes . '>' . $title . '</a>';
      }
      else {
        return '<a href="' . $url . '">' . $title . '</a>';
      }
    },
    ['is_safe' => ['html']]
);
