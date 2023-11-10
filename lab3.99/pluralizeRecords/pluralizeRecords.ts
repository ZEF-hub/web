'use strict'

function pluralizeRecords(n: number): string{
    if (n < 0) return "exit code: -1" // only non negative n

    let str = ""
    switch (n % 10) {
        case 1:
            str = (n != 11) ? `В результате выполнения запроса была найдена ${n} ${str} запись`: 
                              `В результате выполнения запроса было найдено ${n} ${str} записей`
            break;

        case 2:
        case 3:
        case 4:
            str = (![12, 13, 14].includes(n)) ?  `В результате выполнения запроса было найдено ${n} ${str} записи`:
                                                 `В результате выполнения запроса было найдено ${n} ${str} записей`
            break;

        default:
            str = `В результате выполнения запроса было найдено ${n} ${str} записей`
            break;
    }

    return str
}

for (let i = 0; i <= 100; i++) {
    console.log(pluralizeRecords(i)) // 0 - 100 records
}