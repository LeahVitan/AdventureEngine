# Adventure Engine Overview

## Markdown Formatting

The adventure engine uses a custom dialect of markdown to format any text you enter. This comes in addition to support for custom XML tags whose behaviour can be defined by scripting.

The goal here is to make writing and editing content as painless as possible, while still offering the necessary customisation to create an interactive experience.

### Syntax

#### Limitations

- Unlike in Markdown, headings are not semantic.
- Unlike in Markdown, blockquotes are not semantic.
- Links are not supported.
- Images are not supported.
- Code and code blocks are not supported.

#### Block Elements

- Empty lines separate paragraphs.
  - Lines can be hard-wrapped to make text look prettier.
- Put `#` before of a line to create a heading.
  - Headings are non-semantic. You can use `<h1>`-`<h6>` for semantic headings.
  - The more `#`s, the smaller the text.
  - Headings cannot be part of a paragraph.
- Put `>` before a line to blockquote it.
  - Blockquotes are not semantic.
  - Blockquotes can contain other elements, including other blockquotes.
  - It's optional to prepend `>` to hard-wrapped lines, as you cannot partially BQ a paragraph.
- Put `*` / `-` / `+` / `1.` etc. before a line or paragraph to make it an item in a list.
  - Putting empty lines around a list item turns the whole list item into a paragraph.
  - List items are in the same list if there are no empty lines between them.
  - Use `*` / `-` / `+` for an unordered list.
    - The bullet style is not determined by the character used.
  - Use `1.` etc. for an ordered list.
    - The number used is not important and does not affect the presentation.

#### Span Elements

- Put `*` or `_` around text to add emphasis to it (usually means italicised).
- Put `**` or `__` around text to make it strong (usually means bold).

#### Other

- `--` will insert an en-dash.
- `---` will insert an em-dash.
- Unescaped straight single or double quotes will be converted to curly ones.

### XML

XML tags are supported as part of the formatting.  Custom tags can be defined and used to process their content:

```js
  parser.define('set', (attribs, content) => {
    if (attribs.var === undefined) attribs.var = ''
    return (globalVars[attribs.var] = parser.process(content))
  })

  parser.define('get', (attribs) => {
    if (attribs.var === undefined) attribs.var = ''
    return parser.process(globalVars[attribs.var])
  })
```

```md
  His name was <set var='someName'>John.</set>

  <get var='someName'/> was his name.
```

You must call `parser.process` on anything you want processed further.

HTML tags will have their default behaviour unless otherwise specified, but be aware that this version only supports XHTML-style tags, so void tags need to be marked with a closing slash.