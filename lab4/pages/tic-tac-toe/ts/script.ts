"use strict"

window.onload = function () {
    let moves: string[] = []

    // field filling 
    document.querySelector('.field')?.addEventListener('click', function (event: Event){
        const clickedElement = event.target as HTMLDivElement

        if (!clickedElement.classList.contains("cell")) return // if not a cell
        if (clickedElement.textContent) return // cell contains a data
        if (document.getElementById("win-status")?.textContent) return // if someone wins

        if ((moves.length == 0 || moves.at(-1) == "O") && moves.length < 9){ // sets X if this is the start of the game or the previous O 
            clickedElement.innerHTML = "<div class=\"letter\">X</div>"
            clickedElement.classList.add('placed')
            moves.push("X")
        } else if (moves.at(-1) == "X" && moves.length < 9){ // sets O if previous X
            clickedElement.innerHTML = "<div class=\"letter\">O</div>"
            clickedElement.classList.add('placed')
            moves.push("O")
        }
        winChecking()     
    })

    // field cleaning
    document.getElementById("reset")?.addEventListener("click", function (event: Event) {
        let cells = document.getElementsByClassName("cell")
        for (let i = 0; i < cells.length; i++) { // Cleans the field
            cells[i].textContent = ""  
        }
        
        let winStatus = document.getElementById("win-status")
        if (winStatus) winStatus.textContent = "" // Cleans the win-status

        moves = [] // zeroize the moves

        let cellsElem: HTMLElement[] = []
        for (let i = 1; i < 10; i++) cellsElem.push(document.getElementById(`cell${i}`)!)
        for (let cell of cellsElem) cell.classList.remove("win-cell", "lose-cell", "placed")
    })

    // win checking
    function winChecking(): void{
        function setWinLoseClass(win: number[]): void{ 
            for (let i = 0; i < 9; i++) {        
                if (win.includes(i)) cellsElem[i].classList.add("win-cell")   
                else cellsElem[i].classList.add("lose-cell")  
            }
        }

        let cells: string[] = []
        let cellsElem: HTMLElement[] = []

        for (let i = 1; i < 10; i++){
            let cellElem = document.getElementById(`cell${i}`)
            cells.push(cellElem?.textContent!)
            cellsElem.push(cellElem!)
        }
        
        //          0 1 2
        //  cells   3 4 5
        //          6 7 8

        let winStatus = document.getElementById("win-status")!
        if (cells[0] == cells[1] && cells[1] == cells[2] && cells[0] != ""){ // top row
            winStatus.textContent = `Выиграл ${cells[0]}`
            setWinLoseClass([0, 1, 2])
        }else if (cells[3] == cells[4] && cells[4] == cells[5] && cells[3] != ""){ // mid row
            winStatus.textContent = `Выиграл ${cells[3]}`
            setWinLoseClass([3, 4, 5])
        }else if (cells[6] == cells[7] && cells[7] == cells[8] && cells[6] != ""){ // bottom row
            winStatus.textContent = `Выиграл ${cells[6]}`
            setWinLoseClass([6, 7, 8])
        }else if (cells[0] == cells[3] && cells[3] == cells[6] && cells[0] != ""){ // left column
            winStatus.textContent = `Выиграл ${cells[0]}`
            setWinLoseClass([0, 3, 6])
        }else if (cells[1] == cells[4] && cells[4] == cells[7] && cells[1] != ""){ // mid column
            winStatus.textContent = `Выиграл ${cells[1]}`
            setWinLoseClass([1, 4, 7])
        }else if (cells[2] == cells[5] && cells[5] == cells[8] && cells[2] != ""){ // right column
            winStatus.textContent = `Выиграл ${cells[2]}`
            setWinLoseClass([2, 5, 8])
        }else if (cells[0] == cells[4] && cells[4] == cells[8] && cells[0] != ""){ // main diagonal
            winStatus.textContent = `Выиграл ${cells[0]}`
            setWinLoseClass([0, 4, 8])
        }else if (cells[2] == cells[4] && cells[4] == cells[6] && cells[2] != ""){ // side diagonal
            winStatus.textContent = `Выиграл ${cells[2]}`
            setWinLoseClass([2, 4, 6])
        }
    }
}