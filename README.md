<img
  src="https://raw.githubusercontent.com/minjakim/vscode-42seoul-header/master/42.png"
  width=128>

# 42 Seoul Header for VSCode

This extension provides the 42 Seoul header integration in VSCode.

```bash

# ************************************************************************** #
#                                                                            #
#                                                        :::      ::::::::   #
#   42seoul.h                                          :+:      :+:    :+:   #
#                                                    +:+ +:+         +:+     #
#   By: minjakim <minjakim@student.42seoul.kr>     +#+  +:+       +#+        #
#                                                +#+#+#+#+#+   +#+           #
#   Created: 2020/12/30 10:36:42 by minjakim          #+#    #+#             #
#   Updated: 2020/12/30 10:42:31 by minjakim         ###   ########seoul.kr  #
#                                                                            #
# ************************************************************************** #
```

# Usage

### Insert a header
 - **macOS** : `⌘` + `⌥` + `H`
 - **Linux** / **Windows** : `Ctrl` + `Alt` + `H`.

Header is automatically updated on save.

# Configuration

Default values for **username** and **email** are imported from environment variables.

To override these values, specify these properties in *User Settings* :

```ts
{
  "42header.username": string,
  "42header.email": string
}
```

# Issues

To report a bug or ask for a feature, please open a [Github issue](https://github.com/minjakim/vscode-42seoul-header/issues).

# License

MIT

It's a fork from this repo https://github.com/kube/vscode-42header

Inspired

https://github.com/Etheram68/Header101-Vscode
