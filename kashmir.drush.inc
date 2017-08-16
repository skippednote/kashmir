<?php

/**
 * @file
 * Contains Drush hooks.
 *
 * Heavily inspired by emulsify.drush.inc.
 */

/**
 * Implements hook_drush_command().
 */
function kashmir_drush_command() {
  $items = [];

  $items['kashmir'] = [
    'description' => 'Create a sub-theme from Kashmir.',
    'arguments' => [
      'human_readable_name' => 'The name for the sub-theme.',
    ],
    'options' => [
      'machine_name' => 'The machine-readable name for the sub-theme. This will be auto-generated from the human-readable name if ommited.',
      'description' => 'The description of your theme',
      'path' => 'The destination of your theme. Defaults to "themes/custom".',
    ],
    'examples' => [
      'drush kashmir "sub theme"' => 'Creates a Kashmir sub-theme called "sub theme", using the default options.',
      'drush kashmir "sub theme" --machine_name=sub_theme' => 'Creates a Kashmir sub-theme called "sub theme" with a specific machine name.',
      'drush kashmir "sub theme" --description="Based on Kashmir base theme."' => 'Creates a Kashmir sub-theme called "sub theme" with a specific description.',
      'drush kashmir "sub theme" --path="themes"' => 'Creates a Kashmir sub-theme called "sub theme" at a specific path.',
    ],
  ];

  return $items;
}

/**
 * Implements hook_drush_help().
 */
function kashmir_drush_help($section) {
  switch ($section) {
    case 'drush:kashmir':
      return dt('This command will create a Kashmir sub-theme. See examples to get started.');
  }
}

/**
 * Implements drush_hook_COMMAND().
 */
function drush_kashmir($human_readable_name = NULL) {

  // If no $human_readable_name provided, abort.
  if (!$human_readable_name) {
    drush_print(dt('Theme name missing. See help using drush kashmir --help.'));
    return;
  }

  // Determine the theme name.
  if (!isset($human_readable_name)) {
    $human_readable_name = drush_get_option('human_readable_name');
  }

  // Determine the machine name.
  $machine_name = drush_get_option('machine_name');
  if (!$machine_name) {
    $machine_name = $human_readable_name;
  }
  $machine_name = str_replace(' ', '_', strtolower($machine_name));
  $search = [
    // Remove characters not valid in function names.
    '/[^a-z0-9_]/',
    // Functions must begin with an alpha character.
    '/^[^a-z]+/',
  ];
  $machine_name = preg_replace($search, '', $machine_name);

  // Description of theme.
  $description = (drush_get_option('description')) ? trim(drush_get_option('description')) : 'A sub-theme with modern tooling.';

  // Determine the path to the new theme.
  $theme_path = 'themes/custom';
  if ($path = drush_get_option('path')) {
    $theme_path = drush_trim_path($path);
  }

  drush_kashmir_create($human_readable_name, $machine_name, $description, $theme_path);
}

/**
 * Create the sub-theme.
 */
function drush_kashmir_create($human_readable_name, $machine_name, $description, $theme_path) {
  $theme_path = drush_normalize_path(drush_get_context('DRUSH_DRUPAL_ROOT') . '/' . $theme_path . '/' . $machine_name);

  if (!is_dir(dirname($theme_path))) {
    drush_die(dt('The directory "!directory" was not found.', ['!directory' => dirname($theme_path)]));
  }

  // Phase 1: Copy files.
  $files_to_copy = _kashmir_get_files_to_copy();
  _kashmir_copy_files($files_to_copy, $theme_path);

  // Phase 2: Alter files.
  $alterations = _kashmir_get_alterations($human_readable_name, $machine_name);
  $files_to_alter = _kashmir_get_files_to_alter();
  _kashmir_alter_files($theme_path, $files_to_alter, $alterations);

  // Phase 3: Rename files.
  $files_to_rename = _kashmir_get_files_to_rename();
  _kashmir_rename_files($theme_path, $machine_name, $files_to_rename);

  // Phase 4: Rename info yml.
  drush_op('_kashmir_rename_info_file', $theme_path, $machine_name, $description);

  _kashmir_notify($human_readable_name, $theme_path);
}

/**
 * Gets alterations (string replacements).
 *
 * This function supports both directories and individual files.  Alterations
 * happen in sequential order so you can replace something that was previously
 * replaced.
 */
function _kashmir_get_alterations($human_readable_name, $machine_name) {
  return [
    'Kashmir' => $human_readable_name,
    'kashmir' => $machine_name,
    'hidden: true' => '',
  ];
}

/**
 * Returns an array of files to make string replacements.
 */
function _kashmir_get_files_to_alter() {
  $files = [
    'kashmir.info.yml',
    'kashmir.theme',
    'kashmir.breakpoints.yml',
    'kashmir.libraries.yml',
    'README.md',
  ];

  return $files;
}

/**
 * Gets files to copy.
 *
 * This function supports both directories and individual files.
 */
function _kashmir_get_files_to_copy() {
  $files = [
    '.editorconfig',
    '.eslintignore',
    '.eslintrc',
    '.gitignore',
    '.stylelintrc',
    'components',
    'fonts',
    'gulp',
    'gulpfile.js',
    'images',
    'js',
    'package-lock.json',
    'package.json',
    'sass',
    'kashmir.info.yml',
    'kashmir.theme',
    'kashmir.breakpoints.yml',
    'kashmir.libraries.yml',
    'screenshot.png',
    'README.md',
    'templates',
  ];

  return $files;
}

/**
 * Get files to rename.
 */
function _kashmir_get_files_to_rename() {
  $files = [
    'kashmir.info.yml',
    'kashmir.theme',
    'kashmir.breakpoints.yml',
    'kashmir.libraries.yml',
  ];

  return $files;
}

/**
 * Alter strings within files.
 */
function _kashmir_alter_files($theme_path, $files_to_alter = [], $alterations = [], $absolute = FALSE) {
  if (empty($files_to_alter) || empty($alterations)) {
    return TRUE;
  }
  foreach ($files_to_alter as $file_to_replace) {
    if ($absolute === TRUE) {
      $file_type = filetype($file_to_replace);
      $file_path = $file_to_replace;
    }
    else {
      $file_type = filetype($theme_path . DIRECTORY_SEPARATOR . $file_to_replace);
      $file_path = $theme_path . DIRECTORY_SEPARATOR . $file_to_replace;
    }

    if ($file_type === 'dir') {
      $files = file_scan_directory($file_path, '/\.*/');
      _kashmir_alter_files($theme_path, array_keys($files), $alterations, TRUE);
    }
    elseif ($file_type === 'file') {
      _kashmir_file_str_replace($file_path, array_keys($alterations), $alterations);
    }
  }
}

/**
 * Copy files.
 *
 * @param array $files
 *   An array of files (strings) to copy.
 * @param string $destination_path
 *   A string representing the destination path.
 *
 * @return bool
 *   A boolean representing the success or failure of the command.
 */
function _kashmir_copy_files($files = [], $destination_path = '') {
  if (empty($files) || empty($destination_path)) {
    return FALSE;
  }
  file_prepare_directory($destination_path, FILE_CREATE_DIRECTORY);
  foreach ($files as $files_to_copy) {
    drush_copy_dir(__DIR__ . DIRECTORY_SEPARATOR . $files_to_copy, $destination_path . DIRECTORY_SEPARATOR . $files_to_copy);
  }
  return TRUE;
}

/**
 * Rename files.
 */
function _kashmir_rename_files($theme_path, $machine_name, $files_to_rename = []) {
  foreach ($files_to_rename as $file_to_rename_path) {
    $file_original_path = $theme_path . DIRECTORY_SEPARATOR . $file_to_rename_path;
    $file_new_path = $theme_path . DIRECTORY_SEPARATOR . str_replace('kashmir', $machine_name, $file_to_rename_path);
    drush_op('rename', drush_normalize_path($file_original_path), drush_normalize_path($file_new_path));
  }
}

/**
 * Replace strings in a file.
 */
function _kashmir_file_str_replace($file_path, $find, $replace) {
  $file_path = drush_normalize_path($file_path);
  $file_contents = file_get_contents($file_path);
  $file_contents = str_replace($find, $replace, $file_contents);
  file_put_contents($file_path, $file_contents);
}

/**
 * Rename info file to remove data added by D.O.
 */
function _kashmir_rename_info_file($theme_path, $theme_name, $description) {
  $file_path = $theme_path . '/' . $theme_name . '.info.yml';
  $info_strings = [
    '# core: 8.x' => 'core: 8.x',
    "core: '8.x'\n" => '',
    "project: '$theme_name'\n" => '',
  ];

  $info_regexs = [
    ['pattern' => "/hidden: true\n/", 'replacement' => ''],
    ['pattern' => '/\# Information added by Drupal\.org packaging script on [\d-]+\n/', 'replacement' => ''],
    ['pattern' => "/version: '[^']+'\n/", 'replacement' => ''],
    ['pattern' => '/datestamp: \d+\n/', 'replacement' => ''],
    ['pattern' => '/base theme: [a-z]*/', 'replacement' => 'base theme: kashmir'],
    ['pattern' => '/description: .*/', 'replacement' => "description: $description"],
  ];

  $file_path = drush_normalize_path($file_path);
  $file_contents = file_get_contents($file_path);
  if ($file_contents !== FALSE) {
    // Find text with strings.
    $find = array_keys($info_strings);
    $replace = $info_strings;
    $file_contents = str_replace($find, $replace, $file_contents);
    // Find text with regex.
    foreach ($info_regexs as $regex) {
      $file_contents = preg_replace($regex['pattern'], $regex['replacement'], $file_contents);
    }
    // Write to file.
    file_put_contents($file_path, $file_contents);
  }
}

/**
 * Notifies the user on success.
 */
function _kashmir_notify($human_readable_name, $theme_path) {
  // Notify user of the newly created theme.
  $message = 'Successfully created the Kashmir sub-theme "!name" created in: !path, you can now run \'npm install\' to install the node modules and setup patternlab.';

  $message = dt($message, [
    '!name' => $human_readable_name,
    '!path' => $theme_path,
  ]);
  drush_print($message);
}
