# TCKimlikNo

Turkish Identification Number Verification & Validation Package for NodeJs. This package is created using <a href="https://github.com/deligoez/tckimlikno">https://github.com/deligoez/tckimlikno</a>

# Installation

```bash
npm i @demirjs/tckimlikno
```

# Usage

```bash
import {validateTcKimlikNo} from '@demirjs/tckimlikno'

validateTcKimlikNo({
    name: 'yourName',
    surname: 'yourSurname',
    tc: 1,
    birthYear: 1
}).then(result => console.log(result))
```

# How to verify a T.C. Kimlik No

If you want to verify only `tcKimlikNo` you could validate it using `verifyTcKimlikNo` function. You could use it for `tcKimlikNo` rule.

```bash
import {verifyTcKimlikNo} from '@demirjs/tckimlikno'

console.log(verifyTcKimlikNo('12345678901')) // false
console.log(verifyTcKimlikNo('10000000146')) // true
```
