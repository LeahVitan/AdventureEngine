{
  const qOpen = {
    '"': '“',
    "'": '‘',
  }

  const qClose = {
    '"': '”',
    "'": '’',
  }

  function transformQuote(prevChar, quote, nextChar) {
    let prevScore = 3
    let nextScore = 3
    if(/[?!\.,]/.test(prevChar)) prevScore = 2
    if(/[?!\.,]/.test(nextChar)) nextScore = 2
    if(/[ \t\r\n]/.test(prevChar)) prevScore = 1
    if(/[ \t\r\n]/.test(nextChar)) nextScore = 1
    return (prevScore < nextScore ? qOpen : cClose)[quote]
  }
}

Start = .

/*
 * Element Types
 */

// XML elements get the highest precedence during parsing.
XMLElement = .

// Block elements get the next highest precedence.
BlockElement = .

// Span elements get the lowest precedence.
SpanElement
  = Strong
  / Emphasis
  / Dash


/*
 * Span Elements
 */

Strong
  = '**' SourceText '**'
  / '__' SourceText '__'

Emphasis
  = '*' SourceText '*'
  / '_' SourceText '_'


/*
 * Misc. Elements
 */

Dash
  = '--' { return '&ndash;' }
  / '---' { return '&mdash;' }

EscapeSequence
  = '\\' chr:Char { return chr }

StraightQuote
  = l:Char q:("'" / '"') r:Char { return transformQuote(l, q, r) }

/*
 * Source Text
 */

SourceText
  = .+

Char = !LF .

LF = '\r\n' / '\r' / '\n'

_ = ' ' / '\t'