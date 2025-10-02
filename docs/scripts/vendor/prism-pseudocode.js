// Prism.js Pseudocode Language Definition
// Supports standardized pseudocode syntax: FUNCTION, IF-THEN-ELSE, ←, etc.

(function (Prism) {
  'use strict';

  Prism.languages.pseudocode = {
    // Comments
    'comment': /\/\/.*$/m,

    // String literals
    'string': {
      pattern: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/,
      greedy: true
    },

    // Numbers
    'number': /\b\d+(?:\.\d+)?\b/,

    // Keywords - Pseudocode specific
    'keyword': /\b(?:FUNCTION|PROCEDURE|IF|THEN|ELSE|ENDIF|FOR|TO|DO|WHILE|REPEAT|UNTIL|RETURN|BEGIN|END|AND|OR|NOT|TRUE|FALSE|NULL|ARRAY|SET|GET|INPUT|OUTPUT|PRINT)\b/i,

    // Operators - including assignment arrow
    'operator': /←|→|≤|≥|≠|[+\-*/%=<>!&|]/,

    // Punctuation
    'punctuation': /[{}[\];(),.:]/,

    // Variables and identifiers
    'variable': /\b[a-zA-Z_][a-zA-Z0-9_]*\b/
  };

  // Alias for common variations
  Prism.languages.pseudo = Prism.languages.pseudocode;
  Prism.languages.algorithm = Prism.languages.pseudocode;

}(Prism));