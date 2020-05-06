import * as parseFilename from 'parse-torrent-name'

export class File {
  basename: string
  ext: string
  name: string
  parsed: any
  path: string
  type: string
  year: string

  constructor(path: string) {
    this.path = path
    this.ext = extname(path)
    this.basename = basename(path, this.ext)
    this.type = this.ext ? this.ext.substr(1) : 'directory'
    this.parsed = parseFilename(path)

    try {
      this.year = this.basename.split('(')[1].split(')')[0]
    } catch {
      this.year = ''
    }
    this.name = basename(this.basename, ` (${this.year})`)
    console.log(
      'Path', path,
      'Ext', this.ext,
      'basename', this.basename,
      'type', this.type,
      'year', this.year,
      'name', name
    )
  }

  directory() {
    return this.type === 'directory'
  }

  seasoned() {
    return this.parsed.season
  }

  toString() {
    return this.year ? `${this.name} - ${this.year}` : this.name
  }
}

/**
 * Get the basename from a path.
 *
 * `ext` is excluded from the end of the name.
 */
function basename(path: string, ext: string = '') {
  let name = path.split(/[\\/]/).pop()
  if (ext) {
    const pieces = name.split(ext)
    if (pieces.length > 1) {
      pieces.pop()
    }
    name = pieces.join(ext)
  }

  return name
}

/**
 * Get the file extension with the '.'.
 *
 * For example:
 *
 *     extname('index.html') // '.html'
 */
function extname(path: string) {
  const ext = path.split('.').pop()
  return ext !== path ? `.${ext}` : ''
}
