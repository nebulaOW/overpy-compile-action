# OverPy Compile GitHub Action

This GitHub Action compiles `.opy` scripts into Overwatch Workshop script (`.ow`) using the latest [`overpy_standalone.js`](https://github.com/Zezombye/overpy). It automatically fetches the most up-to-date compiler each run — no need to manage versions or updates.

---

## How It Works

* Downloads the latest `overpy_standalone.js` from the official [OverPy](https://github.com/Zezombye/overpy) repo
* Uses a local `node` script to compile the given `.opy` file
* Saves the result to the given folder (e.g. `dist/`)

## Inputs

| Name        | Description                                      | Required | Default     |
|-------------|--------------------------------------------------|----------|-------------|
| `entrypoint`| Path to your main `.opy` file                    | ✅ Yes   | —           |
| `output_dir`| Directory to place the compiled `.ow` file       | ❌ No    | `dist`      |
| `language`  | Language code for localization (`en-US`, `fr`, etc) | ❌ No    | `en-US`     |
| `out_file_type`  | File type to save the compiled code as (`.ow`, `.txt`, etc) | ❌ No    | `.ow`     |

---

## Output

- The compiled `.ow` file is saved as:
`{output_dir}/{basename(entrypoint)}.ow`

Example:
- Input: `src/framework.opy`
- Output: `dist/framework.ow`

---

## Example Usage

```yaml
name: Compile OverPy Script

on:
workflow_dispatch:

jobs:
build:
  runs-on: ubuntu-latest

  steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Compile .opy script to .ow
      uses: your-username/overpy-compile-action@v1
      with:
        entrypoint: src/main.opy
        output_dir: dist
        language: en-US
        out_file_type: .ow

    - name: Upload compiled script
      uses: actions/upload-artifact@v4
      with:
        name: compiled-workshop-script
        path: dist/*.ow
```
---

## Support

If you encounter any issues, please open an issue or PR on [this repo](https://github.com/nebulaOW/overpy-compile-action).



