module.exports = function solveSudoku(matrix) {

    let matix_to_row = matrix.map(e => e.map(e => e)).reduce((acc=[],e)=>{e.map(e=>acc.push(e));return acc});

    const numberNotExistInDirection = (num, row, col) => {
        let result = true;
        for (let i = 0; i < 9; i++) {
            let square3x3 = ((Math.floor(row / 3) * 3) + Math.floor(i / 3)) * 9 + (Math.floor(col / 3) * 3) + (i % 3);
            if (num === matix_to_row[(row * 9) + i] ||
                num === matix_to_row[col + (i * 9)] ||
                num === matix_to_row[square3x3]) {
                result = false;
                return result;
            }
        }
        return result;
    };

    const checkPosition = (index) => {
        if (index >= matix_to_row.length) {
            return true;
        }

        if (matix_to_row[index] !== 0) {
            return checkPosition(index + 1);
        }

        for (let i = 1; i <= 9; i++) {
            if (numberNotExistInDirection(i, Math.floor(index / 9), index % 9)) {
                matix_to_row[index] = i;
                if (checkPosition(index + 1)) {
                    return true;
                }
            }
        }

        matix_to_row[index] = 0;
    };
    checkPosition(0);
    let result = [];
    for (let i = 0; i < matix_to_row.length; i += 9) {
        result.push(matix_to_row.slice(i, i + 9));
    }
    return result;
};
