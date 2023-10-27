'use strict'

function cesar(str: string, shift: number, action: string = "encode"): string{
    if (typeof shift != "number" || !["encode", "decode"].includes(action)) return "wrong parameters"

    let alphabet = ["а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", "й", 
                    "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", 
                    "х", "ц", "ч", "ш", "щ", "ъ", "ы", "ь", "э", "ю", "я"]
    str = str.toLowerCase().replace(" ", "")
    
    function encode(str: string, shift: number): string{
        let ans = ""
        for (let i = 0; i < str.length; i++) {
            ans += alphabet[(alphabet.indexOf(str[i]) + shift) % alphabet.length]
        }

        return ans
    }

    function decode(str: string, shift: number): string{
        let ans = ""
        for (let i = 0; i < str.length; i++) {
            ans += alphabet[((alphabet.indexOf(str[i]) - shift) + alphabet.length) % alphabet.length]
        }

        return ans
    }

    let ans = (action == "encode") ? encode(str, shift): decode(str, shift)
    return ans
}
// for (let i = 1; i < 32; i++) {
//     console.log(i, cesar("эзтыхз фзъзъз", i, "decode")); 
// }

console.log(cesar("эзтыхз фзъзъз", 8, "decode")); // хакуна матата