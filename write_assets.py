
import os

logo_file = 'public/logo_png_b64.txt'
sign_file = 'public/sign_png_b64.txt'
output_file = 'lib/assets.ts'

with open(logo_file, 'r') as f:
    logo = f.read().strip()

with open(sign_file, 'r') as f:
    sign = f.read().strip()

with open(output_file, 'w') as f:
    f.write(f'export const LOGO_PNG_B64 = "data:image/png;base64,{logo}";\n')
    f.write(f'export const SIGN_PNG_B64 = "data:image/png;base64,{sign}";\n')

print(f"Successfully wrote {output_file}")
