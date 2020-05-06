# ResumeDL

An Electron application for downloading large files. Downloads can be stopped or interrupted and will continue from where they left off.

## Requirements

### Local Machine
- Mac OS X 10.11+
- rsync 2.6.9
- SSH

### Remote Machine
- SSH Access
- Python 3

### Setup

Under the hood the application uses rsync with the SSH shell so SSH keys and config must be set up such that rsync will not prompt for a password.

#### Key Based Authentication

On the local machine run the following commands where `remote` is the remote user and `local` is the local user:

```sh
ssh-keygen -t ed25519 -C"remote@remote.example.com"
```

Save the key to */Users/local/resumedl_ed25519*. Leave the passphrase blank.
Then add the key to the authorized hosts on the remote machine.

```sh
ssh-copy-id -p22 -i /Users/local/resumedl_ed25519
```

#### The SSH Config

Add a Host entry to the */Users/local/.ssh/config* file.

```
Host resumedl
  HostName remote.example.com
  User remote
  Port 22
  IdentityFile /Users/local/resumedl_ed25519
```

An rsync command like below should now work without prompting for a password:

```sh
rsync --rsh"ssh -p22" remote@resumedl:test-file.txt ~/Downloads/
```

The Application's preferences would then be set to:

**Username:** *remote*

**Remote Host:** *resumedl*

**Remote Port:** *22*

**Private Key:** */Users/local/resumedl_ed25519*

#### Download Preferences

Downloads and partial downloads can be saved anywhere that the local user has write access. Using a relative path for partials is relative to the download folder.

**Save Downloads To...** */Users/local/Downloads/*

**Save Partial Downloads To...**  *.partials*

The leading "." on *.partials* makes incomplete downloads hidden. Also, rsync by default uses a hidden file for downloads that are in progress. So, if hidden files are not being shown, the downloading file won't be visible until it has completed fully.


## Development

### Build

Create the DMG with the command:

```sh
npm run make
```

Build options are specified in `forge.config.js`.

### Scripts

See a full list of the commands in `package.json`.


## Contributions

Contributing to the project is welcome. Fork the project, make the changes, and
make a pull request.


## Issues

Submit issues to the git issue tracker.


## License (MIT)

Copyright 2020 Jason Schmedes

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
