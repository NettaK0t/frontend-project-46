### Hexlet tests and linter status:
[![Actions Status](https://github.com/NettaK0t/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/NettaK0t/frontend-project-46/actions)
[![Actions Status](https://github.com/NettaK0t/frontend-project-46/workflows/Node%20CI/badge.svg)](https://github.com/NettaK0t/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/020b2f7c7872ea74be66/maintainability)](https://codeclimate.com/github/NettaK0t/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/020b2f7c7872ea74be66/test_coverage)](https://codeclimate.com/github/NettaK0t/frontend-project-46/test_coverage)

# Setup
## Program setup
```
git clone https://github.com/NettaK0t/frontend-project-46.git

cd frontend-project-46

make install

sudo npm link
```

## Description
***Name of the package:*** @hexlet/code

***Goal of the package:*** generation the differences between two data structures

**Input and output:**

1. Input files: *yaml*, *json*.

The program accepts input arguments - the paths to yaml or json files. The paths taken are:

- absolute:

```
gendiff /users/netta/frontend-project-46/__fixtures__/file1.json /users/netta/frontend-project-46/__fixtures__/file2.json 
```
or

- relative:
 
```
gendiff file1.json file2.json
```
The reader and parser read and parse the taken paths into objects.

2. Output: *plain text*, *stylish* and *json*.

 The implemented formatters take input argument - the internal structure of the parsed objects. The result output depends on the chosen format:

- plain text
- stylish
- json

## Program Usage
Program help output:

```
gendiff -h
```
Output default(stylish) format:

```
gendiff file1.json file2.json
```
Output other formats:

```
gendiff file1.json file2.json -f plain
```
or

```
gendiff file1.json file2.json -f json
```

# JSON files comparison example (flat objects)

[![asciicast](https://asciinema.org/a/GOclS6EYiKZ2RBd6hWMeketMm.svg)](https://asciinema.org/a/GOclS6EYiKZ2RBd6hWMeketMm)

# JSON - YAML files comparison example (flat objects)

[![asciicast](https://asciinema.org/a/3alOVJRqnPi4c7LI9X7CjMhmN.svg)](https://asciinema.org/a/3alOVJRqnPi4c7LI9X7CjMhmN)

# Nested objects comparison (output format - stylish)

[![asciicast](https://asciinema.org/a/XkYJsubwGNG2mpKSwiNicZLp8.svg)](https://asciinema.org/a/XkYJsubwGNG2mpKSwiNicZLp8)

# Nested objects comparison (output format - plain text)

[![asciicast](https://asciinema.org/a/dCTWHIUPn2uQLIiZwaYgKtW8P.svg)](https://asciinema.org/a/dCTWHIUPn2uQLIiZwaYgKtW8P)

# Nested objects comparison (output format - json)

[![asciicast](https://asciinema.org/a/qvF30KfF7skQjcG7i95XcQo2H.svg)](https://asciinema.org/a/qvF30KfF7skQjcG7i95XcQo2H)
